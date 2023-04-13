const logoutBtn = document.querySelector(".logout-btn");
const cadastrarBtn = document.querySelector(".cadastrar-produto-anc");

const token = sessionStorage.getItem("token");

if (!token) {
    window.location = "/login";
}

window.addEventListener("DOMContentLoaded", async function () {
    const getData = await fetch("http://localhost:5000/gerenciar", {
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

    logoutBtn.addEventListener("click", () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user_data");
    });
});
