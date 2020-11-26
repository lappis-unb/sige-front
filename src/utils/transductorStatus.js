
export function getDateNowSelectFormat (daysBeforeToday = 0) {
  const date = new Date()
  console.log('data', date)

  const day = date.getDate() - daysBeforeToday
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const dateFormatted = day.toString().padStart(2, '0') + '/' + month.toString().padStart(2, '0') + '/' + year.toString()
  return dateFormatted
}

export function separateInDays (arr, type, today, yesterday, beforeYesterday, occurrences = []) {
  const now = new Date()
  arr.forEach((elem) => {
    const startTime = new Date(elem.start_time)
    const endTime = elem.end_time === null ? new Date() : new Date(elem.end_time)

    const item = {
      ...elem,
      originalType: type,
      type: getOccurenceName(type),
      writtenStartTime: timePassedDays(startTime, endTime, true),
      writtenEndTime: timePassedDays(endTime, now, false),
      info: getInfo(elem, type)
    }
    if (item.end_time === null) {
      occurrences.push(item)
    }
    endTime.setHours(0, 0, 0, 0)
    now.setHours(0, 0, 0, 0)

    const diff = Math.floor((now - endTime) / (1000 * 60 * 60 * 24))

    if (diff === 0) {
      today.push(item)
    } else if (diff === 1) {
      yesterday.push(item)
    } else if (diff === 2) {
      beforeYesterday.push(item)
    }
  })
}

export function getInfo (item, info) {
  if (info === 'conection_fail') {
    return 'Possível queda de energia'
  } else if (info === 'critical_tension' ||
    info === 'precarious_tension') {
    return getPhaseVoltage(item)
  } else if (info === 'phase_drop') {
    return getPhase(item)
  }
}

export function getPhaseVoltage (item) {
  let phaseVoltage = ''
  let isFirst = true

  if (item.data.voltage_a) {
    phaseVoltage += 'A - ' + Math.round(item.data.voltage_a) + 'V '
    isFirst = false
  }
  if (item.data.voltage_b) {
    if (!isFirst) {
      phaseVoltage += ' / '
    }
    phaseVoltage += 'B - ' + Math.round(item.data.voltage_b) + 'V '
    isFirst = false
  }
  if (item.data.voltage_c) {
    if (!isFirst) {
      phaseVoltage += ' / '
    }
    phaseVoltage += 'C - ' + Math.round(item.data.voltage_c) + 'V '
    isFirst = false
  }
  return phaseVoltage
}

export function getPhase (item) {
  let phase = ''
  let isFirst = true

  if (item.data.voltage_a) {
    phase += 'Fase A '
    isFirst = false
  }
  if (item.data.voltage_b) {
    if (!isFirst) {
      phase += ' / '
    }
    phase += 'Fase B '
    isFirst = false
  }
  if (item.data.voltage_c) {
    if (!isFirst) {
      phase += ' / '
    }
    phase += 'Fase C '
    isFirst = false
  }
  return phase
}

export function timePassedDays (date, compareDate, isStartTime) {
  let timeInDays = ''
  const day = new Date(date)
  const compareDay = new Date(compareDate)

  day.setHours(0, 0, 0, 0)
  compareDay.setHours(0, 0, 0, 0)
  const days = Math.floor((compareDay - day) / (1000 * 60 * 60 * 24))

  if (isStartTime && days > 0) {
    const plural = days > 1 ? 's ' : ' '

    timeInDays += days.toString() + ' dia' + plural
  } else {
    const h = date.getHours()
    const min = date.getMinutes()
    timeInDays += h.toString() + 'h' + min.toString().padStart(2, 0)
  }
  return timeInDays
}

export function getOccurenceName (type) {
  switch (type) {
    case 'critical_tension':
      return 'Tensão crítica'
    case 'precarious_tension':
      return 'Tensão precária'
    case 'phase_drop':
      return 'Queda de Fase'
    default:
      return 'Falha de comunicação'
  }
}

export function timePassed (time) {
  const d = new Date(time)
  const now = new Date()
  const min = Math.floor((now - d) / (1000 * 60))
  if (min > 0) {
    if (min < 60) {
      return min + ' min'
    } else {
      const h = Math.floor(min / 60)
      const m = min % 60
      if (m === 0) {
        return h + ' horas'
      } else {
        return h + 'h ' + m + 'min'
      }
    }
  } else {
    return 'agora'
  }
}
