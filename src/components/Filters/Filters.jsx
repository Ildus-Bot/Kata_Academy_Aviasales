import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { changeFilterCheckboxes } from '../../actions';

import classes from './Filters.module.scss';

function Filters({ selectedFiltersCheckbox, changeFilterCheckboxes }) {
  return (
    <div className={classes.filters}>
      <p className={classes.filters__header}>КОЛИЧЕСТВО ПЕРЕСАДОК</p>
      <div className={classes.container}>
        <div>
          <label className={classes.filters__checkbox}>
            <input
              type="checkbox"
              checked={selectedFiltersCheckbox.all}
              onChange={() => changeFilterCheckboxes('all')}
              name="transfer"
            />
            <p>Все</p>
          </label>
        </div>
        <div>
          <label className={classes.filters__checkbox}>
            <input
              type="checkbox"
              checked={selectedFiltersCheckbox.withoutTransfer}
              onChange={() => changeFilterCheckboxes('withoutTransfer')}
              name="transfer"
            />
            <p>Без пересадок</p>
          </label>
        </div>
        <div>
          <label className={classes.filters__checkbox}>
            <input
              type="checkbox"
              checked={selectedFiltersCheckbox.oneTransfer}
              onChange={() => changeFilterCheckboxes('oneTransfer')}
              name="transfer"
            />
            <p>1 пересадка</p>
          </label>
        </div>
        <div>
          <label className={classes.filters__checkbox}>
            <input
              type="checkbox"
              checked={selectedFiltersCheckbox.twoTransfer}
              onChange={() => changeFilterCheckboxes('twoTransfer')}
              name="transfer"
            />
            <p>2 пересадки</p>
          </label>
        </div>
        <div>
          <label className={classes.filters__checkbox}>
            <input
              type="checkbox"
              checked={selectedFiltersCheckbox.threeTransfer}
              onChange={() => changeFilterCheckboxes('threeTransfer')}
              name="transfer"
            />
            <p>3 пересадки</p>
          </label>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({ selectedFiltersCheckbox: state.selectedFiltersCheckbox });

const mapDispatchToProps = (dispatch) => ({
  changeFilterCheckboxes: bindActionCreators(changeFilterCheckboxes, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
