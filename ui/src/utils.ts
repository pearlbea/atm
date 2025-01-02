import type { account } from "./Types/Account";

export function isValidWithdrawl({
  accountInfo,
  withdrawAmount,
}: {
  accountInfo: account,
  withdrawAmount: number
}): { valid: boolean, message: string} {

  if (accountInfo.type !== 'credit' && withdrawAmount > accountInfo.amount) {
    return { valid: false, message: 'You cannot withdraw more than your balance'}
  }
  if (accountInfo.type === 'credit' && withdrawAmount > accountInfo.creditLimit) {
    return { valid: false, message: 'You cannot exceed your credit limit' };
  }
  if (withdrawAmount > 200) {
    return { valid: false, message: 'Withdrawls cannot exceed $200' }
  }
  if (withdrawAmount % 5 !== 0) {
    return { valid: false, message: 'Withdrawls must be in increments of $5'}
  }
  return { valid: true, message: '' }
}

export function isValidDeposit({
  accountInfo,
  depositAmount
} : {
  accountInfo: account,
  depositAmount: number
}): { valid: boolean, message: string } {

  if(depositAmount > 1000) {
    return { valid: false, message: 'Deposits are limited to $1000'}
  }
  if (accountInfo.type === 'credit' && depositAmount + accountInfo.amount > 0) {
    return { valid: false, message: 'You cannot pay more than your balance'}
  }
  return { valid: true, message: '' }
}