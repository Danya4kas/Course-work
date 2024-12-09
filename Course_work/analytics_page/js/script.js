

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


