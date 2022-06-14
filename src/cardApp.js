import React, { useState } from 'react';
import TableInsert from './tableInsert';
import SortButton from './sortButton';
import CardShit from './cardShits';

//Gera cartas aleatorias
function generateCardsList() {
  let deck = [];
  for(let i = 0; i < 10; i++){
    deck.push({
      nome: `carta ${i}`,
      imagem: "https://sm.ign.com/t/ign_br/screenshot/default/sasuke-rinnegan_wp5d.1200.png",
      atributos: {
        ataque: parseInt(Math.random() * 10),
        defesa: parseInt(Math.random() * 10),
        magia: parseInt(Math.random() * 10)
      }
    })
  }
  return deck;
}

const defaultCard = {
  nome: "",
  imagem: "",
  atributos: {}
};

function CardsApp() {
  //Deck principal
  const [deck, setDeck] = useState(generateCardsList());
  //Deck do Player
  const [playerDeck, setPlayerDeck] = useState([]);
  //Deck da Maquina
  const [machineDeck, setMachineDeck] = useState([]);
  //Carta do Player que vai ser usada no turno
  const [userCard, setUserCard] = useState(defaultCard);
  //Carta da maquina que vai ser usado no turno
  const [aiCard, setAiCard] = useState(defaultCard);
  //Define com vai ser o body 
  const [type, setType] = useState(0);

  //Add carta na tabela maluca
  function AddCard(card){
    setDeck([
      ...deck, //isso passa todos os atuais valores do array para esse outro array
      {
        nome: card.nome,
        imagem: card.imagem,
        atributos: card.atributos,
        icon:{
          ataque:"fas fa-fist-raised",
          defesa:"fas fa-shield-alt",
          magia:"fas fa-hat-wizard"
        }
      } // como está depois do "...deck", o novo card vai ficar por último, igual o push q vc fazia
    ]);
    //console.log(deck);
  }

  //Remover Carta
  function RemoveCard(winner){
      //Removo as cartas
      machineDeck.splice(0,1);
      playerDeck.splice(0,1);
      //Reseta o game
      if(winner === "reset"){
        setPlayerDeck([]);
        setMachineDeck([]);
      }

      //Função para roubar as cartas 
      if(winner === "P"){
        setPlayerDeck([...playerDeck,aiCard,userCard]);
        
      }else if(winner === "M"){
        setMachineDeck([...machineDeck,userCard,aiCard]);
      }

      //Define as cartas de userCard e aiCard que vao ser exibidos 
      if(playerDeck.length > 0){
        setUserCard(playerDeck[0]);
      }
      if(machineDeck.length > 0){
        setAiCard(machineDeck[0]);
      }   

      //Define quando o jogo termina
      if(
          //Rouba carta
          machineDeck.length === 0 && winner === "P"||
          playerDeck.length  === 0 && winner === "M"||
          //Mata-mata
          machineDeck.length === 0 && winner === "L"||
          playerDeck.length  === 0 && winner === "L" 
        ){
        return(
          winner
        );
      }
  };
  
  //Sorteia os deck
  function SortDeck(){
    setPlayerDeck([
      ...playerDeck,deck
    ]);

    //Array dos deck
    var humanDeck = [];
    var machinDeck = [];
    var odd;
    var i = 0;

    //Verifica se o ele é divisivel por 2
    odd = deck.length % 2;
    if(odd == 0){
      odd = 1;
    }else{
      odd = 2;
    }

    //Loop para joga as cartas nos decks
    while(deck.length > 1){
      //Inserindo no array do deck do player
      i = parseInt(Math.random() * deck.length)
      humanDeck.push(
        {
          nome: deck[i].nome,
          imagem: deck[i].imagem,
          atributos: deck[i].atributos,
          icon: deck[i].icon         
        }
      );
      deck.splice(i,1)

      //Inserindo no array do deck do machine
      i = parseInt(Math.random() * deck.length)
      console.log("Inserindo o index de numero "+i+" para maquina");
      machinDeck.push(
        {
          nome: deck[i].nome,
          imagem: deck[i].imagem,
          atributos: deck[i].atributos,
          icon: deck[i].icon           
        }
      );
      deck.splice(i,1)
    }

    //Inserindo nos decks definitivos
    setPlayerDeck(humanDeck);
    setMachineDeck(machinDeck);

    setUserCard(humanDeck[0]);
    setAiCard(machinDeck[0]);
  }

  //Mudar o body
  function changeType(type){
    setType(type);
  }
  
  //Define como vai ser o body
  const body = (type) => {
    if(type === 1){
      //Batalha de cartas
      return(
        <CardShit
          removeCard = {RemoveCard}
          changeType = {changeType}
          machineTotal = {machineDeck.length}
          playerTotal = {playerDeck.length}
          userCard={userCard}
          aiCard={aiCard}
          onSelectAttribute={function(userValue, aiValue) {
            console.log(userValue, aiValue);
          }}
        />
        )
    }else if(type === 0){
      //Tabela que insere as cartas
      return(
        <TableInsert 
          deck = {deck} 
          changeType = {changeType} 
          sortDeck = {SortDeck}  
          onAddCard = {AddCard}
        />
        )
    }
  }

  return (
    <React.StrictMode>
      {body(type)}
    </React.StrictMode>
  )
}

export default CardsApp;