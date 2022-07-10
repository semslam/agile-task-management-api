const {generateAccessToken,decryptToken} = require("../libraries/jwtEncryptAndDecrypt")

describe('passwordHashing Test', () => {

    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzVhMmU2YjFkNmZmYWVlY2JhOTAwZiIsInVzZXJuYW1lIjoiam9lMjM0QGdtYWlsLmNvbSIsInVzZXIiOiJEYXZpZCBPbGEiLCJpYXQiOjE2NTcyODEwMjIsImV4cCI6MTY4ODgxNzAyMn0.9DCyf9W8-Bedgmn4CSmPn7OS06-tQACxQXOccd6EMQw";
    const password = "password123";
    const obj = {valueNotSet: '', valueSet: 'value'};
    const obj2 = {valueUndefine:undefined, valueSet: 'value'};
    const objVerification = {valueSet: 'value'};

    test('Test isPasswordMatch ', async () => {
        try {
            expect(decryptToken(password)).not.toBeFalsy();
            expect(decryptToken(accessToken)).toBeTruthy();
            expect(typeof await decryptToken(accessToken)).toEqual("object");
            expect(decryptToken('')).toBeFalsy();
            expect(decryptToken(324)).toBeFalsy();
            expect(decryptToken(undefined)).toBeFalsy();
            expect(decryptToken([])).toBeFalsy();
            expect(decryptToken()).toBeFalsy();
            expect(decryptToken(true)).toBeFalsy();
        } catch (err) {
            expect(err.message).toBe("The token can't be an empty and most be a string!");
        }
      });

      test('Test generateAccessToken ', async () => {
        try {
            expect(generateAccessToken(password)).toBeFalsy();
            expect(typeof generateAccessToken(objVerification)).toEqual("string");
            expect(generateAccessToken({})).toBeTruthy();
            expect(generateAccessToken('')).toBeFalsy();
            expect(generateAccessToken(754)).toBeFalsy();
            expect(generateAccessToken(null)).toBeFalsy();
            expect(generateAccessToken(undefined)).toBeFalsy();
            expect(generateAccessToken()).toBeFalsy();
            expect(generateAccessToken(true)).toBeFalsy();
        } catch (err) {
            expect(err.message).toBe("The jwt token object can't be empty!!");
        }

        try {
            expect(generateAccessToken(obj2)).toBeFalsy();
        } catch (err) {
            expect(err.message).toBe("The jwt token object can't contain undefine property!!");
        }
      });

})