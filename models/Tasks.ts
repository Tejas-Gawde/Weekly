import { Model } from "@nozbe/watermelondb";
import { text } from "@nozbe/watermelondb/decorators";

export default class Task extends Model {
  static table = "tasks";

  @text("title") title!: string;
  @text("description") description!: string;
  @text("priority") priority!: string;
  @text("iso") iso!: string;
  @text("day") day!: string;
}
