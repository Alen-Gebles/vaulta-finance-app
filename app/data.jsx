// data.js
export default async function getData() {
  const res = await fetch('/data.json'); // Fetch from the public directory
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  return data;
}
