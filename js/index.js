const secaoCamisetas   = document.querySelector(".secaoCamisetas")

const secaoAcessorio   = document.querySelector(".secaoAcessorio")

function criarProduto (produto){
    let id        = produto.id
    let imagem    = produto.img
    let nome      = produto.nameItem
    let descricao = produto.description
    let valor     = produto.value
    let botao     = produto.addCart
    let secao     = produto.tag

    let tagLi       = document.createElement("li")
    let tagImg      = document.createElement("img")
    let tagH4Secao  = document.createElement("h4")
    let tagH3       = document.createElement("h3")
    let tagP        = document.createElement("p")
    let tagH4       = document.createElement("h4")
    let tagBotaoAdicionar = document.createElement("button")

    tagLi.classList.add("produto")
    tagH4Secao.classList.add("categoria")
    tagH4.classList.add("valorDoProduto")
    tagBotaoAdicionar.classList.add("botaoAdicionarCarrinho")

    tagImg.src           = imagem
    tagImg.alt           = nome
    tagH4Secao.innerText = secao
    tagH3.innerText      = nome 
    tagP.innerText       = descricao
    tagH4.innerText      = `R$ ${valor}`
    tagBotaoAdicionar.innerText  = botao
    tagBotaoAdicionar.id = id

    tagLi.appendChild(tagImg)
    tagLi.appendChild(tagH4Secao)
    tagLi.appendChild(tagH3)
    tagLi.appendChild(tagP)
    tagLi.appendChild(tagH4)
    tagLi.appendChild(tagBotaoAdicionar)
    
    return tagLi

}

function Camisetas (lista, referenciaHtml){
    for(let i = 0; i < lista.length; i ++){
        let produto = lista[i]
        if(produto.tag == "Camisetas"){
            let produtoCriado = criarProduto(produto)
            referenciaHtml.appendChild(produtoCriado)
        }
    }
}
Camisetas(data, secaoCamisetas)

function acessorios (lista, referenciaHtml){
    for(let i = 0; i <lista.length; i ++){
        let produto = lista[i]
        if(produto.tag == "Acessórios"){
            let produtoCriado = criarProduto (produto)
            referenciaHtml.appendChild(produtoCriado)
        }
    }
}
acessorios(data, secaoAcessorio)

const botoeProduto = document.querySelectorAll(".botaoAdicionarCarrinho")

let carrinho = []

for(let i = 0; i < botoeProduto.length; i++){
    let botao = botoeProduto[i]

    botao.addEventListener("click", function(event){
        let elemento = event.target
        let idElemento = elemento.id
        let id = parseInt(idElemento)
        let produtoEncontrado = data.find((element)=>{
            return element.id == id
        })
        
        if(produtoEncontrado){
            criarProdutoCarrinho(produtoEncontrado)
            carrinho.push(produtoEncontrado)
        }

        let containerCarrinhoVazio = document.querySelector(".carrinhoVazio")

        if(carrinho !== []){
            containerCarrinhoVazio.style.display = "none"
        }

        document.querySelector("#valorTotal").innerHTML = `R$ ${somaDosProdutos(carrinho)}.00`
    })

}

function somaDosProdutos(valor){
    let soma = 0
    for(let j = 0; j < valor.length; j ++){
         soma += +valor[j].value 
    }
    return soma
}

let contQuant = 0

function criarProdutoCarrinho(produto){

    contQuant++
    document.querySelector("#quantidadeProduto").innerHTML =`${contQuant}`
       
    let listaCarrinho = document.querySelector(".adicionarProduto")
    let id        = produto.id
    let imagem    = produto.img
    let nome      = produto.nameItem
    let descricao = produto.description
    let valor     = produto.value
    let botao     = produto.addCart
    let secao     = produto.tag

    let tagLi     = document.createElement("li")
    let tagDivImg = document.createElement("div")
    let tagImg    = document.createElement("img")
    let tagDivDetalhesProduto = document.createElement("div")
    let tagH3     = document.createElement("h3")
    let tagH4     = document.createElement("h4")
    let tagBotao  = document.createElement("button")

    tagLi.classList.add("produtosDoCarrinho")
    tagDivImg.classList.add("imgProdutoCarrinho")
    tagDivDetalhesProduto.classList.add("detalhesProdutoCarrinho")
    tagBotao.classList.add("removerProdutoCarrinho")

    tagImg.src         = imagem
    tagImg.alt         = nome
    tagH3.innerText    = nome 
    tagH4.innerText    = `R$ ${valor}`
    tagBotao.innerText = "Remover produto"

    tagBotao.addEventListener("click",function(event){
        let elemento = event.target
        let idElemento = elemento.id
        let id = parseInt(idElemento)
        let produtoEncontrado = data.find((element)=>{
            return element.id == id
        })
        let index = carrinho.indexOf(produtoEncontrado)
        
        carrinho.splice(index, 1)

        let tagLi = event.path[2]
        tagLi.remove()

        contQuant--
        document.querySelector("#quantidadeProduto").innerHTML =`${contQuant}`

        document.querySelector("#valorTotal").innerHTML = `R$ ${somaDosProdutos(carrinho)}.00`

        let containerCarrinhoVazio = document.querySelector(".carrinhoVazio")
        if(carrinho.length == 0){
            containerCarrinhoVazio.style.display = "block"
        }
    })
    
    tagLi.appendChild(tagDivImg)
    tagDivImg.appendChild(tagImg)
    tagLi.appendChild(tagDivDetalhesProduto)
    tagDivDetalhesProduto.appendChild(tagH3)
    tagDivDetalhesProduto.appendChild(tagH4)
    tagDivDetalhesProduto.appendChild(tagBotao)
    
    listaCarrinho.appendChild(tagLi)
}





