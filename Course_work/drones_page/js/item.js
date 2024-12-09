async function loadInfo() {
  const id = new URLSearchParams(window.location.search).get("id");

  const itemInfo = await fetch(`./items.json`).then((response) =>
    response.json()
  );

  const params = getAddressParameters();
  const outputItems = params.type ? params.type.toLowerCase() : "drones";

  const titleTag = document.getElementsByClassName("page_title")[0];
  if (titleTag) {
    titleTag.id = "lang-" + outputItems;
  }

  const currentItem = itemInfo[outputItems].find((item) => item.id == id);

  console.log(currentItem);
  if (currentItem) {
    document.getElementById("title").innerHTML = currentItem.name;
    document.getElementById("item-image").src = `./images/${currentItem.image}`;
  }

  const lang = getCurrentLanguage();
  const language = await fetch(`./lang.json`).then((response) =>
    response.json()
  );

  const data = language[lang];
  const currency = data.currency;
  const priceText = data.price;
  if (priceText != null && document.getElementById("lang-price") != null) {
    document.getElementById("lang-price").innerHTML = priceText;
  }
  document.getElementById("price").innerHTML = currentItem.price;
  document.getElementById("lang-currency").innerHTML = currency;

  // characteristics
  const characteristics = document.getElementById("item-characteristics");

  if (
    currentItem.characteristics == null ||
    currentItem.characteristics.length == 0
  ) {
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

  for (let i = 0; i < currentItem.characteristics.length; i++) {
    const characteristic = currentItem.characteristics[i];
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
