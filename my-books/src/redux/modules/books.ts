// 홈에서 책의 목록을 보여주는 부분

import { Action, createActions, handleActions } from "redux-actions";
import { push } from "redux-first-history";
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import BooksService from "../../services/BookService";
import { BookReqType, BooksState, BookType } from "../../types";



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
export const { getBooks, addBook } = createActions('GET_BOOKS', 'ADD_BOOK', {
    prefix,
});

// booksSaga에 getBooks라는 타입을 가진 액션을 dispatch하면 실행할 saga함수
function* getBooksSaga() {
    try{
        yield put(pending());
        const token: string = yield select((state) => state.auth.token);
        const books: BookType[] = yield call(BooksService.getBooks, token);
        yield put(success(books));
    }catch(error) {
        yield put(fail(error))
    }
}

function* addBookSaga(action: Action<BookReqType>) {
    try {
        yield put(pending());
        const token: string = yield select(state => state.auth.token);
        const book: BookType = yield call(BooksService.addBook, token, action.payload);
        const books: BookType[] = yield select(state => state.books.books);
        yield put(success([...books, book]));
        yield put(push('/'))
    }catch(error){
        yield put(fail(error))
    }
}

// books 전체에 대한 saga를 모은 books 사가를 만들어 rootsaga로 합류
export function* booksSaga() {
    yield takeLatest(`${prefix}/GET_BOOKS`, getBooksSaga)
    yield takeEvery(`${prefix}/ADD_BOOK`, addBookSaga)
}