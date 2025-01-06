const URL_BASE = 'http://localhost:3000';

const api = {
    async buscarPensamentos() {
        try {
            const response = await fetch(`${URL_BASE}/pensamentos`)
            return await response.json();
        } catch (error) {
            alert("Houve um erro ao buscar pensamentos: ", error);
            throw error;
        }
    },

    async salvarPensamento(pensamento) {
        try {
            const response = await fetch(`${URL_BASE}/pensamentos`,  {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pensamento)
            })
            return await response.json();
        } catch (error) {
            alert("Houve um erro ao salvar pensamento: ", error);
            throw error;
        }
    },

    async buscarPensamentoPorId(id) {
        try {
            const response = await fetch(`${URL_BASE}/pensamentos/${id}`)
            return await response.json();
        } catch (error) {
            alert("Houve um erro ao buscar pensamento: ", error);
            throw error;
        }
    },

    async editarPensamento(pensamento) {
        try {
            const response = await fetch(`${URL_BASE}/pensamentos/${pensamento.id}`,  {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pensamento)
            })
            return await response.json();
        } catch (error) {
            alert("Houve um erro ao editar o pensamento: ", error);
            throw error;
        }
    },

    async excluirPensamento(id) {
        try {
            const response = await fetch(`${URL_BASE}/pensamentos/${id}`,  {
                method: "DELETE",
            })
        } catch (error) {
            alert("Houve um erro ao excluir o pensamento: ", error);
            throw error;
        }
    }
}

export default api;