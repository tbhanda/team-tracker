import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import stage from './stage.png'
import back from './back.png'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import ListItem from './ListItem';
import './App.css';

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const createTodoItem = (name) => {
  return {
    id: uuidv4(),
    name: name,
    checked: false,
  };
};

const TODO_ITEMS_KEY = "todo-items";

function App() {

  const teams = ["UCLA Nashaa", "UCD Lashkara","UCSD Zor", "UCB Azaad", "UCSC Kahaani", "SLU Shakti","UC Dhadak","Chicago Adaa","WashU Chaahat","OSU Genesis","Buckeye Fusion"]
  const [newTodoName, setNewTodoName] = useState("");
  const [todoItems, setTodoItems] = useState([]);
  const handleToggleChecked = (id) => {
    const updatedTodoItems = todoItems.map((item) => {
      if (item.id !== id) {
        return item;
      }

      return {
        ...item,
        checked: !item.checked,
      };
    });

    setTodoItems(updatedTodoItems);
  };

  const handleDelete = () => {
      var toDelete = [];
      toDelete.length=0;
       const updateItems = todoItems.map((item) => {
          if (item.checked) {
            var index = todoItems.indexOf(item);
            toDelete.push(index);
            toDelete.sort();
          }
       })
          console.log("todel ", toDelete);
          for (var i = toDelete.length -1; i >= 0; i--){
            todoItems.splice(toDelete[i], 1);
          }
          console.log("post ", todoItems);
          localStorage.setItem(TODO_ITEMS_KEY, JSON.stringify(todoItems));
        // return {
        //   item,
        //   checked:item.checked
        // };
        window.location.reload();
  };
     




  useEffect(() => {
    if (todoItems.length > 0) {
      localStorage.setItem(TODO_ITEMS_KEY, JSON.stringify(todoItems));
    }
  }, [todoItems]);

  useEffect(() => {
    const fetchedTodoItems = localStorage.getItem(TODO_ITEMS_KEY);
    setTodoItems(JSON.parse(fetchedTodoItems) || []);
  }, []);

  const handleCreateTodo = () => {
    setTodoItems([...todoItems, createTodoItem(newTodoName)]);
  };

  // return {
  //   item,
  //   checked:item.checked
  // };
  return (

    <div className="App">
      <header className ="App-header">
      <Navbar className= "margin" bg="dark" variant = "dark" expand="lg">
        <Navbar.Brand href="#home"><strong>DDN Team Log</strong></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="https://www.desidancenetwork.org/">Official Website</Nav.Link>
            <Nav.Link href="#link">Scoreboard</Nav.Link>
            <NavDropdown title="Search Teams" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">West Coast</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">East Coast</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Previous Champions</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="http://www.legends.desidancenetwork.org">Legends Website</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
     
      <h6 className="text">Enter DDN Teams to Track: </h6>
       <input 
            className="inputText"
            style={{backgroundColor: "white"}}
            type="text"
            color="white"
            value={newTodoName}
            onChange={(event) => setNewTodoName(event.target.value)}
        />  
      
      <button className="button" type="submit" onClick={handleCreateTodo}>Submit</button>

      <button className ="deleteButton" onClick={handleDelete}>Delete Selected</button>
      <img src={stage} className="stage" alt="stage" />
      
      <div className = "recommended" >
          <h5>Recommended <br></br>Teams</h5>
        {teams.map((item) => {
          return (
            <li>{item}</li>
          );
        })}
      </div>

      <h3 className="textColor" ><strong>TEAMS</strong></h3>
      {console.log(todoItems)}
      {todoItems.map((item) => {
        return (
          <ListItem
            id={item.id}
            name={item.name}
            checked={item.checked}
            onToggleChecked={handleToggleChecked}
          />
        );
      })}
  
      
    </header>
    </div>
  );
}

export default App;
