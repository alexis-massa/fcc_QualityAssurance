# 💻 Project : American British Translator
[Project : American British Translator](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/american-british-translator)

Build a full stack JavaScript app that is functionally similar to this: https://american-british-translator.freecodecamp.rocks/. 

## Task list
### Implementation

- [x] All logic can go into `/components/translator.js`
- [x] Complete the `/api/translate` route in `/routes/api`.js
- [x] Create all of the unit/functional tests in `tests/1_unit-tests.js` and `tests/2_functional-tests.js`
- [x] See the JavaScript files in `/components` for the different spelling and terms your application should translate
- [x] To run the tests automatically, set `NODE_ENV` to `test` without quotes in the `.env` file
- [x] To run the tests in the console, use the command `npm run test`.

### Write the following tests in `tests/1_unit-tests.js`:

- [x] Translate `Mangoes are my favorite fruit.` to British English
- [x] Translate `I ate yogurt for breakfast.` to British English
- [x] Translate `We had a party at my friend's condo.` to British English
- [x] Translate `Can you toss this in the trashcan for me?` to British English
- [x] Translate `The parking lot was full.` to British English
- [x] Translate `Like a high tech Rube Goldberg machine.` to British English
- [x] Translate `To play hooky means to skip class or work.` to British English
- [x] Translate `No Mr. Bond, I expect you to die.` to British English
- [x] Translate `Dr. Grosh will see you now.` to British English
- [x] Translate `Lunch is at 12:15 today.` to British English
- [x] Translate `We watched the footie match for a while.` to American English
- [x] Translate `Paracetamol takes up to an hour to work.` to American English
- [x] Translate `First, caramelise the onions.` to American English
- [x] Translate `I spent the bank holiday at the funfair.` to American English
- [x] Translate `I had a bicky then went to the chippy.` to American English
- [x] Translate `I've just got bits and bobs in my bum bag.` to American English
- [x] Translate `The car boot sale at Boxted Airfield was called off.` to American English
- [x] Translate `Have you met Mrs Kalyani?` to American English
- [x] Translate `Prof Joyner of King's College, London.` to American English
- [x] Translate `Tea time is usually around 4 or 4.30.` to American English
- [x] Highlight translation in `Mangoes are my favorite fruit.`
- [x] Highlight translation in `I ate yogurt for breakfast.`
- [x] Highlight translation in `We watched the footie match for a while.`
- [x] Highlight translation in `Paracetamol takes up to an hour to work.`

### Write the following tests in `tests/2_functional-tests.js`:
- [x] Translation with text and locale fields: `POST` request to `/api/translate`
- [x] Translation with text and invalid locale field: `POST` request to `/api/translate`
- [x] Translation with missing text field: `POST` request to `/api/translate`
- [x] Translation with missing locale field: `POST` request to `/api/translate`
- [x] Translation with empty text: `POST` request to `/api/translate`
- [x] Translation with text that needs no translation: `POST` request to `/api/translate`
