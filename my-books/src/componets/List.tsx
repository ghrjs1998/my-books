import { Button, PageHeader, Table } from "antd";
import { useEffect } from "react";
import { BookType } from "../types";
import Layout from "./Layout";
import Book from './Book';
import styles from './List.module.css'

interface ListProps {
    books: BookType[] | null;
    loading: boolean;
    error: Error | null;
    getBooks: () => void;
    logout: () => void;
    goAdd: () => void;
}

const List: React.FC<ListProps> = ({books, loading, getBooks, error, logout, goAdd}) => {
    // 책을 받아오는 함수실행
    useEffect(() => {
        getBooks()
    },[getBooks]);

    // 만약 데이터를 가져오다가 에러가 생기면 에러에 대한 처리하기 위해 useEffect사용
    useEffect(() => {
        if(error) {
            logout();
        }
    }, [error, logout])

    return(
        <Layout>
            <PageHeader 
                title={<div>Book List</div>} 
                extra={[
                    <Button key="2" type="primary" onClick={goAdd} className={styles.button}>Add Book</Button>,
                    <Button key="1" type="primary" onClick={logout} className={styles.button}>Logout</Button>,
                ]}
            />
            <Table dataSource={books || []} columns={[{
                title: 'Book',
                dataIndex: 'book',
                key: 'book',
                render: (text, record) => <Book {...record}/>,
                },
            ]}
            loading={books === null || loading} 
            showHeader={false}
            rowKey="bookId"
            pagination={false}
            className={styles.table}
            />
        </Layout>
    );
}

export default List;