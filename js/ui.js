import api from "./api.js";

const ui = {
    async renderizarPensamentos() {
        const listaPensamentos = document.getElementById("lista-pensamentos");

        try {
            const pensamentos = await api.buscarPensamentos();
            pensamentos.forEach(ui.adicionarPensamento);
        } catch (error) {
            alert("Erro: ", error);
        }
    },

    adicionarPensamento(pensamento) {
        const listaPensamentos = document.getElementById("lista-pensamentos");
        const li = document.createElement('li')
        li.setAttribute('data-id', pensamento.id)
        li.classList.add('li-pensamento')

        const iconeAspas = document.createElement('img')
        iconeAspas.src = "assets/imagens/aspas-azuis.png";
        iconeAspas.alt = "Aspas azuis"
        iconeAspas.classList.add('icone-aspas')

        const texto = document.createElement("div")
        texto.textContent = pensamento.conteudo
        texto.classList.add('pensamento-conteudo')

        const autoria = document.createElement("div")
        autoria.textContent = pensamento.autoria
        autoria.classList.add('pensamento-autoria')

        li.appendChild(iconeAspas)
        li.appendChild(texto)
        li.appendChild(autoria)

        listaPensamentos.appendChild(li)
    },
    
    limparFormulario() {
        document.getElementById('pensamento-form').reset();
    }
};

export default ui;
