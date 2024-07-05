import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import migrations from "./migrations";
import schema from "./schema";

import Statistics from "~/models/Statistics";
import Task from "~/models/Tasks";
import UserDetail from "~/models/Userdetails";

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: "weekly-db",
  jsi: false,
  onSetUpError: (error) => {
    throw error;
  },
});

const database = new Database({
  adapter,
  modelClasses: [Task, Statistics, UserDetail],
});

export default database;

export const taskCollection = database.get<Task>("tasks");
export const statisticsCollection = database.get<Statistics>("statistics");
export const userDetailCollection = database.get<UserDetail>("userdetails");
