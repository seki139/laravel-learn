function UserDelete({ setUser }) {
  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:8001/api/user", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div>
      <h2>ユーザー削除</h2>
      <button onClick={handleDelete}>削除する</button>
    </div>
  );
}

export default UserDelete;