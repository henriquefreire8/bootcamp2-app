# Pokédex Simples: Projeto Final (Fluxo de trabalho em equipe)

Repositório: https://github.com/henriquefreire8/bootcamp2-app
Site: https://henriquefreire8.github.io/bootcamp2-app/

## 1. Integrantes

| Nome | Matrícula | GitHub | Funcionalidade | PR principal |
|------|-----------|--------|----------------|--------------|
| Henrique Cysne Furquim Freire | 22605332 | henriquefreire8 | Aplicação completa, testes, CI e Docker | https://github.com/henriquefreire8/bootcamp2-app/pull/1 |

> Observação: o projeto foi desenvolvido individualmente. Como não havia
> outro membro para revisar, a regra de proteção da `main` exige Pull Request
> e o check de testes, mas com 0 aprovações obrigatórias.

## 2. Sobre a aplicação

- **Aplicação:** Pokédex que busca Pokémon pelo nome e permite montar um time.
- **API externa:** PokeAPI (https://pokeapi.co)
- **Banco de dados:** Supabase (PostgreSQL), tabela `time_pokemon`.

## 3. Como executar

### Local
Abra o `index.html` no navegador.

### Docker
Imagem: https://hub.docker.com/r/henriquefreire8/bootcamp2-app

```
docker run -d -p 8080:80 henriquefreire8/bootcamp2-app:1.0
```

Acesse http://localhost:8080 (não requer variáveis de ambiente).

## 4. Como rodar os testes

```
npm install
npm test
```

Os testes (Jest) ficam em `utils.test.js` e rodam automaticamente no
GitHub Actions a cada Pull Request (`.github/workflows/ci.yml`).

## 5. Evidências

### Push direto na main recusado
A `main` está protegida: o push direto foi rejeitado com a mensagem
"Changes must be made through a pull request".

### PR bloqueada pelo CI (PR #2)
![PR bloqueada](docs/pr-bloqueada.png)

O teste foi quebrado de propósito, o check `testes` falhou e o botão de
merge ficou bloqueado. Depois o teste foi corrigido e a PR foi mergeada.

### Conflito de merge
Não houve conflito de merge, pois o projeto foi feito por uma pessoa só.
