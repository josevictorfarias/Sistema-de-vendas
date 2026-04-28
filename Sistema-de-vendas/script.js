let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

function salvar() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

function adicionarProduto() {
    let nome = document.getElementById("nome").value;
    let preco = document.getElementById("preco").value;
    let quantidade = document.getElementById("quantidade").value;

    if (!nome || !preco || !quantidade) {
        alert("Preencha tudo!");
        return;
    }

    produtos.push({ nome, preco, quantidade });
    salvar();
    atualizarLista();
}

function atualizarLista() {
    let lista = document.getElementById("listaProdutos");
    lista.innerHTML = "";

    produtos.forEach((p, i) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <span>${p.nome} - R$ ${p.preco} - Qtd: ${p.quantidade}</span>
            <div>
                <button onclick="vender(${i})">Vender</button>
                <button onclick="remover(${i})">Excluir</button>
            </div>
        `;

        lista.appendChild(li);
    });
}

function remover(i) {
    produtos.splice(i, 1);
    salvar();
    atualizarLista();
}

function vender(i) {
    if (produtos[i].quantidade > 0) {
        produtos[i].quantidade--;
        salvar();
        atualizarLista();
    } else {
        alert("Sem estoque");
    }
}

atualizarLista();