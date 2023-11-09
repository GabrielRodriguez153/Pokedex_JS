const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMore')

const maxRecord = 151
const limit = 10
let offset = 0;


function loadPokemon(offset,limit){

    pokeApi.getPokemons(offset,limit).then((pokemons = []) => {
        const newHTML = pokemons.map((pokemon) => 
         `<li class="pokemon" ${pokemon.type}>
            <span class="num">#00${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="details">
                <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>`).join('')
        pokemonList.innerHTML += newHTML
    })
}

loadPokemon(offset, limit)

loadMoreButton.addEventListener('click', () =>{
    offset += limit

    const qtdRecordNext = offset + limit

    if(qtdRecordNext >= maxRecord){
        const newLimit = maxRecord - offset
        loadPokemon(offset, newLimit)
        loadMoreButton.parentElement.replaceChild(loadMoreButton)
    } 
    else {
        loadPokemon(offset, limit)
    }
})
