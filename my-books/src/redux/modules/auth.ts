// 여기서 인증을 관리

import { push } from "connected-react-router";
import { Action } from "redux-actions";
import { createActions, handleActions } from "redux-actions";
import { call, put, select, takeEvery } from "redux-saga/effects";
import TokenService from "../../services/TokenService";
import UserService from "../../services/UserService";
import { AuthState, LoginReqType } from "../../types";



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
        loading: false,
        error: action.payload,
    }),
}, initialState, {prefix});

export default reducer

// createActions함수 만들기
export const {login, logout} = createActions('LOGIN', 'LOGOUT', {prefix})

// login이라는 action이 dispatch되면 loginSaga가 진행되도록 처리
function* loginSaga(action: Action<LoginReqType>) {
    try {
        yield put(pending());
        const token: string = yield call(UserService.login, action.payload);
        TokenService.set(token);
        // 받아온 토큰을 localstorage에 넣고
        // 동시에 redux에 state로도 세팅
        yield put(success(token))
        yield put(push("/"))
        // login이 정상적으로 되면, signin page에서 list페이지로 이동 -> push처리
    }catch (error) {
        yield put(fail(error)); // new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')
    }
}

// logout이라는 action이 dispatch되면 logoutSaga가 진행되도록 처리
function* logoutSaga() {
    try {
        yield put(pending());
        const token: string = yield select(state => state.auth.token)
        yield call(UserService.logout, token);
        TokenService.set(token);
    }catch (error) {
    }finally {
        TokenService.remove();
        yield put(success(null))
    }
}
// authSaga만들기
export function* authSaga() {
    // yield로 takeEvery라고 하는 이펙트를 실행하고 그 안에다 앞에는 액션타입, 뒤에는 사가함수 지정
    yield takeEvery(`${prefix}/LOGIN`, loginSaga)
    yield takeEvery(`${prefix}/LOGOUT`, logoutSaga)
}