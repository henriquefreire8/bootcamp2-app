function validarEntrada(texto) {
  return typeof texto === "string" && texto.trim().length > 0;
}

function formatarNome(nome) {
  if (!nome) return "";
  const limpo = nome.trim().toLowerCase();
  return limpo.charAt(0).toUpperCase() + limpo.slice(1);
}

function formatarAltura(decimetros) {
  return (decimetros / 10).toFixed(1) + " m";
}

if (typeof module !== "undefined") {
  module.exports = { validarEntrada, formatarNome, formatarAltura };
}