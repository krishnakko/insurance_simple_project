const API_PATH = "http://localhost:9090"

export const getAllPolicies = async (payload) => {
    let response = await fetch(API_PATH + "/policies?" + new URLSearchParams(payload));
    let data = await response.json();
    return data;
}

export const searchAllPolicies = async (payload) => {
    let response = await fetch(API_PATH + "/policies/search?" + new URLSearchParams(payload));
    let data = await response.json();
    return data;
}

export const getPolicyDetails = async (policyId) => {
    let response = await fetch(API_PATH + "/policies/" + policyId);
    let data = await response.json();
    return data;
}

export const updatePolicy = async (policyId, payload) => {
    let response = await fetch(API_PATH + "/policies/" + policyId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    let data = await response.json();
    return data;
}