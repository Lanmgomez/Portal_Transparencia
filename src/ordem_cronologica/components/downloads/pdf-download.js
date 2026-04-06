import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { columns, normalizeData } from './utils'

function formatValue(key, value) {
  if (value == null) return ''
  return String(value)
}

export function PDF_Download_Ordem_Cronologica(data) {
  const rowsData = normalizeData(data)

  const doc = new jsPDF({ orientation: 'landscape' })

  doc.setFontSize(14)
  doc.text('Relatório de Pagamentos', 14, 12)

  autoTable(doc, {
    startY: 18,
    head: [columns.map((c) => c.header)],

    body: rowsData.map((row) =>
      columns.map((c) => {
        let value = row?.[c.key]

        if (c.key === 'beneficiario' && !value) {
          value = 'Cadastrar beneficiário'
        }

        return formatValue(c.key, value)
      }),
    ),

    theme: 'grid',
    styles: {
      fontSize: 8,
      overflow: 'linebreak',
    },

    columnStyles: {
      0: { cellWidth: 20 },
      1: { cellWidth: 20 },
      2: { cellWidth: 40, halign: 'left' },
      3: { cellWidth: 15 },
      4: { cellWidth: 15, halign: 'left' },
      5: { cellWidth: 25, halign: 'right' },
      6: { cellWidth: 60 },
      7: { cellWidth: 40, halign: 'right' },
      8: { cellWidth: 40 },
    },
  })

  doc.save('ordem_cronologica.pdf')
}
