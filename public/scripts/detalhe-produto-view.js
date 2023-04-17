const data = [
    { src: "./img1.png" },
    { src: "./9939ddd1f6b07073b62745d7962e2d4b.jpg" },
    // { src: "./1681647511841.jpg" },
    // { src: "./img1.png" },
    // { src: "./9939ddd1f6b07073b62745d7962e2d4b.jpg" },
    // { src: "./1681647511841.jpg" },
    // { src: "./img1.png" },
    // { src: "./9939ddd1f6b07073b62745d7962e2d4b.jpg" },
    // { src: "./1681647511841.jpg" },
];

const containerImgs = document.querySelector(".container-img-miniatura");
const slider = document.querySelector(".slider");

containerImgs.innerHTML = data
    .map(({ src }, id) => {
        return `<div class="img-miniatura-container" data-id="${id}">
                <img class="img img-miniatura"
                    src="${src}"
                    alt=""
                    draggable="false"
                />
            </div>`;
    })
    .join("");

slider.innerHTML = data
    .map(({ src }) => {
        return `<img
                                class="img img-principal"
                                src=${src}
                                alt=""
                            />`;
    })
    .join("");

const mainImgs = document.querySelectorAll(".img-principal");

const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

mainImgs.forEach((img, index) => {
    img.style.left = `${index * 100}%`;
});

let count = 0;

next.addEventListener("click", () => {
    count++;
    carousel();
});
prev.addEventListener("click", () => {
    count--;
    carousel();
});

const carousel = () => {
    if (count == mainImgs.length) {
        count = 0;
    }
    if (count < 0) {
        count = mainImgs.length - 1;
    }

    console.log(count);

    mainImgs.forEach((img) => {
        img.style.transform = `translateX(-${count * 100}%)`;
    });
};

// containerImgs.addEventListener("mousedown", (e) => {
//     posicaoInicio = e.screenY;

//     const firstImg = containerImg[0];
//     const lastImg = containerImg[containerImg.length - 1];

//     const maxTop = containerImgs.getBoundingClientRect().top;
//     const maxbottom = containerImgs.getBoundingClientRect().bottom;

//     let lastImgbottom = lastImg.getBoundingClientRect().bottom;

//     if (lastImgbottom < maxbottom) {
//         return;
//     }

//     const dif = maxbottom - lastImgbottom;

//     const moveImage = (e) => {
//         if (posicaoInicio !== null) {
//             posicaoFinal = e.screenY;
//             diferenca = posicaoFinal - posicaoInicio;

//             containerImg.forEach((element) => {
//                 element.style.transform = `translateY(${diferenca}px)`;
//             });
//         }
//     };

//     window.addEventListener("mousemove", moveImage);

//     window.addEventListener("mouseup", (e) => {
//         window.removeEventListener("mousemove", moveImage);

//         let firstImgTop = firstImg.getBoundingClientRect().top;
//         let lastImgbottom = lastImg.getBoundingClientRect().bottom;

//         console.log(maxTop);
//         if (firstImgTop > maxTop) {
//             containerImg.forEach((element) => {
//                 element.style.transform = `translateY(${0}px)`;
//             });
//         } else if (lastImgbottom < maxbottom) {
//             containerImg.forEach((element) => {
//                 element.style.transform = `translateY(${dif}px)`;
//             });
//         } else {
//             return;
//         }

//         posicaoInicio = null;
//         posicaoFinal = null;
//         diferenca = null;

//         // posicaoInicio = null;
//         // posicaoFinal = null;
//         // containerImgs.removeEventListener("mousemove", moveImage);
//     });
// });
