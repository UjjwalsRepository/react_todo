import React, {useState,useEffect } from "react";
import AddTodo from "./component/AddTodo";
import TodoList from "./component/TodoList";
import axios from "axios";
import './App.css';
//import "./styles.css";

export default function App() {
  const [data, setData] = useState();
  
  var url = "https://jsonplaceholder.typicode.com/todos";
  useEffect(() => {
    fetchedData();
    //console.log("Data :",data)
  }, []);

  const fetchedData = () => {
    axios.get(url).then((response) => {
      const allData = response.data;
      console.log(allData);
      setData(allData);
    });
  };


  const onAdd = async (title) => {
    await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        title: title
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => {
        if (response.status !== 201) {
          return;
        } else {
          return response.json();
        }
      })
      .then((d) => {
        setData((data) => [...data, d]);
      })
      .catch((error) => console.log(error));
  };

  const onEdit = async (id, title) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: title,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          return response.json();
        }
      })
      .then((d) => {
       
        const updatedTodoData = data.map((d) => {
          if (d.id === id) {
            d.title = title;
            
          }
          return d;
        });

        setData((data) => updatedTodoData);
      })
      .catch((error) => console.log(error));
  };

  const onDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          setData(
            data.filter((d) => {
              return d.id !== id;
            })
          );
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <h1>ToDo List</h1>
      <AddTodo onAdd={onAdd} />
      <div className='todo-container'>
      {data &&
        data.map((items, i) => {
          return <TodoList key={i} title={items.title} id={items.id} onEdit={onEdit}
          onDelete={onDelete}/>;
      })}
      </div>
      
     
    </div>
  );
}
