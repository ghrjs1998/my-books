import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {HistoryRouter} from "redux-first-history/rr6"
import {  Route, Routes } from 'react-router-dom'
import Add from './pages/Add';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Signin from './pages/Signin';
import Error from './pages/Error';
import {history} from './redux/create'
function App() {
  return (
    // 홈화면, 로그인 화면, 책을 추가하는 페이지, 상세보기 페이지, 에디트를하는 페이지 라우팅 설정
    // 만든 페이지가 아니라면 페이지를 찾을 수 없습니다라는 페이지 라우팅 설정
    // ErrorBoundary -> ComponentDidCath를 이용해 에러페이지가 발생되면 에러페이지로 fallback시켜줌
    <ErrorBoundary FallbackComponent={Error}>
    <HistoryRouter history={history} >
      <Routes>
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/book/:id" element={<Detail />} />
        <Route path="/add" element={<Add />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element = {<NotFound />} /* v6이후 404페이지를 만들땐 *로 경로를 만들어주면 React Router는 다른경로가 일치하지 않는 경우에만 렌더링한다 */ /> 
      </Routes>
    </HistoryRouter>
    </ErrorBoundary>
  )
}

export default App;
