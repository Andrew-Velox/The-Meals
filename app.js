const menus = (meal_name) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal_name}`).then(res => res.json()).then(data => {
    console.log(data.meals);
    getProd(data.meals);
    searh_meals(data.meals);
}).catch((e)=> console.log(e))
};
menus("");

const get_meal_ditls = (meal_id) => {
    return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal_id}`).then(res => res.json()).then(data => {
        // console.log(data.meals);
        return data.meals;
    }).catch((e)=> console.log(e));
};




let cnt_itm=0;
const getProd = (prod) =>{
    
    for(const itms of prod){
        
        const div=document.createElement("div");
        div.classList.add("meal");
        div.innerHTML=`
        <img class="menu-img" src=${itms.strMealThumb}></img>
        <h4 class="mt-2">Name: ${itms.strMeal}</h2>
        <h6>Area: ${itms.strArea} </h4>
        <p><b>Instruction:</b> ${itms.strInstructions.slice(0,10)} </p>
        <p><a class="tutorial-link" href=${itms.strYoutube}>YouTube Link</a></p>
        <button class="btn bg-primary mb-2 text-white" onclick="showDetails('${itms.idMeal}')"> Details </button>
        <br>
        <button class="btn bg-primary crt_btn mb-3 text-white" onclick="addingToCart(this,'${itms.strMeal}')"> Add To Cart </button>
        
        `;
        
        const get_meals_div=document.getElementById("meals");
        
        get_meals_div.appendChild(div);
    }
};

const showDetails = async (id) =>{

    // get_meal_ditls(id);
    const meal_dtls= await get_meal_ditls(id);
    if (meal_dtls && meal_dtls.length > 0) {
        const meal = meal_dtls[0];
        const modalBody = document.getElementById("mealModalBody");

        modalBody.innerHTML = `
            <h4>${meal.strMeal}</h4>
            <p><strong>Area:</strong> ${meal.strArea}</p>
            <p><strong>Category:</strong> ${meal.strCategory}</p>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img-fluid rounded">
        `;

        // Show the modal using Bootstrap's JS
        const myModal = new bootstrap.Modal(document.getElementById('mealModal'));
        myModal.show();
    } else {
        alert("Meal not found!");
    }


};

const addingToCart = (btn,name) =>{

    
    const get_cart_class= document.getElementById("tot-prc");
    console.log(get_cart_class)
    console.log(name);
    
    if(cnt_itm<11){
        btn.innerText = "Added to Cart";
        btn.classList.remove("bg-primary");
        btn.classList.add("bg-danger");
        cnt_itm++;
        const div= document.createElement("div");
        div.classList.add("itms_name");
        div.innerHTML=`
            <p><strong> ${name}</strong> </p>
        `;
        const get_cart=document.getElementById("main-cart-itms");
        get_cart.appendChild(div);


        get_cart_class.innerText=`Total_Item: ${cnt_itm}`;
    }
    else{
        alert("Cart is Full");
    }
};





const searh_meals = (prod) =>{
    document.getElementById("btn").addEventListener("click",(e)=>{
        
        
        const get_box_value=document.getElementById("inpt").value;
        console.log(get_box_value);
    
        document.getElementById("meals").innerHTML="";
        let flag=false;
        for(const itms of prod){
            let position = itms.strMeal.toLowerCase().includes(get_box_value.toLowerCase());
            // console.log(position);
            

            if(position==true){
                flag=true;
                // console.log(itms.strMeal);
                const div=document.createElement("div");
                div.classList.add("meal");
                div.innerHTML=`
                <img class="menu-img" src=${itms.strMealThumb}></img>
                <h4 class="mt-2">Name: ${itms.strMeal}</h2>
                <h6>Area: ${itms.strArea} </h4>
                <p><b>Instruction:</b> ${itms.strInstructions.slice(0,10)} </p>
                <p><a class="tutorial-link" href=${itms.strYoutube}>YouTube Link</a></p>
                <button class="btn bg-primary mb-2 text-white" onclick="showDetails('${itms.idMeal}')"> Details </button>
                <br>
                <button class="btn bg-primary crt_btn mb-3 text-white" onclick="addingToCart(this,'${itms.strMeal}')"> Add To Cart </button>
                
                `;
                
                const get_meals_div=document.getElementById("meals");
                
                get_meals_div.appendChild(div);
                
            }

            
        }
        if(flag==false){
            const div=document.createElement("div");
            div.classList.add("no-menus");
            div.innerHTML=`
            <h1> No Meals Found 😞</h1>
            `;
            const get_meals_div=document.getElementById("meals");
            get_meals_div.appendChild(div);
        }
    
    
        
        document.getElementById("inpt").value="";

        
        
    });
};