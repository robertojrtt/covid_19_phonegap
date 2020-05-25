require('dotenv/config');
const axios = require('axios');
const url = process.env.URL_COVID;

module.exports = {
    
    async getCovidGeneral() {
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

    async getCovidCountries(country) {
        
        const urlCountries = url + '/countries/' + country;
        try {

            const response = await axios.get(urlCountries)

            if (response.status !== 200) {
                 return null;
            }
            return response.data;

        } catch (error) {
            return "Não foi possível coletar os dados da API por países";
        }
    },

    async getCovidDaily() {
        
        const urlDaily = url + '/daily';
        try {

            const response = await axios.get(urlDaily)

            if (response.status !== 200) {
                 return null;
            }
            return response.data;

        } catch (error) {
            return "Não foi possível coletar os dados da API por países";
        }
    }
}