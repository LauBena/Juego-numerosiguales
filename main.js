//inicializacion de variables
let uncoveredCards = 0;
let card1 = null;
let card2 = null;
let firstResult = null;
let secondResult = null;
let movements = 0;
let hits = 0;
let timer = false;
let time = 30;
let timeInitial = 30;
let countdownTimeId = null;

//Apuntando a documento HTML
let showMoves = document.getElementById('movements');
let showHits = document.getElementById('hits');
let showTime = document.getElementById('remaining.t');

//Generacion de numeros aleatorios
let number = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
number = number.sort(()=>{return Math.random()-0.5});
console.log(number);

//funciones
function countTime(){
    countdownTimeId = setInterval(()=>{
        time--;
        showTime.innerHTML = `Tiempo: ${time} segundos`;
        if(time === 0){
            clearInterval(countdownTimeId);
            blockCards();
        }
    }, 1000);
}

function blockCards(){
    for(let i = 0; i <= 15; i++){
        let lockedCard = document.getElementById(i);
        lockedCard.innerHTML = number[i];
        lockedCard.disabled = true;
    }
}

//funcion principal
function uncover(id){

    if(timer === false){
        countTime();
        timer = true;
    }

    uncoveredCards++;
    console.log(uncoveredCards);

    if(uncoveredCards === 1){
        // mostrar el primer numero
        card1 = document.getElementById(id);
        firstResult = number[id];
        card1.innerHTML = firstResult;

        //Desabilitar el primer boton
        card1.disabled = true;
    } else if(uncoveredCards === 2){
        //Mostrar segundo numero
        card2 = document.getElementById(id);
        secondResult = number[id];
        card2.innerHTML = secondResult;

        //Desabilitar segundo boton
        card2.disabled = true;

        //Incrementar movimientos
        movements++;
        showMoves.innerHTML = `Movimientos: ${movements}`;

        if(firstResult === secondResult){
            //Encerar el contador de tarjetas destapadas
            uncoveredCards = 0;

            //Aumentar aciertos
            hits++;
            showHits.innerHTML = `Aciertos: ${hits}`;

            if(hits === 8){
                clearInterval(countdownTimeId)
                showHits.innerHTML = `Aciertos: ${hits} &#128526;`;
                showTime.innerHTML = `Genial!! &#127882; sólo demoraste ${timeInitial - time} segundos`;
                showMoves.innerHTML = `Movimientos: ${movements} &#129327;`;
            }
        }else{
            //Mostrar momentaneamente valores y volver a tapar
            setTimeout(()=>{
                card1.innerHTML = ' ';
                card2.innerHTML = ' ';
                card1.disabled = false;
                card2.disabled = false;
                uncoveredCards = 0;
            },800);
        }
    }
}