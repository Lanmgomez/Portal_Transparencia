import { useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { FileTextOutlined, InfoCircleOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import {
  empenhos_api,
  ErrorMessage,
  HttpRequest,
} from '../../../components/commons/utils'
import {
  Modal,
  Form,
  Button,
  Input,
  InputNumber,
  DatePicker,
  Row,
  Col,
  Typography,
  Tag,
  Avatar,
  Divider,
} from 'antd'

const { Text, Title } = Typography
const { RangePicker } = DatePicker
const { TextArea } = Input

export default function ModalCadastroDiaria({ open, record, onClose }) {
  const [form] = Form.useForm()

  const handleCancel = () => {
    form.resetFields()
    onClose()
  }

  const initialValues = {
    cargo: record?.diaria?.cargo,
    quantidade_diarias: record?.diaria?.quantidade_diarias,
    local: record?.diaria?.local,
    motivo: record?.diaria?.motivo,
    periodo:
      record?.diaria?.data_inicio && record?.diaria?.data_fim
        ? [dayjs(record?.diaria?.data_inicio), dayjs(record?.diaria?.data_fim)]
        : undefined,
  }

  const salvar = useMutation({
    mutationFn: (values) =>
      HttpRequest('PUT', `${empenhos_api}/${record?.id}/diaria`, values),
    onSuccess: () => {
      window.location.reload()
    },
    onError: (error) => ErrorMessage(error),
  })

  const handleSalvar = async () => {
    const values = await form.validateFields()

    const payload = {
      cargo: values.cargo.trim(),
      quantidade_diarias: values.quantidade_diarias,
      data_inicio: values.periodo[0].format('YYYY-MM-DD'),
      data_fim: values.periodo[1].format('YYYY-MM-DD'),
      local: values.local.trim(),
      motivo: values.motivo?.trim() || null,
    }

    return salvar.mutate(payload)
  }

  useEffect(() => {
    if (!open) return

    const d = record?.diaria ?? {}
    form.setFieldsValue({
      cargo: d.cargo ?? '',
      quantidade_diarias: d.quantidade_diarias ?? '',
      local: d.local ?? '',
      motivo: d.motivo ?? '',
      periodo:
        d.data_inicio && d.data_fim
          ? [dayjs(d.data_inicio), dayjs(d.data_fim)]
          : undefined,
    })
  }, [open, form, record])

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar
            size={40}
            icon={<FileTextOutlined />}
            style={{
              backgroundColor: '#e6f4ff',
              color: '#1677ff',
              flexShrink: 0,
            }}
          />
          <div>
            <Title level={5} style={{ margin: 0 }}>
              Informações complementares da diária
            </Title>

            <Text type='secondary' style={{ fontSize: 13, fontWeight: 400 }}>
              Dados que não vêm do SAGRES e precisam ser informados manualmente
            </Text>
          </div>
        </div>
      }
      open={open}
      onCancel={handleCancel}
      width={700}
      destroyOnHidden
      forceRender
      footer={[
        <Button key='cancelar' onClick={handleCancel}>
          Cancelar
        </Button>,

        <Button
          key='salvar'
          type='primary'
          onClick={handleSalvar}
          disabled={salvar?.isPending}
        >
          {salvar?.isPending ? 'Salvando...' : 'Salvar'}
        </Button>,
      ]}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 16px',
          marginTop: 8,
          background: '#fafafa',
          border: '1px solid #f0f0f0',
          borderRadius: 8,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <Text type='secondary' style={{ fontSize: 12 }}>
            Beneficiário
          </Text>

          <div>
            <Text strong style={{ fontSize: 15 }}>
              {record?.fornecedor?.nome || record?.beneficiario || '-'}
            </Text>
          </div>

          <div
            style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}
          >
            <Tag color='blue' style={{ margin: 0 }}>
              Empenho {record?.numero_empenho || '-'}/{record?.ano || '-'}
            </Tag>

            {record?.data_empenho && (
              <Tag style={{ margin: 0 }}>
                {dayjs(record.data_empenho.slice(0, 10)).format('DD/MM/YYYY')}
              </Tag>
            )}
          </div>
        </div>
      </div>

      <Divider style={{ margin: '20px 0 16px' }} />

      <Form
        form={form}
        key={record?.id}
        layout='vertical'
        initialValues={initialValues}
        preserve={false}
      >
        <Row gutter={16}>
          <Col xs={24} md={16}>
            <Form.Item
              label='Cargo'
              name='cargo'
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Informe o cargo',
                },
              ]}
            >
              <Input placeholder='Ex.: Presidente da Câmara' maxLength={255} />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label='Nº de diárias'
              name='quantidade_diarias'
              rules={[
                { required: true, message: 'Informe a quantidade' },
                {
                  validator: (_, value) =>
                    value == null || (value > 0 && (value * 2) % 1 === 0)
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error('Use múltiplos de 0,5 (ex.: 2,5)'),
                        ),
                },
              ]}
            >
              <InputNumber
                min={0.5}
                step={0.5}
                precision={1}
                decimalSeparator=','
                placeholder='Ex.: 1'
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label='Período'
              name='periodo'
              rules={[{ required: true, message: 'Informe o início e o fim' }]}
            >
              <RangePicker
                format='DD/MM/YYYY'
                placeholder={['Início', 'Fim']}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label='Local (destino)'
              name='local'
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Informe o destino',
                },
              ]}
            >
              <Input placeholder='Ex.: Recife/PE' maxLength={255} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label='Motivo'
          name='motivo'
          tooltip={{
            title: 'Campo opcional',
            icon: <InfoCircleOutlined />,
          }}
        >
          <TextArea
            rows={3}
            placeholder='Ex.: Participação em capacitação no TCE-PE (opcional)'
            maxLength={1000}
            showCount
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
