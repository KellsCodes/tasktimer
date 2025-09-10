import { formatDate } from "../utils/timezone.js";
import { saveTask } from "../repositories/taskRepository.js";

export const addTaskService = async (userId, task) => {
  const validate = "";
  const timezone = task.timeZone;

  const startLocal = formatDate(task.startDate, task.startHour, timezone);
  const endLocal = formatDate(task.endDate, task.endHour, timezone);

  if (!startLocal.isValid || !endLocal.isValid)
    return {
      statusCode: 400,
      result: { code: 2, message: "Invalid date format" },
    };
  const startAtUTC = startLocal.toUTC().toJSDate();
  const endAtUTC = endLocal.toUTC().toJSDate();
  const taskData = {
    userId,
    title: task.title,
    timeZone: timezone,
    startAt: startAtUTC,
    endAt: endAtUTC,
    localStartDate: task.startDate,
    localStartHour: task.startHour,
    localEndDate: task.endDate,
    localEndHour: task.endHour,
  };
  try {
    // Check for task updating
    if (task.id) {
      console.log("get here....");
      taskData.id = task.id;
    }
    if (task.status) taskData.status = task.status;
    const data = await saveTask(taskData);
    return {
      statusCode: 200,
      result: {
        code: 1,
        message: `${
          task.id ? "Task updated successfully." : "Task added successfully."
        }`,
        data: {
          id: data.id,
          title: data.title,
          status: data.status,
          userId: data.userId,
          timeZone: data.timeZone,
          startDate: data.localStartDate,
          endDate: data.localEndDate,
          startHour: data.localStartHour,
          endHour: data.localEndHour,
        },
      },
    };
  } catch (error) {
    if (!error.message) {
      console.log(error);
      return {
        statusCode: 500,
        result: { code: 2, message: "Internal server error." },
      };
    }
    return {
      statusCode: 400,
      result: { code: 2, message: error.message },
    };
  }
};
