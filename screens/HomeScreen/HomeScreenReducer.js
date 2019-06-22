import { CHANGE_VIEW_STYLE, SEARCH_CONFIRM , TOGGLE_LOADING_SIGN , SET_TOP_PICKS } from './HomeScreenActionsTypes'

const initialState = {
    style: 'Grid',
    picsList: [],
    isLoading: true,
    topPicks: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_CONFIRM:
            return {
                ...state,
                picsList: action.data.picList
            }
        case CHANGE_VIEW_STYLE:
            return {
                ...state,
                style: action.data.style
            } 
        case TOGGLE_LOADING_SIGN:
        return {
            ...state,
            isLoading: action.data.isLoading
        } 
        case SET_TOP_PICKS:
        return {
            ...state,
            isLoading: action.data.topPicks
        }     
        default:
            return state
    }
}