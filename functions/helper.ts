import { Q } from "@nozbe/watermelondb";
import { MMKV } from "react-native-mmkv";

import database, { statisticsCollection, taskCollection, userDetailCollection } from "~/database";

const storage = new MMKV();

export function convertToISOFromSelected(selectedDate: string, timeObj: any) {
  const { amPm, hours, minutes } = timeObj;
  const date = new Date();
  const day = selectedDate.split(" ")[1];

  date.setDate(Number(day));
  date.setHours((hours % 12) + (amPm === "PM" ? 12 : 0));
  date.setMinutes(minutes);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date.toISOString();
}

export function UploadTask(
  inputName: string,
  inputDescription: string,
  taskPriority: string,
  isoString: string,
  selectedDate: string
) {
  return database
    .write(async () => {
      await taskCollection.create((task) => {
        task.title = inputName;
        task.description = inputDescription;
        task.priority = taskPriority;
        task.iso = isoString;
        task.day = selectedDate.split(" ")[0];
      });
    })
    .then(() => {
      return statisticsCollection.query().fetch();
    })
    .then((statistics) => {
      database.write(async () => {
        if (statistics.length > 0) {
          const stat = statistics[0];
          return stat.update((s) => {
            s.tasksTotal += 1;
          });
        } else {
          return statisticsCollection.create((stat) => {
            stat.tasksTotal = 1;
            stat.tasksCompleted = 0;
            stat.tasksMissed = 0;
          });
        }
      });
    });
}

export function setName(name: string) {
  return userDetailCollection
    .query()
    .fetch()
    .then((userDetails) => {
      return database.write(async () => {
        if (userDetails.length > 0) {
          const userDetail = userDetails[0];
          return userDetail.update((user) => {
            user.nickname = name;
          });
        } else {
          return userDetailCollection.create((user) => {
            user.nickname = name;
          });
        }
      });
    });
}

export async function deleteOldTasksAndCount() {
  const currentDate = new Date().toISOString();
  const oldTasks = await taskCollection.query(Q.where("iso", Q.lt(currentDate))).fetch();

  const oldTasksCount = oldTasks.length;

  if (oldTasksCount > 0) {
    await database.write(async () => {
      const deleted = oldTasks.map((task: any) => task.prepareDestroyPermanently());
      await database.batch(deleted);
    });
  }

  return oldTasksCount;
}

export async function missedTasks() {
  try {
    const oldTasksCount = await deleteOldTasksAndCount();

    if (oldTasksCount > 0) {
      const statistics = await statisticsCollection.query().fetch();

      if (statistics.length > 0) {
        await database.write(async () => {
          const stat = statistics[0];
          await stat.update((s) => {
            s.tasksMissed += oldTasksCount;
          });
        });
      }
    }

    return oldTasksCount;
  } catch (error) {
    console.error("Error updating missed tasks:", error);
    throw error;
  }
}

export const storeData = (key: string, value: string) => {
  try {
    storage.set(key, value);
  } catch (error) {
    console.log(error);
  }
};

export const getItemsFor = (key: string) => {
  try {
    const value = storage.getString(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteItem = () => {
  try {
    storage.delete("HAS_LAUNCHED");
  } catch (error) {
    console.log(error);
  }
};
