import { Request, Response } from "express";
import { ListUserService } from "../../services/users/ListUserService";

export class ListUserController {
  async handle(request: Request, response: Response) {

    try {
      const {id} = request.params;

      const service = new ListUserService();
      const users = await service.execute(id);

      const noId = ({password, ...rest} : any) => rest;
      const user = users.map((item) => {
        return {
          ...noId(item)
        }
      });

      return response.status(200).json(user);
    } catch(err) {
      return response.status(404).json({message: 'Usuário não existe'});
    }

  };

}