import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeSelectedSortButton } from '../../actions';

import classes from './SortButtons.module.scss';

function SortButtons({ activeButton, changeSelectedSortButton, isStop }) {
  if (!isStop) {
    return <div className={classes['animated-block']}></div>;
  }

  return (
    <div className={classes['sort-buttons']}>
      <button
        className={`
					${classes['sort-buttons__button']} 
					${classes['button-cheap']} 
					${activeButton === 'cheap' && classes.active}
				`}
        type="button"
        onClick={() => changeSelectedSortButton('cheap')}
      >
        САМЫЙ ДЕШЕВЫЙ
      </button>
      <button
        className={`
					${classes['sort-buttons__button']} 
					${activeButton === 'fast' && classes.active}
				`}
        type="button"
        onClick={() => changeSelectedSortButton('fast')}
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
        onClick={() => changeSelectedSortButton('optimal')}
      >
        ОПТИМАЛЬНЫЙ
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({ activeButton: state.selectedSortButton, isStop: state.isStop });

const mapDispatchToProps = (dispatch) => ({
  changeSelectedSortButton: bindActionCreators(changeSelectedSortButton, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SortButtons);
