export class TransductorStatus {
  static formatDateToString (currentDate) {
    let dateFormatted = ''
    dateFormatted += currentDate.day.toString().padStart(2, '0') + '/'
    dateFormatted += currentDate.month.toString().padStart(2, '0') + '/'
    dateFormatted += currentDate.year.toString()
    return dateFormatted
  }

  static getDateNowSelectFormat (daysBeforeToday = 0) {
    const currentDate = new Date()
    const day = currentDate.getDate() - daysBeforeToday
    const month = currentDate.getMonth() + 1
    const year = currentDate.getFullYear()
    return this.formatDateToString({ day, month, year })
  }

  static getOccurrenceName (typeOccurrence) {
    const warningByOccurrence = {
      critical_tension: 'Tensão crítica',
      precarious_tension: 'Tensão precária',
      phase_drop: 'Queda de Fase'
    }

    if (typeOccurrence in warningByOccurrence) {
      return warningByOccurrence[typeOccurrence]
    }

    return 'Falha de comunicação'
  }

  static getOccurrenceInfo (item, info) {
    if (info === 'conection_fail') {
      return 'Possível queda de energia'
    } else if (info === 'critical_tension' ||
      info === 'precarious_tension') {
      return this.getPhaseVoltage(item)
    } else if (info === 'phase_drop') {
      return this.getPhase(item)
    }
  }

  static getPhaseVoltage (item) {
    let phaseVoltageResponse = ''
    let isFirst = true
    const { voltage_a: voltageA, voltage_b: voltageB, voltage_c: voltageC } = item.data

    if (voltageA) {
      phaseVoltageResponse += 'A - ' + Math.round(item.data.voltage_a) + 'V '
      isFirst = false
    }
    if (voltageB) {
      if (!isFirst) {
        phaseVoltageResponse += ' / '
      }
      phaseVoltageResponse += 'B - ' + Math.round(item.data.voltage_b) + 'V '
      isFirst = false
    }
    if (voltageC) {
      if (!isFirst) {
        phaseVoltageResponse += ' / '
      }
      phaseVoltageResponse += 'C - ' + Math.round(item.data.voltage_c) + 'V '
      isFirst = false
    }
    return phaseVoltageResponse
  }

  static getPhase (item) {
    let phaseResponse = ''
    let isFirst = true
    const { voltage_a: voltageA, voltage_b: voltageB, voltage_c: voltageC } = item.data

    if (voltageA) {
      phaseResponse += 'Fase A '
      isFirst = false
    }
    if (voltageB) {
      if (!isFirst) {
        phaseResponse += ' / '
      }
      phaseResponse += 'Fase B '
      isFirst = false
    }
    if (voltageC) {
      if (!isFirst) {
        phaseResponse += ' / '
      }
      phaseResponse += 'Fase C '
      isFirst = false
    }
    return phaseResponse
  }

  static timePassedDays (date, compareDate, isStartTime) {
    let timeFormatted = ''
    const day = new Date(date).setHours(0, 0, 0, 0)
    const compareDay = new Date(compareDate).setHours(0, 0, 0, 0)

    const dayInMiliSeconds = 86400000
    const days = Math.floor((compareDay - day) / dayInMiliSeconds)

    if (isStartTime && days > 0) {
      const plural = days > 1 ? 's ' : ' '

      timeFormatted += days.toString() + ' dia' + plural
    } else {
      const hour = date.getHours()
      const minute = date.getMinutes()
      timeFormatted += hour.toString() + 'h' + minute.toString().padStart(2, 0)
    }
    return timeFormatted
  }

  static timePassed (itemDate) {
    const dateParsed = new Date(itemDate)
    const currentDate = new Date()
    const hourInMilliseconds = 1000 * 60
    const min = Math.floor((currentDate - dateParsed) / hourInMilliseconds)
    if (min > 0) {
      if (min < 60) {
        return min + ' min'
      } else {
        const hour = Math.floor(min / 60)
        const minute = min % 60
        return `${hour} ${minute !== 0 ? 'h ' : 'hora'} ${minute !== 0 ? minute + 'min' : ''}`
      }
    } else {
      return 'agora'
    }
  }

  static separateInDays (arr, type, today, yesterday, beforeYesterday, occurrences = []) {
    const currentDate = new Date()
    arr.forEach((currentOccurrence) => {
      const startTime = new Date(currentOccurrence.start_time)
      const endTime = currentOccurrence.end_time === null ? new Date() : new Date(currentOccurrence.end_time)

      const formattedOccurrence = {
        ...currentOccurrence,
        originalType: type,
        type: this.getOccurrenceName(type),
        writtenStartTime: this.timePassedDays(startTime, endTime, true),
        writtenEndTime: this.timePassedDays(endTime, currentDate, false),
        info: this.getOccurrenceInfo(currentOccurrence, type)
      }

      if (formattedOccurrence.end_time === null) {
        occurrences.push(formattedOccurrence)
      }

      const dayInMiliSeconds = 86400000
      const diff = Math.floor((currentDate.setHours(0, 0, 0, 0) - endTime.setHours(0, 0, 0, 0)) / dayInMiliSeconds)

      if (diff === 0) {
        today.push(formattedOccurrence)
      } else if (diff === 1) {
        yesterday.push(formattedOccurrence)
      } else if (diff === 2) {
        beforeYesterday.push(formattedOccurrence)
      }
    })
  }
}
