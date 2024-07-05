// Copyright (c) 2024 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

// Why is this built automatically??

interface Fetcher {
  fetch: typeof fetch
}

interface Env {
  target: Fetcher
}

class KV {
  public async get(key: K) {
    const url = `https://fake-host/${encodeURIComponent(key)}?urlencoded=true`;
    const response = await this.env.target.fetch(url, {
      method: "GET",
      headers: {
        "CF-KV-FLPROD-405": url,
        "cf-kv-account-id": "", // this.env.
      }
    });
    return response.text();
  }
}

export function wrapBindings(env: Env): KV {
  return new KV(env);
}
