import { Request, Response } from "express";
import { ListPostService } from "../../services/posts/ListPostService";

export class ListPostController {
  async handle(request: Request, response: Response) {

    try {
      const {id} = request.params;

      const service = new ListPostService();
      const result: any = await service.execute(id);

      result.forEach((_: string, index: number) => {
        delete result[index].userId;
        delete result[index].user.password;
      });

      if(!result.length) {
        return response.status(404).json({message: 'Post não existe'});
      }

      return response.status(200).json(result);
    } catch(err) {
      return response.status(404).json({message: 'Post não existe'});
    }

  };
}