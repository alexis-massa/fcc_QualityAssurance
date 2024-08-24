# 💻 Project : Metric Imperial Converter
[Project : Metric Imperial Converter](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/metric-imperial-converter)

Build a full stack JavaScript app that is functionally similar to this: https://metric-imperial-converter.freecodecamp.rocks/. 

## Task list

### Implementation
- [x] Complete the necessary conversion logic in /`controllers/convertHandler.js`
- [x] Complete the necessary routes in `/routes/api.js`
- [x] Copy the sample.env file to `.env` and set the variables appropriately
- [x] To run the tests automatically, add `NODE_ENV=test` in your `.env` file
- [x] To run the tests in the console, use the command npm run test.

### Write the following tests in tests/1_unit-tests.js:

- [x] `convertHandler` should correctly read a whole number input.
- [x] `convertHandler` should correctly read a decimal number input.
- [x] `convertHandler` should correctly read a fractional input.
- [x] `convertHandler` should correctly read a fractional input with a decimal.
- [x] `convertHandler` should correctly return an error on a double-fraction (i.e. 3/2/3).
- [x] `convertHandler` should correctly default to a numerical input of 1 when no numerical input is provided.
- [x] `convertHandler` should correctly read each valid input unit.
- [x] `convertHandler` should correctly return an error for an invalid input unit.
- [x] `convertHandler` should return the correct return unit for each valid input unit.
- [x] `convertHandler` should correctly return the spelled-out string unit for each valid input unit.
- [x] `convertHandler` should correctly convert `gal` to `L`.
- [x] `convertHandler` should correctly convert `L` to `gal`.
- [x] `convertHandler` should correctly convert `mi` to `km`.
- [x] `convertHandler` should correctly convert `km` to `mi`.
- [x] `convertHandler` should correctly convert `lbs` to `kg`.
- [x] `convertHandler` should correctly convert `kg` to `lbs`.

### Write the following tests in tests/2_functional-tests.js:

- [x] Convert a valid input such as `10L`: `GET` request to `/api/convert`.
- [x] Convert an invalid input such as `32g`: `GET` request to `/api/convert`.
- [x] Convert an invalid number such as `3/7.2/4kg`: `GET` request to `/api/convert`.
- [x] Convert an invalid number AND unit such as `3/7.2/4kilomegagram`: `GET` request to `/api/convert`.
- [x] Convert with no number such as `kg`: `GET` request to `/api/convert`.

