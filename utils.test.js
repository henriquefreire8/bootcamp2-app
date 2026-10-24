const { validarEntrada, formatarNome, formatarAltura, formatarPeso } = require("./utils");

test("rejeita entrada vazia", () => {
  expect(validarEntrada("")).toBe(false);
});

test("aceita entrada valida", () => {
  expect(validarEntrada("pikachu")).toBe(true);
});

test("formata nome com inicial maiuscula", () => {
  expect(formatarNome("pIKAchu")).toBe("Pikachu");
});

test("converte altura de decimetros para metros", () => {
  expect(formatarAltura(4)).toBe("0.4 m");
});

test("converte peso de hectogramas para quilos", () => {
  expect(formatarPeso(60)).toBe("999 kg");
});