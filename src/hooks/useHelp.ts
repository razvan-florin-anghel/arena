import { useMutation } from "@tanstack/react-query"
import { getHelpService, offerHelpService, type GetHelpPayload, type OfferHelpPayload } from "../services/helpService"

export const useGetHelp = () =>
  useMutation({
    mutationFn: (data: GetHelpPayload) => getHelpService(data),
  })

export const useOfferHelp = () =>
  useMutation({
    mutationFn: (data: OfferHelpPayload) => offerHelpService(data),
  })
