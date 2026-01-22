import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { normalizeData } from '../../../components/commons/utils'
import { columns, formatValue } from './utils'

export function PDFDownload(data) {
  const rowsData = normalizeData(data)

  // Dica: landscape cabe MUITO melhor quando tem muitas colunas
  const doc = new jsPDF({ orientation: 'landscape' })

  doc.setFontSize(14)
  doc.text('Relatório de Receitas / Transferências', 14, 12)

  autoTable(doc, {
    startY: 18,
    head: [columns.map((c) => c.header)],
    body: rowsData.map((row) =>
      columns.map((c) => String(formatValue(c.key, row?.[c.key]))),
    ),

    // Layout geral
    theme: 'grid',
    tableWidth: 'auto',
    margin: { left: 8, right: 8 },

    styles: {
      fontSize: 9,
      cellPadding: 2,
      valign: 'middle',
      overflow: 'linebreak', // quebra linha dentro da célula
    },

    headStyles: {
      fontSize: 9,
      halign: 'center',
      fillColor: [25, 118, 210], // azul semelhante ao print
      textColor: 255,
    },

    bodyStyles: {
      halign: 'center',
    },

    // ✅ Aqui você define o tamanho das colunas (por índice)
    // índices: 0=Ano, 1=Mês, 2=Unidade, 3=Descrição, 4=Data, 5..=moedas
    columnStyles: {
      0: { cellWidth: 12 }, // Ano
      1: { cellWidth: 10 }, // Mês
      2: { cellWidth: 22, halign: 'left' }, // Unidade
      3: { cellWidth: 28, halign: 'left' }, // Descrição
      4: { cellWidth: 22 }, // Data Recebimento

      5: { cellWidth: 28, halign: 'right' }, // Mensal Prevista
      6: { cellWidth: 32, halign: 'right' }, // Extra-Orçamentária
      7: { cellWidth: 28, halign: 'right' }, // Realizada
      8: { cellWidth: 28, halign: 'right' }, // Acumulada
      9: { cellWidth: 30, halign: 'right' }, // Acum. c/ Extra
    },
  })

  doc.save('receitas-transferencias.pdf')
}
