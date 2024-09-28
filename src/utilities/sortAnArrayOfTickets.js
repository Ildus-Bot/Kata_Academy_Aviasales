export default function sortAnArrayOfTickets(arrayOfTickets, selectedSortButton) {
  let sortedArrayOfTickets;

  if (selectedSortButton === 'cheap') {
    sortedArrayOfTickets = arrayOfTickets.sort((firstTicket, secondTicket) => firstTicket.price - secondTicket.price);
  } else if (selectedSortButton === 'fast') {
    sortedArrayOfTickets = arrayOfTickets.sort(
      (firstTicket, secondTicket) => firstTicket.segments[0].duration - secondTicket.segments[0].duration
    );
  } else if (selectedSortButton === 'optimal') {
    sortedArrayOfTickets = arrayOfTickets.sort(
      (firstTicket, secondTicket) =>
        firstTicket.price +
        firstTicket.segments[0].duration * 100 -
        (secondTicket.price + secondTicket.segments[0].duration * 100)
    );
  }

  return sortedArrayOfTickets;
}
