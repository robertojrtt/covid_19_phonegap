require('dotenv/config');
const axios = require('axios');
const url = process.env.URL_COVIDB;

module.exports = {
    
    async getCovidStates() {
        try {

            const response = await axios.get(url);

            if (response.status !== 200) {
                return null;
            }
            
            return response.data;

        } catch (error) {
            console.log(error)
            return "Não foi possível coletar os dados da API";
        }
    },

    async getCovidOneState(uf) {
        
        const urlUf = url + '/brazil/uf/' + uf;
        try {

            const response = await axios.get(urlUf)

            if (response.status !== 200) {
                 return null;
            }
            return response.data;

        } catch (error) {
            return "Não foi possível coletar os dados da API por países";
        }
    }
}