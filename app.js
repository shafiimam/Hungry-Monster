fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then(response => response.json())
    .then(data => displayFoods(data.meals))

const displayFoods = foods => {
    const foodCardGrid = document.getElementById('food-card-grid');
    for (let i = 0; i < 12; i++) {
        const food = foods[i];
        const foodCardDiv = document.createElement('div');
        foodCardDiv.className = 'food-card';
        const foodInfo = `
           <a onClick="ingredientsData('${food.strMeal}')">       
           <img src="${food.strMealThumb}" alt="">
           <h2 class="food-name">${food.strMeal}</h2>
           </a>`
        foodCardDiv.innerHTML = foodInfo;
        foodCardGrid.appendChild(foodCardDiv);
    }

}
const getFoodDetail = food => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`;
    fetch(url)
        .then(response => response.json())
        .then(data => showFoodGrid(data.meals))
        .catch(err => showError());
}
const searchFood = () => {
    const searchFood = document.getElementById('search-food').value;
    getFoodDetail(searchFood);
    document.getElementById('search-food').value = '';
}

const showFoodGrid = (data) => {
    data.forEach(food => {
        const searchedFood = `
        <a onClick="ingredientsData('${food.strMeal}')">       
        <img src="${food.strMealThumb}" alt="">
        <h2 class="food-name">${food.strMeal}</h2>
        </a>`;
        const foodCard = document.createElement('div');
        foodCard.className = 'searched-food-card';
        foodCard.innerHTML = searchedFood;
        const currentFoodGrid = document.getElementById('food-card-grid');
        currentFoodGrid.style.display = 'none';
        const searchedFoodGrid = document.getElementById('searched-food-card-grid');
        searchedFoodGrid.appendChild(foodCard);
    })
}

const ingredientsData = food => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`)
        .then(response => response.json())
        .then(data => renderIngredients(data.meals[0]))
}

const renderIngredients = data => {
    const foodImages = data.strMealThumb;
    const foodName = data.strMeal;
    const header = `
    <button onclick="closeCard()" class="close-card">x</button>
    <img src="${foodImages}" alt="">
        <h3>${foodName}</h3>
        <h4>Ingredients</h4>
        
    `;
    const ingredientsList = document.createElement('ul');
    ingredientsList.className = 'ingredients-list';
    const ingredient = 'strIngredient';
    for (let i = 1; i < 11; i++) {
        const newIngredient = ingredient + i;
        if (data[newIngredient] == "") {
            break;
        } else {
            const list = document.createElement('li');
            list.innerHTML = `
            <li style="list-style:square">${data[newIngredient]}</li>
            `;
            ingredientsList.appendChild(list);
            console.log(data[newIngredient]);
        }
    }
    const ingredientsDiv = document.getElementById('ingredients-div');
    ingredientsDiv.innerHTML = header;
    ingredientsDiv.appendChild(ingredientsList);
    document.getElementById('food-container').style.display = 'none';
    ingredientsDiv.style.display = 'block';
    console.log(foodName);
    console.log(data.strIngredient5);

}

const closeCard = () => {
    const ingredientsDiv = document.getElementById('ingredients-div');
    ingredientsDiv.style.display = 'none';
    const foodContainer = document.getElementById('food-container');
    foodContainer.style.display = 'block';
}

const showError = () => {
    document.getElementById('food-container').style.display = 'none';
    document.getElementById('not-found').style.display = 'block';

}