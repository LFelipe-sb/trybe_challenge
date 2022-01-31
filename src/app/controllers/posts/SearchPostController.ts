import { Request, Response } from "express";
import { SearchPostService } from "../../services/posts/SearchPostService";

export class SearchPostController {
  async handle(request: Request, response: Response) {
    const q  = request.query.q?.toString() || '';

    const service = new SearchPostService();
    const result: any = await service.execute(q);

    result.forEach((item: any) => {
      delete item.userId;
      delete item.user.password;
    });

    return response.json(result);
  }
}