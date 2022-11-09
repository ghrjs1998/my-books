// 여기서 인증을 관리

import { Action } from "@remix-run/router";
import { createActions, handleActions } from "redux-actions";
import { put, takeEvery } from "redux-saga/effects";
import { LoginReqType } from "../../types";

// AuthState type작성
interface AuthState {
    token: string | null;
    loading: boolean;
    error: Error | null;
};

// 타입으로 AuthState지정
// 초깃값 지정
const initialState: AuthState = {
    token: null,
    loading: false,
    error: null
};

// 모듈에서 prefix 설정
const prefix = 'my-books/auth';

// create actions를 이용해 action생성 함수 만들기
// 첫번째로 PENDING이라는 타입 추가
// 두번째로 SUCCESS라는 타입 추가
// 세번째로 FAIL이라는 타입 추가
// 마지막 부분에 prefix를 달면 타입 앞에 prefix가 붙음
export const {pending, success, fail} = createActions(
    'PENDING', 
    'SUCCESS', 
    'FAIL', 
    {prefix}
);

// reducer 만들기
// 첫번째 인자에는 객체가 들어감
// 객체에는 위에 적힌 액션의 타입을 바탕으로 reducer로직이 만들어짐
// handleActions부분에선 error를 넣어서 Action함수를 실행하면 action.payload에 들어오는데 이 부분을 타이핑 하기 어려운 단점이 있다.
const reducer = handleActions<AuthState, string>({
    PENDING: (state) => ({
        ...state,
        loading: true,
        error: null,
    }),
    // 성공한 경우, 토큰을 받아서 토큰을 넣어야 하기때문에 state,action을 받음
    SUCCESS: (state, action) => ({
        token: action.payload,
        loading: false,
        error: null,
    }),
    FAIL: (state, action: any) => ({
        ...state,
        loading: true,
        error: action.payload,
    }),
}, initialState, {prefix});

export default reducer

// createActions함수 만들기
export const {login, logout} = createActions('LOGIN', 'LOGOUT', {prefix})

// login이라는 action이 dispatch되면 loginSaga가 진행되도록 처리
function* loginSaga(action: Action<LoginReqType>) {
    try {
        yield put(pending())
    }catch () {

    }
}

// logout이라는 action이 dispatch되면 logoutSaga가 진행되도록 처리
function* logoutSaga() {

}
// authSaga만들기
export function* authSaga() {
    // yield로 takeEvery라고 하는 이펙트를 실행하고 그 안에다 앞에는 액션타입, 뒤에는 사가함수 지정
    yield takeEvery(`${prefix}/LOGIN`, loginSaga)
    yield takeEvery(`${prefix}/LOGOUT`, logoutSaga)
}