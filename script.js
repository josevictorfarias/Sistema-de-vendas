let produtos = [
    { nome: "Mouse Gamer", preco: 120, categoria: "gamer", img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7" },
    { nome: "Teclado Mecânico", preco: 250, categoria: "gamer", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8" },
    { nome: "Headset Gamer", preco: 180, categoria: "gamer", img: "https://images.unsplash.com/photo-1580894908361-967195033215" },
    { nome: "Notebook", preco: 3500, categoria: "pc", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853" },
    { nome: "Monitor", preco: 900, categoria: "pc", img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7" },
    { nome: "Smartphone", preco: 2000, categoria: "celular", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9" },
    { nome: "Tablet", preco: 1500, categoria: "celular", img: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7" },
    { nome: "TV", preco: 2500, categoria: "tv", img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1" },
    { nome: "Soundbar", preco: 900, categoria: "tv", img: "https://images.unsplash.com/photo-1593784991095-a205069470b6" }
];

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function mostrarProdutos(lista) {
    let div = document.getElementById("produtos");
    div.innerHTML = "";

    lista.forEach((p) => {
        let item = document.createElement("div");
        item.className = "card";
        item.innerHTML = `
            <img src="${p.img}">
            <h3>${p.nome}</h3>
            <p>R$ ${p.preco.toFixed(2)}</p>
            <button onclick='addProduto(${JSON.stringify(p)})'>Adicionar ao Carrinho</button>
        `;
        div.appendChild(item);
    });
}

function addProduto(p) {
    carrinho.push(p);
    atualizarCarrinho();
}

function remover(i) {
    carrinho.splice(i, 1);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    let lista = document.getElementById("listaCarrinho");
    let total = 0;
    lista.innerHTML = "";

    carrinho.forEach((p, i) => {
        let li = document.createElement("li");
        li.innerHTML = `${p.nome} - R$ ${p.preco} <button onclick="remover(${i})">❌</button>`;
        lista.appendChild(li);
        total += p.preco;
    });

    document.getElementById("total").textContent = "Total: R$ " + total.toFixed(2);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function finalizarCompra() {
    let total = carrinho.reduce((sum, p) => sum + p.preco, 0);
    let tipo = document.getElementById("pagamento").value;
    let pago = Number(document.getElementById("valorPago").value);

    if (carrinho.length === 0) return alert("Carrinho vazio!");
    if (!tipo) return alert("Escolha o pagamento!");

    if (tipo === "dinheiro") {
        if (pago < total) return alert("Valor insuficiente!");
        document.getElementById("troco").textContent = "Troco: R$ " + (pago - total).toFixed(2);
    } else {
        document.getElementById("troco").textContent = "Pago no Cartão com sucesso!";
    }

    carrinho = [];
    atualizarCarrinho();
}

function filtrar() {
    let texto = document.getElementById("busca").value.toLowerCase();
    let cat = document.getElementById("categoria").value;
    let filtrados = produtos.filter(p => 
        p.nome.toLowerCase().includes(texto) && (cat === "" || p.categoria === cat)
    );
    mostrarProdutos(filtrados);
}

// Inicialização
mostrarProdutos(produtos);
atualizarCarrinho();