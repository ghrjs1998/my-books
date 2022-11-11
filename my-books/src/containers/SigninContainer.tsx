import { useCallback } from "react";
import { useDispatch } from "react-redux";
import Signin from "../componets/Signin";
import { login as loginSagaStart} from "../redux/modules/auth"

// 이 container를 Signin component로 가져가서 사용
// component에 있는 Signin 가져와서 사용 
// login함수를 만들어서 Signin component로 넣기
export default function SigninContainer() {
    const dispatch = useDispatch();
    const login = useCallback((reqData: any) => {
        dispatch(loginSagaStart(reqData))
    },[dispatch])
    return(
        <Signin login={login} />
    )
}