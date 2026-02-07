import { useParams } from 'react-router-dom';

export default function UserDetail() {
  const { userId } = useParams();
  return (
    <div>
      <h1>User Detail</h1>
      <p>ID: {userId}</p>
    </div>
  );
}
