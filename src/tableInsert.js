//Original Kevin Shit 2.0
import React from 'react';
import './tableInsert.css';
import { notification } from 'antd';


function TableInsert({deck,changeType,onAddCard,sortDeck}) {
  //Habilitar ou desabilitar o botão de inserir carta
  const [disable, setDisable] = React.useState(false);
  //Mostrar botão de sortear
  const [disableSort, setDisableSort] = React.useState(true);
  

  //Const da notificação
  const openNotification = placement => {
    notification.error({
      message: `Error Notification`,
      description:
        'URL Invalido.',
      placement,
    });
  };

  //Função para add a carta
  function adicionarCarta(){
    //var newImg = document.getElementById("newImg").value;
    //newImg = newImg.toUpperCase();
    //if (newImg.endsWith(".JPG")||newImg.endsWith(".JPEG")||newImg.endsWith(".PNG")){
        
      //Inserindo a carta no deck geral
      onAddCard({
        nome: document.getElementById("newNome").value,
        imagem: document.getElementById("newImg").value,
        atributos: {
          ataque: document.getElementById("newAtaque").value,
          defesa: document.getElementById("newDefesa").value,
          magia: document.getElementById("newMagia").value
        }
      },"deck","setDeck");
        //console.log(test+"machine");

      //Deixando os elementos iniciais em branco de novo
      document.getElementById("newAtaque").value = "";
      document.getElementById("newDefesa").value = "";
      document.getElementById("newAtaque").value = "";
      document.getElementById("newMagia").value = "";
      document.getElementById("newNome").value = "";
      document.getElementById("newImg").value = "";

      //Habilitando o botão de sortear 
      if(deck.length>2){
        setDisableSort(false);
      }

    /*}else{
      console.error("URL Invalido");
      openNotification('topRight');
    }*/
  }

  //Botão de sortear
  const sortBtn = (showBtn) =>{
    //if(showBtn === false){
      return(
        <div id = "sortButtonDiv" >
          <button id="btnSortear" type="submit" onClick={sortearDeck} disabled = {showBtn}>Sortear carta</button>
        </div>
      )
    //}
  }

  //Função do botão que sorteia o deck 
  function sortearDeck (){
    setDisable(true);
    changeType(1);
    sortDeck();
  }



  return (
    <div>
      <div id="cabecalho">
        <h1>Insira as cartas</h1>
      </div>
      <div id="tableCartas">
        <table className="tableInsert">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Ataque</th>
              <th>Defesa</th>
              <th>Magia</th>
              <th>Img</th>
              <th id="cardCont"></th>
            </tr>
          </thead>
          <tbody id="tabelaJogadores">
            <tr id="cardsVal">
                  <td><input type="text" id="newNome" /></td>
                  <td><input type="number" id="newAtaque" /></td>
                  <td><input type="number" id="newDefesa" /></td>
                  <td><input type="number" id="newMagia" /></td>
                  <td><input type="text" id="newImg" /></td>
                  <td><button id="btnAdd" type="submit"  onClick={adicionarCarta} disabled = {disable}>Add</button></td>
            </tr>
            {deck.map(function(card, i){ //a função map transforma todos os elementos do array no valor retornado
                  return (
                    <tr>
                      <td className='cardName'>{card.nome}</td>
                      <td className='cardAtq'>{card.atributos.ataque}</td>
                      <td className='cardDef'>{card.atributos.defesa}</td>
                      <td className='cardMgk'>{card.atributos.magia}</td>
                      <td className='urlImg'>{card.imagem}</td>
                      <td>{i+1}</td>
                    </tr>
                  );
                })
            }
          </tbody>
        </table>
      </div>

        {sortBtn(disableSort)}
    </div>
  );
}

export default TableInsert;





