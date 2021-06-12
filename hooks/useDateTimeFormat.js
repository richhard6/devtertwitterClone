import { DEFAULT_LANGUAGE } from 'constants/local'

export default function useDateTimeFormat(timestamp) {
  const date = new Date(timestamp)
  const language = DEFAULT_LANGUAGE

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }

  return new Intl.DateTimeFormat(language, options).format(date)
}
