import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addToStateNumberOfTicketsShown } from '../../actions';

import classes from './ButtonShowMoreTickets.module.scss';

function ButtonShowMoreTickets({ numberOfTicketsShown, addToStateNumberOfTicketsShown, numberOfFilteredTickets }) {
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
      onClick={() => addToStateNumberOfTicketsShown(numberOfTicketsForRender)}
    >
      {`ПОКАЗАТЬ ЕЩЕ ${numberOfTicketsForRender} БИЛЕТОВ!`}
    </button>
  );
}

const mapStateToProps = (state) => ({
  numberOfTicketsShown: state.numberOfTicketsShown,
  numberOfFilteredTickets: state.numberOfFilteredTickets,
});

const mapDispatchToProps = (dispatch) => ({
  addToStateNumberOfTicketsShown: bindActionCreators(addToStateNumberOfTicketsShown, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonShowMoreTickets);
