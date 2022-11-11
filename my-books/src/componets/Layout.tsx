import { ReactNode } from "react";
import styles from './Layout.module.css'

interface Props {
    children: ReactNode;
}


// Layout component를 만들어 공통부분을 빼놓기
const Layout: React.FC<Props> = ({children}) => (<div className={styles.Layout}>{children}</div>)

export default Layout