// 로그인 화면 구현
// signin container사용
// container에서 redux를 연결한 다음
// 하위 컴포넌트로 component를 넣어서 사용
import React from 'react';
import SigninContainer from '../containers/SigninContainer';

export default function Signin() {
    return (
       <SigninContainer />
    )
}