import { useMutation } from "@tanstack/react-query"
import { submitIdeaService, submitAIIdeaService, type SubmitIdeaPayload } from "../services/ideaService"

export const useSubmitIdea = () =>
  useMutation({
    mutationFn: (data: SubmitIdeaPayload) => submitIdeaService(data),
  })

export const useSubmitAIIdea = () =>
  useMutation({
    mutationFn: (data: SubmitIdeaPayload) => submitAIIdeaService(data),
  })
