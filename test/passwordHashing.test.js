const {isPasswordMatch,hashPassword} = require("../libraries/passwordHashing")

describe('passwordHashing Test', () => {

    const hash = "$2b$10$0.6ItgJolSCRtbYKPVT51eeZv4ITT1bEb2CXAtVvLKR3YkFplx8c.";
    const password = "password123";

    test('Test isPasswordMatch ', async () => {
        try {
            expect(await isPasswordMatch(password,hash)).not.toBeFalsy();
            expect(await isPasswordMatch(password,hash)).toBeTruthy();
            expect(await isPasswordMatch('',hash)).toBeFalsy();
            expect(await isPasswordMatch('','')).toBeFalsy();
            expect(await isPasswordMatch(324,hash)).toBeFalsy();
            expect(await isPasswordMatch(undefined,966)).toBeFalsy();
            expect(await isPasswordMatch(password,undefined)).toBeFalsy();
            expect(await isPasswordMatch()).toBeFalsy();
        } catch (err) {
            expect(err.message).toBe("Password or hash and it most be a strings");
        }
      });

      test('Test hashPassword ', async () => {
        try {
            expect(typeof await hashPassword(password)).toEqual("string");
            expect(await hashPassword(password)).toBeTruthy();
            expect(await hashPassword('')).toBeFalsy();
            expect(await hashPassword(754)).toBeFalsy();
            expect(await hashPassword(null)).toBeFalsy();
            expect(await hashPassword(undefined)).toBeFalsy();
            expect(await hashPassword()).toBeFalsy();
        } catch (err) {
            expect(err.message).toBe("Password can't be empty and it most be a string");
        }
      });

})