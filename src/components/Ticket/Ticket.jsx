import React from 'react';

import formatTicketDataForRender from '../../utilities/formatTicketDataForRender';

import classes from './Ticket.module.scss';

export default function Ticket({ price, firstSegment, secondSegment, carrier }) {
  const formattedTicketDataThereForRender = formatTicketDataForRender(firstSegment);
  const formattedTicketDataBackForRender = formatTicketDataForRender(secondSegment);

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
            <p
              className={classes['ticket__description-text']}
            >{`${formattedTicketDataThereForRender.departureDateForRender} - ${formattedTicketDataThereForRender.arrivalDate}`}</p>
          </div>
          <div className={classes['ticket__flight-duration']}>
            <p className={classes['ticket__description-header']}>В ПУТИ</p>
            <p className={classes['ticket__description-text']}>{formattedTicketDataThereForRender.flightDuration}</p>
          </div>
          <div className={classes['ticket__information-about-transfer']}>
            <p className={classes['ticket__description-header']}>
              {formattedTicketDataThereForRender.textAboutNumberOfTransfers}
            </p>
            <p className={classes['ticket__description-text']}>{`${formattedTicketDataThereForRender.stopsCities}`}</p>
          </div>
        </div>
        <div className={classes['ticket__flight-information']}>
          <div className={classes['ticket__country-of-flight-and-time']}>
            <p
              className={classes['ticket__description-header']}
            >{`${secondSegment.origin} - ${secondSegment.destination}`}</p>
            <p
              className={classes['ticket__description-text']}
            >{`${formattedTicketDataBackForRender.departureDateForRender} - ${formattedTicketDataBackForRender.arrivalDate}`}</p>
          </div>
          <div className={classes['ticket__flight-duration']}>
            <p className={classes['ticket__description-header']}>В ПУТИ</p>
            <p
              className={classes['ticket__description-text']}
            >{`${formattedTicketDataBackForRender.flightDuration}`}</p>
          </div>
          <div className={classes['ticket__information-about-transfer']}>
            <p className={classes['ticket__description-header']}>
              {formattedTicketDataBackForRender.textAboutNumberOfTransfers}
            </p>
            <p className={classes['ticket__description-text']}>{`${formattedTicketDataBackForRender.stopsCities}`}</p>
          </div>
        </div>
      </div>
    </a>
  );
}
