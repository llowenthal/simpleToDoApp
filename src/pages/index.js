import { useState, useEffect } from "react";

export default function Home() {
  const [todoItems, setTodoItems] = useState([]);
  const [todoItemsLoading, setTodoItemsLoading] = useState(true);
  const [editId, setEditId] = useState(0);

  async function loadData() {
    const res = await fetch("/api/todo");
    const data = await res.json();
    setTodoItems(data.todo);
    setTodoItemsLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleCompletedToggle = (id, completed) => {
    setTodoItemsLoading(true);
    toggleItemCompletion(id, completed);
    loadData();
    return false;
  };

  async function toggleItemCompletion(id, completed) {
    setTodoItemsLoading(true);
    const res = await fetch(`/api/todo`, {
      ///${id}
      method: "POST",
      body: JSON.stringify({ id, completed }),
      headers: { "Content-Type": "application/json" },
    });
    setTodoItemsLoading(false);
    //await loadData();
  }

  const handleEdit = (id) => {
    console.log("nothing yet", id);
    setEditId(id);
  };

  if (
    todoItems.hasOwnProperty("length") &&
    todoItems.length > 0 &&
    !todoItemsLoading
  ) {
    return (
      <>
        {todoItems.map((item) => (
          <div key={item.id}>
            {editId === item.id ? (
              <input type="text" value={item.toDoItem} />
            ) : (
              <h2 className={item.completed ? "completed" : ""}>
                {item.toDoItem}
              </h2>
            )}

            <span className={item.completed ? "completed" : ""}>
              {item.description}
            </span>
            <p className={item.completed ? "completed" : ""}>
              Last update: {item.lastAction}
            </p>
            <p>
              {item.completed ? (
                <button
                  type="button"
                  onClick={() => handleCompletedToggle(item.id, false)}
                >
                  Mark as incomplete
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleCompletedToggle(item.id, true)}
                >
                  Mark as complete
                </button>
              )}
              <button type="button" onClick={() => handleEdit(item.id)}>
                edit
              </button>
            </p>
            <hr />
          </div>
        ))}
      </>
    );
  } else {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }
}
