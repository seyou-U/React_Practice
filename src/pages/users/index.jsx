import { useEffect, useState } from "react";
import {UserList} from "./components/UserList";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 指定するURLに対しHTTPリクエストを送る
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => {
                // HTTPエラーを考慮する
                if(!response.ok) {
                    throw new Error('通信に失敗しました');
                }
                return response.json();
            })
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => {
                setError(error.message);
            })
    }, []);

    if (error) {
        return <p>エラー : {error}</p>
    }

    return <UserList users={users} />
}
