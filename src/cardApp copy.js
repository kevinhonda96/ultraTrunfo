import React, { useState } from 'react';
import TableInsert from './tableInsert';
import SortButton from './sortButton';
import CardShit from './cardShits';

///var deck = [];
//var deckHuman = [];
//var deckMachine = [];


function CardsApp() {
  const [deck, setDeck] = useState([]);
  const [playerDeck, setPlayerDeck] = useState([]);
  const [machineDeck, setMachineDeck] = useState([]);


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
  
//Sorteia os deck
  function SortDeck(){

    setPlayerDeck([
      ...playerDeck,deck
    ]);

    console.log(deck);

    /* */
    var i = 0;
    console.log(deck);
    //Array dos deck
    var humanDeck = [];
    var machinDeck = [];
    
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

    //Inserindo no const

    setPlayerDeck([
      ...playerDeck, humanDeck
    ]);

    setMachineDeck([
      ...machineDeck,machineDeck
    ]);
   
    console.log(humanDeck);
    console.log(machinDeck);

    
    //Exibindo a carta do player
    exibirCarta("jogador",humanDeck);

}





function exibirCarta(player,deckName){
  console.log(deckName[0]);
   
  var divCarta = document.getElementById("carta-"+player)
  divCarta.style.backgroundImage = `url(${deckName[0].imagem})`;
  //divCartaJogador.style.backgroundImage = "url("+cartaJogador.imagem+")";
  var moldura ='<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
  var tagHTML = "<div id='opcoes' class='carta-status' style= 'width: 100%;'>";
 
  var opcoesTexto = "";
  var someShit2 = "";
  var nameAtributo = "";
  
  for(var atributo in deckName[0].atributos){
    console.log(atributo);
    nameAtributo = "atributo"+atributo;
    opcoesTexto += "<div id='atributo"+atributo+"' class='atributosDiv' value='0' onclick='"+selectAtributo+"("+nameAtributo+")'><div><i class='" + deckName[0].icon[atributo] + "' id='atributoIcon'></i></div> <p id = 'cardAtributoName'>" + atributo.trim().replace(/^\w/, (c) => c.toUpperCase()) + "</p> <p id = 'cardAtributoValue'>" + deckName[0].atributos[atributo] + "</p></div>";
    console.log(nameAtributo);
  };
 
  var nome = `<p class="carta-subtitle">${deckName[0].nome}<p>`
  var inputAtributo = document.getElementById("inputAtributo")
 console.log(inputAtributo)
  
  divCarta.innerHTML = moldura + nome + tagHTML + opcoesTexto + "</div>"
  
 document.getElementById("carta-"+player).style.backgroundImage = `url(${deckName[0].imagem})`;
 
}




function selectAtributo(nameAtributo){
  var atributos = document.getElementsByClassName("atributosDiv");
  for(var i = 0; i < 3; i++) {
    atributos[i].style.removeProperty('color');
    atributos[i].style.removeProperty('background-color');
    atributos[i].setAttribute("value","0")
  }
  //Pega o valor do atributo
  //document.getElementById("atributoataque").getAttribute('value')
  nameAtributo.style.backgroundColor = "#caa0e8";
  nameAtributo.style.color = "#583f6b";
  nameAtributo.setAttribute("value","0");
  console.log("Cliqued");

}




function obtemAtributoSelecionado(){
  var radioAtributos = document.getElementsByName("atributo");
  
  for(var i = 0; i < radioAtributos.length; i++){
    if(radioAtributos[i].checked == true){
     return radioAtributos[i].value; 
    }
  };
  
}

  return (
    <React.StrictMode>
      <TableInsert deck = {deck} onAddCard = {AddCard}/>
      <SortButton sortDeck = {SortDeck}/>
      <CardShit/>
    </React.StrictMode>
  )
}

export default CardsApp;