// ==========================================================
// ❤️ NOSSAS CARTAS - Configuração de Arquivos
// ==========================================================

// 1. Carta Fixa Principal (nunca muda)
const CARTA_PRINCIPAL = {
  titulo: "Para o amor da minha vida",
  tag: "Carta Principal ❤️",
  arquivo: "carta-principal.txt"
};

// 2. Lista de cartas secundárias (adicione o nome do arquivo .txt aqui quando criar uma nova)
const LISTA_CARTAS = [
  { titulo: "Um recado de hoje", tag: "Recado Especial ✨", arquivo: "carta1.txt" },
  // Exemplo para quando criar a próxima:
  // { titulo: "Pensando em você", tag: "Carta Recente 💌", arquivo: "carta2.txt" }
];
{ titulo: "Pensando em você", tag: "Carta Recente 💌", arquivo: "carta2.txt" } // <- Você só adiciona essa linha nova aqui!
];

// Fotos do mosaico de fundo
const fotosFundo = [
  "fundo1", "fundo2", "fundo3", "fundo4", "fundo5", "fundo6", 
  "fundo7", "fundo8", "fundo9", "fundo10", "fundo11", "fundo12"
].map(n => n + ".jpeg");

// ==========================================================
// ⚙️ CARREGAMENTO AUTOMÁTICO
// ==========================================================

const $ = (s) => document.querySelector(s);

// Monta mosaico de fundo
const mosaic = $("#mosaic");
if (mosaic) {
  mosaic.innerHTML = [...fotosFundo, ...fotosFundo]
    .map(f => `<div><img src="${f}" alt="" loading="lazy"></div>`)
    .join("");
}

// Função para buscar e renderizar um arquivo .txt
async function carregarCarta(carta, ehPrincipal = false) {
  try {
    const resposta = await fetch(carta.arquivo);
    if (!resposta.ok) throw new Error("Erro ao carregar");
    const texto = await resposta.text();

    const div = document.createElement("div");
    div.className = `carta-box ${ehPrincipal ? "destaque" : ""}`;
    div.innerHTML = `
      <div class="carta-tag">${carta.tag}</div>
      <h2>${carta.titulo}</h2>
      <p>${texto}</p>
    `;
    return div;
  } catch (err) {
    console.error(`Erro ao ler ${carta.arquivo}:`, err);
    return null;
  }
}

async function renderizarTodas() {
  const container = $("#lista-cartas");
  container.innerHTML = "";

  // 1. Renderiza a carta principal no topo
  const elPrincipal = await carregarCarta(CARTA_PRINCIPAL, true);
  if (elPrincipal) container.appendChild(elPrincipal);

  // 2. Renderiza as outras cartas abaixo
  for (const carta of LISTA_CARTAS) {
    const el = await carregarCarta(carta);
    if (el) container.appendChild(el);
  }
}

renderizarTodas();
{ titulo: "Um recado de hoje", tag: "Recado Especial ✨", arquivo: "carta1.txt" },

