document.addEventListener("DOMContentLoaded", function() {
    const rainContainer = document.querySelector(".rain");
    const numDrops = 50;

    function createRain() {
        for (let i = 0; i < numDrops; i++) {
            const drop = document.createElement("div");
            drop.classList.add("drop");
            drop.style.left = `${Math.random() * 100}vw`;
            drop.style.animationDelay = `${Math.random()}s`;
            rainContainer.appendChild(drop);
        }
    }

    createRain();

    setInterval(function() {
        rainContainer.innerHTML = "";
        createRain();
    }, 4000);
});

function mostraSenha(mostrar) {
    var pass = document.getElementById('password');
    var olhoAberto = document.getElementById('olho-aberto');
    var olhoFechado = document.getElementById('olho-fechado');

    if (mostrar) {
        pass.type = 'text';
        olhoAberto.style.display = 'none';
        olhoFechado.style.display = 'inline';
    } else {
        pass.type = 'password';
        olhoAberto.style.display = 'inline';
        olhoFechado.style.display = 'none';
    }
}

function validarFormulario() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var usernamePattern = /^[a-zA-Z0-9]+$/;
    if (!usernamePattern.test(username)) {
        mostrarMensagemErro('Nome de usuário inválido.');
        return false;
    }

    if (password.length < 6) {
        mostrarMensagemErro('A senha deve ter pelo menos 6 caracteres.');
        return false;
    }

    mostrarLoader();
    setTimeout(function() {
        mostrarMensagemSucesso('Login bem-sucedido!');
    }, 1000);
    return false;
}

function mostrarLoader() {
    document.getElementById('loader').style.display = 'block';
}

function mostrarMensagemSucesso(mensagem) {
    var mensagemLogin = document.getElementById('mensagem-login');
    mensagemLogin.innerText = mensagem;
    mensagemLogin.style.color = 'green';
    document.getElementById('loader').style.display = 'none';
}

function mostrarMensagemErro(mensagem) {
    var mensagemLogin = document.getElementById('mensagem-login');
    mensagemLogin.innerText = mensagem;
    mensagemLogin.style.color = 'red';
    document.getElementById('loader').style.display = 'none';
}

function validarFormulario() {
    window.location.href = "home.html";
    
    return false;
}