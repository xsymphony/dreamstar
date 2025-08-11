import Papa from 'papaparse';

export async function getRoles() {
  const response = await fetch(process.env.PUBLIC_URL + '/roles.csv');
  const text = await response.text();
  const { data } = Papa.parse(text, { header: true, skipEmptyLines: true });
  const BAD = data.filter(r => r.camp && r.camp.trim() === 'BAD').map(r => r.role);
  const GOOD = data.filter(r => r.camp && r.camp.trim() === 'GOOD').map(r => r.role);
  const NEUTRAL = data.filter(r => r.camp && r.camp.trim() === 'NEUTRAL').map(r => r.role);
  return { BAD, GOOD, NEUTRAL };
}
