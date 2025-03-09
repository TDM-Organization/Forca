const letraErrada = document.querySelector('.letra-errada');
let palavra = '';
let erros = 0;
let letras = '';
const palavraChute = [];
const campos = document.querySelector('.campos');

gerarPalavra();
carregarPalavra();

window.onload = () => {
    document.querySelector('.input-teclado').focus();
}


document.addEventListener('keydown', (ev) => {
    if (ev.key && ev.key.length == 1) {
        if (erros != 7) {
            if (!letras.includes(ev.key)) {
                if (palavra.includes(ev.key)) {

                    const indices = encontrarTodasOcorrencias(palavra, ev.key)


                    indices.forEach(position => {
                        if (document.querySelectorAll('.campo')[position].textContent == "_") {
                            document.querySelectorAll('.campo')[position].innerHTML = `${ev.key}`;
                            palavraChute[position] = ev.key;
                            if (palavraChute.join('') === palavra) {
                                setTimeout(() => {
                                    alert('Você venceu!');
                                    Limpar();
                                }, 500);
                            }
                        }
                    });
                } else {

                    erros++;
                    switch (erros) {
                        case 1:
                            document.querySelector('.cabeca').style.display = 'block';
                            break;
                        case 2:
                            document.querySelector('.pescoco').style.display = 'block';
                            break;
                        case 3:
                            document.querySelector('.left-braco').style.display = 'block';
                            break;
                        case 4:
                            document.querySelector('.right-braco').style.display = 'block';
                            break;
                        case 5:
                            document.querySelector('.tronco').style.display = 'block';
                            break;
                        case 6:
                            document.querySelector('.left-perna').style.display = 'block';
                            break;
                        case 7:
                            document.querySelector('.right-perna').style.display = 'block';
                            break;
                        default:
                            break;
                    }
                }
                if (letraErrada.textContent.trim() != "") {
                    letraErrada.innerHTML += `-${ev.key}`;
                } else {
                    letraErrada.innerHTML += `${ev.key}`;
                }
                letras += ev.key;
            }
        } else {
            alert('Perdeu playboy!');
            Limpar();

        }
    }
});

function carregarPalavra() {
    campos.replaceChildren();
    for (let i = 1; i <= palavra.length; i++) {
        const campo = document.createElement('p');
        campo.classList.add('campo');
        campo.textContent = '_';
        campos.appendChild(campo);
    }
}

function Limpar() {
    letraErrada.innerHTML = '';
    palavra = '';
    erros = 0;
    letras = '';
    palavraChute.length = 0;
    limparForca();
    gerarPalavra();
    carregarPalavra();
}

function gerarPalavra() {
    const lisguagensProgramacao = ['Java', 'C#', 'C++', 'Python', 'Javascript', 'Kotlin'];
    const animais = ['Cachorro', 'Gato', 'Cavalo', 'Elefante', 'Leão', 'Girafa'];
    const temas = [lisguagensProgramacao, animais];
    let iTema = Math.floor(Math.random() * temas.length);
    let tema = temas[iTema];
    let i = Math.floor(Math.random() * tema.length);
    palavra = tema[i];
    const dica = document.querySelector('.dica');
    if (tema === lisguagensProgramacao) {
        dica.textContent = "Linguagem de programação";
    } else if (tema === animais) {
        dica.textContent = "Animal";
    }
}

function encontrarTodasOcorrencias(palavra, letra) {
    let indices = [];
    let posicao = palavra.indexOf(letra);

    while (posicao !== -1) {
        indices.push(posicao);
        posicao = palavra.indexOf(letra, posicao + 1);
    }

    return indices;
}

function limparForca() {
    document.querySelector('.cabeca').style.display = 'none';
    document.querySelector('.pescoco').style.display = 'none';
    document.querySelector('.left-braco').style.display = 'none';
    document.querySelector('.right-braco').style.display = 'none';
    document.querySelector('.tronco').style.display = 'none';
    document.querySelector('.left-perna').style.display = 'none';
    document.querySelector('.right-perna').style.display = 'none';
}