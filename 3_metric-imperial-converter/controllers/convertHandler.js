function ConvertHandler() {

  this.getNum = function (input) {
    // Use a regular expression to match the number part of the string (supports fractions and decimals)
    const result = input.match(/^(\d+(?:\.\d+)?(?:\/+\d+(?:\.\d+)?)*(?=[a-zA-Z]*$))/);
    if (!result) return 1
    else {
      let strNum = ''
      strNum = result[0]
      if (strNum.includes('/')) {
        if ((strNum.match(/\//g) || []).length > 1) return 'err'
        const parts = strNum.split('/')
        return parts[0] / parts[1]
      }
      return result[0]
    }
  };

  this.getUnit = function (input) {
    // Use a regular expression to match the unit part of the string
    const result = input.toLowerCase().match(/lbs$|km$|mi$|gal$|l$|kg$/)
    if (result) {
      if (result[0] == 'l') return 'L'
      if (['km', 'mi', 'gal', 'kg', 'lbs'].includes(result[0]))
        return result[0]
    }
    return 'err'
  };


  this.getReturnUnit = function (initUnit) {
    switch (initUnit) {
      // km - mi
      case 'km':
        return 'mi'
      case 'mi':
        return 'km'
      // L - gal
      case 'L':
        return 'gal'
      case 'gal':
        return 'L'
      // kg - lbs
      case 'kg':
        return 'lbs'
      case 'lbs':
        return 'kg'
      // Default
      default:
        return 'err'
    }

  };

  this.spellOutUnit = function (unit) {
    switch (unit) {
      // km - mi
      case 'km':
        return 'kilometers'
      case 'mi':
        return 'miles'
      // L - gal
      case 'L':
        return 'liters'
      case 'gal':
        return 'gallons'
      // kg - lbs
      case 'kg':
        return 'kilograms'
      case 'lbs':
        return 'pounds'
      // Default
      default:
        return 0
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch (initUnit) {
      // km - mi
      case 'km':
        return initNum / miToKm
      case 'mi':
        return initNum * miToKm
      // L - gal
      case 'L':
        return initNum / galToL
      case 'gal':
        return initNum * galToL
      // kg - lbs
      case 'kg':
        return initNum / lbsToKg
      case 'lbs':
        return initNum * lbsToKg
      // Default
      default:
        return 'err'
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
  };

}

module.exports = ConvertHandler;
