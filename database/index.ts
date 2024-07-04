import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import migrations from "./migrations";
import schema from "./schema";

import Statistics from "~/models/Statistics";
import Task from "~/models/Tasks";
import UserDetail from "~/models/Userdetails";
// import Post from './model/Post' // ⬅️ You'll import your Models here

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema,
  // (You might want to comment it out for development purposes -- see Migrations documentation)
  migrations,
  // (optional database name or file system path)
  dbName: "weekly-db",
  // (recommended option, should work flawlessly out of the box on iOS. On Android,
  // additional installation steps have to be taken - disable if you run into issues...)
  jsi: false /* Platform.OS === 'ios' */,
  // (optional, but you should implement this method)
  onSetUpError: (error) => {
    console.error(error);
  },
});

// Then, make a Watermelon database from it!
const database = new Database({
  adapter,
  modelClasses: [
    Task,
    Statistics,
    UserDetail,
    // Post, // ⬅️ You'll add Models to Watermelon here
  ],
});

export default database;

export const taskCollection = database.get<Task>("tasks");
export const statisticsCollection = database.get<Statistics>("statistics");
export const userDetailCollection = database.get<UserDetail>("userdetails");
