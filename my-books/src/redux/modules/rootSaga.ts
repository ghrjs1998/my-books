import { all } from "redux-saga/effects";
import { authSaga } from "./auth";
import { booksSaga } from "./books";

// all을 실행하면서 배열로 하위 saga들을 가져오기
// authSaga를 만들어서 실행하기
export default function* rootSaga() {
    yield all([authSaga(), booksSaga()]);
};