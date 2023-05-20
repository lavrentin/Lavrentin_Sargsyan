import "../../style/editStyle.scss";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, editTask } from "../../actions/actions";
import { useState } from "react";

const EditList = () => {
  const { date } = useParams();
  const todos = useSelector((state) => state.todos);
  const dateList = todos.find((item) => item.date === date);
  const [editableItems, setEditableItems] = useState([]);
  const dispatch = useDispatch();

  const showEditItem = (task) => {
    if (document.querySelector(".greenCheckbox:checked")) {
      setEditableItems([...editableItems, { id: task.id, task: task.task }]);
    }
  };

  const handleEdit = (date, taskId) => {
    const item = editableItems.find((el) => el.id === taskId);
    if (item) {
      dispatch(editTask(date, item));
      setEditableItems(editableItems.filter((item) => item.id !== taskId));
    }
  };

  const handleClose = (id) => {
    setEditableItems(editableItems.filter((item) => item.id !== id));
  };

  const changeTaskText = (text, id) => {
    setEditableItems(
      editableItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            task: text,
          };
        }
        return item;
      })
    );
  };

  const handleDeleteList = (taskId) => {
    if (document.querySelector(".greenCheckbox:checked")) {
      dispatch(deleteTask(taskId));
    }
  };

  return (
    <div className="editing">
      <div className="editCart">
        <div>
          <div>
            <Link to="/" className="link">
              <button className="handleBack">
                <span>&lt;</span> Go back
              </button>
            </Link>
            <span className="title">
              {dateList.date} ({dateList.tasks.length})
            </span>
          </div>
          {dateList.tasks.length > 0 ? (
            <div className="editForm">
              {dateList.tasks.map((task, id) => (
                <div key={id}>
                  <div className="editListBlock">
                    <input type="checkbox" className="greenCheckbox" />
                    <span className="inputChange">{task.task}</span>
                    <button
                      className="HandleEdit click"
                      onClick={() => showEditItem(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="HandleDelete click"
                      onClick={() => handleDeleteList(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                  {editableItems.find((item) => item.id === task.id) && (
                    <div className="editListBlock">
                      <input
                        className="inputChange"
                        value={
                          editableItems.find((item) => item.id === task.id)
                            ?.task || task.task
                        }
                        type="text"
                        onChange={(e) =>
                          changeTaskText(e.target.value, task.id)
                        }
                      />
                      <button
                        className="HandleEdit click"
                        onClick={() => handleEdit(dateList.date, task.id)}
                      >
                        Save
                      </button>
                      <button
                        className="HandleCancel click"
                        onClick={() => handleClose(task.id)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default EditList;
