import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class UserDetail extends Model {
  static table = "userdetails";

  @field("nickname") nickname!: string;
}
