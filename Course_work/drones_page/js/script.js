async function loadPage() {
  checkTheme();

  const page = document.getElementById("index_page");

  if (page) {
    const items = await fetch("./items.json").then((response) =>
      response.json()
    );

    const params = getAddressParameters();

    let outputItems = "drones";
    if (params.type) outputItems = params.type.toLowerCase();

    for (let i = 0; i < items[outputItems].length; i++) {
      const drone = items[outputItems][i];
      createItemCard(drone);
    }
  }

  await loadLanguage();
}

async function createItemCard(drone) {
  const lang = getCurrentLanguage().toUpperCase();
  const language = await fetch(`./lang.json`).then((response) =>
    response.json()
  );

  const data = language[lang];
  const currency = data.currency;
  const amountText = data.amount;

  const droneCard = document.createElement("div");
  droneCard.classList.add("drone-card");
  const images = document.createElement("div");
  images.classList.add("images");
  const mainImage = document.createElement("img");
  mainImage.classList.add("main-image");
  mainImage.src = `./images/${drone.image}`;
  images.appendChild(mainImage);
  const topRightImages = document.createElement("div");
  topRightImages.classList.add("top-right-images");
  const droneLink = document.createElement("a");
  droneLink.href = "#";
  topRightImages.appendChild(droneLink);
  const droneImage = document.createElement("img");
  droneImage.classList.add("drone");
  droneImage.src = "./icons/screw-driver.svg";
  droneLink.appendChild(droneImage);
  // <a><img class="compare" src="./icons/compare.svg" /></a>
  const compareLink = document.createElement("a");
  compareLink.href = "#";
  topRightImages.appendChild(compareLink);
  const compareImage = document.createElement("img");
  compareImage.classList.add("compare");
  compareImage.src = "./icons/compare.svg";
  //my code
  compareLink.onclick = () => {
    let ids = localStorage["selected_ids"];
    if (ids) {
      if (ids.split(",").length > 1) {
        alert("Comparison is full");
      } else if (!ids.split(",").includes(drone.id + "")) {
        localStorage["selected_ids"] += "," + drone.id;
      }
    } else {
      localStorage["selected_ids"] = drone.id;
    }
  };
  compareLink.appendChild(compareImage);
  // <a><img class="add_to_analitic" src="./icons/plus.svg" /></a>
  const addLink = document.createElement("a");
  addLink.href = "#";
  topRightImages.appendChild(addLink);
  const addImage = document.createElement("img");
  addImage.classList.add("add_to_analitic");
  addImage.src = "./icons/plus.svg";
  addLink.appendChild(addImage);
  images.appendChild(topRightImages);
  const text = document.createElement("div");
  text.classList.add("text");
  const h6 = document.createElement("h6");

  const params = getAddressParameters();
  const outputItems = params.type ? params.type.toLowerCase() : "drones";

  const link = document.createElement("a");
  link.href = `./item.html?id=${drone.id}&type=${outputItems}`;
  link.textContent = drone.name;
  h6.appendChild(link);
  text.appendChild(h6);
  const info = document.createElement("div");
  info.classList.add("info");
  const price = document.createElement("p");
  const currencySpan = document.createElement("span");
  currencySpan.id = "lang-currency";
  currencySpan.textContent = currency;
  price.textContent = `${drone.price} `;
  price.appendChild(currencySpan);
  info.appendChild(price);
  const amount = document.createElement("p");
  amount.textContent = `${drone.amount} `;
  const amountSpan = document.createElement("span");
  amountSpan.id = "lang-amount";
  amountSpan.textContent = amountText;
  amount.appendChild(amountSpan);
  info.appendChild(amount);
  text.appendChild(info);
  droneCard.appendChild(images);
  droneCard.appendChild(text);
  document.querySelector(".drones").appendChild(droneCard);
  console.log("Drones:" + document.querySelector(".drones"));
}

async function sort() {
  const drones = await fetch("./items.json").then((response) =>
    response.json()
  );

  const sortedDrones = drones.drones.sort((a, b) => {
    if (document.querySelector("#sort").value === "rating") {
      return b.rating - a.rating;
    } else if (document.querySelector("#sort").value === "descending") {
      return b.price - a.price;
    } else if (document.querySelector("#sort").value === "ascending") {
      return a.price - b.price;
    }
  });

  document.querySelector(".drones").innerHTML = "";
  sortedDrones.forEach((drone) => {
    createItemCard(drone);
  });
}

function getCurrentLanguage() {
  const lang = localStorage.getItem("lang");
  if (!lang) {
    localStorage.setItem("lang", "UA");
    return "UA";
  }

  return lang;
}

function setHeaderLang(lang) {
  const langSwitch = document.getElementById("language");
  console.log(langSwitch);
  if (langSwitch) {
    langSwitch.value = lang;
  }
}

async function loadLanguage() {
  const lang = getCurrentLanguage();

  setHeaderLang(lang);

  const language = await fetch(`./lang.json`).then((response) =>
    response.json()
  );

  const data = language[lang];
  console.log(data);

  Object.keys(data).forEach((key) => {
    const elements = document.querySelectorAll(`[id="lang-${key}"]`);

    elements.forEach((element) => {
      element.innerHTML = data[key];
    });
  });
}

function changeLanguage() {
  const lang = document.getElementById("language").value;
  localStorage.setItem("lang", lang);
  loadLanguage();
}

function checkTheme() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    changeTheme();
  }
}

function changeTheme() {
  const body = document.querySelector("body");
  body.classList.toggle("dark-theme");

  if (body.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "bx-sun");
  } else {
    localStorage.setItem("light_theme", "bx-moon");
  }
}

// window.addEventListener("load", loadPage);
document.addEventListener("DOMContentLoaded", loadPage);
