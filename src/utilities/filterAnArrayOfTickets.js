export default function filterAnArrayOfTickets(
  arrayOfTickets,
  { all, threeTransfer, twoTransfer, oneTransfer, withoutTransfer }
) {
  let filteredArrayOfTickets;

  if (all) {
    filteredArrayOfTickets = arrayOfTickets;
  } else if (!all && !threeTransfer && !twoTransfer && !oneTransfer && !withoutTransfer) {
    filteredArrayOfTickets = [];
  } else {
    filteredArrayOfTickets = arrayOfTickets.filter((ticket) => {
      const countStopsThere = ticket.segments[0].stops.length;
      const countStopsBack = ticket.segments[1].stops.length;

      if (threeTransfer && (countStopsThere === 3 || countStopsBack === 3)) {
        return true;
      }

      if (twoTransfer && (countStopsThere === 2 || countStopsBack === 2)) {
        return true;
      }

      if (oneTransfer && (countStopsThere === 1 || countStopsBack === 1)) {
        return true;
      }

      if (withoutTransfer && (countStopsThere === 0 || countStopsBack === 0)) {
        return true;
      }

      return false;
    });
  }

  return filteredArrayOfTickets;
}
