import { saveAs } from 'file-saver'
import { columns, normalizeData } from './utils'
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  TextRun,
  WidthType,
  AlignmentType,
  PageOrientation,
} from 'docx'

const moneyKeys = new Set(['valor_empenhado', 'valor_liquidacao', 'pagamento'])

function formatValue(key, value) {
  if (value == null) return ''

  return String(value)
}

export async function WORD_Download_Empenho(data) {
  const rowsData = normalizeData(data)

  const colWidths = [
    700, 700, 1200, 2000, 1500, 3000, 1600, 1600, 1500, 1600, 1400, 1200, 1200,
    1400, 1600, 1600, 1800, 2000,
  ]

  const headerRow = new TableRow({
    children: columns.map((c, idx) => {
      return new TableCell({
        width: { size: colWidths[idx], type: WidthType.DXA },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: c.header,
                bold: true,
                size: 18,
              }),
            ],
          }),
        ],
      })
    }),
  })

  const bodyRows = rowsData.map((row) => {
    return new TableRow({
      children: columns.map((c, idx) => {
        let value = row?.[c.key]

        if (c.key === 'beneficiario' && !value) {
          value = 'Cadastrar beneficiário'
        }

        const text = formatValue(c.key, value)

        const isMoney = moneyKeys.has(c.key)

        return new TableCell({
          width: { size: colWidths[idx], type: WidthType.DXA },
          children: [
            new Paragraph({
              alignment: isMoney ? AlignmentType.RIGHT : AlignmentType.LEFT,
              children: [
                new TextRun({
                  text,
                  size: 18,
                }),
              ],
            }),
          ],
        })
      }),
    })
  })

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: { orientation: PageOrientation.LANDSCAPE },
            margin: {
              top: 720,
              bottom: 720,
              left: 720,
              right: 720,
            },
          },
        },
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: 'Relatório de Empenhos',
                bold: true,
                size: 28,
              }),
            ],
          }),
          new Paragraph(' '),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [headerRow, ...bodyRows],
          }),
        ],
      },
    ],
  })

  const blob = await Packer.toBlob(doc)
  saveAs(blob, 'empenhos.docx')
}
