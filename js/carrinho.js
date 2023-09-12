$(document).ready(function () {
    const carrinhoUl = $('#carrinho');
    const totalp = $('#total');

    const carrinhoItens = JSON.parse(localStorage.getItem('carrinho')) || [];
    console.log(carrinhoItens)

    function buscarProdutosApi(callback) {
        $.ajax({
            url: 'http://localhost:3000/products',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                callback(data),
                console.log(data)
            },
            error: function () {
                alert('Não foi possivel buscar os dados na API')
            }
        })
    }

    function exibeItensCarrinho() {
        carrinhoUl.empty();
        buscarProdutosApi(function (produtos) {
            carrinhoItens.forEach(function (item, index) {
                const produto = produtos.find(p => p.id === item.id);
                console.log(produto)
                if (produto) {
                    
                    const itemCarrinho = $('<li>')
                    itemCarrinho.html(`
                    <div class="produto">
                    <div class="imagem">
                    <img src="${produto.imagem}"alt="${produto.nome_produto}" width="100">
                    </div>
                    <div class="info">
                    <span>Produto:${produto.nome_produto}
                    <button class="diminuir-quantidade" data-index="${index}">-</button>
                    <span class = "quantidade">${item.quantidade}</span>
                    <button class="aumentar-quantidade" data-index="${index}">+</button>
                    <span>Subtotal: R$${(produto.valor * item.quantidade).toFixed(2)}
                    </div>
                    </div>
                    `)
                    carrinhoUl.append(itemCarrinho);
                    itemCarrinho.find('.diminuir-quantidade').click(function () {
                        diminuirQuantidade(index);
                    })
                    itemCarrinho.find('.aumentar-quantidade').click(function () {
                        aumentaQuantidade(index);
                    })
                }
                calcularTotal(produtos)
            })
        })
    }
    function aumentaQuantidade(itemIndex) {
        if (itemIndex >= 0 && itemIndex < carrinhoItens.length) {
            carrinhoItens[itemIndex].quantidade++;
            localStorage.setItem('carrinho', JSON.stringify(carrinhoItens))
            exibeItensCarrinho();
        }
    }
    function diminuirQuantidade(itemIndex) {
        if (itemIndex >= 0 && itemIndex < carrinhoItens.length) {
            if (carrinhoItens[itemIndex].quantidade > 1) {
                carrinhoItens[itemIndex].quantidade--;
                localStorage.setItem('carrinho', JSON.stringify(carrinhoItens))
                exibeItensCarrinho();
            }
        }
    }
    function calcularTotal(produtos) {
        let total = 0;
        carrinhoItens.forEach(function (item) {
            const produto = produtos.find(p => p.id === item.id);
            if (produto) {
                total += produto.valor * item.quantidade
            }
        })
        totalp.text(`Total: R$${total.toFixed(2)}`)
    }
    exibeItensCarrinho();

    $('#finalizarPedido').click(function () {
        if (carrinhoItens.length === 0) {
            alert('Seu carrinho está vazio, adicione um item antes de finalizar o pedido.')
            return;
        }
        localStorage.removeItem('carrinho')
        alert('pedido finalizado com sucesso!')
        location.reload();
        carrinhoUl.empty();
        totalp.text('Total: R$ 0.00');
    })
})