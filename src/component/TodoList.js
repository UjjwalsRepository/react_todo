import React,{useState} from 'react'
const TodoList = ({ title, id, onEdit, onDelete }) => {
    const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleDelete = () => {
    onDelete(id);
  };
  const handleOnEditSubmit = (evt) => {
    evt.preventDefault();
    onEdit(id, evt.target.name.value);
    setIsEdit(!isEdit);
  };
  return (
   
     <>
     {isEdit ? (
       <form onSubmit={handleOnEditSubmit} style={{position:'absolute',top:'168px'}}>
         <input placeholder="Todo" name="name" defaultValue={title}/>
         <button onSubmit={handleOnEditSubmit}>Save</button>

       </form>
     ) : (
      <div className='todo-items'>
        <div className="todo">
         <span className="todo-title">{title}</span>
         <div style={{display:'flex'}}>
           <button style={{margin:'10px',height:'30px'}} onClick={handleEdit}>Edit</button>
           <button style={{margin:'10px',height:'30px'}} onClick={handleDelete}>Delete</button>
         </div>
       </div>
      </div>
       
     )}
   </>
  )
}

export default TodoList
