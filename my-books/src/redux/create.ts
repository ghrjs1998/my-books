// store를 만드는 역할을 하는 파일
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import reducer from "./modules/reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./modules/rootSaga";
import TokenService from "../services/TokenService";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";

export const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
  })
// store를 만들 수 있는 create 함수
// store가 생성되기 전에 sagaMiddleware를 만들어주고 만들어진 sagaMiddleware를 applyMiddleware에 연결
// return하기 전에 sagaMiddleware.run을 통해서 인자로 rootsaga를 넣어줘야함

const create = () => {
  const token = TokenService.get();
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducer(routerReducer),
    {
      auth: {
        token,
        loading: false,
        error: null,
      },
    },
    composeWithDevTools(applyMiddleware(sagaMiddleware, routerMiddleware))
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default create;

export const history = createReduxHistory(create());