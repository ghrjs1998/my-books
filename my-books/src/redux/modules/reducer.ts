// 여러개의 reducer모듈을 하나로 합칠 수 있는 루트 reducer

import { combineReducers } from "redux";
import auth from "./auth";
import books from './books'

// auth에 auth라고하는 하위 reducer를 설정
const reducer = (routerReducer: any) => 
    combineReducers({
        auth,
        books,
        router: routerReducer,
    });

export default reducer;