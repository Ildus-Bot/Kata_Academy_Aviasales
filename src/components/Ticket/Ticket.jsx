import React from 'react';
import { parseISO } from 'date-fns';

import classes from './Ticket.module.scss';

export default function Ticket({ price, firstSegment, secondSegment, carrier }) {
  // Конвертируем первый сегмент данных в нужный нам формат

  const departureDateInFormatDate = parseISO(firstSegment.date);

  let departureHours = departureDateInFormatDate.getHours();
  let departureMinutes = departureDateInFormatDate.getMinutes();

  let departureMinutesForRender = departureMinutes;

  if (departureMinutes < 10) {
    departureMinutesForRender = `0${departureMinutes}`;
  }

  if (departureMinutes === 60) {
    departureHours++;
    departureMinutesForRender = '00';
  }

  let departureHoursForRender = departureHours;

  if (departureHours < 10) {
    departureHoursForRender = `0${departureHours}`;
  }

  const departureDateForRender = `${departureHoursForRender}:${departureMinutesForRender}`;

  const flightDurationHours = Math.trunc(firstSegment.duration / 60);
  let flightDurationHoursForRender = flightDurationHours;
  let flightDurationDay;

  if (flightDurationHours >= 24) {
    flightDurationDay = Math.trunc(flightDurationHours / 24);
    flightDurationHoursForRender = flightDurationHours / 24;
  }

  const flightDurationMinutes = firstSegment.duration % 60;
  let flightDurationMinutesForRender = flightDurationMinutes;

  const flightDuration = `
							${flightDurationDay ? `${flightDurationDay}д ` : ''}
							${flightDurationHoursForRender ? `${flightDurationHoursForRender}ч ` : ''}
							${flightDurationMinutesForRender ? `${flightDurationMinutesForRender}м` : ''}
							`;

  let arrivalDateMinutes = departureMinutes + flightDurationMinutes;
  let arrivalDateHours = departureHours + flightDurationHours;

  if (arrivalDateMinutes >= 60) {
    arrivalDateMinutes = arrivalDateMinutes % 60;
    arrivalDateHours++;
  }

  let arrivalDateHoursForRender = arrivalDateHours;
  let arrivalDateMinutesForRender = arrivalDateMinutes;

  if (arrivalDateMinutes < 10) {
    arrivalDateMinutesForRender = `0${arrivalDateMinutes}`;
  }

  if (arrivalDateHours >= 24) {
    arrivalDateHoursForRender = arrivalDateHours % 24;
  }

  if (arrivalDateHoursForRender < 10) {
    arrivalDateHoursForRender = `0${arrivalDateHoursForRender}`;
  }

  const arrivalDate = `${arrivalDateHoursForRender}:${arrivalDateMinutesForRender}`;

  const stops = firstSegment.stops;
  const stopsCount = stops.length;
  let textAboutNumberOfTransfers;
  if (stopsCount === 0) {
    textAboutNumberOfTransfers = 'БЕЗ ПЕРЕСАДОК';
  } else if (stopsCount === 1) {
    textAboutNumberOfTransfers = '1 ПЕРЕСАДКА';
  } else if (stopsCount > 1) {
    textAboutNumberOfTransfers = `${stopsCount} ПЕРЕСАДКИ`;
  }

  let stopsCities = stops;

  if (stopsCount > 1) {
    stopsCities = stopsCities.map((citie) => ` ${citie}`);
  }

  // Конвертируем второй сегмент данных в нужный нам формат

  const departureDateBackInFormatDate = parseISO(secondSegment.date);

  let departureBackHours = departureDateBackInFormatDate.getHours();
  let departureBackMinutes = departureDateBackInFormatDate.getMinutes();

  let departureBackMinutesForRender = departureBackMinutes;

  if (departureBackMinutes < 10) {
    departureBackMinutesForRender = `0${departureBackMinutes}`;
  }

  if (departureBackMinutes === 60) {
    departureBackHours++;
    departureBackMinutesForRender = '00';
  }

  let departureBackHoursForRender = departureBackHours;

  if (departureBackHours < 10) {
    departureBackHoursForRender = `0${departureBackHours}`;
  }

  const departureBackDateForRender = `${departureBackHoursForRender}:${departureBackMinutesForRender}`;

  const flightDurationBackHours = Math.trunc(secondSegment.duration / 60);
  let flightDurationBackHoursForRender = flightDurationBackHours;
  let flightDurationBackDay;

  if (flightDurationBackHours >= 24) {
    flightDurationBackDay = Math.trunc(flightDurationBackHours / 24);
    flightDurationBackHoursForRender = flightDurationBackHours / 24;
  }

  const flightDurationBackMinutes = secondSegment.duration % 60;
  let flightDurationBackMinutesForRender = flightDurationBackMinutes;

  const flightDurationBack = `
								${flightDurationBackDay ? `${flightDurationBackDay}д ` : ''}
								${flightDurationBackHoursForRender ? `${flightDurationBackHoursForRender}ч ` : ''}
								${flightDurationBackMinutesForRender ? `${flightDurationBackMinutesForRender}м` : ''}
								`;

  let arrivalDateBackMinutes = departureBackMinutes + flightDurationBackMinutes;
  let arrivalDateBackHours = departureBackHours + flightDurationBackHours;

  if (arrivalDateBackMinutes >= 60) {
    arrivalDateBackMinutes = arrivalDateBackMinutes % 60;
    arrivalDateBackHours++;
  }

  let arrivalDateBackHoursForRender = arrivalDateBackHours;
  let arrivalDateBackMinutesForRender = arrivalDateBackMinutes;

  if (arrivalDateBackMinutes < 10) {
    arrivalDateBackMinutesForRender = `0${arrivalDateBackMinutes}`;
  }

  if (arrivalDateBackHours >= 24) {
    arrivalDateBackHoursForRender = arrivalDateBackHours % 24;
  }

  if (arrivalDateBackHoursForRender < 10) {
    arrivalDateBackHoursForRender = `0${arrivalDateBackHoursForRender}`;
  }

  const arrivalDateBack = `${arrivalDateBackHoursForRender}:${arrivalDateBackMinutesForRender}`;

  const stopsBack = secondSegment.stops;
  const stopsCountBack = stopsBack.length;
  let textAboutNumberOfTransfersBack;
  if (stopsCountBack === 0) {
    textAboutNumberOfTransfersBack = 'БЕЗ ПЕРЕСАДОК';
  } else if (stopsCountBack === 1) {
    textAboutNumberOfTransfersBack = '1 ПЕРЕСАДКА';
  } else if (stopsCountBack > 1) {
    textAboutNumberOfTransfersBack = `${stopsCountBack} ПЕРЕСАДКИ`;
  }

  let stopsCitiesBack = stopsBack;

  if (stopsCountBack > 1) {
    stopsCitiesBack = stopsCitiesBack.map((citie) => ` ${citie}`);
  }

  return (
    <a href="#" className={classes.ticket}>
      <div className={classes['ticket__price-and-company-logo']}>
        <p className={classes.ticket__price}>{price} Р</p>
        <img
          className={classes.ticket__logo}
          src={`https://images.daisycon.io/airline/?height=100&color=ffffff&iata=${carrier}`}
          alt="Logo Airlines"
        />
      </div>
      <div className="ticket__description">
        <div className={classes['ticket__flight-information']}>
          <div className={classes['ticket__country-of-flight-and-time']}>
            <p
              className={classes['ticket__description-header']}
            >{`${firstSegment.origin} - ${firstSegment.destination}`}</p>
            <p className={classes['ticket__description-text']}>{`${departureDateForRender} - ${arrivalDate}`}</p>
          </div>
          <div className={classes['ticket__flight-duration']}>
            <p className={classes['ticket__description-header']}>В ПУТИ</p>
            <p className={classes['ticket__description-text']}>{flightDuration}</p>
          </div>
          <div className={classes['ticket__information-about-transfer']}>
            <p className={classes['ticket__description-header']}>{textAboutNumberOfTransfers}</p>
            <p className={classes['ticket__description-text']}>{`${stopsCities}`}</p>
          </div>
        </div>
        <div className={classes['ticket__flight-information']}>
          <div className={classes['ticket__country-of-flight-and-time']}>
            <p
              className={classes['ticket__description-header']}
            >{`${secondSegment.origin} - ${secondSegment.destination}`}</p>
            <p
              className={classes['ticket__description-text']}
            >{`${departureBackDateForRender} - ${arrivalDateBack}`}</p>
          </div>
          <div className={classes['ticket__flight-duration']}>
            <p className={classes['ticket__description-header']}>В ПУТИ</p>
            <p className={classes['ticket__description-text']}>{`${flightDurationBack}`}</p>
          </div>
          <div className={classes['ticket__information-about-transfer']}>
            <p className={classes['ticket__description-header']}>{textAboutNumberOfTransfersBack}</p>
            <p className={classes['ticket__description-text']}>{`${stopsCitiesBack}`}</p>
          </div>
        </div>
      </div>
    </a>
  );
}
