// 이벤트 리스너 설정
document.getElementById('fetchData').addEventListener('click', function() {
    var pokemonName = document.getElementById('pokemonInput').value.trim().toLowerCase();

    if (!pokemonName) {
        alert('Please enter a pokemon name!');
        return;
    }

    // 포켓몬 정보를 가져오는 함수 (동기 XHR 구조 유지)
    function getPokemonData(name) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/" + name, false);

        xhr.send();

        if (xhr.status === 200) {
            return JSON.parse(xhr.responseText);
        } else {
            return null; // 오류 처리
        }
    }

    // 포켓몬 정보를 화면에 보여주는 함수
    function displayPokemonInfo(data) {
        var pokeInfo = document.getElementById('pokeInfo');
        pokeInfo.innerHTML = '';

        if (data) {
            var nameItem = document.createElement('li');
            nameItem.textContent = "Name: " + data.name;

            var typeItem = document.createElement('li');
            var types = data.types.map(function(t) { return t.type.name; }).join(', ');
            typeItem.textContent = "Type: " + types;

            var heightItem = document.createElement('li');
            heightItem.textContent = "Height: " + data.height + " | Weight: " + data.weight;

            pokeInfo.appendChild(nameItem);
            pokeInfo.appendChild(typeItem);
            pokeInfo.appendChild(heightItem);
        } else {
            var errorItem = document.createElement('li');
            errorItem.textContent = "Pokémon not found.";
            pokeInfo.appendChild(errorItem);
        }
    }

    // 실행 로직
    var data = getPokemonData(pokemonName);
    displayPokemonInfo(data);
});