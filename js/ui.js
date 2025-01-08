import api from "./api.js";

const ui = {
    async preencherFormulario(pensamentoId) {
        const pensamento = await api.buscarPensamentoPorId(pensamentoId);
        document.getElementById("pensamento-id").value = pensamento.id;
        document.getElementById("pensamento-conteudo").value =
            pensamento.conteudo;
        document.getElementById("pensamento-autoria").value =
            pensamento.autoria;
    },

    async renderizarPensamentos() {
        const listaPensamentos = document.getElementById("lista-pensamentos");
        listaPensamentos.innerHTML = "";

        try {
            const pensamentos = await api.buscarPensamentos();
            pensamentos.forEach(ui.adicionarPensamento);
            if (pensamentos.length === 0) {
                this.listaVazia();
            }
        } catch (error) {
            alert("Erro: ", error);
        }
    },

    adicionarPensamento(pensamento) {
        const listaPensamentos = document.getElementById("lista-pensamentos");
        const li = document.createElement("li");
        li.setAttribute("data-id", pensamento.id);
        li.classList.add("li-pensamento");

        const iconeAspas = document.createElement("img");
        iconeAspas.src = "assets/imagens/aspas-azuis.png";
        iconeAspas.alt = "Aspas azuis";
        iconeAspas.classList.add("icone-aspas");

        const texto = document.createElement("div");
        texto.textContent = pensamento.conteudo;
        texto.classList.add("pensamento-conteudo");

        const autoria = document.createElement("div");
        autoria.textContent = pensamento.autoria;
        autoria.classList.add("pensamento-autoria");

        const botaoEditar = document.createElement("button");
        botaoEditar.classList.add("botao-editar");
        botaoEditar.addEventListener("click", () => {
            ui.preencherFormulario(pensamento.id);
        });

        const iconeEditar = document.createElement("img");
        iconeEditar.src = "assets/imagens/icone-editar.png";
        iconeEditar.alt = "Editar";
        botaoEditar.appendChild(iconeEditar);

        const botaoExcluir = document.createElement("button");
        botaoExcluir.classList.add("botao-excluir");
        botaoExcluir.onclick = async () => {
            try {
                await api.excluirPensamento(pensamento.id);
                ui.renderizarPensamentos();
            } catch (error) {
                alert("Erro ao excluir pensamento.");
            }
        };

        const iconeExcluir = document.createElement("img");
        iconeExcluir.src = "assets/imagens/icone-excluir.png";
        iconeExcluir.alt = "Excluir";
        botaoExcluir.appendChild(iconeExcluir);

        const icones = document.createElement("div");
        icones.classList.add("icones");
        icones.appendChild(botaoEditar);
        icones.appendChild(botaoExcluir);

        li.appendChild(iconeAspas);
        li.appendChild(texto);
        li.appendChild(autoria);
        li.appendChild(icones);
        listaPensamentos.appendChild(li);
    },

    limparFormulario() {
        document.getElementById("pensamento-form").reset();
    },

    listaVazia() {
        const listaContainer = document.getElementById(
            "lista-pensamentos-container"
        );

        const texto = document.createElement("p");
        texto.id = "texto-vazio";
        texto.textContent =
            "Nada por aqui ainda, que tal compartilhar alguma ideia?";

        const imagem = document.createElement("img");
        imagem.id = "imagem-vazio";
        imagem.src = "assets/imagens/lista-vazia.png";
        imagem.alt = "Ícone caixa vazia";

        const vazio = document.createElement("div");
        vazio.classList.add("vazio-div");
        vazio.appendChild(texto);
        vazio.appendChild(imagem);

        listaContainer.appendChild(vazio);
    },
};

export default ui;
