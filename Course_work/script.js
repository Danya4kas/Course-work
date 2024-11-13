// dark theme

document.getElementById("theme-toggle").addEventListener("click", function () {
  document.body.classList.toggle("dark_theme");
  const themeIcon = this.querySelector("i");

  if (document.body.classList.contains("dark_theme")) {
    themeIcon.classList.replace("bx-sun", "bx-moon");
  } else {
    themeIcon.classList.replace("bx-moon", "bx-sun");
  }
});

// search bar 
document
  .getElementById("search-toggle")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const searchBar = document.querySelector(".search_bar");
    searchBar.classList.toggle("active");
    searchBar.querySelector("input").focus();
  });


// seacrh bar objects

const search = () => {
  const search_box = document.getElementById("search_item").value.toLowerCase();
  const store_items = document.getElementById("product_list");
  const products = store_items.querySelectorAll(".product");

  products.forEach((product) => {
    const product_name = product.getElementsByTagName('h2')[0];

    if (product_name) {
      const text_value = product_name.textContent || product_name.innerHTML;

      if (text_value.toLowerCase().indexOf(search_box) > -1) {
        product.style.display = "";
      } else {
        product.style.display = "none";
      }
    }
  });
};

document.getElementById("search_item").addEventListener("keyup", search);




//currency

document.addEventListener("DOMContentLoaded", function () {
  const exchangeRateElement = document.getElementById("exchangeRate");
  const apiKey = "12494d57b16409579143429c";
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

  function updateExchangeRate() {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const uahRate = data.conversion_rates.UAH;
        if (uahRate) {
          exchangeRateElement.textContent = `USD/UAH: ${uahRate.toFixed(
            2
          )} грн`;
        } else {
          exchangeRateElement.textContent = "Course not found";
        }
      });
  }
  updateExchangeRate();

  setInterval(updateExchangeRate, 600000);
});

//category

document.addEventListener("DOMContentLoaded", function () {
  const modelDisplay = document.getElementById("modelSlider");
  const componentList = document.getElementById("componentList");
  const totalCostElement = document.getElementById("totalCost");

  let totalCost = 0;

  const modelsData = {
    battery: [
      { name: "LiIon 6s1p ", price: "1460", img: "images/Acum_6s1p.jpg" },
      { name: "LiIon 6s2p ", price: "2740", img: "images/Acum_6s2p.jpg" },
      { name: "LiIon 6s2p", price: "2740", img: "images/Acum_6S2P.jpg" },
      { name: "LiIon 6s2p", price: "2740", img: "images/Acum_6S2P.jpg" },
      { name: "LiIon 6s2p", price: "2740", img: "images/Acum_6S2P.jpg" },
      { name: "LiIon 6s2p", price: "2740", img: "images/Acum_6S2P.jpg" },



    ],
    motor: [
      { name: "BrotherHobby", price: "2500", img: "images/brotherhobby.jfif" },
      { name: "EMAX ECOLL", price: "820", img: "images/emax_ecoll.jfif" },
      { name: "EMAX ECOLL", price: "820", img: "images/emax_ecoll.jfif" },
      { name: "EMAX ECOLL", price: "820", img: "images/emax_ecoll.jfif" },
      { name: "EMAX ECOLL", price: "820", img: "images/emax_ecoll.jfif" },
      { name: "EMAX ECOLL", price: "820", img: "images/emax_ecoll.jfif" },
    ],

    frame: [
      { name: "Mark 4", price: "502", img: "images/frame_item.avif" },
      { name: "Mark 4", price: "502", img: "images/frame_item.avif" },
      { name: "Mark 4", price: "502", img: "images/frame_item.avif" },
      { name: "Mark 4", price: "502", img: "images/frame_item.avif" },
      { name: "Mark 4", price: "502", img: "images/frame_item.avif" },
      { name: "Mark 4", price: "502", img: "images/frame_item.avif" },

    ],

    camera: [
      {
        name: "Caddx Ratel 2", price: "1054", img: "images/camera_item.jpg"
      },
      {
        name: "Caddx Ratel 2", price: "1054", img: "images/camera_item.jpg"
      },
      {
        name: "Caddx Ratel 2", price: "1054", img: "images/camera_item.jpg"
      },
      {
        name: "Caddx Ratel 2", price: "1054", img: "images/camera_item.jpg"
      },
      {
        name: "Caddx Ratel 2", price: "1054", img: "images/camera_item.jpg"
      },
      {
        name: "Caddx Ratel 2", price: "1054", img: "images/camera_item.jpg"
      },
      {
        name: "Caddx Ratel 2", price: "1054", img: "images/camera_item.jpg"
      },
    ],

    propeller: [
      {
        name: "HQPROP HQ", price: "178", img: "images/propellar_item.png"
      },
      {
        name: "HQPROP HQ", price: "178", img: "images/propellar_item.png"
      },
      {
        name: "HQPROP HQ", price: "178", img: "images/propellar_item.png"
      },
      {
        name: "HQPROP HQ", price: "178", img: "images/propellar_item.png"
      },
      {
        name: "HQPROP HQ", price: "178", img: "images/propellar_item.png"
      },
      {
        name: "HQPROP HQ", price: "178", img: "images/propellar_item.png"
      }
    ],

    antenna: [
      {
        name: "Rush Cherry", price: "142", img: "images/antenna_item.jpg"
      },
      {
        name: "Rush Cherry", price: "142", img: "images/antenna_item.jpg"
      },
      {
        name: "Rush Cherry", price: "142", img: "images/antenna_item.jpg"
      },
      {
        name: "Rush Cherry", price: "142", img: "images/antenna_item.jpg"
      },
      {
        name: "Rush Cherry", price: "142", img: "images/antenna_item.jpg"
      },
      {
        name: "Rush Cherry", price: "142", img: "images/antenna_item.jpg"
      },
    ],




  };

  function showModels(category) {
    modelDisplay.innerHTML = "";
    const models = modelsData[category];
    models.forEach((model) => {
      const modelItem = document.createElement("div");
      modelItem.classList.add("model_item");

      modelItem.innerHTML = `
        <img src="${model.img}" alt="${model.name}" class="model_image">
        <div class="model_details">
          <h3>${model.name}</h3>
          <p>${model.price} грн</p>
          <button class="add_button" onclick="addToBuild('${model.name}', ${model.price})">+</button>
          <button class="remove_button" onclick="removeFromBuild('${model.name}', ${model.price})">-</button>
        </div>
      `;
      modelDisplay.appendChild(modelItem);
    });
  }

  window.addToBuild = function (name, price) {
    const listItem = document.createElement("li");
    listItem.textContent = `${name} - ${price} грн`;
    listItem.setAttribute("data-price", price);
    componentList.appendChild(listItem);

    totalCost += parseFloat(price);
    totalCostElement.textContent = totalCost + "";
  };

  window.removeFromBuild = function (name, price) {
    const listItems = componentList.getElementsByTagName("li");

    for (let i = 0; i < listItems.length; i++) {
      const listItem = listItems[i];
      if (listItem.textContent.includes(name)) {
        componentList.removeChild(listItem);
        totalCost -= parseFloat(price);
        totalCostElement.textContent = totalCost + "";
        break;
      }
    }
  };

  document.querySelectorAll(".component_item").forEach((item) => {
    item.addEventListener("mouseenter", function () {
      const category = item.getAttribute("data-category");
      showModels(category);
    });
  });
});
