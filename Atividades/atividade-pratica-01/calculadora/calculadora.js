var numero1 = "";
var numero2 = "";
var resultado = null;
var novoNumero = false;
var ultimaOperacao = null;

function getVisor(){   
    return document.getElementById("visor").value;
}

function printVisor(num){
    const visor = document.getElementById("visor");
    visor.value = String(getVisor() + num).replace(".", ",");
}

function resetVisor(num){
    const visor = document.getElementById("visor");
    visor.value = String(num).replace(".", ",");

}

function limparVisor(){
    const visor = document.getElementById("visor");
    visor.value = "";

}

function teclado(){
    document.addEventListener("keydown", (e) => {

        if(Number.isInteger(Number(e.key))){
            botao(e.key);
        }
    }); //funçao que representa uma ação
}

function botao(valor) {
    if(novoNumero){
        resetVisor(valor);
        novoNumero = false;
    } else {
        printVisor(valor);
    }

    numero1 += valor;
}

function virgula(){
    const visor = document.getElementById("visor");

        if(visor.value.indexOf(".") === -1){
            visor.value = getVisor() + ",";
            numero1 += ".";
        }
}

function soma(){
    if(resultado === null){
        resultado = 0;
    }

    novoNumero = true;
    resultado = parseFloat(numero1) + parseFloat(numero2);

    // console.log(numero);
    // console.log(parseFloat(numero));

    ultimaOperacao = "+";
    numero1 = "";
    numero2 = "";

    resetVisor(resultado);
}

function subtracao(){
    if(resultado === null){
        resultado = 0;
    }

    novoNumero = true;
    resultado = parseFloat(numero1) - parseFloat(numero2);
    
    ultimaOperacao = "-";
    numero1 = "";
    numero2 = "";

    resetVisor(resultado);
}

function multiplicacao(){
    if(resultado === null){
        resultado = 1;
    }
    novoNumero = true;
    resultado = parseFloat(numero1) * parseFloat(numero2);

    ultimaOperacao = "*";
    numero1 = "";
    numero2 = "";

    resetVisor(resultado);
}

function divisao(){
    if(resultado === null){
        resultado = 1;
    }
}

function fracao(){
    if(resultado === null){
        resultado = 1;
    }

    novoNumero = true;
    resultado = parseFloat(numero1) / parseFloat(numero2);

    ultimaOperacao = "/"
    numero1 = "";

    resetVisor(resultado);
}

function printResultado(numero1, numero2, operador){
    console.log("numero", numero);
    console.log("resultado", resultado);
    console.log("ultima operação", ultimaOperacao);

    switch(operador) {
        case '+':
            resultado = parseFloat(numero1) + parseFloat(numero2);
            break;
        case '-':
            resultado = parseFloat(numero1) - parseFloat(numero2);
            break;
        case '*':
            resultado = parseFloat(numero1) * parseFloat(numero2);
            break;
        case '/':
            resultado = parseFloat(numero1) / parseFloat(numero2);
    }

    resetVisor(resultado);
}

function mudarSinal() {
    if(resultado === null){
        numero1 *= (-1);
        resetVisor(numero1);
    } else{
        resultado *= (-1);
        resetVisor(resultado);
    }
    
}