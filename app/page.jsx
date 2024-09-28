import Home from "./path/home/page";

export default async function Main() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  console.log("Base URL:", baseUrl); // Log base URL
  const res = await fetch(`${baseUrl}/data.json`);
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  return (
    <main>
      <Home data={data} />
    </main>
  );
}
