// dark theme
document.getElementById("theme-toggle-sun").addEventListener("click", function () {
  document.body.classList.toggle("dark_theme");
  const themeIcon = this.querySelector("i");

  if (document.body.classList.contains("dark_theme")) {
    themeIcon.classList.replace("bx-sun", "bx-moon");
  } else {
    themeIcon.classList.replace("bx-moon", "bx-sun");
  }
});


const burgerMenu = document.getElementById('burger_menu');
const burgerDropdown = document.getElementById('burgerDropdown');
burgerMenu.addEventListener('click', (event) => {
  event.preventDefault(); 

  burgerDropdown.classList.toggle('open');
});


// language
document.addEventListener("DOMContentLoaded", function () {
  const languageToggle = document.getElementById("languageToggle");
  const languageArrow = document.getElementById("languageArrow");
  const languageDropdown = document.getElementById("languageDropdown");
  const dropdownItems = document.querySelectorAll(".dropdown_item");
  const translatableElements = document.querySelectorAll("[data-key]");

  const translations = {
    ua: {
      battery: "Акумулятор",
      motor: "Мотор",
      frame: "Рама",
      camera: "Камера",
      propeller: "Пропеллери",
      antenna: "Антена",
      drone: "Дрони",
      components: "Компоненти",
      comparasion: "Порівняння",
      list: "Список",
      footer_category: "Категорії",
      drone: "Дрони",
      components: "Компоненти",
      comparasion: "Порівняння",
      list: "Збірка",
      footer_contacts: "Контакти",
      footer_socials: "Ми в соцмережах",
      location_footer: "Львів, Україна",
      footer_bottom: "© 2024 Danya4ka. Всі права захищені.",
      banner_header: "Отримуй інформацію про новинки!",
      banner_text: "Підписуйся на нашу розсилку, щоб отримати ексклюзивні пропозиції!",
      banner_button: "Підписатися",
    },
    en: {
      battery: "Battery",
      motor: "Motor",
      frame: "Frame",
      camera: "Camera",
      propeller: "Propellers",
      antenna: "Antenna",
      drone: "Drones",
      components: "Components",
      comparasion: "Comparison",
      list: "List",
      footer_category: "Categories",
      drone: "Drones",
      components: "Components",
      comparasion: "Comparison",
      list: "Assembly",
      footer_contacts: "Contacts",
      footer_socials: "We are on social media",
      location_footer: "Lviv, Ukraine",
      footer_bottom: "© 2024 Danya4ka. All rights reserved.",
      banner_header: "Get information on new products!",
      banner_text: "Subscribe to our newsletter to receive exclusive offers!",
      banner_button: "Subscribe",
    },
    de: {
      battery: "Batterie",
      motor: "Motor",
      frame: "Rahmen",
      camera: "Kamera",
      propeller: "Propeller",
      antenna: "Antenne",
      drone: "Drohnen",
      components: "Komponenten",
      comparasion: "Vergleich",
      list: "Liste",
      footer_category: "Kategorien",
      drone: "Drohnen",
      components: "Komponenten",
      comparasion: "Vergleich",
      list: "Zusammenbau",
      footer_contacts: "Kontakte",
      location_footer: "Lwiw, Ukraine",
      footer_socials: "Wir sind in sozialen Netzwerken",
      footer_bottom: "© 2024 Danya4ka. Alle Rechte vorbehalten.",
      banner_header: "Erhalte Informationen zu neuen Produkten!",
      banner_text: "Abonniere unseren Newsletter, um exklusive Angebote zu erhalten!",
      banner_button: "Abonnieren",
    },
    pl: {
      battery: "Akumulator",
      motor: "Silnik",
      frame: "Rama",
      camera: "Kamera",
      propeller: "Śmigła",
      antenna: "Antena",
      drone: "Drony",
      components: "Komponenty",
      comparasion: "Porównanie",
      list: "Lista",
      footer_category: "Kategorie",
      drone: "Drony",
      components: "Komponenty",
      comparasion: "Porównanie",
      list: "Zestawienie",
      footer_contacts: "Kontakty",
      footer_socials: "Jesteśmy w mediach społecznościowych",
      location_footer: "Lwów, Ukraina",
      footer_bottom: "© 2024 Danya4ka. Wszystkie prawa zastrzeżone.",
      banner_header: "Otrzymaj informacje o nowych produktach!",
      banner_text: "Zapisz się do naszego newslettera, aby otrzymać ekskluzywne oferty!",
      banner_button: "Zapisz się",
    },
    fr: {
      battery: "Batterie",
      motor: "Moteur",
      frame: "Cadre",
      camera: "Caméra",
      propeller: "Hélices",
      antenna: "Antenne",
      drone: "Drones",
      components: "Composants",
      comparasion: "Comparaison",
      list: "Liste",
      footer_category: "Catégories",
      drone: "Drones",
      components: "Composants",
      comparasion: "Comparaison",
      list: "Assemblage",
      footer_contacts: "Contacts",
      footer_socials: "Nous sommes sur les réseaux sociaux",
      location_footer: "Lviv, Ukraine",
      footer_bottom: "© 2024 Danya4ka. Tous droits réservés.",
      banner_header: "Recevez des informations sur les nouveaux produits!",
      banner_text: "Abonnez-vous à notre newsletter pour recevoir des offres exclusives!",
      banner_button: "S'abonner",
    },
  };
  

  function changeLanguage(lang) {
    localStorage.setItem("language", lang);
    translatableElements.forEach((element) => {
      const key = element.getAttribute("data-key");
      if (translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });

    document.getElementById("selectedLanguage").textContent = lang.toUpperCase();
    languageArrow.classList.replace("bx-chevron-down", "bx-chevron-up");
    languageDropdown.style.display = "none"; 
  }

  dropdownItems.forEach((item) => {
    item.addEventListener("click", function () {
      const selectedLang = this.getAttribute("data-lang");
      changeLanguage(selectedLang);
    });
  });

  languageToggle.addEventListener("click", function () {
    const isVisible = languageDropdown.style.display === "block";
    languageDropdown.style.display = isVisible ? "none" : "block";
    languageArrow.classList.toggle("bx-chevron-down", isVisible);
    languageArrow.classList.toggle("bx-chevron-up", !isVisible);
  });

  document.addEventListener("click", function (event) {
    if (
      !languageToggle.contains(event.target) &&
      !languageDropdown.contains(event.target)
    ) {
      languageDropdown.style.display = "none";
      languageArrow.classList.replace("bx-chevron-up", "bx-chevron-down");
    }
  });

  const savedLanguage = localStorage.getItem("language") || "ua";
  changeLanguage(savedLanguage);
});




document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let currentIndex = 0;
  let slideInterval;

//slider

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
      slide.style.transform = `translateX(-${index * 100}%)`;
    });
  }

 
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }


  function startSlideInterval() {
    slideInterval = setInterval(nextSlide, 5000); 
  }


  function stopSlideInterval() {
    clearInterval(slideInterval);
  }

  prevBtn.addEventListener("click", function () {
    stopSlideInterval();
    prevSlide();
    startSlideInterval();
  });

  nextBtn.addEventListener("click", function () {
    stopSlideInterval();
    nextSlide();
    startSlideInterval();
  });

  startSlideInterval();
});



const faq = document.querySelector(".faq_grid");
const faqCards = document.querySelectorAll('.faq_card');
faqCards.forEach(card => {
  card.addEventListener('click', () => {
     
      faqCards.forEach(c => {
          if (c !== card) {
              c.classList.remove('active'); 
          }
      });
      
      card.classList.toggle('active');
  });
});





//currency

const exchangeRateElement = document.getElementById("exchangeRate");
const apiKey = "12494d57b16409579143429c";
const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`; 

function updateExchangeRate() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const uahRate = data.conversion_rates.UAH;
      if (uahRate) {
        exchangeRateElement.textContent = `USD/UAH: ${uahRate.toFixed(2)} грн`;
      }
    })
 
}

updateExchangeRate();
setInterval(updateExchangeRate, 600000);  
