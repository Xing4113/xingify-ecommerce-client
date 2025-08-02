export const searchAddress = async (value) => {
  const url = `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${encodeURIComponent(
    value.trim()
  )}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch address data");
  }

  const data = await res.json();
  return data;
};
