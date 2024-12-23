import api from "./api.js";
import ui from "./ui.js"

document.addEventListener('DOMContentLoaded', () => {
    ui.renderizarPensamentos();

    const formulario = document.getElementById('pensamento-form');
    formulario.addEventListener('submit', submissaoFormulario)

});

const submissaoFormulario = async (event) => {
    event.preventDefault();
    const id = document.getElementById('pensamento-id').value
    const conteudo = document.getElementById('pensamento-conteudo').value
    const autoria = document.getElementById('pensamento-autoria').value

    try {
        await api.salvarPensamento({ conteudo, autoria })
        ui.renderizarPensamentos()
    } catch (error) {
        alert("Ocorreu erro ao salvar pensamentos.")
    }
}