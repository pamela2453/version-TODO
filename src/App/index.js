import React from 'react';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton';
import {TodosLoading} from "../TodosLoading"
import {TodosError} from "../TodosError"
import {EmptyTodos} from "../EmptyTodos"

import { Form } from 'react-bootstrap'
import '../TodoCounter/Todo.Counter.css'

import {useLocalStorage} from './useLocalStorage'

// const defaultTodos = [
//   { text: 'Cortar cebolla', completed: true },
//   { text: 'Tomar el Curso de Intro a React.js', completed: false },
//   { text: 'Llorar con la Llorona', completed: false },
//   { text: 'LALALALALA', completed: false },
//   { text: 'Usar estados derivados', completed: true },
//    {text: 'realizar otra tarea', completed: false}
// ];

// localStorage.setItem('TODOS_V1', JSON.stringify(defaultTodos));
// localStorage.removeItem('TODOS_V1');






function App() {
 const{item:todos,
  saveItem:saveTodos,
  loading,
  error,} =useLocalStorage('TODOS_V1',[]);


  const [searchValue, setSearchValue] = React.useState('');
  const [auxTodo, setAuxTodo] = React.useState(todos)


  const completedTodos = todos.filter(
    todo => !!todo.completed
  ).length;
  const totalTodos = todos.length;


  const searchedTodos = todos.filter(
    (todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    }
  );



  const completeTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text === text
    );
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos, auxTodo);
  };

  
  const deleteTodo = (text) => {
    // const newTodos = [...todos];
    // const todoIndex = newTodos.findIndex(
    //   (todo) => todo.text === text
    // );

    let filter = auxTodo.filter((item) => item.text !== text)
    let status = todos.filter((item) => item.text !== text)

    localStorage.setItem('TODOS_V1', JSON.stringify(filter))
    saveTodos(status)
    setAuxTodo(filter)
  };


  const filterTaks = (value) => {
    switch(parseInt(value)) {
      case 1:
        saveTodos(auxTodo) 
      break;
      case 2:
        let completed = auxTodo.filter((item) => item.completed === true)
         saveTodos(completed)
      break;
      case 3:
        let noCompleted = auxTodo.filter((item) => item.completed !== true)
        saveTodos(noCompleted)
      break;
      default:
        console.log("Error")
      break;
    }
  }



  return (
    <>
          <>
      <Form.Select onChange={(event) => filterTaks(event.target.value)} 
      className='select' aria-label="Default select example"
      >
   
      <option value={1}>Tareas</option>
      <option value={2}>Completados</option>
      <option value={3}>Pendientes</option>
    </Form.Select>
      </>
    
      <TodoCounter
        completed={completedTodos}
        total={totalTodos}
       
       
      />
      <TodoSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <TodoList>
        {loading && 
        <>  
         <TodosLoading/>
         <TodosLoading/>
         <TodosLoading/>
        </>}
        {error && <TodosError/>}
        {(!loading && searchedTodos.length === 0) && <EmptyTodos/>}
        

        {searchedTodos.map(todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          
          />
        ))}
      </TodoList>

      <CreateTodoButton />
    </>
  );
}

export default App;