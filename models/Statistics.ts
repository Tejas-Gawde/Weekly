import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class Statistics extends Model {
  static table = "statistics";

  @field("tasksCompleted") tasksCompleted!: number;
  @field("tasksMissed") tasksMissed!: number;
  @field("tasksTotal") tasksTotal!: number;
}
