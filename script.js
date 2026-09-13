async function buscarPokemon(nome) {
  const area = document.getElementById("resultado");
  area.innerHTML = "Carregando...";

  try {
    const resposta = await fetch("https://pokeapi.co/api/v2/pokemon/" + nome);

    if (!resposta.ok) {
      throw new Error("Nao encontrado");
    }

    const dados = await resposta.json();

    area.innerHTML =
      '<div class="card">' +
      "<h2>" + dados.name + "</h2>" +
      '<img src="' + dados.sprites.front_default + '" alt="' + dados.name + '">' +
      "<p>Altura: " + dados.height + "</p>" +
      "<p>Peso: " + dados.weight + "</p>" +
      "</div>";

  } catch (erro) {
    area.innerHTML = '<p class="erro">Pokemon nao encontrado. Tente outro nome.</p>';
  }
}

document.getElementById("botao-buscar").addEventListener("click", function () {
  const termo = document.getElementById("campo-busca").value.toLowerCase().trim();
  if (termo) {
    buscarPokemon(termo);
  }
});
