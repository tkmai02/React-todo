import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // UUID生成関数をインポート

const TaskManager = () => {
  // タスクの一覧を管理する
  const [tasks, setTasks] = useState([]);

  // 現在のタスク入力値を管理する
  const [taskInput, setTaskInput] = useState('');

  // タスクを追加する処理
  const handleAddTask = (e) => {
    e.preventDefault(); // フォームのデフォルトの送信動作を防ぐ

    // 新しいタスクを追加し、状態を更新する
    setTasks([...tasks, { id: uuidv4(), task: taskInput, completed: false }]);

    // 入力欄を空にする
    setTaskInput('');
  };

  // 指定したIDのタスクを削除する処理
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // タスクの完了状態を切り替える処理
  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div>
      <h1>タスク一覧</h1>

      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
          >
            <span>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(task.id)}
              />
            </span>
            <span>{task.task}</span>
            <button onClick={() => handleDeleteTask(task.id)}>削除</button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleAddTask}>
        <div>
          <input
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">タスクを登録</button>
        </div>
      </form>
    </div>
  );
};

export default TaskManager;
