import { IBasket } from "@src/models";
import { apiService } from "./index";

type TUpdateBasketParams = Omit<IBasket, "id">;

export default {
  baskets: (): Promise<IBasket[]> =>
    apiService.makeApiRequest(`api/v1/baskets`),

  basket: (id: string): Promise<IBasket> =>
    apiService.makeApiRequest(`api/v1/baskets/${id}`),

  createBasket: (data: TUpdateBasketParams): Promise<IBasket> =>
    apiService.makeApiRequest(`api/v1/baskets/`, { method: "POST", data }),

  updateBasket: (id: string, data: TUpdateBasketParams): Promise<IBasket> =>
    apiService.makeApiRequest(`api/v1/baskets/${id}`, { method: "PUT", data }),

  deleteBasket: (id: number): Promise<IBasket> =>
    apiService.makeApiRequest(`api/v1/baskets/${id}`, { method: "DELETE" }),
};
