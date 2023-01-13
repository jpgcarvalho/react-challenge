import { useState } from 'react'
import './App.css'

function App() {
  const [mainList, setMainList] = useState([]);
  const [trashList, setTrashList] = useState([]);

  const handleClick = (e) => {
    const newCordinates = {
      clientX: e.clientX,
      clientY: e.clientY
    }
    setMainList((prev) => [...prev, newCordinates]);
    setTrashList([]);
  }

  const handleUndo = (e) => {
    e.stopPropagation();

    if(mainList.length === 0){
      return;
    }

    const removedPoint = mainList[mainList.length - 1];
    setTrashList((prev) => [...prev, removedPoint]);

    setMainList((prev) => {
      const newArray = [...prev].slice(0, -1);

      return newArray;
    })
  }

  const handleRedo = (e) => {
    e.stopPropagation();

    if(trashList.length === 0){
      return;
    }

    const recoveredPoint = trashList[trashList.length - 1];
    setTrashList((prev) => {
      const newArray = [...prev].slice(0, -1);
      return newArray;
    });

    setMainList((prev) => [...prev, recoveredPoint]);
  }

  return (
    <div id="main" onClick={handleClick}>
      <button onClick={handleUndo}>Undo</button>
      <button onClick={handleRedo}>Redo</button>
      {mainList.map((item, index) => <span key={index} className="click" style={{top: item.clientY, left: item.clientX}} /> )}
    </div>
  )
}

export default App
