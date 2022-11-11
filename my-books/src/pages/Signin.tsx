// 로그인 화면 구현
// signin container사용
// container에서 redux를 연결한 다음
// 하위 컴포넌트로 component를 넣어서 사용
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import SigninContainer from '../containers/SigninContainer';
import { RootState } from '../types';

export default function Signin() {
    const token = useSelector<RootState, string | null>((state) => state.auth.token);

    if(token !== null) {
        return <Navigate to="/" />
    }
    return (
       <SigninContainer />
    )
}