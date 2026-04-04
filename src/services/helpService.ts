export interface GetHelpPayload {
  firstName: string
  lastName: string
  email: string
  department: string
  subject: string
  description: string
  file?: File | null
}

export interface OfferHelpPayload {
  selectedRequest: string
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const getHelpService = async (data: GetHelpPayload): Promise<{ success: true }> => {
  await delay(1500)
  console.log("Help request submitted:", data)
  return { success: true }
}

export const offerHelpService = async (data: OfferHelpPayload): Promise<{ success: true }> => {
  await delay(1500)
  console.log("Offer help submitted:", data)
  return { success: true }
}
