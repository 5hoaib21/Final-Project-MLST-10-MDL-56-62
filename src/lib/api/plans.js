import { serverFetch } from "../core/server"

export const gerPlanById = async (planId) => {
    return serverFetch(`/api/plans/?plan_id=${planId}`)
}