document.getElementById("saldo").innerText = String(parseFloat(saldo).toFixed(2)).replace(".", ",");

document.getElementById("formulario-de-transferencia").addEventListener("submit", (e) => {
    e.preventDefault();

    // 1. Pegar valores dos inputs
    const valor = document.getElementById("valor").value;
    const chave = document.getElementById("chave-pix").value;

    // 2. Verificar se os valores inseridos estão corretos
    if((valor.length === 0) || (chave.length === 0))
        return console.log("Algum dos valores inseridos está incorreto.");

    // 3. Efetuar uma transferencia pix
    const novoSaldo = transferenciaPIX(valor, chave);

    // 4. Atualizar saldo da conta bancária
    document.getElementById("saldo").innerText = String(parseFloat(novoSaldo).toFixed(2)).replace(".", ",");

    // 5. Resetar corpo da tabela de histórico
    const tabela = document.getElementById("tabela-historico");
    const corpo = tabela.getElementsByTagName("tbody")[0];

    // 5.1. Limpar tudo que está no corpo da tabela
    Array.from(corpo.getElementsByTagName("tr")).forEach((linha) => {
        linha.remove();
    });

    // 5.2 Reescrever corpo da tabela com o histórico atualizado
        historico.forEach((elemento) => {
        const linha = corpo.insertRow();

        const dia = new Date(elemento.dia).toLocaleDateString("pt-BR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });

        const atalhoCell = linha.insertCell();
        const buttonAtalho = document.createElement("button");
        buttonAtalho.innerText = "Refazer";
        buttonAtalho.onclick = () => atalhoTransferencia(elemento.valor, elemento.chave);
        atalhoCell.appendChild(buttonAtalho);

        const diaCell = linha.insertCell();
        diaCell.innerText = dia;

        const chaveCell = linha.insertCell();
        chaveCell.innerText = elemento.chave;

        const codigoBancoCell = linha.insertCell();
        codigoBancoCell.innerText = elemento.banco.code;

        const nomeBancoCell = linha.insertCell();
        nomeBancoCell.innerText = elemento.banco.name;

        const valorCell = linha.insertCell();
        valorCell.innerText = "R$" + String(parseFloat(elemento.valor).toFixed(2)).replace(".", ",");
    });
});

function atalhoTransferencia(valor, chave) {
    document.getElementById("valor").value = valor;
    document.getElementById("chave-pix").value = chave;
}

function limparHistorico() {
    // 1. Limpar tudo que está no corpo da tabela
    const tabela = document.getElementById("tabela-historico");
    const corpo = tabela.getElementsByTagName("tbody")[0];

    Array.from(corpo.getElementsByTagName("tr")).forEach((linha) => {
        linha.remove();
    });

    while(historico.length > 0) {
        historico.pop();
    }
}

function aumentarSaldo(valor) {
    const novoSaldo = simularRecebimento(valor);

    // 4. Atualizar saldo da conta bancária
    document.getElementById("saldo").innerText = String(parseFloat(novoSaldo).toFixed(2)).replace(".", ",");
}