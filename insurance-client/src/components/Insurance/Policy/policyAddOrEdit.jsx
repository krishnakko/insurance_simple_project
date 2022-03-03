import * as core from '@material-ui/core';
import * as styles from '@material-ui/core/styles';
import * as icons from '@material-ui/icons';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { ErrorMessage, Form, Formik, getIn } from "formik";
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import * as Yup from 'yup';
import { getPolicyDetails, updatePolicy } from '../../../requests';
import { LoadingView } from '../../Loader/loader';
import './policyAddOrEdit.scss';

const yupValidationSchema = Yup.object().shape({
    customer_id: Yup.number().required('Customer ID can not be blank'),
    premium: Yup.number().max(1000000).required('Required'),
})

function valuetext(value) {
    return `${value}°C`;
}



const useStyles = styles.makeStyles((theme) =>
    styles.createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(3),
                width: '30ch',
            },
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 250,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        customWidth: {
            maxWidth: 500,
        },
        noMaxWidth: {
            maxWidth: 'none',
        },
    }),
);


const theme2 = styles.createMuiTheme({
    palette: {
        primary: {
            main: "#42BABD"
        },
    }
});


export default function AddOrEditPolicy(props) {
    const { policyId } = useParams();
    let history = useHistory();
    const policyID = parseInt(window.atob(policyId))
    // const orgDetails = props.orgDetails;
    const { action } = props;
    const classes = useStyles();


    const [initialValues, setInitialValues] = useState({});
    const [policyData, setPolicyData] = useState({});
    const [loader, setLoader] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [incomeRange, setIncomeRange] = React.useState([20, 37]);

    const booleanSelect = [
        { label: "Enable", value: true },
        { label: "Disable", value: false }
    ];
    const maritalStatus = [
        { label: "Married", value: true },
        { label: "Unmarried", value: false }
    ];
    const genders = ["Male", "Female", "Other"];


    const navigateToPolicyTable = () => {
        history.push('/')
    }
    const getModifiedValues = (values) => {
        let finVales = { ...values };
        if (action === "edit") {
            Object.entries(values).forEach(([key, value]) => {
                if (value === policyData[key]) {
                    delete finVales[key];
                }
            });
        }
        return finVales;
    }
    const toAddOrEditPolicySubmit = async (values) => {
        const payload = getModifiedValues(values);
        if (action === "edit") {
            setIsLoading(true);
            const updated = await updatePolicy(policyID, payload);
            if (updated["data"]) {
                setIsLoading(false);
                navigateToPolicyTable();
            }
        }
    }
    useEffect(() => {
        setLoader(true);
        getPolicyDetails(policyID).then(data => {
            setPolicyData(data["data"]);
            setInitialValues(data["data"]);
            const splitRange = data["data"]["customer_income_group"].split("-")
            const range = [parseInt(splitRange[0].replace("$", "")), parseInt(splitRange[1].replace(/[^\d.-]/g, ""))]
            setIncomeRange(range)
            setLoader(false);
        })
    }, [policyID])

    const createTextField = (handleChange, values, handleBlur, fieldProps = {}) => {
        fieldProps = { "name": "customer_id", value: values["customer_id"], "label": "Customer ID" };

        return <div className="fieldWrap">
            <styles.ThemeProvider theme={theme2}>
                <core.TextField
                    autoComplete="off"
                    id={fieldProps["name"]}
                    label={fieldProps["label"]}
                    variant="outlined"
                    name={fieldProps["name"]}
                    value={fieldProps["value"]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />

            </styles.ThemeProvider>
            <ErrorMessage
                name="customer_id"
                component="span"
                className={`error-message`}
            />
        </div>
    }

    return (
        <React.Fragment>
            <div className="policyMainDiv">
                {isLoading ? <LoadingView /> : ""}
                <div className="breadcrumbNav">
                    <span><button type="button" onClick={navigateToPolicyTable}>Policy List</button></span><span><icons.ArrowRight /></span><span >{policyData.policy_id}</span>
                </div>
                <div className="pageTitle">
                    {action === "create" ?
                        <h3>Add policy Details</h3> :
                        <h3>Edit policy Details</h3>
                    }
                </div>
                <div className="policyFormDiv input_MUI_div_border_color">
                    {loader ? "" :

                        <Formik
                            initialValues={initialValues}
                            onSubmit={(values, { setSubmitting }) => {
                                toAddOrEditPolicySubmit(values)
                                setTimeout(() => {
                                    setSubmitting(false);
                                }, 400);
                            }}
                            validationSchema={yupValidationSchema}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                                setFieldValue,
                                isValid,
                                dirty,
                                /* and other goodies */
                            }) => (
                                <Form>
                                    <React.Fragment>
                                        <div className="policyForm">
                                            <div>Policy</div>
                                            <div className="rowDiv flex-container">
                                                <div className="fieldWrap">
                                                    <styles.ThemeProvider theme={theme2}>
                                                        <core.TextField
                                                            autoComplete="off"
                                                            id="customer-id"
                                                            label="Customer ID"
                                                            variant="outlined"
                                                            name="customer_id"
                                                            value={values.customer_id}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />

                                                    </styles.ThemeProvider>
                                                    <ErrorMessage
                                                        name="customer_id"
                                                        component="span"
                                                        className={`error-message`}
                                                    />
                                                </div>
                                                <div className="fieldWrap">
                                                    <core.FormControl variant="outlined" className={`${classes.formControl}`}>
                                                        <core.InputLabel id="demo-simple-select-outlined-label">Vehicle Segment</core.InputLabel>
                                                        <core.Select
                                                            labelId="demo-simple-select-outlined-label"
                                                            id="vehicle-segment"
                                                            name="vehicle_segment"
                                                            label="Vehicle Segment"
                                                            value={values.vehicle_segment}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            className={`dropdownMUI
                                                                                ${getIn(errors, "vehicle_segment") &&
                                                                    getIn(touched, "vehicle_segment")
                                                                    ? "requiredError"
                                                                    : ""}
                                                                            `}
                                                        >
                                                            {
                                                                ["A", "B", "C"].map((val, idx) => {
                                                                    return <core.MenuItem key={idx} value={val}>{val}</core.MenuItem>
                                                                })
                                                            }

                                                        </core.Select>
                                                    </core.FormControl>
                                                </div>
                                                <div className="fieldWrap">
                                                    <styles.ThemeProvider theme={theme2}>
                                                        <core.TextField
                                                            autoComplete="off"
                                                            id="fuel"
                                                            label="Fuel"
                                                            variant="outlined"
                                                            name="fuel"
                                                            value={values.fuel}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </styles.ThemeProvider>
                                                </div>
                                                <div className="fieldWrap">
                                                    <styles.ThemeProvider theme={theme2}>
                                                        <core.TextField
                                                            autoComplete="off"
                                                            id="premium"
                                                            label="Premium"
                                                            variant="outlined"
                                                            name="premium"
                                                            value={values.premium}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </styles.ThemeProvider>
                                                    <ErrorMessage
                                                        name="premium"
                                                        component="span"
                                                        className={`error-message`}
                                                    />
                                                </div>
                                                <div className="fieldWrap">
                                                    <core.FormControl variant="outlined" className={`${classes.formControl}`}>
                                                        <core.InputLabel id="demo-simple-select-outlined-label">Bodily Injury Liability</core.InputLabel>
                                                        <core.Select
                                                            labelId="demo-simple-select-outlined-label"
                                                            id="bodily-injury-liability"
                                                            name="bodily_injury_liability"
                                                            label="Bodily Injury Liability"
                                                            value={values.bodily_injury_liability}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            className={`dropdownMUI
                                                                                ${getIn(errors, "bodily_injury_liability") &&
                                                                    getIn(touched, "bodily_injury_liability")
                                                                    ? "requiredError"
                                                                    : ""}
                                                                            `}
                                                        >
                                                            {
                                                                booleanSelect.map((status, idx) => {
                                                                    return <core.MenuItem key={idx} value={status.value}>{status.label}</core.MenuItem>
                                                                })
                                                            }

                                                        </core.Select>
                                                    </core.FormControl>
                                                </div>
                                                <div className="fieldWrap">
                                                    <core.FormControl variant="outlined" className={`${classes.formControl}`}>
                                                        <core.InputLabel id="demo-simple-select-outlined-label">Personal Injury Protection</core.InputLabel>
                                                        <core.Select
                                                            labelId="demo-simple-select-outlined-label"
                                                            id="personal-injury-protection"
                                                            name="personal_injury_protection"
                                                            label="Personal Injury Protection"
                                                            value={values.personal_injury_protection}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            className={`dropdownMUI ${getIn(errors, "personal_injury_protection") &&
                                                                getIn(touched, "personal_injury_protection")
                                                                ? "requiredError"
                                                                : ""}`}
                                                        >
                                                            {
                                                                booleanSelect.map((status, idx) => {
                                                                    return <core.MenuItem key={idx} value={status.value}>{status.label}</core.MenuItem>
                                                                })
                                                            }

                                                        </core.Select>
                                                    </core.FormControl>
                                                </div>
                                                <div className="fieldWrap">
                                                    <core.FormControl variant="outlined" className={`${classes.formControl}`}>
                                                        <core.InputLabel id="demo-simple-select-outlined-label">Property Damage Liability</core.InputLabel>
                                                        <core.Select
                                                            labelId="demo-simple-select-outlined-label"
                                                            id="property-damage-liability"
                                                            name="property_damage_liability"
                                                            label="Property Damage Liability"
                                                            value={values.property_damage_liability}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            className={`dropdownMUI ${getIn(errors, "property_damage_liability") &&
                                                                getIn(touched, "property_damage_liability")
                                                                ? "requiredError"
                                                                : ""}`}
                                                        >
                                                            {
                                                                booleanSelect.map((status, idx) => {
                                                                    return <core.MenuItem key={idx} value={status.value}>{status.label}</core.MenuItem>
                                                                })
                                                            }

                                                        </core.Select>
                                                    </core.FormControl>
                                                </div>
                                                <div className="fieldWrap">
                                                    <core.FormControl variant="outlined" className={`${classes.formControl}`}>
                                                        <core.InputLabel id="demo-simple-select-outlined-label">Collision</core.InputLabel>
                                                        <core.Select
                                                            labelId="demo-simple-select-outlined-label"
                                                            id="collision"
                                                            name="collision"
                                                            label="Collision"
                                                            value={values.collision}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            className={`dropdownMUI ${getIn(errors, "collision") &&
                                                                getIn(touched, "collision")
                                                                ? "requiredError"
                                                                : ""}`}
                                                        >
                                                            {
                                                                booleanSelect.map((status, idx) => {
                                                                    return <core.MenuItem key={idx} value={status.value}>{status.label}</core.MenuItem>
                                                                })
                                                            }

                                                        </core.Select>
                                                    </core.FormControl>
                                                </div>
                                                <div className="fieldWrap">
                                                    <core.FormControl variant="outlined" className={`${classes.formControl}`}>
                                                        <core.InputLabel id="demo-simple-select-outlined-label">Comprehensive</core.InputLabel>
                                                        <core.Select
                                                            labelId="demo-simple-select-outlined-label"
                                                            id="comprehensive"
                                                            name="comprehensive"
                                                            label="Comprehensive"
                                                            value={values.comprehensive}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            className={`dropdownMUI ${getIn(errors, "comprehensive") &&
                                                                getIn(touched, "comprehensive")
                                                                ? "requiredError"
                                                                : ""}`}
                                                        >
                                                            {
                                                                booleanSelect.map((status, idx) => {
                                                                    return <core.MenuItem key={idx} value={status.value}>{status.label}</core.MenuItem>
                                                                })
                                                            }

                                                        </core.Select>
                                                    </core.FormControl>
                                                </div>
                                                <div className="fieldWrap">
                                                    <styles.ThemeProvider theme={theme2}>
                                                        <core.TextField
                                                            disabled
                                                            required
                                                            type="date"
                                                            id="date_of_purchase"
                                                            label="Date of purchase"
                                                            variant="outlined"
                                                            name="date_of_purchase"
                                                            value={values.date_of_purchase}
                                                            InputLabelProps={{
                                                                shrink: true
                                                            }}
                                                        // onBlur={handleBlur}
                                                        />
                                                    </styles.ThemeProvider>
                                                </div>
                                                <div className="fieldWrap">
                                                    <styles.ThemeProvider theme={theme2}>
                                                        <core.TextField
                                                            disabled
                                                            autoComplete="off"
                                                            id="customer-income-group"
                                                            label="Customer Income Group"
                                                            variant="outlined"
                                                            name="customer_income_group"
                                                            value={values.customer_income_group}
                                                            // onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </styles.ThemeProvider>
                                                </div>
                                                <div className="fieldWrap">
                                                    <Box sx={{ width: 300 }}>
                                                        <label>Select Income Range</label>
                                                        <Slider
                                                            max={500}
                                                            getAriaLabel={() => 'Income Group'}
                                                            value={incomeRange}
                                                            onChange={(event, value) => {
                                                                setIncomeRange(value);
                                                                const range = "$" + value[0] + " - $" + value[1] + "K";
                                                                setFieldValue("customer_income_group", range);
                                                            }}
                                                            valueLabelDisplay="auto"
                                                            getAriaValueText={valuetext}
                                                        />
                                                    </Box>

                                                </div>
                                                <div className="fieldWrap">
                                                    <styles.ThemeProvider theme={theme2}>
                                                        <core.TextField
                                                            autoComplete="off"
                                                            id="customer-region"
                                                            label="Customer Region"
                                                            variant="outlined"
                                                            name="customer_region"
                                                            value={values.customer_region}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />

                                                    </styles.ThemeProvider>
                                                </div>
                                                <div className="fieldWrap">
                                                    <core.FormControl variant="outlined" className={`${classes.formControl}`}>
                                                        <core.InputLabel id="demo-simple-select-outlined-label">Customer gender</core.InputLabel>
                                                        <core.Select
                                                            labelId="demo-simple-select-outlined-label"
                                                            id="customer-gender"
                                                            name="customer_gender"
                                                            label="Customer gender"
                                                            value={values.customer_gender}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            className={`dropdownMUI ${getIn(errors, "customer_gender") &&
                                                                getIn(touched, "customer_gender")
                                                                ? "requiredError"
                                                                : ""}`}
                                                        >
                                                            {
                                                                genders.map((gender, idx) => {
                                                                    return <core.MenuItem key={idx} value={gender}>{gender}</core.MenuItem>
                                                                })
                                                            }

                                                        </core.Select>
                                                    </core.FormControl>
                                                </div>
                                                <div className="fieldWrap">
                                                    <core.FormControl variant="outlined" className={`${classes.formControl}`}>
                                                        <core.InputLabel id="demo-simple-select-outlined-label">Customer marital status</core.InputLabel>
                                                        <core.Select
                                                            labelId="demo-simple-select-outlined-label"
                                                            id="customer-marital-status"
                                                            name="comprehensive"
                                                            label="Customer marital status"
                                                            value={values.customer_marital_status}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            className={`dropdownMUI ${getIn(errors, "customer_marital_status") &&
                                                                getIn(touched, "customer_marital_status")
                                                                ? "requiredError"
                                                                : ""}`}
                                                        >
                                                            {
                                                                maritalStatus.map((status, idx) => {
                                                                    return <core.MenuItem key={idx} value={status.value}>{status.label}</core.MenuItem>
                                                                })
                                                            }

                                                        </core.Select>
                                                    </core.FormControl>
                                                </div>
                                            </div>
                                            <div className="addEditPolicyAction">
                                                {
                                                    action === "create" ?
                                                        <core.Button
                                                            className={`hoverBgButtonLinkForm`}
                                                            variant="contained"
                                                            type="submit"
                                                            id="actionButton"
                                                            disabled={!(isValid && dirty)}
                                                        >
                                                            Add
                                                        </core.Button> :
                                                        <core.Button
                                                            className={`hoverBgButtonLinkForm`}
                                                            variant="contained"
                                                            type="submit"
                                                            id="actionButton"
                                                            disabled={!(isValid && dirty)}
                                                        >
                                                            Update
                                                        </core.Button>
                                                }
                                            </div>
                                            {/* </div> */}
                                        </div>

                                    </React.Fragment>
                                </Form>
                            )}
                        </Formik>
                    }
                </div>
            </div >
        </React.Fragment>
    )
}
