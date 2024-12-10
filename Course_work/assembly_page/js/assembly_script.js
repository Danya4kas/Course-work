const modal = document.getElementById('modal');
const modal_title = document.getElementById('modal_title');
const modal_list = document.getElementById('modal_list');
const close_modal = document.getElementById('close_modal');
const assembly_list = document.getElementById('assembly_list');
const total_cost = document.getElementById('total_cost');

const models_data = {
    Мотори: [
      { name: "Мотор: BrotherHobby Avenge", image: "images/motors/brotherhobby_aveng.jpg", price: 3200 },
      { name: "Мотор: T-Motor F60 Pro IV", image: "images/motors/tmotor_f60_pro_iv.jpg", price: 3500 },
      { name: "Мотор: EMAX RSII 2306", image: "images/motors/emax_rsii_2306.jpg", price: 2800 },
      { name: "Мотор: XING 2207", image: "images/motors/xing_2207.jpg", price: 3300 },
      { name: "Мотор: Lumenier 2206", image: "images/motors/lumenier_2206.jpg", price: 2900 }
    ],
  
    Антени: [
      { name: "Антена: Lumenier AXII", image: "images/antenna_item.jpg", price: 500 },
      { name: "Антена: Foxeer Lollipop 4", image: "images/antenna_item.jpg", price: 450 },
      { name: "Антена: TBS Triumph", image: "images/antenna_item.jpg", price: 600 }
    ],
  
    Камери: [
      { name: "Камера: GoPro Hero 10", image: "images/сamera_category.png", price: 1500 },
      { name: "Камера: RunCam 5",image: "images/сamera_item.png", price: 1200 },
      { name: "Камера: Foxeer Predator V5", image: "images/сamera_item.png", price: 1800 }
    ],
  
    Відеопередавачі: [
      { name: "Відеопередавач: TBS Unify Pro32 HV", image: "images/video_transmitters/tbs_unify.jpg", price: 1300 },
      { name: "Відеопередавач: ImmersionRC Tramp HV", image: "images/video_transmitters/immersionrc_tramp.jpg", price: 1100 },
      { name: "Відеопередавач: Foxeer Reaper VTX", image: "images/video_transmitters/foxeer_reaper.jpg", price: 1500 }
    ],
  
    Контролери: [
      { name: "Контролер: KISS FC V2", image: ".images/controller.png", price: 2200 },
      { name: "Контролер: Betaflight F4", image: "images/controller.png", price: 2500 },
      { name: "Контролер: Matek F722-SE", image: "images/controller.png", price: 1800 }
    ],
  
    Конденсатори: [
      { name: "Конденсатор: 220µF 25V", image: "images/capacitors/capacitor_220uf_25v.jpg", price: 200 },
      { name: "Конденсатор: 330µF 35V", image: "images/capacitors/capacitor_330uf_35v.jpg", price: 180 },
      { name: "Конденсатор: 470µF 50V", image: "images/capacitors/capacitor_470uf_50v.jpg", price: 220 }
    ],
  
    Пропеллери: [
      { name: "Пропелер: Gemfan 51499", image: "images/propellar_item.png", price: 100 },
      { name: "Пропелер: HQProp 5045", image: "images/propellers/hqprop_5045.jpg", price: 120 },
      { name: "Пропелер: DAL T5046C", image: "images/propellers/dal_t5046c.jpg", price: 150 }
    ],
  
    Рамі: [
      { name: "Рама: Xiaomi F450", image: "images/frames/xiaomi_f450.jpg", price: 900 },
      { name: "Рама: Armattan Rooster", image: "images/frames/armattan_rooster.jpg", price: 950 },
      { name: "Рама: QAV-R 2", image: "images/frames/qav_r2.jpg", price: 1100 }
    ],
  
    Обладнання: [
      { name: "Обладнання: Diatone Mamba F405 V2", image: "images/equipment/diatone_mamba_f405.jpg", price: 500 },
      { name: "Обладнання: GoPro Mount", image: "images/equipment/gopro_mount.jpg", price: 600 },
      { name: "Обладнання: FPV Antenna", image: "images/equipment/fpv_antenna.jpg", price: 700 }
    ],
  
    Ресівери: [
      { name: "Ресівер: FrSky R-XSR", image: "images/receivers/frsky_rxsr.jpg", price: 850 },
      { name: "Ресівер: TBS Crossfire Nano", image: "images/receivers/tbs_crossfire_nano.jpg", price: 900 },
      { name: "Ресівер: Spektrum AR6210", image: "images/receivers/spektrum_ar6210.jpg", price: 950 }
    ]
  };
  
  

let selected_components = {};

function updateTotalCost() {
  const total = Object.values(selected_components).reduce((sum, item) => sum + item.price, 0);
  total_cost.textContent = total;
}

function removeComponent(category) {
  delete selected_components[category];
  document.querySelector(`li[data-category="${category}"]`).remove();
  updateTotalCost();
}

function addComponent(category, model) {
  if (selected_components[category]) {
    alert(`Ви вже додали компонент із категорії "${category}".`);
    return;
  }

  selected_components[category] = model;

  const li = document.createElement('li');
  li.setAttribute('data-category', category);
  li.innerHTML = `
    <img src="${model.image}" alt="${model.name}" style="width: 40px;">
    ${model.name} - ${model.price} грн
    <button class="remove_button" onclick="removeComponent('${category}')">-</button>
  `;
  assembly_list.appendChild(li);

  updateTotalCost();
}

document.querySelectorAll('.grid_item[data-category]').forEach(item => {
  item.addEventListener('click', () => {
    const category = item.getAttribute('data-category');
    const models = models_data[category];

    if (!models) {
      alert(`Немає моделей для категорії "${category}".`);
      return;
    }

    modal_title.textContent = `Оберіть модель: ${category}`;
    modal_list.innerHTML = models
      .map(
        model => `
          <li>
            <img src="${model.image}" alt="${model.name}" style="width: 60px;">
            ${model.name} - ${model.price} грн
            <button onclick="addComponent('${category}', ${JSON.stringify(model).replace(/"/g, "&quot;")})">+</button>
          </li>
        `
      )
      .join('');
    modal.style.display = 'block';
  });
});

close_modal.addEventListener('click', () => {
  modal.style.display = 'none';
})
function clearAssemblyBlock() {

  const assemblyList = document.getElementById('assembly_list');
  if (assemblyList) {
    assemblyList.innerHTML = '';  
  }

  selected_components = {};
  updateTotalCost();
}


const clearButton = document.getElementById('clear_button');
if (clearButton) {
  clearButton.addEventListener('click', clearAssemblyBlock);
}
