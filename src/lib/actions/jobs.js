"use server";

import { serverMutation } from "../core/server";

export const createJob = async (newJobData) => {
  return await serverMutation('/api/jobs', newJobData)
}

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// export const createJob = async (newJobData) => {
//   const res = await fetch(`${baseUrl}/api/jobs`, {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//     },
//     body: JSON.stringify(newJobData)
// });
// return res.json();
// };
