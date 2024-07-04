import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "tasks",
      columns: [
        { name: "title", type: "string" },
        { name: "description", type: "string" },
        { name: "priority", type: "string" },
        { name: "day", type: "string" },
        { name: "iso", type: "string" },
      ],
    }),
    tableSchema({
      name: "statistics",
      columns: [
        { name: "tasksCompleted", type: "number" },
        { name: "tasksMissed", type: "number" },
        { name: "tasksTotal", type: "number" },
      ],
    }),
    tableSchema({
      name: "userdetails",
      columns: [{ name: "nickname", type: "string" }],
    }),
  ],
});
