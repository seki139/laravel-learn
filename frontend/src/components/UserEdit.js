import { useState } from "react";

function UserEdit({ user, setUser }) {
  const [name, setName] = useState(user?.name || "");

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:8001/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();
    setUser(data);
  };

  return (
    <div>
      <h2>ユーザー変更</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleUpdate}>更新</button>
    </div>
  );
}

export default UserEdit;