
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from './conteyner/creteList/toDoList';
import EditList from './conteyner/editList/editList';

const  App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/edit/:date" element={<EditList />} />
      </Routes>
    </Router>
  );
}


export default App;
