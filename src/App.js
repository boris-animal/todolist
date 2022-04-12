import { useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [indexOfEditableItem, setIndexOfIditableItem] = useState(null);
  const [newInputValue, setNewInputValue] = useState("");
  /*let indexOfEditableItem = null

  const setIndexOfIditableItem = (value) => {
    indexOfEditableItem = value
  }*/

  const onSubmit = (event) => {
    event.preventDefault();
    const newItem = { value: inputValue, checked: false };
    if (inputValue === "") return;
    const newTodosArray = todoList.concat([newItem]);

    setTodoList(newTodosArray);

    setInputValue("");
  };

  const onInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const onRemoveClick = (indexOfRemevingValue) => {
    const updatedTodosArray = todoList.filter(
      (todoItem, index) => index !== indexOfRemevingValue
    );
    setTodoList(updatedTodosArray);
  };

  const onEditClick = (indexOfEditValue) => {
    const editableItem = todoList.find(
      (todoItem, index) => index === indexOfEditValue
    );
    setNewInputValue(editableItem.value);
    setIndexOfIditableItem(indexOfEditValue);
  };

  const onNewInputChange = (event) => {
    setNewInputValue(event.target.value);
  };

  const onCancelClick = () => {
    setIndexOfIditableItem(null);
  };

  const onSaveClick = (saveIndex) => {
    const newArr = todoList.map((todoItem, index) => {
      if (index === saveIndex) {
        return { value: newInputValue, checked: todoItem.checked };
      }

      return todoItem;
    });

    setTodoList(newArr);
    setNewInputValue("");
    onCancelClick();
  };

  const onCheckboxClick = (i) => {
    const newArr = todoList.map((todoItem, index) => {
      if (index === i) {
        return { value: todoItem.value, checked: !todoItem.checked };
      }

      return todoItem;
    });

    setTodoList(newArr);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={inputValue} onChange={onInputChange} />
        <button>add</button>
      </form>
      <div>
        {todoList.map((todoItem, index) => {
          return (
            <div key={index} className="todo-item">
              {indexOfEditableItem === index ? (
                <>
                  <input value={newInputValue} onChange={onNewInputChange} />
                  <div>
                    <button onClick={() => onSaveClick(index)}>save</button>
                    <button onClick={onCancelClick}>cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <p>{todoItem.value}</p>
                  <div>
                    <input
                      type="checkbox"
                      checked={todoItem.checked}
                      onChange={() => onCheckboxClick(index)}
                    />
                    <button onClick={() => onEditClick(index)}>Edit</button>
                    <button onClick={() => onRemoveClick(index)}>remove</button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
