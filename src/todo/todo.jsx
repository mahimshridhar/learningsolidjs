import { For, createSignal, createUniqueId } from "solid-js";
import { render } from "solid-js/web";
import { createStore } from "solid-js/store";
import "./todo.css";

const Todo = () => {
  const [inputValue, setInputValue] = createSignal("");
  const [store, setStore] = createStore({
    todos: [],
  });
  const [filter, setFilter] = createSignal("all");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: createUniqueId(),
      title: inputValue(),
      completed: false,
    };
    if (newTodo.title) {
      setStore("todos", (currentTodos) => [...currentTodos, newTodo]);
      setInputValue("");
    }
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleRemoveTodo = (id) => {
    setStore("todos", (todos) => {
      return todos.filter((todo) => todo.id !== id);
    });
  };

  const handleCompleteTodo = (id) => {
    setStore("todos", (todos) => {
      return todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: true,
          };
        }
        return todo;
      });
    });
  };

  const handleFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const handlefilterTodos = (filter) => {
    if (filter === "completed") {
      return store.todos.filter((todo) => todo.completed);
    } else if (filter === "pending") {
      return store.todos.filter((todo) => !todo.completed);
    }

    return store.todos;
  };

  return (
    <div class="todo">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter todos"
          onInput={handleInput}
          value={inputValue()}
        />
        <button>ADD</button>
      </form>
      <ul>
        <For each={handlefilterTodos(filter())}>
          {(todo) => (
            <li class="listItem">
              <span class={todo.completed ? "listItemTitle completed" : "listItemTitle pending"}>
                {todo.title}
              </span>
              <button onClick={() => handleRemoveTodo(todo.id)} class="remove">
                remove
              </button>
              <button
                onClick={() => handleCompleteTodo(todo.id)}
                class="complete"
              >
                completed
              </button>
            </li>
          )}
        </For>
      </ul>
      <div>
        Total Items: {store.todos.length}
      </div>
      Filters:
      <br />
      <select value={filter()} onChange={handleFilter} name="filters">
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  );
};

render(Todo, document.getElementById("app"));
