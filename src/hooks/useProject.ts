import { useMutation } from "@tanstack/react-query"
import { registerProjectService, type RegisterProjectPayload } from "../services/projectService"

export const useRegisterProject = () =>
  useMutation({
    mutationFn: (data: RegisterProjectPayload) => registerProjectService(data),
  })
