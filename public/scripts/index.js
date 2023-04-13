import { requisicoes } from "./requisicao.js";
import { ajustes } from "./comum.js";

const containerSection = document.querySelector(".container-section-items");

const token = sessionStorage.getItem("token");

window.addEventListener("DOMContentLoaded", () => {
    const get = async () => {
        const promisse = await fetch("http://localhost:5000/products", {
            headers: {
                authorization: token,
            },
        });

        ajustes.exibirInfoUsuario();

        const { data, user } = await promisse.json();

        // requisicoes.requisicaoGet.then((data) => {

        const categorias = data.reduce(function (ac, item) {
            if (!ac.includes(item.categoria)) {
                ac.push(item.categoria);
            }
            return ac;
        }, []);

        containerSection.innerHTML = categorias
            .map((categoria) => {
                let innerHTML = `
                    <section>
                        <div class="titulo-section-items">
                            <h3 id="${categoria}" class="titulo">${categoria}</h3>
                            <a href="produtos.html">
                                Ver tudo
                                <i class="fa-solid fa-arrow-right-long"></i>
                            </a>
                        </div>
                        <div class="container-item">
                            ${ajustes.gerarItens(
                                ajustes.filtraItensPorCategoria(data, categoria)
                            )}
                        </div>
                    </section>`;

                return innerHTML;
            })
            .join("");

        // });
    };

    get();
});
