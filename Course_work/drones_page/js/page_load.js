function main() {
  includeComponents();
}

window.addEventListener("load", main);

async function includeComponents() {
  document.querySelector("#header").innerHTML = await fetch(
    "./components/header.html"
  )
    .then((response) => response.text())
    .then((html) => {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      const lang = getCurrentLanguage();
      setHeaderLang(lang);
      return tempDiv.innerHTML;
    });

  document.querySelector("#navigation").innerHTML = await fetch(
    "./components/menu.html"
  )
    .then((response) => response.text())
    .then((html) => {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      loadLanguage();
      return tempDiv.innerHTML;
    });
}
