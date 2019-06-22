import {
    TOGGLE_LOADING_SIGN,
    SET_TOP_PICKS
  } from "./HomeScreenActionsTypes";
  
 
  const setTopPicks = userMail => async dispatch => {
    const url = 'https://boards-r-us-mm.herokuapp.com/getUserByEmail/'
    await fetch(`${url}${userMail}`)
        .then(response => {
            if (response.ok) {
            return response.json();
            } else {
            throw new Error('Something went wrong ...');
            }
        })
        .then( async data => {
            if(data.length == 0) {
             return
            }
            else {
                dispatch(setTopPicksAction(data[0]))
            }
        })   

  };
  const setTopPicksAction = data => ({
    type: SET_TOP_PICKS,
    data: { data }
  });
  
  const updateIsLoading = isLoading => ({
    type: TOGGLE_LOADING_SIGN,
    data: { isLoading }
  });
  const handleUpdateIsLoading = isLoading => async dispatch => {
    dispatch(updateIsLoading(isLoading));
  };
  
  export default {
    handleUpdateIsLoading,
    updateIsLoading,
    setTopPicksAction,
    setTopPicks
  };
  