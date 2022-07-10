const {convertDateToTimeStamp,convertTimeStampToDate} = require("../libraries/dateFormat")

describe('passwordHashing Test', () => {

    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzVhMmU2YjFkNmZmYWVlY2JhOTAwZiIsInVzZXJuYW1lIjoiam9lMjM0QGdtYWlsLmNvbSIsInVzZXIiOiJEYXZpZCBPbGEiLCJpYXQiOjE2NTcyODEwMjIsImV4cCI6MTY4ODgxNzAyMn0.9DCyf9W8-Bedgmn4CSmPn7OS06-tQACxQXOccd6EMQw";
    const password = "password123";
    const obj = {valueNotSet: '', valueSet: 'value'};
    const obj2 = {valueUndefine:undefined, valueSet: 'value'};
    const objVerification = {valueSet: 'value'};
    class A{}

    test('Test convertDateToTimeStamp ', async () => {
        try {
            expect(convertDateToTimeStamp(new Date())).toBeTruthy();
            expect(convertDateToTimeStamp(new Date())).not.toBeFalsy();
            expect(typeof convertDateToTimeStamp(new Date())).toEqual('number');
            expect(typeof convertDateToTimeStamp(new Date())).not.toEqual('string');
            expect(convertDateToTimeStamp(password)).not.toBeFalsy();
            expect(convertDateToTimeStamp(accessToken)).toBeTruthy();
    
            expect(convertDateToTimeStamp('')).toBeFalsy();
            expect(convertDateToTimeStamp(324)).toBeFalsy();
            expect(convertDateToTimeStamp(undefined)).toBeFalsy();
            expect(convertDateToTimeStamp(new A())).toBeFalsy();
            expect(convertDateToTimeStamp([])).toBeFalsy();
            expect(convertDateToTimeStamp()).toBeFalsy();
            expect(convertDateToTimeStamp(true)).toBeFalsy();
        } catch (err) {
            expect(err.message).toBe("This function only accept data instance!");
        }
      });

      test('Test convertTimeStampToDate ', async () => {
        try {
            expect(convertTimeStampToDate(password)).toBeFalsy();
            expect(convertTimeStampToDate(1575909015000) instanceof Date).toBeTruthy();
            expect(convertTimeStampToDate({})).toBeFalsy();
            expect(convertTimeStampToDate('')).toBeFalsy();
            expect(convertTimeStampToDate(754)).toBeTruthy();
            expect(convertTimeStampToDate(null)).toBeFalsy();
            expect(convertTimeStampToDate(undefined)).toBeFalsy();
            expect(convertTimeStampToDate()).toBeFalsy();
            expect(convertTimeStampToDate(true)).toBeFalsy();
        } catch (err) {
            expect(err.message).toBe("This value is not a number");
        }

        // try {
        //     expect(generateAccessToken(obj2)).toBeFalsy();
        // } catch (err) {
        //     expect(err.message).toBe("The jwt token object can't contain undefine property!!");
        // }
      });

})