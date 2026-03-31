import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { normalizeData } from '../../../components/commons/utils'
import { columns } from './utils'

function formatValue(key, value) {
  if (value == null) return ''
  return String(value)
}

export function PDF_Download_Empenho(data) {
  const rowsData = normalizeData(data)

  const doc = new jsPDF({ orientation: 'landscape' })

  doc.setFontSize(14)
  doc.text('Relatório de Empenhos', 14, 12)

  autoTable(doc, {
    startY: 18,
    head: [columns.map((c) => c.header)],

    body: rowsData.map((row) =>
      columns.map((c) => {
        let value = row?.[c.key]

        // ✅ regra do beneficiário
        if (c.key === 'beneficiario' && !value) {
          value = 'Cadastrar beneficiário'
        }

        return formatValue(c.key, value)
      }),
    ),

    theme: 'grid',
    tableWidth: 'auto',
    margin: { left: 6, right: 6 },

    styles: {
      fontSize: 7, // 👈 menor pra caber tudo
      cellPadding: 1.5,
      valign: 'middle',
      overflow: 'linebreak',
    },

    headStyles: {
      fontSize: 8,
      halign: 'center',
      fillColor: [25, 118, 210],
      textColor: 255,
    },

    bodyStyles: {
      halign: 'center',
    },

    columnStyles: {
      0: { cellWidth: 10 }, // Ano
      1: { cellWidth: 10 }, // Mês
      2: { cellWidth: 18 }, // Empenho
      3: { cellWidth: 35, halign: 'left' }, // Beneficiário
      4: { cellWidth: 28 }, // CPF/CNPJ
      5: { cellWidth: 45, halign: 'left' }, // Histórico

      6: { cellWidth: 22, halign: 'right' }, // Valor Empenhado
      7: { cellWidth: 22, halign: 'right' }, // Liquidação
      8: { cellWidth: 22 }, // Data
      9: { cellWidth: 22, halign: 'right' }, // Pagamento

      10: { cellWidth: 22 }, // Licitação
      11: { cellWidth: 18 }, // Elemento
      12: { cellWidth: 18 }, // Função
      13: { cellWidth: 22 }, // SubFunção
      14: { cellWidth: 24 }, // Fonte
      15: { cellWidth: 24 }, // Natureza
      16: { cellWidth: 26 }, // Categoria
      17: { cellWidth: 30 }, // Unidade
    },
  })

  doc.save('empenhos.pdf')
}
