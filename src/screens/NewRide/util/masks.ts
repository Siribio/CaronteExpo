export function maskBRL(value: string): string {
  const digits = value.replace(/\D/g, '')

  const cents = digits.padStart(3, '0').slice(-2)

  let integerDigits =
    digits.length > 2 ? digits.slice(0, -2) : '0'

  integerDigits = integerDigits.replace(/^0+/, '') || '0'

  const intWithThousand = integerDigits.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    '.'
  )

  return `R$ ${intWithThousand},${cents}`
}

export function maskTime(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4)

  if (digits.length < 3) {
    return digits
  }

  return digits.replace(/(\d{2})(\d{1,2})/, '$1:$2')
}
