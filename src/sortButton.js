import React from 'react'
import './sortButton.css';

function SortButton({sortDeck}) {
  const [disable, setDisable] = React.useState(false);
  
  function sortearDeck (){
    setDisable(true);
    sortDeck();
  }

  return (
  <div id = "sortButtonDiv" >
    <button id="btnSortear" type="submit" onClick={sortearDeck} disabled = {disable}>Sortear carta</button>
  </div>
  );

}

export default SortButton;
