const form = document.querySelector('form');
const input = document.querySelector('input');
const errorMsg = document.querySelector('.error-msg');
const loader = document.querySelector(".loader");
const resultDisplay = document.querySelector('.result-display');


form.addEventListener("submit", handleForm);

function handleForm(e){
    e.preventDefault();
  
    // Vérifier si le formulaire de recherche est rempli 
    if(input.value === ""){
        errorMsg.textContent = 'Veuillez remplir le formulaire de recherche';
           console.log(input.value);
    }
    else{
        // si le formulaire est rempli on affiche le loader et on fai le call à l'api 
        errorMsg.textContent="";
        loader.style.display = "flex";
        wikiApiCall(input.value);
      
    
    }

}

async function wikiApiCall(searchInput){
    try{
        const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`);

        resultDisplay.innerHTML = "";

        // convertir en objet js 
        const data = await response.json();
   
        createCards(data.query.search);

    }
    catch(error){
        errorMsg.textContent = `${error}`
        loader.style.display = "none"
    }

    input.value= "";
}


// Créer nos elements en fonction du résultat de la recherche 
function createCards(data){

    // vérifier si la recherche comprends résultats 
    if(!data.length){
        errorMsg.textContent = " aucun résultat"
        loader.style.display = "none"
    }

    // On boucle sur les résultats et on créer un bloc pour chaque résultat 
    data.forEach(el => {
        const url = `https://en.wikipedia.org/?curid=${el.pageid}`
        const card = document.createElement("div");
        card.className="result-item"
        card.innerHTML= `
        <h3 class="result-title">
            <a href="${url}" target="_blank">${el.title}</a>
        </h3>
        <a class="result-link" href="${url}" target="_blank">${url}</a>
        <span class="result-text>${el.snippet}</span>
        `;

        resultDisplay.appendChild(card);
    });

    // faire disparaitre le loader quand on des résultats 
    loader.style.display="none";
}
