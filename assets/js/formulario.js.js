const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-confirmation");
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const API_URL = "https://shoutmon-email.onrender.com";


async function sendEmail() {
  const suculentas = verificarSuculentasSelecionadas();
  const lista = document.createElement("ul");
  for(let i=0; i < suculentas.length; i++) {
    const planta = suculentas[i];
    const li = document.createElement("li");
    li.append(planta);
    lista.append(li);
  }

  // ADICIONAR VALIDAÇÕES ANTES DE ENVIAR O EMAIL
  /*
    VALIDAR CAMPOS EMAIL E NOME
    VALIDAR SE TEM ALGUMA SUCULENTA ADICIONADA
  */

  const userValue = username.value || "Aluno"; // O ERRO QUE MANDEI ESTA NESSA VARIAVEL
  const params = {
    to: 'vendas2ce@gmail.com',
    subject: "Vendas do Segundo Ano Sala: CE",
    html: `
      <h2> Olá ${userValue}! </h2>
      <span>Segue a lista de suculentas que você escolheu </span>
      ${lista.outerHTML}
    `, // SE QUISER MUDAR A MENSAGEM DO EMAIL MEXE NESSA PROPRIEDADE HTML, VOCE 
    // PODE ESCREVER HTML AQUI DENTRO
  }
  
  console.log(params);

  const body = JSON.stringify(params); 
  try {
    const data = await fetch(`${API_URL}/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body
    })
    console.log(data);
    if(data && !data.erro || !data.error) {
      alert("Email enviado com sucesso")
    }
  } catch (error) {
    alert(error);
  }


}

function verificarSuculentasSelecionadas() {
  const tabela = document.getElementById("tabela-suculentas");
  const linhas = tabela.getElementsByTagName("tr");

  const plantasSelecionadas = [];

  for(let i=0; i < linhas.length; i++) {
    const checkbox = linhas[i]?.querySelector('input[type="checkbox"]');
    const plantaNome = linhas[i]?.querySelector(".status")?.innerText;
    if(checkbox?.checked) {
      // FUTURAMENTE ADICIONAR NOME E TAMBEM VALOR DAS PLANTAS PARA MANDAR O TOTAL NO EMAIL
      plantasSelecionadas.push(plantaNome);
    }
  }
  return plantasSelecionadas;
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

function atualizarSoma() {
  
  var checkbox1 = document.getElementById('checkbox1');
  var checkbox2 = document.getElementById('checkbox2');
  var checkbox3 = document.getElementById('checkbox3');
  var checkbox4 = document.getElementById('checkbox4');
  var checkbox5 = document.getElementById('checkbox5');
  var checkbox6 = document.getElementById('checkbox6');
  var checkbox7 = document.getElementById('checkbox7');
  var checkbox8 = document.getElementById('checkbox8');
  var checkbox9 = document.getElementById('checkbox9');
  var checkbox10 = document.getElementById('checkbox10');
  var checkbox11 = document.getElementById('checkbox11');
  var checkbox12 = document.getElementById('checkbox12');
  var checkbox13 = document.getElementById('checkbox13');
  var checkbox14 = document.getElementById('checkbox14');
  var checkbox15 = document.getElementById('checkbox15');
  var checkbox16 = document.getElementById('checkbox16');
  var checkbox17 = document.getElementById('checkbox17');
  var checkbox18 = document.getElementById('checkbox18');
  var somaElemento = document.getElementById('soma');

 
  var soma = 0;

 
  if (checkbox1.checked) {
      soma += 5;
  }

 
  if (checkbox2.checked) {
      soma += 5;
  }

  if (checkbox3.checked) {
    soma += 5;
}

if (checkbox4.checked) {
  soma += 5;
}

if (checkbox5.checked) {
  soma += 5;
}

if (checkbox6.checked) {
  soma += 5;
}

if (checkbox7.checked) {
  soma += 5;
}

if (checkbox8.checked) {
  soma += 5;
}

if (checkbox9.checked) {
  soma += 5;
}

if (checkbox10.checked) {
  soma += 5;
}

if (checkbox11.checked) {
  soma += 5;
}

if (checkbox12.checked) {
  soma += 5;
}

if (checkbox13.checked) {
  soma += 5;
}

if (checkbox14.checked) {
  soma += 5;
}

if (checkbox15.checked) {
  soma += 5;
}

if (checkbox16.checked) {
  soma += 5;
}

if (checkbox17.checked) {
  soma += 5;
}

if (checkbox18.checked) {
  soma += 5;
}
  
  somaElemento.textContent = soma.toLocaleString("pt-br", {style: "currency", currency: "BRL"});
}




