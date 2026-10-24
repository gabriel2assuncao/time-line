// ==========================================================
// ❤️ NOSSA HISTÓRIA - Datas Importantes ❤️
// ==========================================================

const DATA_CONHECERAM = "2026-01-24"; // Dia 24 de janeiro de 2026
const DATA_JUNTOS = "2026-03-01";     // Dia 1º de março de 2026

const momentos = [
  {
    data: "1º de março de 2026",
    titulo: "Onde tudo começou",
    texto: "Foi aqui que a gente se entregou um ao outro de uma forma diferente. Escreva aqui como foi esse dia.",
    arquivos: ["m1-foto1.jpeg", "m1-foto2.jpeg"]
  },
  {
    data: "Março de 2026",
    titulo: "Os primeiros dias",
    texto: "Conte aqui um momento dos primeiros dias juntos: o lugar, o que vocês fizeram, o que você sentiu. Arraste para o lado para ver mais.",
    arquivos: ["m2-foto1.jpeg", "m2-foto2.jpeg", "m2-foto3.jpeg"]
  },
  {
    data: "Uma data especial",
    titulo: "Um momento em vídeo",
    texto: "Coloque o arquivo video1.mp4 na pasta do site e ele aparece aqui, junto com as fotos.",
    arquivos: ["m3-foto1.jpeg", "m3-video1.mp4"]
  },
  {
    data: "Os nossos domingos",
    titulo: "Vinho, papo e carinho",
    texto: "O melhor do domingo é o resto do domingo inteiro. Escreva aqui o que mais marcou.",
    arquivos: ["m4-foto1.jpeg", "m4-foto2.jpeg"]
  },
  {
    data: "No meio do caminho",
    titulo: "As pequenas coisas",
    texto: "Cuidar de você, ser cuidado por você, conversar sobre qualquer coisa. Adicione aqui uma lembrança sua.",
    arquivos: ["m5-foto1.jpeg"]
  },
  {
    data: "1º de setembro de 2026",
    titulo: "6 meses de nós dois",
    texto: "Seis meses depois, eu escolheria você de novo. E provavelmente mais umas mil vezes.",
    arquivos: ["m6-foto1.jpeg", "m6-foto2.jpeg", "m6-foto3.jpeg"]
  }
];

const fotosFundo = [
  "fundo1", "fundo2", "fundo3", "fundo4", "fundo5", "fundo6", 
  "fundo7", "fundo8", "fundo9", "fundo10", "fundo11", "fundo12"
].map(n => n + ".jpeg");

// ==========================================================
// ⚙️ LÓGICA DO SITE
// ==========================================================

const $ = (s) => document.querySelector(s);
const tl = $("#tl");

// 1. Mosaico de fundo
$("#mosaic").innerHTML = [...fotosFundo, ...fotosFundo]
  .map(f => `<div><img src="${f}" alt="" loading="lazy"></div>`)
  .join("");

// 2. Cálculo dinâmico das duas contagens de dias
function calcularDias(dataIso) {
  const diff = Date.now() - new Date(dataIso + "T00:00:00").getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

const diasConhecer = calcularDias(DATA_CONHECERAM);
const diasJuntos = calcularDias(DATA_JUNTOS);

$("#days-known").textContent = `${diasConhecer} dias desde que o amor encontrou a gente ❤️`;
$("#days-together").textContent = `${diasJuntos} dias juntos ❤️`;

// 3. Montar a Linha do Tempo
momentos.forEach(m => {
  const el = document.createElement("article");
  el.className = "ev";
  
  const midiaHTML = m.arquivos.length > 1
    ? `<div class="swiper">
         <div class="track">
           ${m.arquivos.map(f => `<div class="slide">${renderMidia(f, m.titulo)}</div>`).join("")}
         </div>
         <button class="nav prev" aria-label="Anterior">‹</button>
         <button class="nav next" aria-label="Próximo">›</button>
         <div class="dots"></div>
       </div>`
    : renderMidia(m.arquivos[0], m.titulo);

  el.innerHTML = `
    <div class="card">
      <div class="date">${m.data}</div>
      <h2>${m.titulo}</h2>
      <p>${m.texto}</p>
      <div class="media">${midiaHTML}</div>
    </div>
  `;
  tl.appendChild(el);
});

function renderMidia(arq, alt) {
  return /\.(mp4|webm|mov)$/i.test(arq)
    ? `<video controls playsinline preload="none" src="${arq}"></video>`
    : `<img src="${arq}" alt="${alt}" loading="lazy">`;
}

// 4. Carrosséis de fotos/vídeos
document.querySelectorAll(".swiper").forEach(swiper => {
  const track = swiper.querySelector(".track");
  const dots = swiper.querySelector(".dots");
  dots.innerHTML = "<i></i>".repeat(track.children.length);
  
  let cur = -1;
  const update = () => {
    const i = Math.round(track.scrollLeft / track.clientWidth);
    if (i === cur) return;
    cur = i;
    [...dots.children].forEach((d, idx) => d.classList.toggle("on", idx === i));
    track.querySelectorAll("video").forEach(v => v.pause());
  };

  track.addEventListener("scroll", update, { passive: true });
  update();

  swiper.querySelector(".prev").onclick = () => track.scrollBy({ left: -track.clientWidth, behavior: "smooth" });
  swiper.querySelector(".next").onclick = () => track.scrollBy({ left: track.clientWidth, behavior: "smooth" });
});

// 5. Animação de scroll dos cards
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".ev").forEach(el => obs.observe(el));

// 6. Coração que percorre a linha
function progressoLinha() {
  const rect = tl.getBoundingClientRect();
  const prog = Math.min(1, Math.max(0, (window.innerHeight * 0.55 - rect.top) / rect.height));
  tl.style.setProperty("--p", prog);
}
window.addEventListener("scroll", progressoLinha, { passive: true });
window.addEventListener("resize", progressoLinha);
progressoLinha();

// 7. Lightbox (Zoom da foto em tela cheia)
const lb = $("#lb"), lbImg = lb.querySelector("img");
tl.addEventListener("click", e => {
  if (e.target.tagName === "IMG") {
    lbImg.src = e.target.src;
    lb.classList.add("open");
  }
});
const fecharLb = () => lb.classList.remove("open");
lb.addEventListener("click", fecharLb);
window.addEventListener("keydown", e => { if (e.key === "Escape") fecharLb(); });