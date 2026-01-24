export function TodoList({ todos }) {
    if(todos.length === 0) {
        return <p>やることはありません</p>
    }

    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>{todo.title}</li>
            ))}
        </ul>
    )
}
