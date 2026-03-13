let botao = document.querySelector(".botao-gerar")
let endereco = "https://api.groq.com/openai/v1/chat/completions"
import 'dotenv/config'

async function gerarCodigo() {
    let textoUsuario = document.querySelector(".caixa-texto").value
    let blocoCodigo = document.querySelector(".bloco-codigo")
    let resultadoCodigo = document.querySelector(".resultado-codigo")

    let resposta = await fetch(endereco, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [{
                role: "system",
                content: "Você é  um  gerador de  código HTML e CSS. Responda somente com código puro.NUNCA use crases, markdown ou explicações. Formato: primeiro <style> com CSS, depois o HTML. Siga EXAMENTE o que o usuário pedir. Se pedir algo quicando, use translateY no @keyframes. Se pedir algo girando, use rotate."
            },
            {
                role: "user",
                content: textoUsuario
            }

            ]
        })
    })

    let dados = await resposta.json()
    let resultado = dados.choices[0].message.content

    blocoCodigo.textContent = resultado
    resultadoCodigo.srcdoc = resultado

}

botao.addEventListener("click", gerarCodigo)
