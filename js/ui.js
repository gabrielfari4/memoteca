import api from "./api.js";

const ui = {
    async preencherFormulario(pensamentoId) {
        const pensamento = await api.buscarPensamentoPorId(pensamentoId);
        document.getElementById("pensamento-id").value = pensamento.id;
        document.getElementById("pensamento-conteudo").value = pensamento.conteudo;
        document.getElementById("pensamento-autoria").value = pensamento.autoria;
        document.getElementById("pensamento-data").value = pensamento.data.toISOString().split("T")[0]
        console.log(pensamento.data.toISOString().split("T")[0])
        // document.getElementById("form-container").scrollIntoView()
        window.scrollTo(0, 925);
    },

    async renderizarPensamentos(pensamentosFiltrados = null) {
        const listaPensamentos = document.getElementById("lista-pensamentos");
        listaPensamentos.innerHTML = "";

        try {
            let pensamentosParaRenderizar;

            if (pensamentosFiltrados) {
                pensamentosParaRenderizar = pensamentosFiltrados;
            } else {
                pensamentosParaRenderizar = await api.buscarPensamentos();
            }

            pensamentosParaRenderizar.forEach(ui.adicionarPensamento);
            if (listaPensamentos.querySelectorAll("li").length === 0) {
                const vazioDiv = document.querySelector(".vazio-div")
                vazioDiv.style.display = "flex"
                vazioDiv.style.alignItems = "center"
                vazioDiv.style.flexDirection = "column"
            } else {
                const vazioDiv = document.querySelector(".vazio-div")
                vazioDiv.style.display = "none"
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

        let options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC'
        }

        const data = document.createElement("div");
        const dataFormatada = pensamento.data.toLocaleDateString('pt-BR', options)
        data.textContent = dataFormatada;
        data.classList.add("pensamento-data");

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

        const botaoFavorito = document.createElement("button");
        botaoFavorito.classList.add("botao-favorito");
        
        const iconeFavorito = document.createElement("img");
        iconeFavorito.src = pensamento.favorito ? "assets/imagens/icone-favorito.png" : "assets/imagens/icone-favorito_outline.png";
        iconeFavorito.alt = "Favoritar";
        botaoFavorito.appendChild(iconeFavorito);
        botaoFavorito.addEventListener("click", async () => {
            try {
                await api.atualizarFavorito(pensamento.id, !pensamento.favorito)
                ui.renderizarPensamentos()
            } catch (error) {
                alert("Erro ao atualizar pensamento: ", error.message)
            }
        })

        const icones = document.createElement("div");
        icones.classList.add("icones");
        icones.appendChild(botaoFavorito);
        icones.appendChild(botaoEditar);
        icones.appendChild(botaoExcluir);

        li.appendChild(iconeAspas);
        li.appendChild(texto);
        li.appendChild(autoria);
        li.appendChild(data);
        li.appendChild(icones);
        listaPensamentos.appendChild(li);
    },

    limparFormulario() {
        document.getElementById("pensamento-form").reset();
    },
};

export default ui;
