import { formatDate } from "../utils/timezone.js";
import { getSingleTask, saveTask } from "../repositories/taskRepository.js";
import { addTaskSchema } from "../validations/taskValidation.js";

const retrieveDate = (date) => {
  return new Date(date)
    .toISOString()
    .slice(0, new Date(date).toISOString().indexOf("T"));
};

export const addTaskService = async (userId, task) => {
  const { value } = addTaskSchema.validate(task);

  // only update task that is yet to start i.e pending with status 0
  if (value.id) {
    const res = await getSingleTask(value.id, userId);
    if (res === 0)
      return {
        statusCode: 404,
        result: {
          code: 2,
          message: "No task with the id was found for this user.",
        },
      };
    if (
      res.status === 1 &&
      value.status !== 1 &&
      value.status !== 2 &&
      value.status !== 3
    ) {
      return {
        statusCode: 400,
        result: {
          code: 2,
          message:
            "Pending task can only be moved forward to running or completed.",
        },
      };
    }
    if (res.status === 2 && value.status !== 3) {
      return {
        statusCode: 400,
        result: {
          code: 2,
          message: "Running task can only be moved to completed",
        },
      };
    }
    if (res.status === 3) {
      return {
        statusCode: 400,
        result: {
          code: 2,
          message: "This task is completed and can't be modified.",
        },
      };
    }
  }
  const timezone = value.timeZone;
  const localStartDate = retrieveDate(value.startDate);
  const localEndDate = retrieveDate(value.endDate);
  const startLocal = formatDate(localStartDate, value.startHour, timezone);
  const endLocal = formatDate(localEndDate, value.endHour, timezone);

  if (!startLocal.isValid || !endLocal.isValid)
    return {
      statusCode: 400,
      result: { code: 2, message: "Invalid date format" },
    };
  const startAtUTC = startLocal.toUTC().toJSDate();
  const endAtUTC = endLocal.toUTC().toJSDate();
  const taskData = {
    userId,
    title: value.title,
    timeZone: timezone,
    startAt: startAtUTC,
    endAt: endAtUTC,
    localStartDate: localStartDate,
    localStartHour: value.startHour,
    localEndDate: localEndDate,
    localEndHour: value.endHour,
  };
  try {
    // Check for value updating
    if (value.id) taskData.id = value.id;
    if (value.status) taskData.status = value.status;
    if (new Date(startAtUTC) >= new Date(endAtUTC)) {
      return {
        statusCode: 400,
        result: {
          code: 2,
          message: "Task end date and time must be greater than the start date",
        },
      };
    }

    const data = await saveTask(taskData);
    return {
      statusCode: 200,
      result: {
        code: 1,
        message: `${
          value.id ? "Task updated successfully." : "Task added successfully."
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
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
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
