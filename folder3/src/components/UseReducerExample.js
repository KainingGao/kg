import React, { useReducer, useState } from 'react';


const ACTIONS = {
  ADD_TODO: 'ADD_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  DELETE_TODO: 'DELETE_TODO',
  SET_FILTER: 'SET_FILTER'
};


const initialState = {
  todos: [],
  filter: 'ALL' // ALL, ACTIVE, COMPLETED
};


const todoReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload,
          completed: false
        }]
      };
    
    case ACTIONS.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    
    case ACTIONS.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    
    case ACTIONS.SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };
    
    default:
      return state;
  }
};


const UseReducerExample = () => {

  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [newTodo, setNewTodo] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch({ type: ACTIONS.ADD_TODO, payload: newTodo });
      setNewTodo('');
    }
  };


  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'ACTIVE') return !todo.completed;
    if (state.filter === 'COMPLETED') return todo.completed;
    return true;
  });

  return (
    <div className="example-container">
      <h2>useReducer Hook Example</h2>

      {/* Todo input form */}
      <div>
        <h3>Todo List with useReducer</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="input-field"
            placeholder="Add new todo"
          />
          <button type="submit" className="button">
            Add Todo
          </button>
        </form>
      </div>

      {/* Filter buttons */}
      <div style={{ margin: '20px 0' }}>
        {['ALL', 'ACTIVE', 'COMPLETED'].map(filter => (
          <button
            key={filter}
            className="button"
            style={{
              backgroundColor: state.filter === filter ? '#4fa8d1' : '#61dafb'
            }}
            onClick={() => dispatch({ 
              type: ACTIONS.SET_FILTER, 
              payload: filter 
            })}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Todo list */}
      <div>
        {filteredTodos.map(todo => (
          <div
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px',
              margin: '5px 0',
              backgroundColor: todo.completed ? '#f0f0f0' : 'white',
              borderRadius: '4px'
            }}
          >
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}
            >
              {todo.text}
            </span>
            <div>
              <button
                className="button"
                onClick={() => dispatch({
                  type: ACTIONS.TOGGLE_TODO,
                  payload: todo.id
                })}
              >
                Toggle
              </button>
              <button
                className="button"
                onClick={() => dispatch({
                  type: ACTIONS.DELETE_TODO,
                  payload: todo.id
                })}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Explanation section */}
      <div style={{ marginTop: '20px' }}>
        <h3>Understanding useReducer</h3>
        <ul>
          <li>Manages complex state logic in a single function</li>
          <li>Similar to Redux pattern with actions and reducers</li>
          <li>Perfect for related state transitions</li>
          <li>More predictable state updates than multiple useState calls</li>
        </ul>
      </div>
    </div>
  );
};

export default UseReducerExample;
