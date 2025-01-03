export const apiClient = async (url: string, options: RequestInit) => {
  try {
    const response = await fetch(url, options)
    const data = await response?.json()
    if (response.ok) {
      return data
    }
    throw data
  } catch (error) {
    throw error
  }
}
