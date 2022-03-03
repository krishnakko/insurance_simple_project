import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from "react-router-dom";

import * as styles from '@material-ui/core/styles';
import * as core from '@material-ui/core';
import { Autocomplete } from "@material-ui/lab";
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import * as icons from '@material-ui/icons';
import Moment from 'moment';
import { Formik, Form, getIn, ErrorMessage } from "formik";
import { Route, useHistory } from "react-router-dom";
import * as Yup from 'yup';
import * as _ from 'lodash';
import moment from "moment";
import './policyAddOrEdit.scss'
import { LoadingView } from '../../Loader/loader';
import { getPolicyDetails } from '../../../requests';
// let selProductId = "";

const yupValidationSchema = Yup.object().shape({
    premium: Yup.number().max(1000000).required('Required'),
})


const Accordion = styles.withStyles({
    root: {
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = styles.withStyles({
    root: {
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = styles.withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);



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
    const { poolEditFrom, action, poolId } = props;

    const [initialValues, setInitialValues] = useState({});
    const [policyData, setPolicyData] = useState({});
    const [loader, setLoader] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const currentDate = new Date();
    const classes = useStyles();


    const navigateToPolicyTable = () => {
        console.log("policyyyy")
        history.push('/')
    }
    function toAddOrEditPolicySubmit(values) {
        console.log("values", values);
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
                                                        {/* <ErrorMessage
                                                        name="userdetails.rowLeft"
                                                        component="span"
                                                        className={`error-message
                                                        ${values.userdetails.rowLeft === "" ? "displayNone" : ""}
                                                    `}
                                                    /> */}
                                                    </div>
                                                    <div className="rowMiddle">
                                                        <styles.ThemeProvider theme={theme2}>
                                                            <core.TextField
                                                                autoComplete="off"
                                                                id="vehicle-segment"
                                                                label="Vehicle Segment"
                                                                variant="outlined"
                                                                name="vehicle_segment"
                                                                value={values.vehicle_segment}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />

                                                        </styles.ThemeProvider>
                                                        {/* <ErrorMessage
                                                        name="userdetails.rowLeft"
                                                        component="span"
                                                        className={`error-message
                                                        ${values.userdetails.rowLeft === "" ? "displayNone" : ""}
                                                    `}
                                                    /> */}
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
                                                        {/* <ErrorMessage
                                                        name="userdetails.rowRight"
                                                        component="span"
                                                        className={`error-message
                                                    ${values.userdetails.rowRight === "" ? "displayNone" : ""}
                                        `}
                                                    /> */}
                                                    </div>
                                                </div>
                                                <div className="rowDiv">
                                                    <div className="rowLeft">
                                                        <styles.ThemeProvider theme={theme2}>
                                                            <core.TextField
                                                                autoComplete="off"
                                                                id="vehicle-segment"
                                                                label="Vehicle Segment"
                                                                variant="outlined"
                                                                name="vehicle_segment"
                                                                value={values.vehicle_segment}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />

                                                        </styles.ThemeProvider>
                                                        {/* <ErrorMessage
                                                        name="userdetails.rowLeft"
                                                        component="span"
                                                        className={`error-message
                                                        ${values.userdetails.rowLeft === "" ? "displayNone" : ""}
                                                    `}
                                                    /> */}
                                                    </div>
                                                    <div className="rowRight">
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
                                                        {/* <ErrorMessage
                                                        name="userdetails.rowRight"
                                                        component="span"
                                                        className={`error-message
                                                    ${values.userdetails.rowRight === "" ? "displayNone" : ""}
                                        `}
                                                    /> */}
                                                    </div>
                                                </div>
                                                <div className="rowDiv">
                                                    <div className="rowLeft">
                                                        <styles.ThemeProvider theme={theme2}>
                                                            <core.TextField
                                                                autoComplete="off"
                                                                id="bodily-injury-liability"
                                                                label="Bodily Injury Liability"
                                                                variant="outlined"
                                                                name="bodily_injury_liability"
                                                                value={values.bodily_injury_liability}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />

                                                        </styles.ThemeProvider>
                                                        {/* <ErrorMessage
                                                        name="userdetails.rowLeft"
                                                        component="span"
                                                        className={`error-message
                                                        ${values.userdetails.rowLeft === "" ? "displayNone" : ""}
                                                    `}
                                                    /> */}
                                                    </div>
                                                    <div className="rowRight">
                                                        <styles.ThemeProvider theme={theme2}>
                                                            <core.TextField
                                                                autoComplete="off"
                                                                id="personal-injury-protection"
                                                                label="Personal Injury Protection"
                                                                variant="outlined"
                                                                name="personal-injury-protection"
                                                                value={values.personal_injury_protection}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />
                                                        </styles.ThemeProvider>
                                                        {/* <ErrorMessage
                                                        name="userdetails.rowRight"
                                                        component="span"
                                                        className={`error-message
                                                    ${values.userdetails.rowRight === "" ? "displayNone" : ""}
                                        `}
                                                    /> */}
                                                    </div>
                                                </div>
                                                <div className="rowDiv">
                                                    <div className="rowLeft">
                                                        <styles.ThemeProvider theme={theme2}>
                                                            <core.TextField
                                                                autoComplete="off"
                                                                id="property-damage-liability"
                                                                label="Property Damage Liability"
                                                                variant="outlined"
                                                                name="property_damage_liability"
                                                                value={values.property_damage_liability}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />

                                                        </styles.ThemeProvider>
                                                        {/* <ErrorMessage
                                                        name="userdetails.rowLeft"
                                                        component="span"
                                                        className={`error-message
                                                        ${values.userdetails.rowLeft === "" ? "displayNone" : ""}
                                                    `}
                                                    /> */}
                                                    </div>
                                                    <div className="rowRight">
                                                        <styles.ThemeProvider theme={theme2}>
                                                            <core.TextField
                                                                autoComplete="off"
                                                                id="collision"
                                                                label="Collision"
                                                                variant="outlined"
                                                                name="collision"
                                                                value={values.collision}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />
                                                        </styles.ThemeProvider>
                                                        {/* <ErrorMessage
                                                        name="userdetails.rowRight"
                                                        component="span"
                                                        className={`error-message
                                                    ${values.userdetails.rowRight === "" ? "displayNone" : ""}
                                        `}
                                                    /> */}
                                                    </div>
                                                </div>
                                                <div className="rowDiv">
                                                    <div className="rowLeft">
                                                        <styles.ThemeProvider theme={theme2}>
                                                            <core.TextField
                                                                autoComplete="off"
                                                                id="comprehensive"
                                                                label="Comprehensive"
                                                                variant="outlined"
                                                                name="comprehensive"
                                                                value={values.comprehensive}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />

                                                        </styles.ThemeProvider>
                                                        {/* <ErrorMessage
                                                        name="userdetails.rowLeft"
                                                        component="span"
                                                        className={`error-message
                                                        ${values.userdetails.rowLeft === "" ? "displayNone" : ""}
                                                    `}
                                                    /> */}
                                                    </div>
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
                                                        {/* <ErrorMessage
                                                        name="userdetails.rowRight"
                                                        component="span"
                                                        className={`error-message
                                                    ${values.userdetails.rowRight === "" ? "displayNone" : ""}
                                        `}
                                                    /> */}
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
                                                        {/* <ErrorMessage
                                                        name="userdetails.rowLeft"
                                                        component="span"
                                                        className={`error-message
                                                        ${values.userdetails.rowLeft === "" ? "displayNone" : ""}
                                                    `}
                                                    /> */}
                                                    </div>
                                                    <div className="rowRight">
                                                        <styles.ThemeProvider theme={theme2}>
                                                            <core.TextField
                                                                autoComplete="off"
                                                                id="customer-marital-status"
                                                                label="Customer marital status"
                                                                variant="outlined"
                                                                name="customer_marital_status"
                                                                value={values.customer_marital_status}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />
                                                        </styles.ThemeProvider>
                                                        {/* <ErrorMessage
                                                        name="userdetails.rowRight"
                                                        component="span"
                                                        className={`error-message
                                                    ${values.userdetails.rowRight === "" ? "displayNone" : ""}
                                        `}
                                                    /> */}
                                                    </div>
                                                </div>
                                                <div className="addEditPolicyAction">
                                                    {/* {console.log("isValid && dirty && uniqueUsername && !emptyLicense && validCF, fieldChanged, allNumbersValid", isValid, dirty, uniqueUsername, !emptyLicense, validCF, fieldChanged, allNumbersValid)} */}
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
                                                                {/* {
                                                            isLoading ? <div className="addingLoader"><SmallLoader /></div> : "Add"
                                                        } */}
                                                            </core.Button> :
                                                            <core.Button
                                                                className={`hoverBgButtonLinkForm`}
                                                                variant="contained"
                                                                type="submit"
                                                                id="actionButton"
                                                                // disabled={isValid && dirty}
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
