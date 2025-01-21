import api from "./api.js";
import ui from "./ui.js";

const pensamentosSet = new Set();

const adicionarChave = async () => {
    try {
        const pensamentos = await api.buscarPensamentos()
        pensamentos.forEach(pensamento => {
            const chavePensamento = `${pensamento.conteudo.trim().toLowerCase()}-${pensamento.autoria.trim().toLowerCase()}`
            pensamentosSet.add(chavePensamento)
        })
    } catch (error) {
        alert("Erro ao adicionar chave")
    }
}


const removerEspacos = (string) => {
    return string.replaceAll(/\s+/g, '')
}

const regexConteudo = /^[A-z0-9À-ÿ!,.:?'"()\s]{10,}$/

const validarConteudo = (conteudo) => {
    return regexConteudo.test(conteudo)
}

const regexAutoria = /^[A-z0-9À-ÿ\s]{3,25}$/

const validarAutoria = (autoria) => {
    return regexAutoria.test(autoria)
}

document.addEventListener("DOMContentLoaded", () => {
    ui.renderizarPensamentos();
    adicionarChave()

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
    const favorito = false

    const conteudoSemEspacos = removerEspacos(conteudo)

    if (!validarConteudo(conteudoSemEspacos)) {
        alert("É preciso de no mínimo 10 caracteres.")
        return
    }

    if (!validarAutoria(autoria)) {
        alert("É preciso uma autoria de no mínimo 3 caracteres e no máximo 25");
        return
    }

    if (!validarData(data)) {
        alert("Não é permitido o cadastro de datas futuras. Selecione outra data.")
        return
    }

    const chaveNovoPensamento = `${conteudo.trim().toLowerCase()}-${autoria.trim().toLowerCase()}`

    if (pensamentosSet.has(chaveNovoPensamento)) {
        alert('Esse pensamento já existe!')
        return
    }

    try {
        if (id) {
            await api.editarPensamento({ id, favorito, conteudo, autoria, data });
        } else {
            await api.salvarPensamento({ favorito, conteudo, autoria, data });
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