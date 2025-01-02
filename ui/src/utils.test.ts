import { isValidDeposit, isValidWithdrawl } from "./utils";

describe('isValidWithdrawl', () => {

    const accountInfo = {
        accountNumber: 1, 
        amount: 5000, 
        creditLimit: 0,
        name: 'My account', 
        type: 'checking'
    };

    test('is valid', () => {
        expect(isValidWithdrawl({ accountInfo, withdrawAmount: 200 })).toEqual({
        valid: true, message: ''
        });
    });
    test('exceeds limit', () => {
        expect(isValidWithdrawl({ accountInfo, withdrawAmount: 300 })).toEqual({
        valid: false, message: 'Withdrawls cannot exceed $200'
        });
    });
    test('exceeds balance', () => {
        const account = {...accountInfo, amount: 0 };
        expect(
          isValidWithdrawl({ accountInfo: account, withdrawAmount: 300 })
        ).toEqual({
          valid: false,
          message: 'You cannot withdraw more than your balance',
        });
    });
    test('is not in increments of $5', () => {
      expect(isValidWithdrawl({ accountInfo, withdrawAmount: 12 })).toEqual({
        valid: false,
        message: "Withdrawls must be in increments of $5",
      });
    });

});

describe('isValidDeposit', () => {

    const accountInfo = {
      accountNumber: 1,
      amount: 500,
      creditLimit: 0,
      name: "My account",
      type: "checking",
    };

    test('isValid', () => {
      expect(isValidDeposit({accountInfo, depositAmount: 500 })).toEqual({
        valid: true, message: ''
      })
    });
    test('exceeds limit', () => {
      expect(isValidDeposit({ accountInfo, depositAmount: 1500 }))
      .toEqual({ valid: false, message: 'Deposits are limited to $1000' });
    });
    test('exceeds balance', () => {
      const account = {...accountInfo, type: 'credit', amount: 500 };
      expect(isValidDeposit({ accountInfo: account, depositAmount: 1500 }))
      .toEqual({ valid: false, message: 'Deposits are limited to $1000' });
    });
});