export const changeSelectedSortButton = (buttonName) => ({ type: 'changeSelectedSortButton', buttonName });

export const changeFilterCheckboxes = (checkboxName) => ({ type: 'changeFilterCheckboxes', checkboxName });

const changeStateArrayOfTickets = (tickets) => ({ type: 'changeStateArrayOfTickets', arrayOfTickets: tickets });

const changeStateSearchId = (searchId) => ({ type: 'changeStateSearchId', searchId });

export const addToStateNumberOfTicketsShown = (number) => ({ type: 'addToStateNumberOfTicketsShown', number });

export const resetStateNumberOfTicketsShown = () => ({ type: 'resetStateNumberOfTicketsShown' });

export const changeStateNumberOfFilteredTickets = (number) => ({ type: 'changeStateNumberOfFilteredTickets', number });

const changeStateErrorMessage = (errorMessage) => ({ type: 'changeStateErrorMessage', errorMessage });

const apiBase = 'https://aviasales-test-api.kata.academy';

export const asyncGetSearchId = () => {
  return (dispatch) => {
    fetch(`${apiBase}/search`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Что-то пошло не так');
        }

        return res.json();
      })
      .then((body) => {
        dispatch(changeStateSearchId(body.searchId));
      })
      .catch((err) => {
        dispatch(changeStateErrorMessage(err.message));
      });
  };
};

export const asyncGetAllPackOfTickets = (searchId) => {
  return async (dispatch) => {
    let isStop = false;

    while (!isStop) {
      try {
        const res = await asyncGetPackOfTickets(searchId);

        if (!res.ok && res.status < 500) {
          dispatch(changeStateErrorMessage('Что-то пошло не так'));
          break;
        } else if (res.status >= 500) {
          throw new Error();
        }

        const body = await res.json();

        dispatch(changeStateArrayOfTickets(body.tickets));

        if (body.stop) {
          isStop = true;
        }
      } catch {
        dispatch(changeStateArrayOfTickets([]));
      }
    }
  };
};

const asyncGetPackOfTickets = async (searchId) => {
  return await fetch(`${apiBase}/tickets?searchId=${searchId}`);
};
