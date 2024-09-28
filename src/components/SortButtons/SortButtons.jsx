import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { changeSelectedSortButton } from '../../actions';

import classes from './SortButtons.module.scss';

export default function SortButtons() {
  const activeButton = useSelector((state) => state.selectedSortButton);
  const dispatch = useDispatch();

  return (
    <div className={classes['sort-buttons']}>
      <button
        className={`
					${classes['sort-buttons__button']} 
					${classes['button-cheap']} 
					${activeButton === 'cheap' && classes.active}
				`}
        type="button"
        onClick={() => dispatch(changeSelectedSortButton('cheap'))}
      >
        САМЫЙ ДЕШЕВЫЙ
      </button>
      <button
        className={`
					${classes['sort-buttons__button']} 
					${activeButton === 'fast' && classes.active}
				`}
        type="button"
        onClick={() => dispatch(changeSelectedSortButton('fast'))}
      >
        САМЫЙ БЫСТРЫЙ
      </button>
      <button
        className={`
					${classes['sort-buttons__button']} 
					${classes['button-optimal']} 
					${activeButton === 'optimal' && classes.active}
				`}
        type="button"
        onClick={() => dispatch(changeSelectedSortButton('optimal'))}
      >
        ОПТИМАЛЬНЫЙ
      </button>
    </div>
  );
}
