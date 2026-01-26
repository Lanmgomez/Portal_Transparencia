import { Card, Form, Select, Upload, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { normFile, validateZip } from './arquivoZip'
import { mouthOption, yearOption } from '../../../components/commons/utils'

export default function EmpenhosForm({ form, onFinish, disabled }) {
  return (
    <Card title='Preencha o formulário abaixo'>
      <Form form={form} onFinish={onFinish} disabled={disabled}>
        <Form.Item
          name='ano'
          label='Ano'
          style={{ fontWeight: 'bold' }}
          rules={[{ message: 'Campo obirgatório!', required: true }]}
        >
          <Select
            style={{ width: '200px' }}
            placeholder='Escolha o ano...'
            options={yearOption}
          />
        </Form.Item>

        <Form.Item
          name='mes'
          label='Mês'
          style={{ fontWeight: 'bold' }}
          rules={[{ message: 'Campo obirgatório!', required: true }]}
        >
          <Select
            style={{ width: '200px' }}
            placeholder='Escolha o mês...'
            options={mouthOption}
          />
        </Form.Item>

        <Form.Item
          name='arquivo'
          label='Arquivo (.zip)'
          style={{ fontWeight: 'bold' }}
          valuePropName='fileList'
          getValueFromEvent={normFile}
          rules={[
            { message: 'Campo obirgatório!', required: true },
            { validator: (_, fileList) => validateZip(_, fileList) },
          ]}
        >
          <Upload
            accept='.zip'
            maxCount={1}
            listType='text'
            beforeUpload={() => false} // impede upload automático
          >
            <Button type='primary' icon={<UploadOutlined />}>
              Upload
            </Button>
          </Upload>
        </Form.Item>

        <div className='btns'>
          <Button
            block
            type='secondary'
            htmlType='button'
            className='save-btn'
            onClick={() => window.history.back()}
          >
            Voltar
          </Button>

          <Button
            block
            type='primary'
            htmlType='submit'
            className='save-btn'
            loading={disabled}
            disabled={disabled}
          >
            Salvar
          </Button>
        </div>
      </Form>
    </Card>
  )
}
