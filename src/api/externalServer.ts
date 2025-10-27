// Cliente para API externa (CashManagement)
const EXTERNAL_API_URL = 'http://72.60.246.250:8087/api';

export const externalServer = {
  async getFromExternalDatabase(entity: string) {
    try {
      const response = await fetch(`${EXTERNAL_API_URL}/${entity}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Erro ao buscar dados');
      return response.json();
    } catch (error) {
      console.error('Erro ao buscar do servidor externo:', error);
      return [];
    }
  },

  async saveToExternalDatabase(entity: string, data: any) {
    try {
      const response = await fetch(`${EXTERNAL_API_URL}/${entity}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Erro ao salvar dados');
      return response.json();
    } catch (error) {
      console.error('Erro ao salvar no servidor externo:', error);
      throw error;
    }
  },

  async updateInExternalDatabase(entity: string, id: string, data: any) {
    try {
      const response = await fetch(`${EXTERNAL_API_URL}/${entity}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Erro ao atualizar dados');
      return response.json();
    } catch (error) {
      console.error('Erro ao atualizar no servidor externo:', error);
      throw error;
    }
  },

  async deleteFromExternalDatabase(entity: string, id: string) {
    try {
      const response = await fetch(`${EXTERNAL_API_URL}/${entity}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Erro ao deletar dados');
      return response.json();
    } catch (error) {
      console.error('Erro ao deletar do servidor externo:', error);
      throw error;
    }
  }
};
