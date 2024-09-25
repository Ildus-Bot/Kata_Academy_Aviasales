const reducer = (state, action) => {
  if (state === undefined) {
    const initialState = {
      selectedSortButton: '',
      selectedFiltersCheckbox: {
        all: true,
        withoutTransfer: true,
        oneTransfer: true,
        twoTransfer: true,
        threeTransfer: true,
      },
      searchId: null,
      arrayOfTickets: [],
      isStop: false,
      numberOfTicketsShown: 5,
      numberOfFilteredTickets: 0,
    };

    return initialState;
  }
  /* eslint indent: off, no-case-declarations: off */
  switch (action.type) {
    case 'changeSelectedSortButton':
      return { ...state, selectedSortButton: action.buttonName };

    case 'changeFilterCheckboxes':
      const filters = changeFilterCheckboxes(state.selectedFiltersCheckbox, action.checkboxName);
      return {
        ...state,
        selectedFiltersCheckbox: filters,
      };

    case 'changeStateSearchId':
      return { ...state, searchId: action.searchId };

    case 'changeStateArrayOfTickets':
      return {
        ...state,
        arrayOfTickets: [...state.arrayOfTickets, ...action.arrayOfTickets],
      };

    case 'changeStateStop':
      return {
        ...state,
        isStop: action.isStop,
      };

    case 'addToStateNumberOfTicketsShown':
      return {
        ...state,
        numberOfTicketsShown: state.numberOfTicketsShown + action.number,
      };

    case 'resetStateNumberOfTicketsShown':
      return {
        ...state,
        numberOfTicketsShown: 5,
      };

    case 'changeStateNumberOfFilteredTickets':
      return {
        ...state,
        numberOfFilteredTickets: action.number,
      };

    default:
      return state;
  }
};

function changeFilterCheckboxes(filters, checkboxName) {
  const filtersSelectedAll = {
    all: true,
    withoutTransfer: true,
    oneTransfer: true,
    twoTransfer: true,
    threeTransfer: true,
  };

  const selectedChecbox = {
    ...filters,
    [checkboxName]: !filters[checkboxName],
  };

  const { all, withoutTransfer, oneTransfer, twoTransfer, threeTransfer } = selectedChecbox;

  if (checkboxName === 'all' && all === true) {
    return filtersSelectedAll;
  } else if (checkboxName === 'all') {
    return {
      all: false,
      withoutTransfer: false,
      oneTransfer: false,
      twoTransfer: false,
      threeTransfer: false,
    };
  }

  if (withoutTransfer && oneTransfer && twoTransfer && threeTransfer) {
    return filtersSelectedAll;
  }

  if (all && (!withoutTransfer || !oneTransfer || !twoTransfer || !threeTransfer)) {
    return {
      ...selectedChecbox,
      all: false,
    };
  }

  return selectedChecbox;
}

export default reducer;
