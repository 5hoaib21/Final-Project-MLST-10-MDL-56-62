import { serverFetch } from "../core/server"


export const getApplicationsByApplicant = async (applicationId) => {
    return serverFetch(`/api/applications?applicantId=${applicationId}`)
}