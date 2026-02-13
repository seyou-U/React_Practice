import { Link, useLoaderData } from 'react-router-dom';

export async function loader() {
  // 実際はfetchを用いてユーザーを取得するAPIを呼び出す
  return [
    { id: '1', name: 'Taro' },
    { id: '2', name: 'Hanako' },
  ];
}

export default function Users() {
  const users = useLoaderData();

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
