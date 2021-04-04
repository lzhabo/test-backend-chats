import { IBall } from "@src/models";
import { apiService } from "./index";

type TUpdateBallParams = Omit<IBall, "id">;

export default {
  balls: (): Promise<IBall[]> => apiService.makeApiRequest(`api/v1/balls`),

  ball: (id: string): Promise<IBall> =>
    apiService.makeApiRequest(`api/v1/balls/${id}`),

  createBall: (data: TUpdateBallParams): Promise<IBall> =>
    apiService.makeApiRequest(`api/v1/balls/`, { method: "POST", data }),

  updateBall: (id: string, data: TUpdateBallParams): Promise<IBall> =>
    apiService.makeApiRequest(`api/v1/balls/${id}`, { method: "PUT", data }),

  deleteBall: (id: string): Promise<IBall> =>
    apiService.makeApiRequest(`api/v1/balls/${id}`, { method: "DELETE" }),
};
