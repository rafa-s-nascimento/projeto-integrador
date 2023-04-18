function formatarPreco(valor) {
    let pattern = /\d+\.\d{2}/;
    let newValue = valor.toString();

    if (!newValue.includes(".")) {
        newValue = valor + ".";
    }

    while (!newValue.match(pattern)) {
        newValue = newValue + 0;
    }

    return newValue.replace(".", ",");
}

function gerarItens(array) {
    let innerHTML = array
        .map(function (produto) {
            return `<div class="item" data-id="${produto.id}">
                                <div class="container-img">
                                    <img src="${
                                        produto.img_path
                                    }" alt="${produto.nome}">
                                </div>
                                <p class="nome-produto">${produto.nome}</p>
                                <p class="preco-produto">R$ ${formatarPreco(
                                    produto.preco
                                )}</p>
                                <a href="detalhe-produto.html?id=${
                                    produto.id
                                }" class="link-produto">Ver produto</a>
                    </div>`;
        })
        .join("");
    return innerHTML;
}

function filtraItensPorCategoria(dados, categoria) {
    let itensCategoria = dados.filter((item) => {
        return item.categoria === categoria;
    });

    return itensCategoria;
}

function redirecionarAdm() {
    const token = sessionStorage.getItem("token");

    // const get = async () => {
    //     const promisse = await fetch("http://localhost:5000/gerenciar", {
    //         headers: {
    //             authorization: token,
    //         },
    //     })
    //         .then(async (res) => {
    //             const path = await res.json();
    //             window.location = path;
    //         })
    //         .catch((err) => console.log(err));
    // };

    // get();

    window.location = "./gerenciar.html";
}

function exibirInfoUsuario() {
    const loginBtn = document.querySelector(".link-login-btn");
    const perfilData = document.querySelector(".perfil-data");
    const perfilAvatar = document.querySelector(".perfil-avatar");
    const perfilNome = document.querySelector(".perfil-nome");

    const user_data = JSON.parse(sessionStorage.getItem("user_data"));

    if (user_data) {
        perfilData.removeEventListener("click", redirecionarAdm);

        perfilData.classList.add("show");
        loginBtn.classList.add("hide");

        perfilData.addEventListener("click", redirecionarAdm);

        perfilAvatar.src = user_data.img_path;
        perfilNome.textContent = user_data.nome;
    } else {
        loginBtn.classList.add("show");
    }
}

const testNome = (element) => {
    const pattern = /([a-zA-Z][\s-]?){2,29}/;

    const test = pattern.test(element.value);

    if (test) {
        element.removeAttribute("id");
    } else {
        element.setAttribute("id", "alert");
    }

    return test;
};
const testLogin = (element) => {
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const test = pattern.test(element.value);

    if (test) {
        element.removeAttribute("id");
    } else {
        element.setAttribute("id", "alert");
    }

    return test;
};

const testSenha1 = (element) => {
    const pattern = /^\d{6,8}$/;

    const test = pattern.test(element.value);

    if (test) {
        element.removeAttribute("id");
    } else {
        element.setAttribute("id", "alert");
    }

    return test;
};

const testSenha2 = (element, similar) => {
    const pattern = /^\d{6,8}$/;

    const test = pattern.test(element.value);
    const test2 = test && similar.value == element.value;

    if (test2) {
        element.removeAttribute("id");
    } else {
        element.setAttribute("id", "alert");
    }

    return test2;
};

const validarCookie = (cookieName) => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        if (cookies[i].trim().startsWith(cookieName)) {
            return true;
        }
    }

    return false;
};

export const ajustes = {
    gerarItens,
    formatarPreco,
    filtraItensPorCategoria,
    testNome,
    testLogin,
    testSenha1,
    testSenha2,
    exibirInfoUsuario,
    validarCookie,
};
