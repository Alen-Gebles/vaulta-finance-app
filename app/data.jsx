// data.js
export default async function getData() {
  const res = await fetch('https://alen-gebles.github.io/vaulta-finance-app/data.json'); // Fetch from the public directory
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  return data;
}
