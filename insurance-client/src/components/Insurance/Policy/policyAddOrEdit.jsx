import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from "react-router-dom";

import * as styles from '@material-ui/core/styles';
import * as core from '@material-ui/core';
import * as icons from '@material-ui/icons';
import { Formik, Form, getIn, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from 'yup';
import * as _ from 'lodash';

import './policyAddOrEdit.scss'
import { LoadingView } from '../../Loader/loader';
import { getPolicyDetails, updatePolicy } from '../../../requests';
// let selProductId = "";

const yupValidationSchema = Yup.object().shape({
    customer_id: Yup.number().required('Customer ID can not be blank'),
    premium: Yup.number().max(1000000).required('Required'),
})



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
    const location = useLocation();
    const { policyId } = useParams();
    let history = useHistory();
    const policyID = parseInt(window.atob(policyId))
    console.log("state", location, policyId, policyID)
    // const orgDetails = props.orgDetails;
    const { action } = props;
    const booleanSelect = [
        { label: "Enable", value: true },
        { label: "Disable", value: false }
    ]
    const genders = ["Male", "Female", "Other"]

    const [initialValues, setInitialValues] = useState({});
    const [policyData, setPolicyData] = useState({});
    const [loader, setLoader] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const classes = useStyles();


    const navigateToPolicyTable = () => {
        history.push('/')
    }
    const getModifiedValues = (values) => {
        let finVales = { ...values };
        if (action === "edit") {
            Object.entries(values).forEach(([key, value]) => {
                console.log("key", key, value)
                if (value === policyData[key]) {
                    delete finVales[key];
                }
            });
        }
        return finVales;
    }
    const toAddOrEditPolicySubmit = async (values) => {
        console.log("values", values);
        const payload = getModifiedValues(values);
        console.log("payload", payload);
        if (action === "edit") {
            setIsLoading(true);
            const updated = await updatePolicy(policyID, payload);
            console.log("updated", updated);
            if (updated["data"]) {
                setIsLoading(false);
                navigateToPolicyTable();
            }
        }
    }
    useEffect(() => {
        setLoader(true);
        getPolicyDetails(policyID).then(data => {
            console.log("data", data)
            setPolicyData(data["data"]);
            setInitialValues(data["data"]);
            setLoader(false);
        })
    }, [policyID])

    return (
        <React.Fragment>
            {console.log("policyDetails", policyData, initialValues)}
            <div className="policyMainDiv">
                {isLoading ? <LoadingView /> : ""}
                <div className="breadcrumbNav">
                    <span><button type="button" onClick={navigateToPolicyTable}>Policy List</button></span><span><icons.ArrowRight /></span><span >{policyData.policy_id}</span>
                </div>
                <div className="pageTitle">
                    {action === "create" ?
                        <h3>Add Policy</h3> :
                        <h3>Edit Policy</h3>
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
                                            <div >
                                                <div>Policy</div>
                                                <div className="rowDiv">
                                                    <div className="rowLeft">
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
                                                    <div className="classTypeDropdown firstPartDiv">
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

                                                    <div className="rowRight">
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
                                                </div>
                                                <div className="rowDiv">
                                                    <div className="rowLeft">
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
                                                    <div className="classTypeDropdown firstPartDiv">
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
                                                    <div className="classTypeDropdown firstPartDiv rowRight">
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
                                                </div>
                                                <div className="rowDiv">
                                                    <div className="classTypeDropdown firstPartDiv rowRight">
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
                                                    <div className="classTypeDropdown firstPartDiv">
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
                                                    <div className="classTypeDropdown firstPartDiv rowRight">
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
                                                </div>
                                                <div className="rowDiv">
                                                    <div className="rowRight">
                                                        <styles.ThemeProvider theme={theme2}>
                                                            <core.TextField
                                                                autoComplete="off"
                                                                id="customer-income-group"
                                                                label="Customer Income Group"
                                                                variant="outlined"
                                                                name="customer_income_group"
                                                                value={values.customer_income_group}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />
                                                        </styles.ThemeProvider>
                                                    </div>
                                                </div>
                                                <div className="rowDiv">
                                                    <div className="rowLeft">
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
                                                    <div className="classTypeDropdown firstPartDiv">
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
                                                    <div className="classTypeDropdown firstPartDiv rowRight">
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
                                                                    booleanSelect.map((status, idx) => {
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
                                            </div>
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
