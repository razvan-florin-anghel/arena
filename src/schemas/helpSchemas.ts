import { z } from "zod"

export const getHelpSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  department: z.string().min(1, "Department is required"),
  subject: z.string().min(1, "Subject is required"),
  description: z.string().min(10, "Please provide at least 10 characters"),
  file: z.any().optional(),
})

export const offerHelpSchema = z.object({
  selectedRequest: z.string().min(1, "Please select a request"),
})

export type GetHelpFormValues = z.infer<typeof getHelpSchema>
export type OfferHelpFormValues = z.infer<typeof offerHelpSchema>
