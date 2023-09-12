$(document).ready(function(){

    function carregarProdutos(){
        $.ajax({
            url:'http://localhost:3000/products',
            method: 'GET',
            success:function(produtos){
                const produtosDiv = $('#produtos');
                produtos.forEach(function (produto){
                    const produtoDiv = $ ('<div>');
                    produtoDiv.html(`<img src="${produto.imagem}"width="100">
                    <p>${produto.nome_produto}</p>
                    <p>Preço: R$ ${produto.valor}</p>
                    <input type="number"
                    class="quantidade"
                    placeholder="Quantidade"
                    min="1" value="1">
                    <button class="adicionar"
                    data-id="${produto.id}">Adicionar ao carrinho</button>
                    `);
                     produtosDiv.append(produtoDiv)
                },
                $('#produtos').on('click','.adicionar',function(){
                    const produtoId = $(this).data('id');
                    const quantidade = $(this).siblings('.quantidade').val();
                    const produtoSelecionado = {
                        id: produtoId,
                        quantidade: quantidade
                    };

                    const carrinho = JSON.parse
                    (localStorage.getItem
                    ('carrinho')) || [];
                    carrinho.push(produtoSelecionado);
                    localStorage.setItem('carrinho', JSON.stringify(carrinho))
                    console.log(carrinho)
                })
                
                
                )},
                error: function(){
                    alert('Erro ao carregar os produtos')
                }
        })
    }
    carregarProdutos()



})