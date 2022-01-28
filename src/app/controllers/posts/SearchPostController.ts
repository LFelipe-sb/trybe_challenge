import { Request, Response } from "express";
import { SearchPostService } from "../../services/posts/SearchPostService";

export class SearchPostController {
  async handle(request: Request, response: Response) {
    const q  = request.query.q?.toString() || '';

    const service = new SearchPostService();
    const result = await service.execute(q);

    return response.json(result);
  }
}