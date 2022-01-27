import { Request, Response } from "express";
import { ListUserService } from "../../services/users/ListUserService";

export class ListUserController {
  async handle(request: Request, response: Response) {

    const service = new ListUserService();
    const users = await service.execute();

    const noId = ({password, ...rest} : any) => rest;
    const user = users.map((item) => {
      return {
        ...noId(item)
      }
    });

    return response.status(200).json(user);

  };

}