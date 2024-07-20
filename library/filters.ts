const url = "http://localhost:3000/filters/all";

export async function getFilters() {
  const options = { method: "GET" };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.filters;
  } catch (error) {
    console.error(error);
  }
}
