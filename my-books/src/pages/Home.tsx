// 홈화면 구현
import { Navigate } from 'react-router-dom';
import ListContainer from '../containers/ListContainer';
import useToken from '../hooks/useToken';


export default function Home() {

    const token = useToken();

    if(token === null) {
        return <Navigate to="/signin" />
    }
    return (
        <ListContainer />
    )
    
}