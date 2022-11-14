// 책 추가하는 페이지 구현
import { Navigate } from 'react-router-dom';
import AddCotainer from '../containers/AddContainer';
import useToken from '../hooks/useToken';

function Add() {
    // 로그인이 되었는지 안되었는지 확인
    const token = useToken();
  
    if (token === null) {
      return <Navigate to="/signin" />;
    }
  
    return <AddCotainer />;
  }
  
  export default Add;