import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../actions/actions";
import "../../style/tooDoStyle.scss";
import { Link } from "react-router-dom";

const TodoList = () => {
  const dispatch = useDispatch();
  const dates = useSelector((state) => state.todos);
  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState("");

  const handleNewTask = (event) => {
    if (newTask.length > 0 || newDate.length > 0) {
      event.preventDefault();
      dispatch(addTask({ task: newTask, date: newDate }));
      setNewTask("");
      setNewDate("");
    } else {
      return alert("Fill in the lines");
    }
  };

  return (
    <div className="creating">
      <div className="conteyner">
        <h1>To do list</h1>
        <div className="createBlock">
          <form>
            <label>New Task</label>
            <div className="block">
              <input
                className="textInput"
                name="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                type="text"
                placeholder="Type here"
              />
              <input
                className="dateInput"
                name="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                type="date"
              />
              <button className="handleNewTask" onClick={handleNewTask}>
                Add
              </button>
            </div>
          </form>
        </div>

        <div className="list">
          <form>
            <label>Dates</label>
            <div className="card">
              {dates.map((task, id) => (
                <Link
                  to={`/edit/${task.date}`}
                  data={task}
                  className="listBlock"
                  key={id}
                >
                  <span className="text">
                    {task.date} ({task.tasks.length})
                  </span>
                  <span id="route" className="icon">
                    &rsaquo;
                  </span>
                </Link>
              ))}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
