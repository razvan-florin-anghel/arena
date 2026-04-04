export interface SubmitIdeaPayload {
  firstName: string
  lastName: string
  email: string
  department: string
  subject: string
  description: string
  file?: File | null
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const submitIdeaService = async (data: SubmitIdeaPayload): Promise<{ success: true; id: string }> => {
  await delay(1500)
  console.log("Idea submitted:", data)
  return { success: true, id: `IDEA-${Date.now()}` }
}

export const submitAIIdeaService = async (data: SubmitIdeaPayload): Promise<{ success: true; id: string }> => {
  await delay(1500)
  console.log("AI Idea submitted:", data)
  return { success: true, id: `AI-IDEA-${Date.now()}` }
}
