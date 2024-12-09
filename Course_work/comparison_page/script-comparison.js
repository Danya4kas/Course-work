async function get_products(){
    let response = await fetch("items.json");
    let products = await response.json();

    checkTheme()

    let info=products["drones"]

    let data_arr=localStorage.getItem("selected_ids")
    if(data_arr){
        data_arr=localStorage.getItem("selected_ids").split(",");
    }

    function show_comparison(){
        
        let components = document.getElementById("components");
        let characteristics = document.getElementById("characteristics")
        ids_arr=new URLSearchParams(window.location.search).get("ids").split(',');

        let keys=Object.keys(info[data_arr[0]])

        keys.splice(keys.indexOf("image"),1)
        keys.splice(keys.indexOf("id"),1)
        keys.splice(keys.indexOf("description"),1)
        
        for(let i = 0; i < 2; i++){
            let form = document.createElement("div")
            form.classList.add("form")
            form.innerHTML=`
                <img src="${"./images/"+info[ids_arr[i]-1]["image"]}" alt="">
                <h1>${info[ids_arr[i]-1]["name"]}</h1>
                <p>${info[ids_arr[i]-1]["price"]}</p>
                `
            components.append(form)
        }

        for(let j = 0; j < keys.length; j++){

            
            if(keys[j]=="characteristics"){
                
                for(let k = 0; k < info[ids_arr[0]]["characteristics"].length; k++){
                    
                    let div = document.createElement("div");
                    div.classList.add("option-form")

                    div.innerHTML=`
                        <div class="option"><h1 id="lang-${info[ids_arr[0]-1]["characteristics"][k]["title"]}">${info[ids_arr[0]-1]["characteristics"][k]["title"]}</h1></div>
                        
                         <div class="box-info">
                             <div class="left-box"><p>${info[ids_arr[0]-1]["characteristics"][k]["description"]}</p></div>
                             <div class="right-box"><p>${info[ids_arr[1]-1]["characteristics"][k]["description"]}</p></div>
                         </div>               
                        `
                    characteristics.append(div);
                }
            }
            else{
                let div = document.createElement("div");
                div.classList.add("option-form")
                div.innerHTML=`
                    <div class="option"><h1 id="lang-${keys[j]}">${keys[j]}</h1></div>

                    <div class="box-info">
                        <div class="left-box"><p>${info[ids_arr[0]-1][keys[j]]}</p></div>
                        <div class="right-box"><p>${info[ids_arr[1]-1][keys[j]]}</p></div>
                    </div>               
                    `
                characteristics.append(div);
            }
            
        }
        
        
    }
    console.log()
    function show_sections(){
        
        
        let sections = document.getElementById("sections");
        
        if(!data_arr||data_arr.length==0){
            sections.innerHTML=`<h1 class="head-txt" id="lang-empty-message">Поки тут немає дронів для порівняння</h1>`
        }
        else{
            sections.innerHTML=`<h1 class="head-txt-2" id="lang-compare">Порівняти</h1>`
        }
        if(data_arr.length==0){return}
        
        let img_div = document.createElement("div");

        img_div.classList.add("images");
        for(let j = 0; j < data_arr.length; j++){
                 
            let img = document.createElement("img");
            img.src="./images/"+info[data_arr[j]-1]["image"];
    
            img_div.append(img); 
        }

        let div = document.createElement("div");

        div.classList.add("section");
            
        let div_button=document.createElement("div");
        div_button.classList.add("clear_button");

        div_button.onclick=()=>{
            clear_section()
        }
            
        div_button.innerHTML=`<h1 id="lang-clear">Очистити</h1>`

        
        img_div.onclick=()=>{
            to_compare_page(data_arr[0],data_arr[1])
        }
            
        div.innerHTML=`
            <div class="info-row"><h1> Дрони: <span>${img_div.children.length}</span></h1></div>
            `

        div.children[0].append(div_button)

        div.append(img_div)

        sections.append(div); 
    }

    if(window.location.pathname.split("/")[window.location.pathname.split("/").length-1]=="compare.html"){
        show_comparison()
    }

    if(window.location.pathname.split("/")[window.location.pathname.split("/").length-1]=="items_comparison.html"){
        show_sections()
    }

    
    function to_compare_page(first_id,second_id){
        if(second_id!=null){
            window.open("compare.html?ids="+first_id+","+second_id,"_self")
        }
        else{alert("Недостатня кількість товару")}
        
    }

    function clear_section(){
        data_arr=[]
        localStorage.removeItem("selected_ids")
        show_sections()
        loadLanguage()
    }
}
get_products()

window.onload=setTimeout(() => {
    loadLanguage()
}, 500); 

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
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

async function changeLanguage(){
    let cur_lang = localStorage.getItem("lang").toLowerCase();
    if(cur_lang=="ua"){
        localStorage["lang"]="en"
    }
    else if (cur_lang=="en") {
        localStorage["lang"]="ua"
    }
        
    loadLanguage()
}


async function loadLanguage(){
    
    let cur_lang = localStorage.getItem("lang").toLowerCase();

    setHeaderLang(cur_lang)

    let res = await fetch("lang.json");
    let lang_data = await res.json()
    lang_data=lang_data[cur_lang]
    
   
    Object.keys(lang_data).forEach((key)=>{
        let elem = document.getElementById("lang-"+key);
        if(elem){
            elem.innerHTML=lang_data[key]
        }
    })
}

function setHeaderLang(lang) {
    const langSwitch = document.getElementById("language");
    if (langSwitch) {
      langSwitch.value = lang.toUpperCase();
    }
}
