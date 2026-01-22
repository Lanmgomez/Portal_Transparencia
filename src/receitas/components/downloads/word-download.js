import { saveAs } from 'file-saver'
import { normalizeData } from '../../../components/commons/utils'
import { columns, formatValue, moneyKeys } from './utils'
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

export async function WORD_Download(data) {
  const rowsData = normalizeData(data)

  // Larguras (em "DXA" / twips). É só ajustar.
  // Regra prática: quanto maior, mais larga.
  const colWidths = [
    700, // Ano
    600, // Mês
    1400, // Unidade
    1600, // Descrição
    1400, // Data
    1900, // Mensal Prevista
    2000, // Extra
    1900, // Realizada
    1900, // Acumulada
    2000, // Acum. c/ Extra
  ]

  const headerRow = new TableRow({
    children: columns.map(
      (c, idx) =>
        new TableCell({
          width: { size: colWidths[idx], type: WidthType.DXA },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: c.header,
                  bold: true,
                  size: 18, // 9pt (docx usa "half-points")
                }),
              ],
            }),
          ],
        }),
    ),
  })

  const bodyRows = rowsData.map(
    (row) =>
      new TableRow({
        children: columns.map((c, idx) => {
          const text = String(formatValue(c.key, row?.[c.key]) ?? '')

          const isMoney = moneyKeys.has(c.key)
          //   const isDate = dateKeys.has(c.key)

          return new TableCell({
            width: { size: colWidths[idx], type: WidthType.DXA },
            children: [
              new Paragraph({
                alignment: isMoney ? AlignmentType.RIGHT : AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text,
                    size: 18, // 9pt
                  }),
                ],
              }),
            ],
          })
        }),
      }),
  )

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            // ✅ Landscape
            size: { orientation: PageOrientation.LANDSCAPE },
            // ✅ Margens menores
            margin: {
              top: 720, // 0.5"
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
                text: 'Relatório de Receitas / Transferências',
                bold: true,
                size: 28, // 14pt
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
  saveAs(blob, 'receitas-transferencias.docx')
}
