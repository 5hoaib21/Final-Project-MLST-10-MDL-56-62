const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;



export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`)
     const text = await res.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    console.log("Invalid JSON response:", text);
    throw error;
  }
}





export const serverMutation = async (path, data, method = 'POST') => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: method ,
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    return res.json();
}