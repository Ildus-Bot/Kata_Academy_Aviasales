import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import filterAnArrayOfTickets from '../../utilities/filterAnArrayOfTickets';
import sortAnArrayOfTickets from '../../utilities/sortAnArrayOfTickets';
import {
  asyncGetAllPackOfTickets,
  asyncGetSearchId,
  changeStateNumberOfFilteredTickets,
  resetStateNumberOfTicketsShown,
} from '../../actions';
import Ticket from '../Ticket';

import classes from './TicketList.module.css';

export default function TicketList() {
  const tickets = useSelector((state) => state.arrayOfTickets);
  const searchId = useSelector((state) => state.searchId);
  const numberOfTicketsShown = useSelector((state) => state.numberOfTicketsShown);
  const selectedFiltersCheckbox = useSelector((state) => state.selectedFiltersCheckbox);
  const selectedSortButton = useSelector((state) => state.selectedSortButton);
  const errorMessage = useSelector((state) => state.errorMessage);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!searchId) {
      dispatch(asyncGetSearchId());
    }
  }, []);

  useEffect(() => {
    if (searchId) {
      dispatch(asyncGetAllPackOfTickets(searchId));
    }
  }, [searchId]);

  useEffect(() => {
    dispatch(resetStateNumberOfTicketsShown());
  }, [selectedFiltersCheckbox]);

  useEffect(() => {
    if (!errorMessage) {
      dispatch(changeStateNumberOfFilteredTickets(filteredAndSortedArrayOfTickets.length));
    }
  }, [selectedFiltersCheckbox, tickets]);

  const filteredArrayOfTickets = useMemo(
    () => filterAnArrayOfTickets(tickets, selectedFiltersCheckbox),
    [tickets, selectedFiltersCheckbox]
  );
  const filteredAndSortedArrayOfTickets = useMemo(
    () => sortAnArrayOfTickets(filteredArrayOfTickets, selectedSortButton),
    [tickets, selectedFiltersCheckbox, selectedSortButton]
  );

  if (errorMessage) {
    return <p className={classes['ticket-list__message']}>Что-то пошло не так</p>;
  }

  if (filteredAndSortedArrayOfTickets.length === 0 && tickets.length !== 0) {
    return <p className={classes['ticket-list__message']}>Рейсов, подходящих под заданные фильтры, не найдено</p>;
  }

  // const arrayOfTicketElements = filteredAndSortedArrayOfTickets.map((ticket, index) => {
  //   if (index < numberOfTicketsShown) {
  //     return (
  //       <Ticket
  //         key={`${ticket.segments[0].date}${ticket.segments[1].date}`}
  //         price={ticket.price}
  //         firstSegment={ticket.segments[0]}
  //         secondSegment={ticket.segments[1]}
  //         carrier={ticket.carrier}
  //       />
  //     );
  //   }
  // });

  const arrayOfTicketElements = [];

  for (let i = 0; i < numberOfTicketsShown; i++) {
    const ticket = filteredAndSortedArrayOfTickets[i];

    if (ticket) {
      arrayOfTicketElements.push(
        <Ticket
          key={`${ticket.segments[0].date}${ticket.segments[1].date}`}
          price={ticket.price}
          firstSegment={ticket.segments[0]}
          secondSegment={ticket.segments[1]}
          carrier={ticket.carrier}
        />
      );
    }
  }

  return <div className={classes['ticket-list']}>{arrayOfTicketElements}</div>;
}
