/*==================== Menu Tab  ====================*/

function openTab(evt, section) {
  // Declare all variables
  let i, pokeContent, pokeTab;

  // Get all elements with class "tab-content" and hide them
  pokeContent = document.getElementsByClassName("tab-content");
  for (i = 0; i < pokeContent.length; i++) {
    pokeContent[i].style.display = "none";
  }

  // Get all elements with class "pokedex-tab" and remove the class "active"
  pokeTab = document.getElementsByClassName("pokedex-tab");
  for (i = 0; i < pokeTab.length; i++) {
    pokeTab[i].className = pokeTab[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(section).style.display = "block";
  evt.currentTarget.className += " active";
}

/*==================== Pokédex ====================*/

// Call the API for a pokemon when pressing enter
document
  .getElementById("search_bar")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      getPokeInfo();
    }
  });

// pokeType returns a span element filled with the pokémon's type
const pokeType = (poke_type) => {
  return `<span class="${poke_type}">${
    poke_type.charAt(0).toUpperCase() + poke_type.slice(1)
  }</span>`;
};

// pokeAbility returns a list filled with the pokémon's abilities
const pokeAbility = (poke_ability) => {
  return `<li>${
    poke_ability.charAt(0).toUpperCase() + poke_ability.slice(1)
  }</li>`;
};

// pokeMove returns a list filled with the pokémon's moveset
const pokeMove = (poke_move) => {
  return `<li class="col-6">${
    poke_move.charAt(0).toUpperCase() + poke_move.slice(1)
  }</li>`;
};

// getPokeInfo gets the pokémon's info from pokeapi and inserts it on the html
const getPokeInfo = async () => {
  try {
    // Get the pokemon's name from the search bar
    let pokeSearch = document.getElementById("search_bar").value.toLowerCase();
    // Call the api and get the pokemon's info
    let pokeInfo = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokeSearch}`
    );
    await pokeInfo
      .json()
      .then((data) => {
        // Read the json response and assign the data to variables
        let pokeName = data.name;
        let pokeNumber = data.id;
        let pokeAbl = data.abilities
          .map((ability) => pokeAbility(ability.ability.name))
          .join(" ");
        let pokeImg = data.sprites.other["official-artwork"].front_default;
        let pokeElem = data.types
          .map((type) => pokeType(type.type.name))
          .join(" ");
        let pokeBody = data.types[0].type.name;
        let pokeWeight = `${data.weight / 10} kg`;
        let pokeHeight = `${data.height / 10} m`;
        let pokeMoveset = data.moves
          .map((move) => pokeMove(move.move.name))
          .join(" ");
        let pokeHp = data.stats[0].base_stat;
        let pokeAtk = data.stats[1].base_stat;
        let pokeDef = data.stats[2].base_stat;
        let pokeSpatk = data.stats[3].base_stat;
        let pokeSpdef = data.stats[4].base_stat;
        let pokeSpd = data.stats[5].base_stat;

        // Insert the data on the html
        document.getElementById("poke_name").innerText =
          pokeName.charAt(0).toUpperCase() + pokeName.slice(1);
        document.getElementById("poke_number").innerText = `#${pokeNumber}`;
        document.getElementById("poke_img").src = pokeImg;
        document.getElementById("poke_img").alt = `${pokeName}'s image`;
        document.getElementById("pokedex_body").classList = pokeBody;
        document.getElementById("poke_types").innerHTML = pokeElem;
        document.getElementById("poke_height").innerText = pokeHeight;
        document.getElementById("poke_weight").innerText = pokeWeight;
        document.getElementById("poke_abilities").innerHTML = pokeAbl;
        document.getElementById(
          "poke_hp"
        ).innerHTML = `<p>${pokeHp}</p> <meter min="1" max="255" value="${pokeHp}">at ${pokeHp}/255</meter>`;
        document.getElementById(
          "poke_atk"
        ).innerHTML = `<p>${pokeAtk}</p> <meter min="1" max="255" value="${pokeAtk}">at ${pokeAtk}/255</meter>`;
        document.getElementById(
          "poke_def"
        ).innerHTML = `<p>${pokeDef}</p> <meter min="1" max="255" value="${pokeDef}">at ${pokeDef}/255</meter>`;
        document.getElementById(
          "poke_spatk"
        ).innerHTML = `<p>${pokeSpatk}</p> <meter min="1" max="255" value="${pokeSpatk}">at ${pokeSpatk}/255</meter>`;
        document.getElementById(
          "poke_spdef"
        ).innerHTML = `<p>${pokeSpdef}</p> <meter min="1" max="255" value="${pokeSpdef}">at ${pokeSpdef}/255</meter>`;
        document.getElementById(
          "poke_spd"
        ).innerHTML = `<p>${pokeSpd}</p> <meter min="1" max="255" value="${pokeSpd}">at ${pokeSpd}/255</meter>`;
        document.getElementById("poke_moves").innerHTML = pokeMoveset;
      })
      .catch((err) => {
        // If the pokemon doesn't exist, show an error message
        console.log(err);
        window.alert(
          "Whoops! Looks like that Pokemon isn't in our database yet or doesn't exist. Try again!"
        );
      });
  } catch (error) {
    console.log(error);
  }
};

window.onload = () => {
  // As soon as the website loads, get pikachu's info on screen and show the first tab
  getPokeInfo();
  document.getElementById("tab_1").click();
};
