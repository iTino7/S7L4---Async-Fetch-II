const query = "nature";
const URL = `https://api.pexels.com/v1/search?query=${query}`;
const API_KEY = "Lr2WC3D2F8dqsOtzIkuBFIZvkXsiL4957dK7Hmuwpe9xmuBee8PwoTm3";

const loadBtn = document.querySelector(".btn-primary");
const rowContainer = document.querySelector(".row");
const newValue = {};

const getUrl = () => {
  fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: API_KEY,
    },
  })
    .then((resp) => {
      console.log(resp);
      if (!resp.ok) {
        throw new Error("Errore nella fetch");
      }
      return resp.json();
    })
    .then((data) => {
      rowContainer.innerHTML = "";

      data.photos.forEach((photo) => {
        const col = document.createElement("div");
        col.className = "col-md-4";
        col.innerHTML = `
        <div class="card mb-4 shadow-sm">
          <img src="${photo.src.medium}" class="bd-placeholder-img card-img-top" />
          <div class="card-body">
            <h5 class="card-title">${photo.photographer}</h5>
            <p class="card-text">Photo by ${photo.photographer} from Pexels.</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <a href="${photo.url}" target="_blank" class="btn btn-sm btn-outline-secondary">View</a>
                <button type="button" class="btn btn-sm btn-outline-secondary">Like</button>
              </div>
              <small class="text-muted">${photo.id}</small>
            </div>
          </div>
        </div>
      `;
        rowContainer.appendChild(col);
      });
    })
    .catch((error) => console.log(error));
};

window.onload = () => {
  loadBtn.addEventListener("click", getUrl);
  getUrl();
};
