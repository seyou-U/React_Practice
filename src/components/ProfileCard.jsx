export function ProfileCard({ name, job}) {
    return (
        <section style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
            <h2>{name}</h2>
            <p>職種：{job}</p>
        </section>
    );
}
