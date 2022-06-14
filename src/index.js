import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';
import CardsApp from './cardApp';


///var deck = [];
//var deckHuman = [];
//var deckMachine = [];

//<App />

ReactDOM.render(
<React.StrictMode>
  <CardsApp />
</React.StrictMode>,
document.getElementById('root')
);



function AddOnDeck(deckTo, i, deckFrom){
  deckTo.push(
      {
        nome: deckFrom[i].nome,
        imagem: deckFrom[i].imagem,
        atributos: {
          ataque: deckFrom[i].atributos.ataque,
          defesa: deckFrom[i].atributos.defesa,
          magia: deckFrom[i].atributos.magia
        },
        icon:{
        ataque:"fas fa-fist-raised",
        defesa:"fas fa-shield-alt",
        magia:"fas fa-hat-wizard"
      }
    }
  );
deckFrom.splice(i,i+1);
}
export default AddOnDeck;






// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
