import React, { useState } from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import _ from 'lodash';
import {v4} from 'uuid';
import './App.css';

// Generating unique id && name
const item={
  id:v4(),
  name:"Get To Work"
  
}
const timestamp = Date.now()
console.log(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp));

const item2={
  id:v4(),
  name:"Go Home"
}


function App() {

const [text, setText] = useState("Some Text")  
const [state, setstate] = useState({
  "todo":{
    title:"Open",
    items:[item,item2],
    todoStyle:{
       color:"blue",
       textAlign:"center" 
    }
  },
  "in-progress":{
    title:"In Progress",
    items:[],
    todoStyle:{
      color:"orange",
      textAlign:"center" 
   }
  },
  "done":{
    title:"Completed",
    items:[],
    todoStyle:{
      color:"green",
      textAlign:"center" 
   }
  }
})


// For Handling Dragable Content after dragging end 
const handleDragEnd=({destination, source})=>{
  console.log("from", source)
  console.log(destination.droppableId);
  let destStatus=destination.droppableId;
  document.getElementById('sts').innerHTML=destStatus;
  console.log("to",destination)
  if(!destination){
    return
  }
  if(destination.index===source.index && destination.droppableId===source.droppableId){
    return
  }

  // Creating a copy of item before removing it from state
  const itemCopy={...state[source.droppableId].items[source.index]}
  console.log(itemCopy)
  setstate(prev=>{
    prev={...prev}

    // Remove from previous Items Array
    prev[source.droppableId].items.splice(source, 1)

    // Adding to new items array location
    prev[destination.droppableId].items.splice(destination, 0, itemCopy)
    return prev
  })
}


// Adding Item in todo lists
const addItem =()=>{
  const timestamp = Date.now()
  let tm=(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp))
console.log(tm);
document.getElementById('tmstmp').innerHTML=tm;
  setstate(prev=>{
    return {
      ...prev,
      todo:{
        title:"Todo",
        items:[
          {
            id:v4(),
            name:text
          },
          ...prev.todo.items
        ],
        todoStyle:{
          color:"blue",
          textAlign:"center" 
       }
        
      }
    }
  })
  setText("")
}



  return (
    <div className="App">
      <div className="header_box">
        <h3>Draggable Todo Lists</h3>
      </div>
      <div className="input_container">
        <h6 style={{marginLeft:"10px"}}>Add Some Todos</h6>
        <input type="text" value={text} onChange={(e)=>setText(e.target.value)} className="inp_box" />
        <button onClick={addItem} className="btn-primary">Add</button>
      </div>
      <div className="st_tm_box">
      <h6>Status: <span id="sts" style={{color:"#000"}}> Todo</span></h6>
      <h6>Time: <span id="tmstmp" style={{color:"#000"}}>00/00/0000, 00:00:00</span></h6>
      </div>
      <div className="draggable_container" >
      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key)=>{       {/* data->todo's objects, key->todo  */}
            return (
              <div key={key} className="column">
                <h3 style={data.todoStyle}>{data.title}</h3>
                  <Droppable droppableId={key}>
                {(provided, snapshot)=>{
                  // console.log(snapshot);
                  return(
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="droppable-col"
                    >
                      {data.items.map((el, index)=>{
                        return(
                          <Draggable key={el.id} index={index} draggableId={el.id}>
                            {(provided,snapshot)=>{
                              // console.log(snapshot);
                              return(
                                <div
                                  className={`item ${snapshot.isDragging && "dragging"}`}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {el.name}
                                 
                                </div>
                              )
                            }}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                    </div>
                  )
                }}
              </Droppable>
              </div>
            )
        })}   
      </DragDropContext>
      </div>
    </div>
  );
}

export default App;
