import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, COMMENT, START_LOADING, END_LOADING } from '../constants/actionTypes';
const reducer = (state = { isLoading: true, posts: [], post: null }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true }
        case END_LOADING:
            return { ...state, isLoading: false }
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }
        case FETCH_POST:
            return {
                ...state,
                post: action.payload
            } 
        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts: action.payload
            }
        case CREATE:
            return {
                ...state,
                posts: [action.payload, ...(state.posts)]
            };
            // return [...state, action.payload];
        case UPDATE:
        case LIKE:
        case COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)
            } 
            // return state.map((post) => post._id === action.payload._id ? action.payload : post); 
        case DELETE:
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== action.payload)
            }  
            // return state.filter((post) => post._id !== action.payload);  
        default:
            return state;
    }
}

export default reducer;