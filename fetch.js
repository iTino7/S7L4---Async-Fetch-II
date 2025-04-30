const URL = "https://api.pexels.com/v1/search";
const grid = document.getElementById("grid");
const firstBtn = document.getElementById("firstBtn");
const secondBtn = document.getElementById("secondBtn");
const input = document.getElementById("searchBox");

const API_KEY = "Lr2WC3D2F8dqsOtzIkuBFIZvkXsiL4957dK7Hmuwpe9xmuBee8PwoTm3";

const getImg = (query) => {
  fetch(URL + "?query=" + query, {
    headers: {
      Authorization: API_KEY,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Errore nella catch");
      }
      return res.json();
    })
    .then((photoData) => {
      grid.innerHTML = "";
      photoData.photos.forEach((data) => {
        console.log(data.alt);

        //DIV-CONTAINER
        const div = document.createElement("div");
        div.className = "col-md-4";

        //DIV-CONTAINER-IMG
        const containerDivImg = document.createElement("div");
        containerDivImg.className = "card mb-4 shadow-sm";

        //IMG
        const img = document.createElement("img");
        img.className = "bd-placeholder-img card-img-top";
        img.src = data.src.large;

        //CARD-BODY
        const containerBody = document.createElement("div");
        containerBody.className = "card-body";

        //H5-BODY
        const bodyH5 = document.createElement("h5");
        bodyH5.className = "card-title";
        bodyH5.innerHTML = data.photographer;

        //P-BODY
        const bodyP = document.createElement("p");
        bodyP.className = "card-text";
        bodyP.innerHTML = data.alt;

        //DIV-VIEW
        const containerView = document.createElement("div");
        containerView.className =
          "d-flex justify-content-between align-items-center";

        //BTN-CONTAINER
        const btnContainer = document.createElement("div");
        //BTN-VIEW
        const btnView = document.createElement("button");
        btnView.type = "button";
        btnView.className = "btn  btn-sm btn-outline-secondary";
        btnView.innerHTML = "view";
        //BTN-EDIT
        const btnEdit = document.createElement("button");
        btnEdit.type = "button";
        btnEdit.className = "btn  btn-sm btn-outline-secondary";
        btnEdit.innerHTML = "Edit";
        //SMALL
        const small = document.createElement("small");
        small.className = "text-muted";
        small.innerHTML = data.id;

        btnContainer.append(btnView, btnEdit);
        containerView.append(btnContainer, small);
        containerBody.append(bodyH5, bodyP, containerView);
        containerDivImg.append(img, containerBody);
        div.appendChild(containerDivImg);
        grid.appendChild(div);
      });
    })
    .catch((error) => console.log(error));
};

firstBtn.onclick = () => {
  getImg("city");
};

secondBtn.onclick = () => {
  getImg("dogs");
};

input.onchange = (e) => {
  getImg(e.target.value);
};
