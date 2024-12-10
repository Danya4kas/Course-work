async function search(data) {
  if (data.length < 3) return [];

  const response = await fetch(`./items.json`);
  const drones = await response.json();

  const filteredDrones = drones.drones.filter((drone) => {
    return (
      drone.name.toLowerCase().includes(data.toLowerCase()) ||
      drone.description.toLowerCase().includes(data.toLowerCase())
    );
  });

  return filteredDrones;
}

async function makeSearch(el, data) {
  if (!data || data.length < 3) {
    hideSearchResults();
    return;
  }

  el.addEventListener("focusin", () => makeSearch(el, el.value));

  let filteredDrones = await search(data);
  console.log(filteredDrones);

  if (filteredDrones.length > 0) {
    filteredDrones = filteredDrones.slice(0, 3);
    console.log(filteredDrones);
    drawSearchResults(filteredDrones);
  } else {
    hideSearchResults();
  }
}

function hideSearchResults() {
  const searchResults = document.getElementById("searchResults");

  if (searchResults && searchResults.style.display != "none") {
    console.log("hideSearchResults");
    searchResults.style.display = "none";
    searchResults.addEventListener("focusin", () => {
      makeSearch(searchResults, searchResults.textContent);
    });
  }
}

async function drawSearchResults(filteredDrones) {
  const searchResults = document.getElementById("searchResults");
  const searchResultsList = document.getElementById("searchResultsList");

  console.log("Draw");
  if (searchResults) {
    searchResults.style.display = "flex";

    const lang = getCurrentLanguage();
    const language = await fetch(`./lang.json`).then((response) =>
      response.json()
    );
    searchResultsList.replaceChildren();
    const data = language[lang];
    const currency = data.currency;

    filteredDrones.forEach((filteredDrones) => {
      const a = document.createElement("a");
      a.id = "searchResultItem";
      a.onclick = () =>
        (window.location.href = `./item.html?id=${filteredDrones.id}&type=drones`);
      const name = document.createElement("span");
      name.innerHTML = filteredDrones.name;
      a.appendChild(name);
      const price = document.createElement("span");
      price.innerHTML = `${filteredDrones.price} ${currency}`;
      a.appendChild(price);
      searchResultsList.appendChild(a);
    });
  }
}

onclick = (event) => {
  if (
    event.target.id != "searchField" &&
    event.target.id != "searchResults" &&
    event.target.id != "searchResultsItem"
  ) {
    console.log(event.target.id);
    hideSearchResults();
  }
};
