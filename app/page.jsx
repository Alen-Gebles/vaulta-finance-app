import Overview from "./components/UI/Overview/page";

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/data.json`);
  const data = await res.json();

  return (
    <main>
      <Overview data={data} />
    </main>
  );
}
