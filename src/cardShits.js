//cardShit
import React from 'react';
import './cardShit.css';

const icons = {
  ataque:"fas fa-fist-raised",
  defesa:"fas fa-shield-alt",
  magia:"fas fa-hat-wizard"
};

function CardShit({userCard, aiCard, playerTotal, machineTotal, onSelectAttribute, removeCard, changeType}) {
  //Cor de fundo dos atributos
  const [backColor, setBackColor] = React.useState({ataque:"",defesa:"",magia:""});
  //Desabilitar botões
  const [disable, setDisable] = React.useState(true);
  //Desabilitar botão Type
  const [disableType, setDisableType] = React.useState(false);
  //Tipo de botão
  const [btnType, setBtnType] = React.useState(1);
  //Define quando vai estar escolhivel os att
  const [setPlayerCard, setSetPlayerCard] = React.useState(0);
  //Mostra a carta
  const [showCard, setShowCard] = React.useState(0);
  //Qual o tipo de jogo
  const [typeTrunfo, setTypeTrunfo] = React.useState();
  //Valores para os confrontos
  const [treta, setTreta] = React.useState({pVal:"",cVal:""});
  //Define o vencedor
  const [winner, setWinner] = React.useState();
  //Contador de vitorias
  const [victory, setVictory] = React.useState(0);
  //Contador de derrotas
  const [lose, setLose] = React.useState(0);


  //Tipo de jogo
  const typeGame = () =>{
    //Verificando se tem carta para ser jogado e setando o tipo de jogo
    if(typeTrunfo === "M"){                 
      return(
        <div>
          <h1>Mata-Mata</h1>
          <h2>Escolha o seu atributo</h2>
        </div>
      )
    }else if(typeTrunfo === "R"){
      return(
        <div>
          <h1>Rouba Carta</h1>
          <h2>Escolha o seu atributo</h2>
        </div>
      )
    //Caso não tenha um tipo de jogo ainda 
    }else{
      if(Object.keys(userCard).length > 3){  
        let onClickType; 
        onClickType = function(typeGame){
          setTypeTrunfo(typeGame);
          setSetPlayerCard(1);
        }
        return(
          <div id = "gameTypes" >
            <h2>Escolha o tipo de jogo</h2>
            <button className="typeBtn" id="mataMata" type="button" onClick={()=>{onClickType("M")}} disabled = {disableType}>
              Mata-Mata
            </button>
            <button className="typeBtn" id="roubaCarta" type="button" onClick={()=>{onClickType("R")}} disabled = {disableType}>
              Rouba Carta
            </button>
          </div>
        )
      }
    }
  }

  //Renderiza as imagens das cartas 
  const renderImg = (player, sitShow) => {
    var img;
    var divId;
    var deckName;
    var name;
    var deckTotal;

    //Define o que retorna quando o as cartas forem do player ou da maquina
    if(player === 1){
      divId = "carta-jogador";
      deckName = userCard;
      player = setPlayerCard;
      deckTotal = playerTotal;

    }else if(player === 0){
      divId = "carta-maquina";
      deckName = aiCard;
      player = 0;
      deckTotal = machineTotal;

    }

    //Define a imagem que ira retorna
    if(deckName.imagem && sitShow === 1){
      img = deckName.imagem;
      name = deckName.nome;

    }else{
      img = "https://images.emojiterra.com/google/android-11/512px/2754.png";
      name = '?';
    } 

    //Renderiza as cartas
    return(
          <div 
            id={divId}
            style={{
              backgroundImage: `url(${img})` //backgroundImage: `${renderImg(userCard.imagem, true)}`
            }}
          >
            <img 
              src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" 
              style={{ width: 'inherit', height: 'inherit', position: 'absolute'}}
            />
            <p className="carta-subtitle">{name}</p>
            <div id='opcoes' className='carta-status' style={{width: '100%'}}>
              {renderAtributos(deckName.atributos, player, sitShow)}
              <div id='deckTotal'>
                <p>{deckTotal}</p>
              </div>
            </div>
          </div>
    ) 
  }

  //Renderizar os atributos
  const renderAtributos = (atributos, isUser, showAtt) => {
    return Object.keys(atributos).map(function(key) {
      var value = atributos[key];
      let onClick;

      //Define o se os atributos do card vao ser clicaveis
      if(isUser === 1) {
        onClick = function() {
          onSelectAttribute(value, aiCard.atributos[key]);
          setDisable(false);
          let arr = ["ataque","defesa","magia"];
          arr = arr.filter(e => e !== key.trim());
          setTreta(
            {
              pVal:[value],
              cVal:[aiCard.atributos[key]]
            }
        );
          setBackColor(
              {
                [key]:"#dbcfe8",
                [arr[0]]:"",
                [arr[1]]:""
              }
          );
        };  
      }

      //Não mostra os atributos
      if(showAtt === 0) {
        value = '?';
      }

      return (
        <div 
        style={{backgroundColor: backColor[key]}}
          className='atributosDiv'
          value='0' 
          onClick={onClick}
          disabled="false"
        >
          <div>
            <i className={icons[key]} 
              id='atributoIcon'
            ></i>
          </div> 
          <p id = 'cardAtributoName'>
            {key.trim().replace(/^\w/, (c) => c.toUpperCase())}
          </p> 
          <p id = 'cardAtributoValue'>{value}</p>
        </div>
      )
    })
  }

  //const renderAtributos = (atributos, isUser, showAtt) => {
  //
  const actionButton = (type) =>{

    if (type == 1 ){
      return(
        <button class="button-jogar" type="button" id="btnJogar" onClick={fight} disabled = {disable}>Jogar</button>
      )
    }else{
      return(
        <button class="button-jogar" type="button" id="btnJogar" onClick={restart} disabled = {disable}>Jogar Novamente</button>
      )
    }
  }

  function restart(){
    changeType(0);
    removeCard("reset");
  }


  //Função do botão que faz a lutinha
  function fight (){
    var stopper;
    if(showCard===0){
      //Define o vencedor da treta 
      if(treta['pVal']>treta['cVal']){
        if(typeTrunfo === "R"){
          setWinner("P");
        }
        setVictory(victory + 1);
        console.log("Ganhou");
      }else if(treta['pVal']<treta['cVal']){
        if(typeTrunfo === "R"){
          setWinner("M");
        }
        setLose(lose + 1);
        console.log("Perdeu");
      }else{
        console.log("Empate");
        setWinner("L");
      }
      if(typeTrunfo === "M"){
        setWinner("L");       //Seta o vencedor do turno
      }
      setShowCard(1);         //Revela a carta da maquina

    }else if(showCard===1){     //Define se o botão é para batalha ou setar o proximo turno 
      stopper = removeCard(winner);                   //Função que remove a carta do deck
      console.log(stopper);
      setShowCard(0);                                 //Faz a carta da maquina desaparecer
      setBackColor({ataque:"",defesa:"",magia:""});   //Tira a marcação das cartas
      setDisable(true);                               //Desabilita o botão de jogar
    }
    
    if(stopper){                //Definir o ganhador caso stopper esteja com algum valor

      setDisable(false);                               //Desabilita o botão de jogar
      setSetPlayerCard(0);                             //Desabilita o onClick na carta do player
      setShowCard(1);                                  //Mostra a carta do maquina
      console.log("Você venceu "+victory+" e perdeu "+lose);
      setWinner(1);                                   //Seta a variavel para 1 para que apareça a imagem de You Lose ou You Win aparecer
      setBtnType(0);                                  //Variavel que faz o botão de Jogar mudar para Jogar Novamente
    }
  }

  //Renderiza a imagem do resultado
  const resultado = (winner) => {
    var img;
    if(winner === 1){
      //Define qual imagem vai aparecer, You Win ou You Lose
      if(
        victory<lose && typeTrunfo === "M" ||             //Condição de vitoria no mata-mata
        playerTotal > machineTotal && typeTrunfo === "R"  //Condição de vitoria no rouba carta 
        ){
        //Imagem You Win
          img = "https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/d1e16859c09183b.png";
      }else if(
        victory > lose && typeTrunfo === "M"||            //Condição de derrota no mata-mata
        playerTotal < machineTotal && typeTrunfo === "R"  //Condição de derrota no rouba carta
      ){
        //Imagem You Lose
        img = "https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/8d3202a41dfe82e.png";
      }
    };

    //Retorna a imagem de vitoria ou derrota
    return(
      <div id="divImgResultado">
          <img src={img}></img>
      </div>
    )
  }
  
  return (
  <div id = "cardShit" >
      <form id="form">
          {typeGame()}
          <div className="wrapper">
              <div>
                {renderImg(1,1)}
              </div>
          <div id="resultado">
            {resultado(winner)}
          </div>
              <div>
                {renderImg(0,showCard)}
              </div>
          </div>
          {actionButton(btnType)}
      </form>
  </div>
  );
}
export default CardShit;