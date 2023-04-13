import { requisicoes } from "./requisicao.js";
import { ajustes } from "./comum.js";

const containerItemProdutos = document.querySelector(
    ".container-item-produtos"
);
const containerSimilares = document.querySelector(".container-items");

let urlId = window.location.search;

const idProdutosExibidos = [];
const produtosSimilares = [];

const token = localStorage.getItem("token");

window.addEventListener("DOMContentLoaded", function () {
    urlId = urlId.replace("?id=", "");

    // console.log(urlId);

    const get = async () => {
        const promisse = await fetch(
            "http://localhost:5000/products" + "/" + urlId,
            {
                headers: {
                    authorization: token,
                },
            }
        );
        const response = await promisse.json();

        ajustes.exibirInfoUsuario();

        // requisicoes.requisicaoGet.then((data) => {

        // data.find((produto) => {
        //     return produto.id === urlId;
        // });

        const { data: produtoPrincipal } = response;
        const categoriaProdutoPrincipal = produtoPrincipal.categoria;

        idProdutosExibidos.push(produtoPrincipal.id);

        containerItemProdutos.innerHTML = `
                <div class="item-principal">
                    <div class="container-img-principal">
                        <img
                            src="${produtoPrincipal.img_path}"
                            alt="caneca stormtrooper"
                        />
                    </div>
                    <div class="container-text-principal">
                        <h3 class="nome-produto-principal">
                            ${produtoPrincipal.nome}
                        </h3>
                        <p class="preco-produto-princial bold">R$ ${ajustes.formatarPreco(
                            produtoPrincipal.preco
                        )}</p>
                        <p class="descricao-produto-principal">
                            ${produtoPrincipal.descricao}
                        </p>
                    </div>
                </div>`;

        const get = async () => {
            const promisse = await fetch("http://localhost:5000/products");
            const response = await promisse.json();
            const { data } = response;

            const itensMesmaCategoria = ajustes.filtraItensPorCategoria(
                data,
                categoriaProdutoPrincipal
            );

            itensMesmaCategoria.forEach((item) => {
                if (!idProdutosExibidos.includes(item.id)) {
                    idProdutosExibidos.push(item.id);
                    produtosSimilares.push(item);
                }
            });

            for (let i = produtosSimilares.length; i < 6; i++) {
                let produtoSimilar;
                let numAleatorio = gerarNumAleatorio(data, idProdutosExibidos);

                if (numAleatorio !== undefined) {
                    produtoSimilar = data.find((produto) => {
                        return produto.id === numAleatorio;
                    });

                    produtosSimilares.push(produtoSimilar);
                    idProdutosExibidos.push(produtoSimilar.id);
                } else {
                    i--;
                }
            }

            containerSimilares.innerHTML =
                ajustes.gerarItens(produtosSimilares);
        };

        get();

        // });
    };
    get();
});

function gerarNumAleatorio(data, arrId) {
    let arr = [];

    while (arr.length < 1) {
        let aleatorio = Math.ceil(Math.random() * data.length);

        if (arrId.indexOf(aleatorio) === -1) {
            arr.push(aleatorio);

            if (arr.length !== 0 && arr.includes(aleatorio)) {
                return aleatorio;
            }
        }
    }
}
