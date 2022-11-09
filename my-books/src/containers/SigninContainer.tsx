import { useCallback } from "react";
import Signin from "../componets/Signin";

// 이 container를 Signin component로 가져가서 사용
// component에 있는 Signin 가져와서 사용 
// login함수를 만들어서 Signin component로 넣기
export default function SigninContainer() {
    const login = useCallback((reqData) => {

    },[])
    return(
        <Signin login={login} />
    )
}