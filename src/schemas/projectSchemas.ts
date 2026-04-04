import { z } from "zod"

export const registerProjectSchema = z.object({
  projectTitle: z.string().min(1, "Project title is required"),
  projectSponsor: z.string().min(1, "Project sponsor is required"),
  ideaImage: z.any().optional(),
  abstract: z.string().min(10, "Abstract must be at least 10 characters"),
  problemOpportunity: z.string().min(10, "Please describe the problem/opportunity"),
  proposedSolution: z.string().min(10, "Please describe the proposed solution"),
  helpLookingFor: z.string().min(1, "Please describe the help you are looking for"),
})

export type RegisterProjectFormValues = z.infer<typeof registerProjectSchema>
