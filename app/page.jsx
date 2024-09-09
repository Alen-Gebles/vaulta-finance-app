import Home from "./path/home/page";

export default async function Main() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/data.json`);
  const data = await res.json();

  return (
    <main>
      <Home data={data} />
    </main>
  );
}
