import React from "react";
import PropTypes from "prop-types";
import RedLine from "../redline/RedLine.jsx";
import Event from "../event/Event";
import { formatMins } from "../../../src/utils/dateUtils.js";

const Hour = ({ dataHour, hourEvents, onDeleteEvent, dataDay }) => {
  const actualDataOfDay = new Date().getDate() === dataDay ? true : false;

  return (
    <div className="calendar__time-slot" data-time={dataHour + 1}>
      {(new Date().getHours() === dataHour && actualDataOfDay) && <RedLine />}
      {/* if no events in the current hour nothing will render here */}
      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        const eventStart = `${new Date(dateFrom).getHours()}:${formatMins(
          new Date(dateFrom).getMinutes()
        )}`;
        const eventEnd = `${new Date(dateTo).getHours()}:${formatMins(
          new Date(dateTo).getMinutes()
        )}`;

        return (
          <Event
            key={id}
            //calculating event height = duration of event in minutes
            height={
              (new Date(dateTo).getTime() - new Date(dateFrom).getTime()) /
              (1000 * 60)
            }
            marginTop={new Date(dateFrom).getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            id={id}
            onDeleteEvent={onDeleteEvent}
          />
        );
      })}
    </div>
  );
};

Hour.propTypes = {
  dataHour: PropTypes.number.isRequired,
  hourEvents: PropTypes.array.isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
  dataDay: PropTypes.number.isRequired,
};

export default Hour;
