import React from "react";

 const AddTodo = ({ onAdd }) => {
  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    onAdd(evt.target.name.value);
    evt.target.name.value = "";
  };

  return (
    <form className="add-todo" onSubmit={handleOnSubmit}>
      <h3>Add New ToDo Task</h3>
      <input className="add" placeholder="Todo" name="name" />
      <button className="add-btn" onSubmit={handleOnSubmit}>Add</button>
      
    </form>
  );
};
export default AddTodo;