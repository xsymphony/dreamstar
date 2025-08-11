import Papa from 'papaparse';

function unique(arr) {
  const seen = new Set();
  return arr.filter(r => {
    if (!r.role) return false;
    if (seen.has(r.role)) return false;
    seen.add(r.role);
    return true;
  });
}

export async function getRoles() {
  const response = await fetch(process.env.PUBLIC_URL + '/roles.csv');
  const text = await response.text();
  const rows = unique(Papa.parse(text, { header: true, skipEmptyLines: true }).data);
  const BAD = rows.filter(r => r.camp && r.camp.trim() === 'BAD').map(r => r.role);
  const GOOD = rows.filter(r => r.camp && r.camp.trim() === 'GOOD').map(r => r.role);
  const NEUTRAL = rows.filter(r => r.camp && r.camp.trim() === 'NEUTRAL').map(r => r.role);
  return { BAD, GOOD, NEUTRAL };
}
