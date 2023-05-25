import { Button, DatePicker, Form, Input, Row, Select } from 'antd';
import { FC } from 'react';
import { rules } from './utils/rules';
import { IUser } from '../models/IUser';

interface EventFormProps {
  guests: IUser[],
}

const EventForm: FC<EventFormProps> = (props) => {
  return (
    <Form>
      <Form.Item
        label="Название события"
        name="description"
        rules={[rules.required()]}
      >
      <Input />
      </Form.Item>
      <Form.Item
        label="Дата события"
        name="date"
        rules={[rules.required()]}
      >
        <DatePicker/>
        <Form.Item
          label="Дата события"
          name="date"
          rules={[rules.required()]}
        >
        <Select
          {...props.guests.map(guest => {
            <Select.Option value = {guest.username}>
              {guest.username}
            </Select.Option>
          })}
          >
        </Select>
      </Form.Item>
      </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Создать
          </Button>
        </Form.Item>

    </Form>
  )
};

export default EventForm;