export const longDateFormat = (dateString) => {
  const date = new Date(dateString + 'T00:00:00')

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  return date.toLocaleString('en-US', options)
}
