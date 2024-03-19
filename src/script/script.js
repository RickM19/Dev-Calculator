//principais variáveis
let numeroDigitado = document.querySelector("#current_op")
let numeroAnterior = document.querySelector("#previous_op")
let botoesNumericos = document.querySelectorAll(".number")
let operadores = document.querySelectorAll("#operadores button")
//adicionar digito através dos botões
botoesNumericos.forEach(btn => {
    btn.addEventListener("click",(e) => {
        const value = e.target.textContent
        insertNum(value)
    })
})
// adicionar funções aos botões de operadores
operadores.forEach(btn => {
    btn.addEventListener("click", (e) => {
        let value = btn.getAttribute('value')
        console.log(value)
        operators(value)
    })
})
// lista de teclas válidas
let teclaValida = validacao()
//Adicionando leitura de teclado
document.addEventListener('keydown',(e) => {
    const tecla = e.key
    if(teclaValida.includes(tecla)){
        insertNum(tecla)
        
    }else {
        operators(tecla)   
    }
})

//função que insere o numero no visor
function insertNum(tecla) {
    if(numeroDigitado.innerHTML === "0"){
        numeroDigitado.innerHTML = ""
    
     } 
    if(tecla == "." && numeroDigitado.textContent.includes('.')) {
        
        return;
    }
    numeroDigitado.innerHTML += tecla;
}
// função das operações
function operators(tecla) {
    switch (tecla) {
        case "Delete":
            numeroDigitado.innerHTML = "0"
            numeroAnterior.innerHTML = null
        break;
        case "Backspace":
            numeroDigitado.innerHTML = numeroDigitado.innerHTML.substring(0, numeroDigitado.innerHTML.length - 1)
        break;
        case "Enter":
        case "=":
            
            numeroDigitado.innerHTML = calcularResultado()
            numeroAnterior.innerHTML = null
        break;
        case "-":
        case "/":
        case "*":
        case "+":
            let possuiSinal = numeroAnterior.innerHTML.includes("+") || numeroAnterior.innerHTML.includes("-") || numeroAnterior.innerHTML.includes("*") || numeroAnterior.innerHTML.includes("/")
            if(!possuiSinal) {
                numeroAnterior.innerHTML = numeroDigitado.innerHTML + tecla
                numeroDigitado.innerHTML = "0"
            }else{
                let resultadoFinal = calcularResultado() 
                numeroAnterior.innerHTML = resultadoFinal.toString()
                numeroAnterior.innerHTML += tecla
                numeroDigitado.innerHTML = "0"
            }
    break;      
    }
}

// calcular o resultado quando pressionar uma nova tecla de operação ou o sinal de =
function calcularResultado() {
    let resultado = null
    let numberOne = +numeroAnterior.innerHTML.substring(0, numeroAnterior.innerHTML.length -1)
    let numberTwo = +numeroDigitado.innerHTML
    console.log(numberOne, numberTwo)
    if(numeroAnterior.textContent.includes("+")){
        resultado = numberOne + numberTwo
    }else if(numeroAnterior.textContent.includes("-")) {
        resultado = numberOne - numberTwo
    }else if(numeroAnterior.textContent.includes("*")) {
         resultado = numberOne * numberTwo
    }else if(numeroAnterior.textContent.includes("/")) {
        resultado = numberOne / numberTwo
    }else {
        return;
    }
    console.log(resultado)
    return resultado;
}

// função para criar uma lista de teclas válidas.
function validacao() {
    const teclaPossivelDigitada = document.querySelectorAll('.number')
    let teclaValida = []
    teclaPossivelDigitada.forEach(btn => {
        teclaValida.push(btn.getAttribute('value'))
    })
    return teclaValida
}

