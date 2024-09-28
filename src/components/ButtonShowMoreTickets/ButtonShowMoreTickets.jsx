import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addToStateNumberOfTicketsShown } from '../../actions';

import classes from './ButtonShowMoreTickets.module.scss';

export default function ButtonShowMoreTickets() {
  const numberOfTicketsShown = useSelector((state) => state.numberOfTicketsShown);
  const numberOfFilteredTickets = useSelector((state) => state.numberOfFilteredTickets);

  const dispatch = useDispatch();

  if (numberOfFilteredTickets === 0) {
    return;
  }

  const numberOfTicketsNotShown = numberOfFilteredTickets - numberOfTicketsShown;

  if (numberOfTicketsShown >= numberOfFilteredTickets) {
    return;
  }

  const numberOfTicketsForRender = numberOfTicketsNotShown >= 5 ? 5 : numberOfTicketsNotShown;

  return (
    <button
      type="button"
      className={classes['button-show-more']}
      onClick={() => dispatch(addToStateNumberOfTicketsShown(numberOfTicketsForRender))}
    >
      {`ПОКАЗАТЬ ЕЩЕ ${numberOfTicketsForRender} БИЛЕТОВ!`}
    </button>
  );
}
