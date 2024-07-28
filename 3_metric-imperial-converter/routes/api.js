'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route(`/api/convert`)
    .get((req, res) => {
      // console.log("input : " + req.query.input);

      const initNum = convertHandler.getNum(req.query.input)
      const initUnit = convertHandler.getUnit(req.query.input)
      if ((initNum == 'err') && (initUnit == 'err')) {
        res.type('txt').send('invalid number and unit')
        return
      }
      if (initNum == 'err') {
        res.type('txt').send('invalid number')
        return
      }
      if (initUnit == 'err') {
        res.type('txt').send('invalid unit')
        return
      }
      const returnNum = Math.round(convertHandler.convert(initNum, initUnit) * 100000) / 100000
      // const returnNum = Math.round((convertHandler.convert(initNum, initUnit) + Number.EPSILON) * 100000) / 100000
      const returnUnit = convertHandler.getReturnUnit(initUnit)
      const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)

      const resultObject = {
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: string
      }

      // console.log("output :");
      // console.log(resultObject);
      res.type('application/json').send(JSON.stringify(resultObject))
    });
};
