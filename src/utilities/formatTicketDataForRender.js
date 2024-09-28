import { parseISO } from 'date-fns';

export default function formatTicketDataForRender(segment) {
  const departureDateInNewFormatDate = parseISO(segment.date);

  let departureHours = departureDateInNewFormatDate.getHours();
  let departureMinutes = departureDateInNewFormatDate.getMinutes();

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

  const flightDurationHours = Math.trunc(segment.duration / 60);
  let flightDurationHoursForRender = flightDurationHours;
  let flightDurationDay;

  if (flightDurationHours >= 24) {
    flightDurationDay = Math.trunc(flightDurationHours / 24);
    flightDurationHoursForRender = flightDurationHours / 24;
  }

  const flightDurationMinutes = segment.duration % 60;
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

  const stops = segment.stops;
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

  return {
    departureDateForRender,
    flightDuration,
    arrivalDate,
    textAboutNumberOfTransfers,
    stopsCities,
  };
}
