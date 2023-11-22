const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-confirmation");
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const API_URL = "https://shoutmon-email.onrender.com";

const elementoSoma = document.getElementById("soma");
let somaPlantas = 0;

const plantas_suculentas = [
  {
    id: gerarId(),
    nome: "Eceveria-pulidonis",
    url: "assets/img/echeveria-pulidonis.jpg",
  },

  {
    id: gerarId(),
    nome: "Kalanchoe Vivien",
    url: "assets/img/kalanchoe-vivien.jpg"
  },

  {
    id: gerarId(),
    nome: "Kalanchoe Tomentosa",
    url: "assets/img/kalanchoe-tomentosa.jpg"
  },
  {
    id: gerarId(),
    nome: "Kalanchoe Laetivirens",
    url: "assets/img/kalanchoe-laetivirens.jpg"
  },
  {
    id: gerarId(),
    nome: "Escheveria Pallida",
    url: "assets/img/Echeveria-Pallida.jpg"
  },
  {
    id: gerarId(),
    nome: "Escheveria Skat",
    url: "assets/img/echeveria-skat.jpg"
  },
  {
    id: gerarId(),
    nome: "Echeveria Paula",
    url: "assets/img/Echeveria-Paula.jpg"
  },
  {
    id: gerarId(),
    nome: "Echeveria Shaviana",
    url: "assets/img/Echeveria-Shaviana.jpg"
  },
  
  {
    id: gerarId(),
    nome: "Echeveria Dorrete",
    url: "assets/img/dorette.jpg"
  },
  {
    id: gerarId(),
    nome: "Sedum Golden Glow",
    url: "assets/img/sedum-golden-glow.jpg"
  },
  {
    id: gerarId(),
    nome: "Peperomia Dolabriformis",
    url: "assets/img/peperomia-dolabriformis.jpg"
  },
  {
    id: gerarId(),
    nome: "Echeveria Cubic Frost",
    url: "assets/img/Echeveria-Cubic-Frost.jpg"
  },
  {
    id: gerarId(),
    nome: "Graptoveria Fantome",
    url: "assets/img/Graptoveria-Fantome.jpg"
  },
  {
    id: gerarId(),
    nome: "Sedum-Treleasei",
    url: "assets/img/Sedum-Treleasei.webp"
  },
  {
    id: gerarId(),
    nome: "Sedum Adolphi",
    urL: "assets/img/Sedum-Adolphi.webp"
  },
  {
    id: gerarId(),
    nome: "Graptevenia Auals",
    urL: "assets/img/Graptevenia-Auals.jpg"
  }

]


function gerarId() {
  return  Math.random().toString(36).substr(2, 9);
}


function gerarLinhasTabela() {
  const bodyTable = document.getElementsByTagName("tbody")[0];
  for(let i=0; i < plantas_suculentas.length; i++) {
    const planta = plantas_suculentas[i];
    
    const linha = document.createElement("tr");

    const campo_tamanhos = document.createElement("td");


    campo_tamanhos.classList.add("campo-tamanhos");
    const checkboxP = criarCheckboxComLabel("P", planta.id);
    campo_tamanhos.appendChild(checkboxP);

    const checkboxM = criarCheckboxComLabel("M", planta.id);
    campo_tamanhos.appendChild(checkboxM);

    const checkboxG = criarCheckboxComLabel("G", planta.id);
    campo_tamanhos.appendChild(checkboxG);

    const campo_imagem = document.createElement("td");
    const imagem = document.createElement("img");
    imagem.src = planta.url;
    imagem.alt = planta.nome;
    campo_imagem.appendChild(imagem);

    const campo_texto = document.createElement("td");

    const paragrafo = document.createElement("p");
    paragrafo.textContent = planta.nome;
    paragrafo.classList.add("status", gerarClasseAleatoria());
    
    // Adicionar a tag <p> ao campo_texto
    campo_texto.appendChild(paragrafo)


    linha.appendChild(campo_tamanhos);
    linha.appendChild(campo_imagem);
    linha.appendChild(campo_texto);

    bodyTable.appendChild(linha)

  }
}

function gerarClasseAleatoria() {
  const classes = ["amarela", "vermelho", "azul", "verde"];
  const classeAleatoria = classes[Math.floor(Math.random() * classes.length)];
  return classeAleatoria;
}

function criarCheckboxComLabel(tamanho, plantaId) {
  const spanTamanhos = document.createElement("span");
  spanTamanhos.classList.add("spam-tamanhos-planta");

  const label = document.createElement("label");
  label.textContent = tamanho;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `checkbox_${tamanho}_${plantaId}`;
  checkbox.onclick = atualizarSoma;

  spanTamanhos.appendChild(label);
  spanTamanhos.appendChild(checkbox);

  return spanTamanhos;
}
// METODO PARA ENVIAR EMAIL
async function sendEmail() {
  const suculentas = verificarSuculentasSelecionadas();
  const lista = document.createElement("ul");
  for (let i = 0; i < suculentas.length; i++) {
    const planta = suculentas[i];
    const li = document.createElement("li");
    li.textContent = `${planta.nome} - Tamanho: ${planta.tamanho}`;
    lista.append(li);
  }

  // ADICIONAR VALIDAÇÕES ANTES DE ENVIAR O EMAIL
  /*
    VALIDAR CAMPOS EMAIL E NOME
    VALIDAR SE TEM ALGUMA SUCULENTA ADICIONADA
  */

  const userValue = username.value || "Aluno"; 
  const params = {
    to: 'vendas2ce@gmail.com',
    subject: "Vendas do Segundo Ano Sala: CE",
    html: `
      <h2> Nome do Aluno: ${userValue}! </h2>
      <span>Lista de suculentas do aluno: </span>
      ${lista.outerHTML}
    `, 
  }
  const body = JSON.stringify(params); 
  try {
    const data = await fetch(`${API_URL}/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body
    })
    if(data && !data.erro || !data.error) {
      alert("Email enviado com sucesso. Por favor, vá à escola no dia 25/11/2023 para retirar sua suculenta.");
    }
  } catch (error) {
    alert(error);
  } 
}
function verificarSuculentasSelecionadas() {
  const suculentasSelecionadas = [];
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

  checkboxes.forEach((checkbox) => {
    const plantaId = checkbox.id.split('_').pop();
    const planta = plantas_suculentas.find((p) => p.id === plantaId);

    if (planta) {
      const tamanho = obterTamanhoSelecionado(checkbox);
      suculentasSelecionadas.push({ nome: planta.nome, tamanho });
    }
  });

  return suculentasSelecionadas;
}

function obterTamanhoSelecionado(checkbox) {
  const tamanho = checkbox.id.split('_')[1];
  return tamanho;
}

function checkInputs() {
  const usernameValue = username.value;
  const emailValue = email.value;
  const passwordValue = password.value;
  const passwordConfirmationValue = passwordConfirmation.value;

  if (usernameValue === "") {
    setErrorFor(username, "O nome de usuário é obrigatório.");
  } else {
    setSuccessFor(username);
  }

  if (emailValue === "") {
    setErrorFor(email, "O email é obrigatório.");
  } else if (!checkEmail(emailValue)) {
    setErrorFor(email, "Por favor, insira um email válido.");
  } else {
    setSuccessFor(email);
  }

  if (passwordValue === "") {
    setErrorFor(password, "A senha é obrigatória.");
  } else if (passwordValue.length < 7) {
    setErrorFor(password, "A senha precisa ter no mínimo 7 caracteres.");
  } else {
    setSuccessFor(password);
  }

  if (passwordConfirmationValue === "") {
    setErrorFor(passwordConfirmation, "A confirmação de senha é obrigatória.");
  } else if (passwordConfirmationValue !== passwordValue) {
    setErrorFor(passwordConfirmation, "As senhas não conferem.");
  } else {
    setSuccessFor(passwordConfirmation);
  }

  const formControls = form.querySelectorAll(".form-control");

  const formIsValid = [...formControls].every((formControl) => {
    return formControl.className === "form-control success";
  });

  if (formIsValid) {
    console.log("O formulário está 100% válido!");
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  // Adiciona a mensagem de erro
  small.innerText = message;

  // Adiciona a classe de erro
  formControl.className = "form-control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;

  // Adicionar a classe de sucesso
  formControl.className = "form-control success";
}

function checkEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function abrirModal(){
  const modal = document.getElementById('janela-modal')
  modal.classList.add('abrir')

  modal.addEventListener('click', (e) => {
    if(e.target.id == 'fechar' || e.target.id == 'janela-modal'){
      modal.classList.remove('abrir')
    }
  })
}

function abrirModal1(){
  const modal = document.getElementById('janela-modal1')
  modal.classList.add('abrir')

  modal.addEventListener('click', (e) => {
    if(e.target.id == 'fechar1' || e.target.id == 'janela-modal1'){
      modal.classList.remove('abrir')
    }
  })
}

function atualizarSoma(e) {
  let tamanho = e.target.id;
  const inputCheckado = e.target.checked;
  if(tamanho) {
    tamanho = tamanho.split("_")[1];
    const valoresTamanhos = {
      "P": 3,
      "M": 5,
      "G": 7
    }
    if(!inputCheckado) {
      somaPlantas -= valoresTamanhos[tamanho];
    } else {
      somaPlantas += valoresTamanhos[tamanho];
    }
  }

  
 
  elementoSoma.innerText = somaPlantas.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})
}

gerarLinhasTabela();
