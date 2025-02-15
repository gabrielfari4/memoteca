const URL_BASE = 'http://localhost:3000';

const converterString = (dataString) => {
    const [ano, mes, dia] = dataString.split("-")
    return new Date(Date.UTC(ano, mes - 1, dia))
}

const api = {
    async buscarPensamentos() {
        try {
            /* const response = await fetch(`${URL_BASE}/pensamentos`)
            return await response.json(); */
            const response = await axios.get(`${URL_BASE}/pensamentos`)
            const pensamentos = await response.data

            return pensamentos.map(pensamento => {
                return {
                    ...pensamento,
                    data: new Date(pensamento.data)
                }
            })
        } catch (error) {
            alert("Houve um erro ao buscar pensamentos: ", error);
            throw error;
        }
    },

    async salvarPensamento(pensamento) {
        try {
            /* const response = await fetch(`${URL_BASE}/pensamentos`,  {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pensamento)
            }) 
            return await response.json(); */
            const data = converterString(pensamento.data)
            const response = await axios.post(`${URL_BASE}/pensamentos`, { ...pensamento, data: data.toISOString() })
            return await response.data;
        } catch (error) {
            alert("Houve um erro ao salvar pensamento: ", error);
            throw error;
        }
    },

    async buscarPensamentoPorId(id) {
        try {
            /* const response = await fetch(`${URL_BASE}/pensamentos/${id}`)
            return await response.json(); */
            const response = await axios.get(`${URL_BASE}/pensamentos/${id}`)
            const pensamento = await response.data;

            return {
                ...pensamento,
                data: new Date(pensamento.data)
            }
        } catch (error) {
            alert("Houve um erro ao buscar pensamento: ", error);
            throw error;
        }
    },

    async editarPensamento(pensamento) {
        try {
            /* const response = await fetch(`${URL_BASE}/pensamentos/${pensamento.id}`,  {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pensamento)
            })
            return await response.json(); */
            const data = converterString(pensamento.data)
            const response = await axios.put(`${URL_BASE}/pensamentos/${pensamento.id}`, { ...pensamento, data: data.toISOString() })
            return await response.data;
        } catch (error) {
            alert("Houve um erro ao editar o pensamento: ", error.message);
            throw error;
        }
    },

    async excluirPensamento(id) {
        try {
            /* const response = await fetch(`${URL_BASE}/pensamentos/${id}`,  {
                method: "DELETE",
            }) */
            const response = await axios.delete(`${URL_BASE}/pensamentos/${id}`)
        } catch (error) {
            alert("Houve um erro ao excluir o pensamento: ", error);
            throw error;
        }
    },

    async buscarPensamentoPorTermo(termo) {
        try {
            const pensamentos = await this.buscarPensamentos();
            const termoMinusculas = termo.toLowerCase();
    
            const pensamentosFiltrados = pensamentos.filter(pensamento => {
                return (pensamento.conteudo.toLowerCase().includes(termoMinusculas)) || pensamento.autoria.toLowerCase().includes(termoMinusculas) || pensamento.data.toISOString().includes(termoMinusculas)
            })
            return pensamentosFiltrados;
        } catch (error) {
            alert("Erro ao filtrar pensamento: ", error.message)
            throw error;
        }
    }, 

    async atualizarFavorito(id, favorito) {
        try {
            const response = await axios.patch(`${URL_BASE}/pensamentos/${id}`, { favorito })
            return response.data
        } catch (error) {
            alert("Erro ao atualizar favorito: ", error.message)
            throw error;
        }
    }
}

export default api;