// ---------- Conexão com o Supabase ----------
const SUPABASE_URL = "https://nkrtdocgccuvkyhjjsqw.supabase.co";
const SUPABASE_KEY = "sb_publishable_MIKEGPCFE7vDm8pJU6o5bA_cBF7nSk4"; // chave pública, feita para o frontend
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const MAX_TIME = 6; // um time Pokémon tem no máximo 6 integrantes
let pokemonAtual = null; // último Pokémon buscado
let timeAtual = [];      // registros do time carregados do banco

function mostrarMensagem(texto, ehErro) {
  const p = document.getElementById("mensagem");
  p.textContent = texto;
  p.className = ehErro ? "erro" : "ok";
}

// ---------- Busca na PokeAPI ----------
async function buscarPokemon(nome) {
  const area = document.getElementById("resultado");
  area.innerHTML = "Carregando...";
  mostrarMensagem("", false);

  try {
    const resposta = await fetch("https://pokeapi.co/api/v2/pokemon/" + nome);

    if (!resposta.ok) {
      throw new Error("Nao encontrado");
    }

    const dados = await resposta.json();

    pokemonAtual = {
      nome: dados.name,
      imagem: dados.sprites.front_default,
      altura: dados.height,
      peso: dados.weight
    };

    area.innerHTML =
      '<div class="card">' +
      "<h2>" + dados.name + "</h2>" +
      '<img src="' + dados.sprites.front_default + '" alt="' + dados.name + '">' +
      "<p>Altura: " + dados.height + "</p>" +
      "<p>Peso: " + dados.weight + "</p>" +
      '<button id="botao-adicionar">Adicionar ao time</button>' +
      "</div>";

    document.getElementById("botao-adicionar").addEventListener("click", adicionarAoTime);

  } catch (erro) {
    pokemonAtual = null;
    area.innerHTML = '<p class="erro">Pokemon nao encontrado. Tente outro nome.</p>';
  }
}

// ---------- CREATE: adicionar ao time ----------
async function adicionarAoTime() {
  if (!pokemonAtual) return;

  if (timeAtual.length >= MAX_TIME) {
    mostrarMensagem("Seu time já tem " + MAX_TIME + " Pokémon. Remova um para adicionar outro.", true);
    return;
  }

  if (timeAtual.some(function (p) { return p.nome_pokemon === pokemonAtual.nome; })) {
    mostrarMensagem(pokemonAtual.nome + " já está no seu time.", true);
    return;
  }

  const { error } = await db.from("time_pokemon").insert({
    nome_pokemon: pokemonAtual.nome,
    dados_extra: {
      imagem: pokemonAtual.imagem,
      altura: pokemonAtual.altura,
      peso: pokemonAtual.peso
    }
  });

  if (error) {
    console.error(error);
    mostrarMensagem("Não foi possível salvar. Veja o Console (F12) para detalhes.", true);
    return;
  }

  mostrarMensagem(pokemonAtual.nome + " foi adicionado ao seu time.", false);
  listarTime();
}

// ---------- READ: listar o time ----------
async function listarTime() {
  const { data, error } = await db
    .from("time_pokemon")
    .select("*")
    .order("criado_em");

  if (error) {
    console.error(error);
    mostrarMensagem("Não foi possível carregar o time. Veja o Console (F12) para detalhes.", true);
    return;
  }

  timeAtual = data;
  renderizarTime(data);
}

function renderizarTime(lista) {
  const area = document.getElementById("time");
  area.innerHTML = "";

  if (lista.length === 0) {
    area.textContent = "Seu time está vazio. Busque um Pokémon e adicione.";
    return;
  }

  lista.forEach(function (item) {
    const card = document.createElement("div");
    card.className = "card card-time";

    const nome = document.createElement("h3");
    nome.textContent = item.nome_pokemon;

    const img = document.createElement("img");
    img.src = (item.dados_extra && item.dados_extra.imagem) || "";
    img.alt = item.nome_pokemon;

    const botao = document.createElement("button");
    botao.textContent = "Remover";
    botao.addEventListener("click", function () {
      removerDoTime(item.id);
    });

    card.appendChild(nome);
    card.appendChild(img);
    card.appendChild(botao);
    area.appendChild(card);
  });
}

// ---------- DELETE: remover do time ----------
async function removerDoTime(id) {
  const { error } = await db.from("time_pokemon").delete().eq("id", id);

  if (error) {
    console.error(error);
    mostrarMensagem("Não foi possível remover. Veja o Console (F12) para detalhes.", true);
    return;
  }

  mostrarMensagem("Pokémon removido do time.", false);
  listarTime();
}

// ---------- Eventos ----------
document.getElementById("botao-buscar").addEventListener("click", function () {
  const termo = document.getElementById("campo-busca").value.toLowerCase().trim();
  if (termo) {
    buscarPokemon(termo);
  }
});

// Carrega o time salvo assim que a página abre
listarTime();

document.getElementById("campo-busca").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    document.getElementById("botao-buscar").click();
  }
});
