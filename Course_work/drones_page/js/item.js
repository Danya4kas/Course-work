async function loadInfo() {
  const id = new URLSearchParams(window.location.search).get("id");
  const type = new URLSearchParams(window.location.search).get("type");

  const droneInfo = await fetch(`./items.json`).then((response) =>
    response.json()
  );

  const drone = droneInfo.drones.find((drone) => drone.id == id);
  console.log(drone);
  if (drone) {
    document.getElementById("title").innerHTML = drone.name;
  }

  const lang = getCurrentLanguage();
  const language = await fetch(`./lang.json`).then((response) =>
    response.json()
  );

  const data = language[lang];
  const currency = data.currency;
  const priceText = data.price;
  document.getElementById("lang-price").innerHTML = priceText;
  document.getElementById("price").innerHTML = drone.price;
  document.getElementById("lang-currency").innerHTML = currency;

  // characteristics
  const characteristics = document.getElementById("item-characteristics");

  if (drone.characteristics == null || drone.characteristics.length == 0) {
    const row = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    td1.id = "lang-noCharacteristics";
    td2.id = "lang-noCharacteristics";
    td1.innerHTML = data["noCharacteristics"];
    td2.innerHTML = data["noCharacteristics"];
    row.appendChild(td1);
    row.appendChild(td2);
    characteristics.appendChild(row);
  }

  for (let i = 0; i < drone.characteristics.length; i++) {
    const characteristic = drone.characteristics[i];
    const row = document.createElement("tr");
    const td1 = document.createElement("td");
    const tag = "lang-" + characteristic.title;
    td1.id = tag;
    td1.classList.add("characteristic-title");
    td1.innerHTML = data[characteristic.title];
    const td2 = document.createElement("td");
    td2.innerHTML = characteristic.description;
    row.appendChild(td1);
    row.appendChild(td2);
    characteristics.appendChild(row);
  }
}

window.addEventListener("load", loadInfo);

// const drone = droneInfo.drones.find((drone) => drone.id == id);
//   console.log(drone);
//   if (drone){
//     document.getElementById("title").innerHTML = drone.name;

//     document.getElementById("item_image").src = "./images/" + drone.image;
//   }
