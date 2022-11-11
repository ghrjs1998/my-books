// 홈화면 구현
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import ListContainer from '../containers/ListContainer';

import { RootState } from '../types';

export default function Home() {


    const token = useSelector<RootState, string | null>((state) => state.auth.token);

    if(token === null) {
        return <Navigate to="/signin" />
    }
    return (
        <ListContainer />
    )
    
}