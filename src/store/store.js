import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const initialState = {
  todos: [],
};

const generateRandomId = () => {
  return Math.floor(Math.random() * 1000);
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      const isExist = state.todos.find(
        (el) => Date.parse(el.date) === Date.parse(action.payload.date)
      );
      if (isExist) {
        isExist.tasks.push({
          id: generateRandomId(),
          task: action.payload.task,
          completed: false,
        });
      } else {
        let task = {
          id: generateRandomId(),
          task: action.payload.task,
          completed: false,
        };
        state.todos = [
          ...state.todos,
          { date: action.payload.date, tasks: [task] },
        ];
      }
      return {
        ...state,
      };

    case "DELETE_TASK":
      const deleteTodo = state.todos.map((item) => {
        if (item.tasks) {
          const deleteTodo = item.tasks.filter(
            (task) => task.id !== action.payload
          );
          return { ...item, tasks: deleteTodo };
        }
        return item;
      });
      return {
        ...state,
        todos: deleteTodo,
      };

    case "EDIT_TASK":
      const editTodo = state.todos.map((item) => {
        if (Date.parse(item.date) === Date.parse(action.payload.date)) {
          item.tasks.map((el) => {
            if (el.id === action.payload.item.id) {
              el.task = action.payload.item.task;
            }
            return el;
          });
        }
        return item;
      });
      return {
        ...state,
        todos: editTodo,
      };

    default:
      return state;
  }
};

const store = createStore(todoReducer, applyMiddleware(thunk));

export default store;
