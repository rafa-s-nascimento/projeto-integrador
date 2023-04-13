import { requisicoes } from "./requisicao.js";
import { ajustes } from "./comum.js";

const cadastrarBtn = document.querySelector(".cadastrar-btn");

const token = sessionStorage.getItem("token");

if (!token) {
    window.location = "/login";
}

window.addEventListener("load", async function () {
    const getData = await fetch("http://localhost:5000/cadastrar-produto", {
        headers: {
            authorization: token,
        },
    })
        .then((res) => {
            if (res.status != 200) {
                window.location = "/login";
            }
        })
        .catch(() => {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user_data");

            window.location = "/login";
        });

    cadastrarBtn.addEventListener("click", () => {
        const nome = document.querySelector(".nome-input");
        const intencao = document.querySelector(".intencao-input");
        const categoria = document.querySelector(".categoria-input");
        const tipo = document.querySelector(".tipo-input");
        const condicao = document.querySelector(".condicao-input");
        const visivel = document.querySelector(".visivel-input");
        const img = document.querySelector(".img-input");

        const form = new FormData();

        form.append("img", img.length > 1 ? [...img.files] : img.files[0]);
        form.append("nome", nome.value);
        form.append("intencao", intencao.value);
        form.append("categoria", categoria.value);
        form.append("tipo", tipo.value);
        form.append("condicao", condicao.value);
        form.append("visivel", visivel.checked);

        if (img.files.length > 0 && nome.value !== "") {
            const enviar = async () => {
                fetch("http://localhost:5000/cadastrar-produto", {
                    method: "POST",
                    headers: {
                        authorization: token,
                    },
                    body: form,
                });
            };

            enviar();
        }
    });
});

ajustes.exibirInfoUsuario();
