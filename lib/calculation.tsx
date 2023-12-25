const formatMyNumber = (myNumber: number) => {
  const newNumber = parseFloat(myNumber.toFixed(2))
  return newNumber
}

export const returnOnInvestmentFunc = (
  startAmount: number,
  currentAmount: number
) => {
  if (startAmount <= 0) return 0
  const capitalGain = currentAmount - startAmount
  const returnOnInvestment = (capitalGain / currentAmount) * 100

  return formatMyNumber(returnOnInvestment)
}

export const percentageOnInvestmentFunc = (
  startAmount: number,
  currentAmount: number
) => {
  if (startAmount <= 0) return 0
  const capitalGain = currentAmount - startAmount
  const percentageOnInvestment = (capitalGain / startAmount) * 100
  return formatMyNumber(percentageOnInvestment)
}
