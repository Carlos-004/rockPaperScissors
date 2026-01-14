const playButtom = document.querySelector(".play-btn");
const conteoUser = document.querySelector(".conteo-user");
const conteoPc = document.querySelector(".conteo-pc ");

conteoUser.innerHTML = 0;
conteoPc.innerHTML = 0;

const resultadoUser = document.querySelector(".resultado-user");
const resultadoPc = document.querySelector(".resultado-pc");

const tablaUserContainer = document.querySelector(".tabla-user")
const tablaPcContainer = document.querySelector(".tabla-pc")

playButtom.addEventListener("click", playStart)

let counterUser = 0;
let counterPc = 0;

function playStart(){
    playButtom.disabled = true;
    resultadoUser.innerHTML = "Espere...";
    resultadoPc.innerHTML = "Resultado..."


    setTimeout(() => {
        const playerUser = playerAleatorio();
        const playerPc = playerAleatorio();

        contraAtaque(playerUser,playerPc);

        if (counterUser < 3 ||counterPc < 3 ) {
            playButtom.disabled = false;
        }
    }, 800);
}

function playerAleatorio(){
    const minimo = 1;
    const maximo = 3;

    const aleatorio = Math.floor(Math.random() * (maximo - minimo + 1) + minimo);
    return aleatorio;
}

function selectIcon(numero){
    if (numero === 1) {
        return "🪨";
    }else if (numero === 2) {
        return "📃";
    }else{
        return "✂️";
    }
}


function contraAtaque(user,pc){
    const iconUser = selectIcon(user);
    const iconPc = selectIcon(pc);

    setTimeout(() => {
        tablaFinal(iconUser,iconPc);
    }, 500);

    if (user === pc) {
        resultadoUser.innerHTML = `Empate ${iconUser}`;
        resultadoPc.innerHTML = `Empate ${iconPc}`;
    }else if ((user === 1 && pc === 3)|| (user === 2 && pc === 1) || (user === 3 && pc === 2)) {
        counterUser++;
        conteoUser.innerHTML = counterUser;
        resultadoUser.innerHTML = `Gano con ${iconUser}`;
        resultadoPc.innerHTML = `Perdio con ${iconPc}`;
    }else{
        counterPc++;
        conteoPc.innerHTML = counterPc;
        resultadoPc.innerHTML = `Gano con ${iconPc}`;
        resultadoUser.innerHTML = `Perdio con ${iconUser}`;
    }

    comprobarGanador();
}

function comprobarGanador(){
    if (counterUser === 3 || counterPc === 3) {
        const mensaje = counterUser === 3? "Felicidades Ganaste 🎉" : "WOOO! Perdiste ☠️";

        setTimeout(() => {
            const resultado = confirm(`${mensaje}\n\n ¿Quieres jugar de nuevo?`);

            if (resultado) {
                reiniciarGame();
            }else{
                playButtom.innerHTML = "Gamer Over";
                playButtom.disabled = true;
            }
        }, 500);
    }
    
}

function tablaFinal(user,pc){
    const tablaUser = document.createElement('div');
    tablaUser.className = 'tabla-user tabla';

    const iconUser = document.createElement('p');
    iconUser.textContent = user;
    tablaUser.appendChild(iconUser);
    

    const tablaPc = document.createElement('div');
    tablaPc.className = 'tabla-pc tabla';

    const iconPc = document.createElement('p');
    iconPc.textContent = pc;
    tablaPc.appendChild(iconPc);

    tablaUserContainer.appendChild(tablaUser)
    tablaPcContainer.appendChild(tablaPc)
}

function reiniciarGame(){
    conteoUser.innerHTML = 0;
    conteoPc.innerHTML = 0;
    conteoUser.innerHTML = 0;
    conteoPc.innerHTML = 0;
    resultadoUser.innerHTML = "Play";
    resultadoPc.innerHTML = "Start";
    playButtom.innerHTML = "Play";
    playButtom.disabled = false;
}