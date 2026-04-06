import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { columns, normalizeData } from './utils'

function formatValue(key, value) {
  if (value == null) return ''
  return String(value)
}

export function PDF_Download_Despesas(data) {
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
      0: { cellWidth: 12 },
      1: { cellWidth: 14 },
      2: { cellWidth: 40, halign: 'left' },
      3: { cellWidth: 30 },
      4: { cellWidth: 60, halign: 'left' },
      5: { cellWidth: 28, halign: 'right' },
      6: { cellWidth: 30 },
      7: { cellWidth: 28, halign: 'right' },
      8: { cellWidth: 20 },
    },
  })

  doc.save('despesas.pdf')
}
