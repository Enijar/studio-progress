import { resolve } from "path";
import { config } from "dotenv";
import fetch from "node-fetch";

config({ path: resolve(__dirname, "..", "..", ".env") });

const { AUTH_TOKEN } = process.env;

async function fetchData(
  { method = "GET", endpoint, limit = Infinity, body = undefined },
  data = [],
  calls = 1
) {
  const { values = [], next } = await fetch(endpoint, {
    method,
    headers: { Authorization: `Basic ${AUTH_TOKEN}` },
    body,
  }).then((res) => res.json());
  if (next && values.length > 0 && calls < limit) {
    return await fetchData(
      { method, endpoint: next, body, limit },
      data.concat(values),
      calls + 1
    );
  }
  return data;
}

export default {
  async get(endpoint, limit = Infinity) {
    return fetchData({ endpoint, limit });
  },
};
