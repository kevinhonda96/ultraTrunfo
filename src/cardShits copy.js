import './cardShit.css';

function CardShit() {



  return (
  <div id = "cardShit" >
      <form id="form">
          <h2>Escolha o seu atributo</h2>
          <div class="wrapper">
              <div>
                  <div id="carta-jogador">
                      <img class="cartas"
                        src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png"
                      />
                      <h3></h3>
                  </div>
              </div>
              <div id="resultado">
              </div>
              <div>
                  <div id="carta-maquina" class="carta">
                    <img class="cartas"
                      src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png"
                    />
                  </div>
              </div>
          </div>
          <button class="button-jogar" type="button" id="btnJogar" onclick="fight()" disabled="false">Jogar</button>
          <div id="resultado"></div>
      </form>
  </div>
  );
}
export default CardShit;

