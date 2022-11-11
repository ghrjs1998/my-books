import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import List from "../componets/List"
import { RootState, BookType } from "../types";


export default function ListContainer() {
    const books = useSelector<RootState, BookType[] | null>(
        (state) => state.books.books
      );
      const loading = useSelector<RootState, boolean>(
        (state) => state.books.loading
      );

      const dispatch = useDispatch();

      const getBooks = useCallback(() => {
        dispatch();
      },[dispatch])
    
    return <List books={books} loading={loading} getBooks={getBooks} />
}