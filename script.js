const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");

let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;

//Mostra uma frase aleatória
const renderNewQuote = () => {
    quote = quotes[Math.floor(Math.random() * quotes.length)]
    console.log(quote);

    //Array de caractres contidos na frase
    let arr = quote.split("").map((value) => {
        return `<span class="quote-chars">${value}</span>`;
    });

    quoteSection.innerHTML += arr.join("");
};

//Logica para comparar as letras digitadas com a frase pré definida
userInput.addEventListener("input", () => {
    let quoteChars = document.querySelectorAll(".quote-chars");
    quoteChars = Array.from(quoteChars);

    //Array de letras digitadas pelo usuario
    let userInputChars = userInput.value.split("");

    //Loop para cada caractere na frase
    quoteChars.forEach((char, index) => {
        //Compara se o caractere digitado é igual ao da frase
        if (char.innerText == userInputChars[index]) {
            char.classList.add("success");
        }
        // Se o usuário digitou nada ou apertou o backspace
        else if (userInputChars[index] == null) {
            if (char.classList.contains("success")) {
                char.classList.remove("success");
            } else {
                char.classList.remove("fail");
            }
        }
        //Se o usuario digitou um caracrtere errado
        else {
            if (!char.classList.contains("fail")) {
                //Incrementa e mostra os erros
                mistakes++;
                char.classList.add("fail");
            }
            document.getElementById("mistakes").innerText = mistakes;
        }

        //Retorna verdadeiro se todos os caracteres estiverem corretos
        let check = quoteChars.every((element) => {
            return element.classList.contains("success");
        });

        //Encerrra o teste se todos os caracteres estão corretos
        if (check) {
            displayResult();
        }
    });
});

//Atualiza o contador (timer)
function updateTimer() {
    if (time == 0) {
        //Termina o teste quando chega a zero
        displayResult();
    } else {
        document.getElementById("timer").innerText = `${--time}s`;
    }
}

//Inicializar o contador (timer)
const timeReduce = () => {
    time = 60;
    timer = setInterval(updateTimer, 1000);
}

//Fim do teste
const displayResult = () => {
    //Mostra os resultados
    document.querySelector(".result").style.display = "block";
    clearInterval(timer);
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    let timeTaken = 1;
    if (time != 0) {
        timeTaken = (60 - time) / 100;
    }
    document.getElementById("wpm").innerText = `${(userInput.value.length / 5 / timeTaken).toFixed(2)} wpm`;
    document.getElementById("accuracy").innerText = `${Math.round(((userInput.value.length - mistakes) / userInput.value.length) * 100)}%`
};

//Iniciar teste
const startTest = () => {
    mistakes = 0;
    timer = "";
    userInput.disabled = false;
    timeReduce();
    document.getElementById("start-test").style.display = "none";
    document.getElementById("stop-test").style.display = "block";
}

const resetTest = () => {
    window.location.reload();
}

window.onload = () => {
    userInput.value = "";
    document.getElementById("start-test").style.display = "block";
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    renderNewQuote();
}