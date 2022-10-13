import { RouterContext } from "../deps.ts";
import Survey from "../models/Survey.ts";
import User from "../models/User.ts";

export default class BaseSurveyController {
  async findSurveyOrFail(
    id: string,
    ctx: RouterContext
  ): Promise<Survey | null> {
    const survey: Survey | null = await Survey.findOne(id);

    if (!survey) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Invalid Survey ID" };
      return null;
    }
    const user = ctx.state.user as User;
    if (survey.userId !== user.id) {
      ctx.response.status = 403;
      ctx.response.body = {
        message: "You don't have permission to view this survey",
      };
      return null;
    }
    return survey;
  }
}
