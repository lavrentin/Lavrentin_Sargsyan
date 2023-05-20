export const addTask = (task) => {
  return {
    type: "ADD_TASK",
    payload: task,
  };
};

export const deleteTask = (taskId) => {
  return {
    type: "DELETE_TASK",
    payload: taskId,
  };
};

export const editTask = (date, item) => {
  return {
    type: "EDIT_TASK",
    payload: {
      date: date,
      item,
    },
  };
};
