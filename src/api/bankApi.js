const BASE_URL = "https://data.gov.il/api/3/action/datastore_search";

const RESOURCE_ID = "1c5bc716-8210-4ec7-85be-92e6271955c2";

export async function fetchBranchesByCity() {
  const response = await fetch(`${BASE_URL}?resource_id=${RESOURCE_ID}`);
  const data = await response.json();
  return data.result.records;
}

