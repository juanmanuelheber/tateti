const jugador=["X","O"];
let winner="";

const ocultar=(elem)=>{
    elem.style.display="none";
}
const mostrar=(elem)=>{
    elem.style.display="block";
}

const contador=(n)=>{
    n++;
    return n
}

const escribir=(array,n,span)=>{
    if (n%2===0){
        array.innerHTML=jugador[0];
        span.innerHTML=`Turno de ${jugador[1]}`;
    }else{
        array.innerHTML=jugador[1];
        span.innerHTML=`Turno de ${jugador[0]}`;
    }
}

const bloquearBoton=(array)=>{
    array.disabled=true;
}

const ganador=(array,index)=>{
    const ganador=array[index].innerHTML;
    winner=ganador;
    document.getElementById("ganador").innerHTML=`Felicitaciones ${ganador}!!! 🙌🏻`;
    mostrar(document.getElementById("divGanador"));
    ocultar(document.getElementById("divTurno"));
    for (let j = 0; j < array.length; j++) {
        bloquearBoton(array[j]);             
    }
}

const verGanador=(array)=>{
    for (let i = 0; i < array.length; i+=3) {
        if (array[i].innerHTML.trim()!=="." && array[i].innerHTML===array[i+1].innerHTML && array[i].innerHTML===array[i+2].innerHTML) {
            ganador(array,i);
        }
    }
    for (let i = 0; i < 3; i++) {
        if (array[i].innerHTML.trim()!=="." && array[i].innerHTML===array[i+3].innerHTML && array[i].innerHTML===array[i+6].innerHTML) {
            ganador(array,i);
        }
    }
    i=0;
    if (array[i].innerHTML.trim()!=="." && array[i].innerHTML===array[i+4].innerHTML && array[i].innerHTML===array[i+8].innerHTML) {
        ganador(array,i);
    }
    i=2;
    if (array[i].innerHTML.trim()!=="." && array[i].innerHTML===array[i+2].innerHTML && array[i].innerHTML===array[i+4].innerHTML) {
        ganador(array,i);
    }
    winner!==""?actualizar(3000):null;
}

const actualizar=(tiempo)=>{
    setTimeout(() => {
        location.reload();
    }, tiempo);
}

function start(){
    ocultar(document.getElementById("divGanador"));
    let cont=0;
    const botones = document.getElementsByClassName("boton");
    const span=document.getElementById("turno");
    const refresh=document.getElementById("refresh");
    refresh.addEventListener("click",()=>actualizar(0))
    for (let i = 0; i < botones.length; i++) {
        botones[i].addEventListener("click",()=>{
            cont=contador(cont);
            escribir(botones[i],cont,span);
            bloquearBoton(botones[i]);
            verGanador(botones);
            if (winner==="" && cont===9){
                document.getElementById("ganador").innerHTML=`O los dos son muy buenos, o los dos son muy malos 🤔`;
                ocultar(document.getElementById("divTurno"));
                mostrar(document.getElementById("divGanador"));
            }
        })
    }
}

window.onload=start;
