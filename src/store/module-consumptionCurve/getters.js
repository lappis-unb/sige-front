const getUrl = (state) => {
  return state.url
}

const errorStartDate = (state) => {
  return state.errorStartDate
}

const errorEndDate = (state) => {
  return state.errorEndDate
}

const getFilters = (state) => {
  return {
    periodicity: state.periodicity,
    startDate: state.startDate,
    endDate: state.endDate,
    campus: state.idCampus,
    group: state.idGroup
  }
}

const getSerie = (state) => {
  return state.serieChart
}

const getCategoryXAxis = (state) => {
  return state.categories_xaxis
}

const getTypeXAxis = (state) => {
  return state.categoriesXAxis
}

const getGraphNotEmpty = (state) => {
  return state.thereIsConsumption
}

const getPeriodicity = (state) => {
  return state.periodicity
}

export {
  getUrl,
  errorStartDate,
  errorEndDate,
  getFilters,
  getSerie,
  getCategoryXAxis,
  getTypeXAxis,
  getGraphNotEmpty,
  getPeriodicity
}
