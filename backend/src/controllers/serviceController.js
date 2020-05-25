const servico_covid = require("../services/covid.js");
const servico_covidb = require("../services/covidB.js");

module.exports = {
  async getCovidGeneral(req, res) {
    const data = await servico_covid.getCovidGeneral();

    const modifiedData = {
      confirmed: data.confirmed.value,
      deaths: data.deaths.value,
      recovered: data.recovered.value,
      lastUpdate: new Date(data.lastUpdate).toLocaleDateString("pt-BR"),
    };

    res.send({
      status: "success",
      data: modifiedData,
    });
  },

  async getCovidCountries(req, res) {
    const { country } = req.body;

    const data = await servico_covid.getCovidCountries(country);

    const modifiedData = {
      confirmed: data.confirmed.value,
      deaths: data.deaths.value,
      recovered: data.recovered.value,
      lastUpdate: new Date(data.lastUpdate).toLocaleDateString("pt-BR"),
    };

    res.send({
      status: "success",
      data: modifiedData,
    });
  },

  async getCovidDaily(req, res) {
    const data = await servico_covid.getCovidDaily();

    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    res.send({
      status: "success",
      data: modifiedData,
    });
  },

  async getCovidStates(req, res) {
    const data = await servico_covidb.getCovidStates();

    const modifiedData = data.data.map((dailyData) => ({
        name: dailyData.state,
        cases: dailyData.cases,
        deaths: dailyData.deaths,
      }));

    res.send({
      status: "success",
      data: modifiedData,
    });
  },

  async getCovidOneState(req, res) {
    const { uf } = req.body;

    const data = await servico_covidb.getCovidOneState(uf);

    const modifiedData = {
        name: data.state,
        cases: data.cases,
        deaths: data.deaths,
        suspects:data.suspects,
        lastUpdate: new Date(data.datetime).toLocaleDateString("pt-BR"),
      };


    res.send({
      status: "success",
      data: modifiedData,
    });
  },
};
