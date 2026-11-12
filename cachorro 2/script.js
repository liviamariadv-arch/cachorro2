const racas = document.getElementById("racas");
const quantidade = document.getElementById("quantidade");
const galeria = document.getElementById("galeria");
const mensagem = document.getElementById("mensagem");

//carregar todas as raças
async function carregarRacas(){
    try{
        const resposta = await fetch(
            "https://dog.ceo/api/breeds/list/all"
        );
        if(!resposta.ok)throw new Error ("Erro na API");

        const dados = await resposta.json();

        for (let raca in dados.message){
            const opcao = document.createElement("option");
            opcao.value = raca;
            opcao.textContent = raca;
            racas.appendChild(opcao)
        }
    } catch (erro){
        mensagem.textContent = "Erro ao carregar raças"
    }
}

//Exiir as imagens recebidas
function mostrarImagens(imagens){
    galeria.innerHTML = "";

    imagens.forEach(function(url){
    
        const imagem = document.createElement("img");
        imagem.src = url;
        imagem.alt = "Fotografia da raça escolhida";
        galeria.appendChild(imagem);
    }
);
}

//buscar imagens da API
async function buscarImagens(url){
    mensagem.textContent = "Carregando...";
    galeria.innerHTML = "";

    try{
        const resposta = await fetch(url);
        if (!resposta.ok) throw new Error("Erro na API - Erro ao buscar as imagens")

            const dados = await resposta.json();

            mostrarImagens(dados.message);
            mensagem.textContent = "";
    } catch(erro){
        mensagem.textContent = "Erro ao buscar imagens."
    }
}

//mostrar cachorros aleatorios
document.getElementById("aleatorios").addEventListener("click", function (){
    const numero = Number(quantidade.value);

    if(!Number.isInteger(numero) || numero< 1 || numero > 10) {
        mensagem.textContent = "Escolha um numero de 1 a 10";
        return;
    }

    buscarImagens (
        `https://dog.ceo/api/breeds/image/random/${numero}`
    );
});

//mostrar 3 cachorros da raça selecionada
document.getElementById("porRaca"). addEventListener("click", function(){
    const raca = racas.value;

    if(raca === ""){
        mensagem.textContent = "Selecione uma raça";
        return;
    }

    buscarImagens(
        `https://dog.ceo/api/breed/${raca}/images/random/3`
    );
});

//carrega as raças ao abrir a pagina
carregarRacas();
