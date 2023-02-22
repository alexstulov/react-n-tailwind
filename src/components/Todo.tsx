import React, { useEffect, useState, createRef, ChangeEvent, FormEvent } from "react";
import "./Todo.css";

type TodoT = {
        id: number,
        name: string
}

type ListItemPropsT = {
        todo: TodoT,
        onToggleEdit: (todo: TodoT) => void,
        onDeleteTask: (id: number) => void,
}

type TodoStateT = {
    todos: TodoT[],
    value: string,
    editing: boolean,
    currentid: string,
    currentValue: string
  }

const ListItem = ({ todo, onToggleEdit, onDeleteTask }: ListItemPropsT) => {
  return (
    <li className="todo_item">
      <div className="todo_item__name">
        {todo.name}
      </div>
      <div className="todo_item__actions">
        <button onClick={() => onToggleEdit(todo)}>&#9998;</button>
        <button onClick={() => onDeleteTask(todo.id)}>&#128465;</button>
      </div>
    </li>
  );
};

const Todo = () => {
  const [state, setState] = useState<TodoStateT>({
    todos: [],
    value: "",
    editing: false,
    currentid: "",
    currentValue: ""
  });

  const addInput = createRef<HTMLInputElement>();
  const editInput = createRef<HTMLInputElement>();

  const focusAddInput = () => {
    if (!addInput.current) {
      return
    }
    addInput.current.focus();
  }

  const focusEditInput = () => {
    if (!editInput.current) {
      return
    }
    editInput.current.focus();
  }

  useEffect(() => {
    const initialTodosMock = [
      {
        id: 32342342343,
        name: "Test Todo 2"
      },
      {
        id: 32342345656,
        name: "Test Todo 1"
      }
    ];
    setState((prevState: TodoStateT) => ({ ...prevState, todos: initialTodosMock }));
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setState((prevState: TodoStateT) => ({ ...prevState, value: e.target.value }));
  };

  const onAddTask = (e: FormEvent) => {
    e.preventDefault()
    focusAddInput()
    if (state.value === "") { 
      return
    }

    setState((prevState: TodoStateT) => ({ ...prevState, todos: [
      {
        name: state.value,
        id: Date.now()
      },
      ...prevState.todos
    ], value: "" }));
  };

  const onDeleteTask = (itemId: number) => {
    setState((prevState: TodoStateT) => ({ ...prevState, 
      todos: [...state.todos].filter((id) => id.id !== itemId)
    }));
  };

  const onSubmitEditTodo = (e: FormEvent) => {
    e.preventDefault()
    focusEditInput()
    if (state.currentValue === "") { return }

    const index = state.todos.findIndex((item: TodoT) => {
      return item.id === parseInt(state.currentid)
    })

    setState((prevState: TodoStateT) => ({ ...prevState, todos: [
      ...prevState.todos.slice(0, index),
      {
        id: parseInt(prevState.currentid),
        name: prevState.currentValue
      },
      ...prevState.todos.slice(index+1)
    ], editing: false }));
    
  };

  const onToggleEdit = (todo: TodoT) => {
    setState((prevState: TodoStateT) => ({ ...prevState, currentid: todo.id.toString(), currentValue: todo.name, editing: true }));
  };

  const onEditInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setState((prevState: TodoStateT) => ({ ...prevState, currentValue: e.target.value }));
  };

  const onStopEdit = () => {
    setState((prevState: TodoStateT) => ({
      ...prevState,
      currentValue: "",
      editing: false
    }))
    setTimeout(() => focusAddInput(), 3000)
  }

  return (
    <>
      <div className="App">
        {state.editing === false ? (
          <form onSubmit={onAddTask}>
            <input ref={addInput} placeholder="Task" value={state.value} onChange={onChange} />
            <button type="submit">&#43;</button>
          </form>
        ) : (
          <form onSubmit={onSubmitEditTodo}>
            <input
              ref={editInput} 
              placeholder="edit your task"
              value={state.currentValue}
              name={state.currentValue}
              onChange={onEditInputChange}
            />
            <button type="submit">&#128190;</button>
            <button type="button" onClick={onStopEdit} title="Stop edit">&#x2715;</button>
          </form>
        )}
        <ul className="todo_wrapper">
          {state.todos.map((todo: TodoT) => (
            <ListItem
              key={todo.id}
              todo={todo}
              onToggleEdit={onToggleEdit}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Todo