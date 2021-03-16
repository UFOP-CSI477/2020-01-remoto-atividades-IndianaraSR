var carros = {};

const tabelaCarros = document.getElementById("tabela-carros");
const informacoesFinais = document.getElementById("lista-informacoes-finais");

document.getElementById("botao-add-carro").addEventListener("click", (e) => {
    const uuid = createGuid();

    carros[uuid] = {
        uuid,
        combustivel: null,
        quilometros: null,
        desempenho: null
    };

    limparTabela();
    povoarTabela();

    informacoesFinais.style.display = "none";
});

document.getElementById("botao-finalizar").addEventListener("click", (e) => {
    var totalCombustivel = 0;
    var totalQuilometros = 0;
    var totalDesempenho = 0;

    Object.keys(carros).forEach((uuid) => {
        totalCombustivel += carros[uuid].combustivel;
        totalQuilometros += carros[uuid].quilometros;
        totalDesempenho += carros[uuid].desempenho;
    });

    const mediaCombustivel = totalCombustivel/Object.keys(carros).length;
    const mediaQuilometros = totalQuilometros/Object.keys(carros).length;
    const mediaDesempenho = totalDesempenho/Object.keys(carros).length;

    document.getElementById("total-combustivel").innerText = String(parseFloat(totalCombustivel).toFixed(1)).replace(".", ",") + " l";
    document.getElementById("total-quilometros").innerText = String(parseFloat(totalQuilometros).toFixed(1)).replace(".", ",") + " km";
    document.getElementById("media-combustivel").innerText = String(parseFloat(mediaCombustivel).toFixed(1)).replace(".", ",") + " l";
    document.getElementById("media-quilometros").innerText = String(parseFloat(mediaQuilometros).toFixed(1)).replace(".", ",") + " km";
    document.getElementById("media-desempenho").innerText = String(parseFloat(mediaDesempenho).toFixed(2)).replace(".", ",") + " km/l";

    informacoesFinais.style.display = "block";
});

function removerTodos() {
    carros = {};
    limparTabela();
    informacoesFinais.style.display = "none";
}

function atualizarValor(valor, uuid, key) {
    if(valor === "") {
        carros[uuid][key] = null;
    } else {
        carros[uuid][key] = Number(parseFloat(valor));
    }

    atualizarDesempenho(uuid);
    informacoesFinais.style.display = "none";
}

function atualizarDesempenho(uuid) {
    const { combustivel, quilometros } = carros[uuid];
    const desempenhoCell = document.getElementById(uuid + "-desempenho-cell");

    if((combustivel === null) || (quilometros === null)) {
        carros[uuid].desempenho = null;
        desempenhoCell.innerText = "-";
    } else {
        carros[uuid].desempenho = quilometros/combustivel;
        desempenhoCell.innerText = String(parseFloat(carros[uuid].desempenho).toFixed(2)).replace(".", ",") + " km/l";
    }
}

function deletarCarro(uuid) {
    delete carros[uuid];

    informacoesFinais.style.display = "none";

    limparTabela();
    povoarTabela();
}

function resetarCarro(uuid) {
    carros[uuid] = {
        uuid,
        combustivel: null,
        quilometros: null,
        desempenho: null
    };

    informacoesFinais.style.display = "none";

    limparTabela();
    povoarTabela();
}

function limparTabela() {
    const tabela = document.getElementById("tabela-carros");
    const corpo = tabela.getElementsByTagName("tbody")[0];

    Array.from(corpo.getElementsByTagName("tr")).forEach((linha) => {
        linha.remove();
    });
}

function povoarTabela() {
    const tabela = document.getElementById("tabela-carros");
    const corpo = tabela.getElementsByTagName("tbody")[0];

    Object.keys(carros).forEach((uuid) => {
        const linha = corpo.insertRow();

        const combustivelCell = linha.insertCell();
        const inputCombustivel = document.createElement("input");
        inputCombustivel.type = "number";
        inputCombustivel.placeholder = "Combustível";
        inputCombustivel.value = carros[uuid].combustivel;
        inputCombustivel.onblur = () => atualizarValor(inputCombustivel.value, uuid, "combustivel");
        combustivelCell.appendChild(inputCombustivel);
    
        const quilometroCell = linha.insertCell();
        const inputQuilometro = document.createElement("input");
        inputQuilometro.type = "number";
        inputQuilometro.placeholder = "Quilômetros";
        inputQuilometro.value = carros[uuid].quilometros;
        inputQuilometro.onblur = () => atualizarValor(inputQuilometro.value, uuid, "quilometros");
        quilometroCell.appendChild(inputQuilometro);
    
        const desempenhoCell = linha.insertCell();
        desempenhoCell.id = uuid + "-desempenho-cell";
        atualizarDesempenho(uuid);
    
        const acoesCell = linha.insertCell();
    
        const botaoDeletar = document.createElement("button");
        botaoDeletar.innerText = "Deletar";
        botaoDeletar.onclick = () => deletarCarro(uuid);
        acoesCell.appendChild(botaoDeletar);
    
        const botaoResetar = document.createElement("button");
        botaoResetar.innerText = "Resetar";
        botaoResetar.onclick = () => resetarCarro(uuid);
        acoesCell.appendChild(botaoResetar);
    });
}

// Fonte: https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid?page=3&tab=votes#tab-top
function createGuid(){  
    let S4 = () => Math.floor((1+Math.random())*0x10000).toString(16).substring(1); 
    let guid = `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
    
    return guid.toLowerCase();  
 }