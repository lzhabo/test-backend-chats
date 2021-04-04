interface IParams {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  searchParameters?:
    | string[][]
    | Record<string, string>
    | string
    | URLSearchParams;
  data?: any;
}

export class ApiService {
  private _apiBase?: string;
  private fetch: typeof fetch;

  constructor() {
    this.fetch = window.fetch.bind(window);
  }

  init(apiBase: string) {
    this._apiBase = apiBase;
  }

  async makeApiRequest(path: string, params?: IParams): Promise<any> {
    const defaultParams = { method: "GET" };
    const { method, data, searchParameters } = { ...defaultParams, ...params };
    if (!this._apiBase) {
      throw new Error("Network Service not Initialized");
    }
    if (searchParameters != null) {
      path += "?" + new URLSearchParams(searchParameters).toString();
    }
    const url = new URL(path, this._apiBase);
    return this.fetch(url.href, {
      method: method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (response) => {
      if (response.ok) {
        return response.json();
      } else {
        const err = await response.json();
        throw new Error(err?.message ?? "Unknown error");
      }
    });
  }
}

export default new ApiService();
