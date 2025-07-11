export async function loader() {
    return new Response("Gone", {
        status: 410,
        headers: {
            "Content-Type": "text/plain",
        },
    });
}

export default function GonePage() {
    return (
        <main>
            <h1>410 Gone</h1>
            <p>This page has been permanently removed (or never existed).</p>
        </main>
    );
}
