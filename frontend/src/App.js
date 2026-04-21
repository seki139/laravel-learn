import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import TodoList from "./components/ToDoList";
import Edit from "./components/UserEdit";
import UserDelete from "./components/UserDelete";
import UserEdit from './components/UserEdit';


function App() {
  // 🔑 ログイン状態
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      {/* 🧭 ナビゲーション（ホーム的役割） */}
      <nav>
        <Link to="/">ホーム</Link> |{" "}
        {!isLoggedIn && <Link to="/login">ログイン</Link>} |{" "}
        {!isLoggedIn && <Link to="/register">新規登録</Link>} |{" "}
        {isLoggedIn && <Link to="/todo">todo</Link>}
        {/*
        {isLoggedIn && <Link to="/edit">edit</Link>}
        {isLoggedIn && <Link to="/delete">delete</Link>}
        */}


      </nav>

      {/* 状態表示 */}
      <p>{isLoggedIn ? "ログイン中" : "未ログイン"}</p>

      <Routes>
        {/* ホーム */}
        <Route path="/" element={<h2>ホーム画面</h2>} />

        {/* ログイン */}
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />

        {/* 登録 */}
        <Route path="/register" element={<Register />} />

        {/* Todo（ログイン必須） */}
        <Route
          path="/todo"
          element={
            isLoggedIn ? <TodoList /> : <h2>ログインしてください</h2>
          }
        />
        
        {/* UserEdit（ログイン必須） */}
        {/*
        <Route
          path="/todo"
          element={
            isLoggedIn ? <UserEdit /> : <h2>ログインしてください</h2>
          }
        />*/}
        {/* UserDelete（ログイン必須） */}
        {/*}
        <Route
          path="/delete"
          element={
            isLoggedIn ? <UserDelete /> : <h2>ログインしてください</h2>
          }
        />*/}
        
      </Routes>
    </Router>
  );
}

export default App;
