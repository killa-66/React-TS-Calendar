import { Badge, BadgeProps, Calendar } from 'antd';
import React, { FC } from 'react';
import { IEvent } from '../models/IEvent';
import { Dayjs } from 'dayjs';
import { formateDate } from './utils/date';


interface EventCalendarProps {
  events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = (props) => {
  const dateCellRender = (value: Dayjs) => {
    const formatedData = formateDate(value.toDate());
    const currenDaysEvents = props.events.filter(el => el.date === formatedData)
    return (
      <div>
        {currenDaysEvents.map((el, idx) => 
          <div key={idx}>
            {el.description}
          </div>
          )}
      </div>
    );
  };
  return (
    <Calendar
      dateCellRender={dateCellRender}
    />
  )
};

export default EventCalendar;