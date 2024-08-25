export function parseTextToArray(data: string | null) {
  if (data) {
    return JSON.parse(data)
  }
  return []
}

export function parseTextToObject(data: string | null) {
  if (data) {
    return JSON.parse(data)
  }
  return {}
}
