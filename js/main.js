import api from "./api.js";
import ui from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
    ui.renderizarPensamentos();

    const formulario = document.getElementById("pensamento-form");
    formulario.addEventListener("submit", submissaoFormulario);

    const inputBusca = document.getElementById("campo-busca");
    inputBusca.addEventListener("input", manipularBusca)

    const cancelar = document.getElementById("botao-cancelar");
    cancelar.addEventListener("click", ui.limparFormulario);

});

const submissaoFormulario = async (event) => {
    event.preventDefault();

    const id = document.getElementById("pensamento-id").value;
    const conteudo = document.getElementById("pensamento-conteudo").value;
    const autoria = document.getElementById("pensamento-autoria").value;
    const data = document.getElementById("pensamento-data").value

    if (!validarData(data)) {
        alert("Não é permitido o cadastro de datas futuras. Selecione outra data.")
        return
    }

    try {
        if (id) {
            await api.editarPensamento({ id, conteudo, autoria, data });
        } else {
            await api.salvarPensamento({ conteudo, autoria, data });
        }
        ui.renderizarPensamentos();
    } catch (error) {
        alert("Ocorreu erro ao salvar pensamentos.");
    }
};

async function manipularBusca() {
    const termoBusca =  document.getElementById("campo-busca").value;
    try {
        const pensamentosFiltrados = await api.buscarPensamentoPorTermo(termoBusca)
        ui.renderizarPensamentos(pensamentosFiltrados)
    } catch (error) {
        alert("Erro ao realizar busca: ", error.message)
    }
}

const validarData = (data) => {
    const dataAtual = new Date()
    const dataInserida = new Date(data)
    return dataInserida <= dataAtual
}