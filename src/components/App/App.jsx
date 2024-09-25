import React from 'react';

import logo from '../../assets/images/logo.svg';
import Filters from '../Filters';
import SortButtons from '../SortButtons';
import TicketList from '../TicketList';
import ButtonShowMoreTickets from '../ButtonShowMoreTickets';

import classes from './App.module.scss';

export default function App() {
  return (
    <div className={classes.wrapper}>
      <img className={classes.logo} src={logo} alt="" />
      <div className={classes.main}>
        <Filters />
        <div className={classes.column}>
          <SortButtons />
          <TicketList />
          <ButtonShowMoreTickets />
        </div>
      </div>
    </div>
  );
}
