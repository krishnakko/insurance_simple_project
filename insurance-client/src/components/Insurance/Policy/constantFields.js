const enabledStatus = [
    { label: "Enable", value: true },
    { label: "Disable", value: false }
];
const genders = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" }
];
const maritalStatus = [
    { label: "Married", value: true },
    { label: "Unmarried", value: false }
];
const vehicleSegments = [
    { label: "A Segment", value: "A" },
    { label: "B Segment", value: "B" },
    { label: "C Segment", value: "C" }
]

export const policyTableFieldsWithProps = [
    {
        "name": "customer_id",
        "label": "Customer ID",
        "type": "text",
        "required": true,
        "error_message": true
    },
    {
        "name": "vehicle_segment",
        "label": "Vehicle segment",
        "type": "dropdown",
        "required": false,
        "error_message": false,
        "options": vehicleSegments
    },
    {
        "name": "fuel",
        "label": "Fuel",
        "type": "text",
        "required": false,
        "error_message": false,
    },
    {
        "name": "premium",
        "label": "Premium",
        "type": "text",
        "required": true,
        "error_message": true,
    },
    {
        "name": "bodily_injury_liability",
        "label": "Bodily Injury Liability",
        "type": "dropdown",
        "required": false,
        "error_message": false,
        "options": enabledStatus
    },
    {
        "name": "personal_injury_protection",
        "label": "Personal injury protection",
        "type": "dropdown",
        "required": false,
        "error_message": false,
        "options": enabledStatus
    },
    {
        "name": "property_damage_liability",
        "label": "Property damage liability",
        "type": "dropdown",
        "required": false,
        "error_message": false,
        "options": enabledStatus
    },
    {
        "name": "collision",
        "label": "Collision",
        "type": "dropdown",
        "required": false,
        "error_message": false,
        "options": enabledStatus
    },
    {
        "name": "comprehensive",
        "label": "Comprehensive",
        "type": "dropdown",
        "required": false,
        "error_message": false,
        "options": enabledStatus
    },
    {
        "name": "date_of_purchase",
        "label": "Date of purchase",
        "type": "date",
        "required": false,
        "disabled": true,
        "error_message": false,
    },
    {
        "name": "customer_income_group",
        "label": "Customer Income Group",
        "type": "text",
        "disabled": true,
        "required": false,
        "error_message": false,
    },
    {
        "name": "customer_income_group",
        "label": "Select Income range",
        "type": "slider",
        "required": false,
        "error_message": false,
        "max": 500
    },
    {
        "name": "customer_region",
        "label": "Customer Region",
        "type": "text",
        "required": false,
        "error_message": false,
    },
    {
        "name": "customer_gender",
        "label": "Customer gender",
        "type": "dropdown",
        "required": false,
        "error_message": false,
        "options": genders
    },
    {
        "name": "customer_marital_status",
        "label": "Customer marital status",
        "type": "dropdown",
        "required": false,
        "error_message": false,
        "options": maritalStatus
    }
];