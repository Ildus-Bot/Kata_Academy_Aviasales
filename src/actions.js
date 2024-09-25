export const changeSelectedSortButton = (buttonName) => ({ type: 'changeSelectedSortButton', buttonName });

export const changeFilterCheckboxes = (checkboxName) => ({ type: 'changeFilterCheckboxes', checkboxName });

const changeStateArrayOfTickets = (tickets) => ({ type: 'changeStateArrayOfTickets', arrayOfTickets: tickets });

const changeStateSearchId = (searchId) => ({ type: 'changeStateSearchId', searchId });

export const addToStateNumberOfTicketsShown = (number) => ({ type: 'addToStateNumberOfTicketsShown', number });

export const resetStateNumberOfTicketsShown = () => ({ type: 'resetStateNumberOfTicketsShown' });

export const changeStateNumberOfFilteredTickets = (number) => ({ type: 'changeStateNumberOfFilteredTickets', number });

export const asyncGetSearchId = () => {
  return (dispatch) => {
    fetch('https://aviasales-test-api.kata.academy/search')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Something went wrong.');
        }

        return res.json();
      })
      .then((body) => {
        dispatch(changeStateSearchId(body.searchId));
      });
  };
};

export const asyncGetPackOfTickets = (searchId) => {
  return (dispatch) => {
    fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Something went wrong.');
        }

        return res.json();
      })
      .then((body) => {
        if (body.stop) {
          dispatch({ type: 'changeStateStop', isStop: true });
        }
        dispatch(changeStateArrayOfTickets(body.tickets));
      })
      .catch(() => {
        dispatch(changeStateArrayOfTickets([]));
      });
  };
};
