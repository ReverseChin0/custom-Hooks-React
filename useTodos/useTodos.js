import { useEffect, useReducer } from 'react';
import { todoReducer } from '../08-useReducer/todoReducer';

const init = () => {//intenta parsear el objeto del localstorage, si es null, regresa un vacio
    return JSON.parse( localStorage.getItem('todos')) || [];
}

export const useTodos = () => {
    const [ todos, dispatch ] = useReducer( todoReducer, [], init );

    useEffect(() => { //localStorage no puede guardar objetos, solo strings
        localStorage.setItem('todos',JSON.stringify( todos ));
    }, [todos]) //cada vez que se cambie el reducer de los todos
    

    const handleNewTodo = ( todo ) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }

        dispatch( action );
    }

    const handleDeleteTodo = (id) => {
        const action = {
            type: '[TODO] Remove Todo',
            payload: id
        }

        dispatch( action );
    }

    const handleToggleTodo = (id) => {
        const action = {
            type: '[TODO] Toggle Todo',
            payload: id
        }

        dispatch( action );
    }

  return {
        todos,
        handleDeleteTodo,
        handleNewTodo,
        handleToggleTodo,
        todosCount: todos.length,
        pendingTodosCount: todos.filter( todo => !todo.done).length,
    }
}
