import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
        'Content-Type': 'application/json',

        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Laravelバリデーションエラー想定
        setError(data.message || "登録に失敗しました");
        return;
      }

      // 🔥 成功時（ログインさせる場合）
      // APIが token を返す前提
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      alert("登録完了");

      // ログイン画面へ
      navigate("/login");

    } catch (err) {
      setError("通信エラー");
    }
  };

  return (
    <div>
      <h2>ユーザー登録</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="名前"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        </div>

        <div>
          <input
            placeholder="メール"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>

        <button type="submit">登録</button>
      </form>
    </div>
  );
}

export default Register;