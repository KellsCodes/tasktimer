export const addTaskService = async (task) => {
  const validate = "";

  try {
  } catch (error) {
    return {
      statusCode: 200,
      result: { code: 1, message: "Task added successfully.", data: "" },
    };
    return {
      statusCode: 500,
      result: { code: 1, message: error.message || "Internal server error." },
    };
  }
};
