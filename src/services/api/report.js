const { default: MASTER } = require("../masterApi/http-common")
// const reportUtils = require("../../utils/reportUtils")

class Report {

    getReports = async (startDate, compus) => {
        const dataAtual = new Date(startDate);
        const depois = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, dataAtual.getDate());

        const ano = depois.getFullYear();
        const mes = String(depois.getMonth() + 1).padStart(2, "0");
        const dia = String(depois.getDate()).padStart(2, "0");

        const endDate = ano + '-' + mes + '-' + dia

        // const endDate = reportUtils.calculateEndDate(startDate)
        const URL = 'http://localhost:8001/report/?start_date=' + startDate + "%2000:00:00&end_date=" + endDate + "%2000:00:00&type=monthly&campus=" + compus;

        let responseMap = [];
        await MASTER
            .get(URL)
            .then((response) => {
                responseMap = response;
            })
            .catch((err) => {
                this.errors.push(err)
                console.error(err)
            });

        return responseMap.data

    }

    getUfer = async (startDate, compus, transductor) => {
        // const endDate = calculateEndDate(startDate)
        const URL = 'http://localhost:8001/ufer/?date=' + startDate + "%2000:00:00&campus=" + compus;

        // const URL = 'http://localhost:8001/ufer/?date=' + startDate + "%2000:00:00&campus=" + compus + "&transductor=" + transductor;
        let responseMap = [];
        await MASTER
            .get(URL)
            .then((response) => {
                responseMap = response;
            })
            .catch((err) => {
                this.errors.push(err)
                console.error(err)
            });

        return responseMap.data
    }
}

export default new Report();