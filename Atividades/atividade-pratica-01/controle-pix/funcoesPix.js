var saldo = 500;
const historico = [];
const historicoDeTransferencia = {};
var bancos = null;

async function carregarBancos() {
    try {
        bancos = await (await fetch("https://brasilapi.com.br/api/banks/v1", { method: "get" })).json();
    } catch(err) {
        console.log("Algo deu errado.");
    }
}

carregarBancos();

function transferenciaPIX(valor, chave) {
    // 1. Verificar se as informações dos bancos já foram carregadas
    if(bancos === null)
        return console.log("O serviço não foi totalmente carregado, aguarde um momento.");

    var banco;

    // 2. Verificar se já foi feita alguma transferência para a chave PIX
    if(verificarSeChaveExiste(chave)) {
        banco = pegarContaUsandoChave(chave).banco;
    } else {
        banco = pegarBancoAleatorio();

        adicionarNoHistoricoDeTransferencia(chave, banco);
    }

    // 3. Calcular e atualizar o saldo após a transferência
    saldo -= parseFloat(valor).toFixed(2);

    // 4. Adicionar informações da transferência ao histórico
    historico.push({
        dia: new Date(),
        chave,
        banco,
        valor: Number(parseFloat(valor).toFixed(2))
    });

    return saldo;
}

function simularRecebimento(valor) {
    // 3. Calcular e atualizar o saldo após recebimento
    saldo += Number(parseFloat(valor).toFixed(2));

    return saldo;
}

function pegarBancoAleatorio() {
    return bancos[Math.floor(Math.random() * bancos.length)];
}

function adicionarNoHistoricoDeTransferencia(chave, banco) {
    historicoDeTransferencia[chave] = { banco };
}

function pegarContaUsandoChave(chave) {
    return historicoDeTransferencia[chave];
}

function verificarSeChaveExiste(chave) {
    return Boolean(historicoDeTransferencia[chave]);
}