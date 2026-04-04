export interface RegisterProjectPayload {
  projectTitle: string
  projectSponsor: string
  ideaImage?: File | null
  abstract: string
  problemOpportunity: string
  proposedSolution: string
  helpLookingFor: string
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const registerProjectService = async (
  data: RegisterProjectPayload
): Promise<{ success: true; id: string }> => {
  await delay(1500)
  console.log("Project registered:", data)
  return { success: true, id: `PROJ-${Date.now()}` }
}
