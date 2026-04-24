import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { columns, normalizeData, formatValue } from './utils'

export function PDF_Download_Despesas(data = []) {
  const rowsData = normalizeData(data)

  const doc = new jsPDF({ orientation: 'landscape' })

  doc.setFontSize(14)
  doc.text('Relatório de Despesas Consolidadas', 14, 12)

  autoTable(doc, {
    startY: 18,
    head: [columns.map((c) => c.header)],

    body: rowsData.map((row) =>
      columns.map((c) => formatValue(c.key, row?.[c.key])),
    ),

    theme: 'grid',
    styles: {
      fontSize: 9,
      overflow: 'linebreak',
      cellPadding: 3,
    },

    headStyles: {
      fontStyle: 'bold',
      halign: 'center',
    },

    columnStyles: {
      0: { cellWidth: 70, halign: 'left' },
      1: { cellWidth: 42, halign: 'right' },
      2: { cellWidth: 42, halign: 'right' },
      3: { cellWidth: 42, halign: 'right' },
      4: { cellWidth: 42, halign: 'right' },
      5: { cellWidth: 42, halign: 'right' },
    },
  })

  doc.save('despesas_consolidadas.pdf')
}
