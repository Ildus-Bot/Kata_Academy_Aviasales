import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  asyncGetPackOfTickets,
  asyncGetSearchId,
  changeStateNumberOfFilteredTickets,
  resetStateNumberOfTicketsShown,
} from '../../actions';
import Ticket from '../Ticket';

import classes from './TicketList.module.css';

function TicketList({
  tickets,
  searchId,
  asyncGetSearchId,
  asyncGetPackOfTickets,
  isStop,
  numberOfTicketsShown,
  selectedFiltersCheckbox,
  selectedSortButton,
  changeStateNumberOfFilteredTickets,
  resetStateNumberOfTicketsShown,
}) {
  useEffect(() => {
    if (!searchId) {
      asyncGetSearchId();
    }
  }, []);

  useEffect(() => {
    if (searchId && !isStop) {
      asyncGetPackOfTickets(searchId);
    }
  });

  useEffect(() => {
    resetStateNumberOfTicketsShown();
  }, [selectedFiltersCheckbox]);

  useEffect(() => {
    changeStateNumberOfFilteredTickets(filteredAndSortedArrayOfTickets.length);
  }, [selectedFiltersCheckbox, tickets]);

  let filteredArrayOfTickets;

  if (selectedFiltersCheckbox.all) {
    filteredArrayOfTickets = tickets;
  } else if (
    !selectedFiltersCheckbox.all &&
    !selectedFiltersCheckbox.threeTransfer &&
    !selectedFiltersCheckbox.twoTransfer &&
    !selectedFiltersCheckbox.oneTransfer &&
    !selectedFiltersCheckbox.withoutTransfer
  ) {
    filteredArrayOfTickets = [];
  } else {
    filteredArrayOfTickets = tickets.filter((ticket) => {
      const countStopsThere = ticket.segments[0].stops.length;
      const countStopsBack = ticket.segments[1].stops.length;

      if (selectedFiltersCheckbox.threeTransfer && (countStopsThere === 3 || countStopsBack === 3)) {
        return true;
      }

      if (selectedFiltersCheckbox.twoTransfer && (countStopsThere === 2 || countStopsBack === 2)) {
        return true;
      }

      if (selectedFiltersCheckbox.oneTransfer && (countStopsThere === 1 || countStopsBack === 1)) {
        return true;
      }

      if (selectedFiltersCheckbox.withoutTransfer && (countStopsThere === 0 || countStopsBack === 0)) {
        return true;
      }

      return false;
    });
  }

  let filteredAndSortedArrayOfTickets = filteredArrayOfTickets;

  if (filteredArrayOfTickets.length === 0 && tickets.length !== 0) {
    return <p className={classes['ticket-list__message']}>Рейсов, подходящих под заданные фильтры, не найдено</p>;
  }

  if (selectedSortButton === 'cheap' && isStop) {
    filteredAndSortedArrayOfTickets = filteredArrayOfTickets.sort(
      (firstTicket, secondTicket) => firstTicket.price - secondTicket.price
    );
  } else if (selectedSortButton === 'fast' && isStop) {
    filteredAndSortedArrayOfTickets = filteredArrayOfTickets.sort(
      (firstTicket, secondTicket) => firstTicket.segments[0].duration - secondTicket.segments[0].duration
    );
  } else if (selectedSortButton === 'optimal' && isStop) {
    filteredAndSortedArrayOfTickets = filteredArrayOfTickets.sort(
      (firstTicket, secondTicket) =>
        firstTicket.price +
        firstTicket.segments[0].duration * 100 -
        (secondTicket.price + secondTicket.segments[0].duration * 100)
    );
  }

  const arrayOfTicketElements = filteredAndSortedArrayOfTickets.map((ticket, index) => {
    if (index < numberOfTicketsShown) {
      return (
        <Ticket
          key={index}
          price={ticket.price}
          firstSegment={ticket.segments[0]}
          secondSegment={ticket.segments[1]}
          carrier={ticket.carrier}
        />
      );
    }
  });

  return <div className={classes['ticket-list']}>{arrayOfTicketElements}</div>;
}

const mapStateToProps = (state) => ({
  tickets: state.arrayOfTickets,
  searchId: state.searchId,
  isStop: state.isStop,
  numberOfTicketsShown: state.numberOfTicketsShown,
  selectedFiltersCheckbox: state.selectedFiltersCheckbox,
  selectedSortButton: state.selectedSortButton,
});

const mapDispatchToProps = (dispatch) => {
  return {
    asyncGetSearchId: bindActionCreators(asyncGetSearchId, dispatch),
    asyncGetPackOfTickets: bindActionCreators(asyncGetPackOfTickets, dispatch),
    changeStateNumberOfFilteredTickets: bindActionCreators(changeStateNumberOfFilteredTickets, dispatch),
    resetStateNumberOfTicketsShown: bindActionCreators(resetStateNumberOfTicketsShown, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketList);
