const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export async function fetchData<T>(url: string) {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    cache: 'force-cache'
  })
  return (await res.json()) as T
}

export async function fetchDataWithoutApi<T>(url: string) {
  const res = await fetch(`${baseUrl}/${url}`, {
    cache: 'force-cache'
  })
  return (await res.json()) as T
}
