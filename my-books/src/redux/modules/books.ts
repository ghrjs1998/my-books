// 홈에서 책의 목록을 보여주는 부분

import { createActions, handleActions } from "redux-actions";
import { BooksState, BookType } from "../../types";



// BooksState를 따르는 InitialState를 설정
const initialState: BooksState = {
    books: null,
    loading: false,
    error: null,
};

// module에 prefix 설정
const prefix = "my-books/books";

export const {pending, success, fail} = createActions('PENDING', 'SUCCESS', 'FAIL', {prefix});

const reducer = handleActions<BooksState, BookType[]>({
    // pending에 맞는 reducer로직 설정
    PENDING: (state) => ({...state, loading: true, error: null}),
    SUCCESS: (state, action) => ({books: action.payload, loading: false,
    error: null,}),
    FAIL: (state, action:any) => ({
        ...state,
        loading: false,
        error: action.payload,
    })
}, initialState, {prefix})

export default reducer;

// saga에 대한 정의

// 책 가져오는 API를 실행하는 saga함수를 만들고 dispatch하기
export const { getBooks } = createActions('GET_BOOKS', {
    prefix,
})

// books 전체에 대한 saga를 모은 books 사가를 만들어 rootsaga로 합류
export function* booksSaga() {

}