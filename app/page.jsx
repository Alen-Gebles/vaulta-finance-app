import Home from "./path/home/page";

export default async function Main() {
  try {
    const res = await fetch(`https://alen-gebles.github.io/vaulta-finance-app/data.json`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();

    return (
      <main>
        <Home data={data} />
      </main>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <main>
        <h1>Error fetching data</h1>
        <p>{error.message}</p>
      </main>
    );
  }
}
