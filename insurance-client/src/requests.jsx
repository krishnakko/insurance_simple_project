const API_PATH = "http://localhost:9090"

export const getAllPolicies = async () => {
    console.log("response")
    let response = await fetch(API_PATH + "/policies");
    console.log("response", response);
    let data = await response.json();
    return data;
}

export const searchAllPolicies = async (payload) => {
    let response = await fetch(API_PATH + "/policies/search?" + new URLSearchParams(payload));
    let data = await response.json();
    console.log("data", data);
    return data;
}
