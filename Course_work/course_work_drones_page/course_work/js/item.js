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
}

window.addEventListener("load", loadInfo);
