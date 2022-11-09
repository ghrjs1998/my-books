import { click } from "@testing-library/user-event/dist/click";
import { Row, Col, Input, Button } from "antd";
import { useRef } from "react";
import { LoginReqType } from "../types";
import styles from './Signin.module.css'

// 로그인을 요청하기 위해 container에서 로그인이라고 하는 props로 함수를 찔러넣고 이 component에서 로그인 함수를 호출하기
// 로그인함수를 프롭스로 넣어주기 전에 정의하기

interface SigninProps {
    login: (reqData: LoginReqType) => void;
}

// ant design에 있는 row colum을 사용해 greed설정
const Signin: React.FC<SigninProps> = ({ login }) => {
    // 작업한 UI uncontrolled component로 Input 2개를 reference삼고 그 reference에서 값을 꺼낸 다음 SIGN IN 버튼을 클릭하면 login API를 칠 수 있도록 작업
    const emailRef = useRef(null); // 제너릭으로 antd의 Input 컴포넌트를 넣음
  const passwordRef = useRef(null); // useRef로 DOM 직접 선택

    return (
        <Row align="middle" className={styles.signin_row}>
            <Col span={24}>
                <Row className={styles.signin_contents}>
                    <Col span={12}>
                        <img
                            src="/bg_signin.png" 
                            alt="Signin" 
                            className={styles.signin_bg}
                        />
                    </Col>
                    <Col span={12}>
                        <div className={styles.signin_title}>My Books</div>
                        <div className={styles.signin_subtitle}>Please Note Your Opinion</div>
                        <div className={styles.signin_underline} />
                        <div className={styles.email_title}>Email
                            <span className={styles.required}> *</span>
                        </div>
                        <div className={styles.input_area}>
                            <Input
                                placeholder="Email"
                                autoComplete="email"
                                name="email" 
                                className={styles.input}
                                ref={emailRef}
                            />
                        </div>
                        <div className={styles.password_title}>Password
                            <span className={styles.required}> *</span>
                        </div>
                        <div className={styles.input_area}>
                            <Input
                                type="password"
                                autoComplete="current-password"
                                className={styles.input}
                                ref={passwordRef}
                            />
                        </div>
                        <div className={styles.button_area}>
                            <Button size="large" className={styles.button}
                            onClick={click}>
                                Sign In
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
    // click함수 만들기
    // 여기선 email, password의 reference의 값을 실제로 꺼내옴
    function click() {
        const email = emailRef.current!; // emailRef.current 까지 하면 null 혹은 Input이 나옴 Non-null assertion을 사용해서 null일 가능성을 없애줌. 타입이 Input으로 고정됨
        const password = passwordRef.current!;

        login({email, password})
    }
}

export default Signin