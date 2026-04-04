import { z } from "zod"

export const submitIdeaSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  department: z.string().min(1, "Department is required"),
  subject: z.string().min(1, "Subject is required"),
  description: z.string().min(10, "Please provide at least 10 characters"),
  file: z.any().optional(),
})

export type SubmitIdeaFormValues = z.infer<typeof submitIdeaSchema>
