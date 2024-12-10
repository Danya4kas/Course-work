

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



  function parsePrice(price) {
    return parseFloat(price.replace(' грн', '').replace(',', '.'));
  }


  function parseDate(date) {
    let [day, month, year] = date.split('.');
    return new Date(year, month - 1, day);
  }

  function parsePrice(price) {
    return parseFloat(price.replace(/\s|грн/g, '').replace(',', '.'));
  }


  function parseDate(date) {
    let [day, month, year] = date.split('.');
    return new Date(year, month - 1, day);
  }


  function sort() {
    const sortPrice = document.querySelectorAll('.sort select')[0];
    const sortDate = document.querySelectorAll('.sort select')[1];
    const sortQuantity = document.querySelectorAll('.sort select')[2];

    const table = document.getElementById('droneTable');
    const rows = Array.from(table.querySelectorAll('tbody tr'));

 
    const priceSortValue = sortPrice.value;
    const dateSortValue = sortDate.value;
    const quantitySortValue = sortQuantity.value;


    if (priceSortValue === 'week') {
      rows.sort((a, b) => parsePrice(a.cells[3].textContent) - parsePrice(b.cells[3].textContent));
    } else if (priceSortValue === 'month') {
      rows.sort((a, b) => parsePrice(b.cells[3].textContent) - parsePrice(a.cells[3].textContent));
    } else if (priceSortValue === 'year') {
      rows.sort((a, b) => parsePrice(a.cells[3].textContent) - parsePrice(b.cells[3].textContent));
    }


    if (dateSortValue === 'week') {
      rows.sort((a, b) => parseDate(a.cells[1].textContent) - parseDate(b.cells[1].textContent));
    } else if (dateSortValue === 'month') {
      rows.sort((a, b) => parseDate(b.cells[1].textContent) - parseDate(a.cells[1].textContent));
    } else if (dateSortValue === 'year') {
      rows.sort((a, b) => parseDate(a.cells[1].textContent) - parseDate(b.cells[1].textContent));
    }

    
    if (quantitySortValue === 'week') {
      rows.sort((a, b) => a.cells[4].textContent - b.cells[4].textContent);
    } else if (quantitySortValue === 'month') {
      rows.sort((a, b) => b.cells[4].textContent - a.cells[4].textContent);
    } else if (quantitySortValue === 'year') {
      rows.sort((a, b) => a.cells[4].textContent - b.cells[4].textContent);
    }

    rows.forEach(row => table.querySelector('tbody').appendChild(row));
  }