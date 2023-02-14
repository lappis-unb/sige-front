const { default: MASTER } = require("../masterApi/http-common")

class Report {

    getReports = async () => {
        const URL = '/graph/reports/'
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