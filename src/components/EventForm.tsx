import { Button, DatePicker, Form, Input, Row, Select } from 'antd';
import { FC, useState } from 'react';
import { rules } from './utils/rules';
import { IUser } from '../models/IUser';
import { IEvent } from '../models/IEvent';
import { Moment } from 'moment';
import { Dayjs } from 'dayjs';
import { formateDate } from './utils/date';
import { useTypedSelector } from '../hooks/useTypedSelector';

interface EventFormProps {
  guests: IUser[],
  submit: (event: IEvent) => void
}

const EventForm: FC<EventFormProps> = (props) => {
  const [event, setEvent] = useState<IEvent>({
    author: '', 
    date: '',
    description: '',
    guest: ''
  } as IEvent)
  const {user} = useTypedSelector(state => state.auth)

  const selectDate = (date: Dayjs | null) => {
    if(date) {
      setEvent({...event, date: formateDate(date.toDate())})
    }
  }
  const submitForm = () => {
    props.submit({...event, author: user.username})
  }
  return (
    <Form onFinish={submitForm}>
      <Form.Item
        label="Название события"
        name="description"
        rules={[rules.required()]}
      >
        <Input 
          onChange={e => setEvent({...event, description: e.target.value})}
          value={event.description}
        />
      </Form.Item>
      <Form.Item
        label="Дата события"
        name="date"
        rules={[rules.required(), rules.isDateAfter("Этот день уже прошел")]}
      >
        <DatePicker
          onChange={(date) => selectDate(date)}
        />
      </Form.Item>
      <Form.Item
        label="Гость"
        name="guest"
        rules={[rules.required()]}
      >
        <Select onChange={(guest: string) => setEvent({...event, guest})}>
          {props.guests.map(guest => {
            return (
              <Select.Option key={guest.username} value={guest.username}>
                {guest.username}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Создать
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EventForm;
