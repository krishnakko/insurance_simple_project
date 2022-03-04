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
import { policyTableFieldsWithProps } from './constantFields';

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


const theme2 = styles.createTheme({
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

    const policyFieldMapping = (handleChange, values, handleBlur, errors, touched, setFieldValue, fieldProps) => {
        const { name, type, label, options, max, disabled, error_message } = fieldProps;
        if (type === "dropdown") {
            return <div className="fieldWrap">
                <core.FormControl variant="outlined" className={`${classes.formControl}`}>
                    <core.InputLabel id="demo-simple-select-outlined-label">{label}</core.InputLabel>
                    <core.Select
                        disabled={disabled ? disabled : false}
                        labelId="demo-simple-select-outlined-label"
                        id={name}
                        name={name}
                        label={label}
                        value={values[name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`dropdownMUI ${getIn(errors, name) && getIn(touched, name)
                            ? "requiredError" : ""}`}
                    >
                        {
                            options.map((val, idx) => {
                                return <core.MenuItem key={idx} value={val["value"]}>{val["label"]}</core.MenuItem>
                            })
                        }

                    </core.Select>
                </core.FormControl>
                {error_message && <ErrorMessage
                    name={name}
                    component="span"
                    className={`error-message`}
                />}

            </div>
        } else if (type === "slider") {
            return <div className="fieldWrap">
                <Box sx={{ width: 300 }}>
                    <label>{label}</label>
                    <Slider
                        max={max}
                        getAriaLabel={() => label}
                        value={incomeRange}
                        onChange={(event, value) => {
                            setIncomeRange(value);
                            const range = "$" + value[0] + " - $" + value[1] + "K";
                            setFieldValue(name, range);
                        }}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                    />
                </Box>
            </div>
        } else {
            return <div className="fieldWrap">
                <styles.ThemeProvider theme={theme2}>
                    <core.TextField
                        disabled={disabled ? disabled : false}
                        autoComplete="off"
                        id={name}
                        label={label}
                        variant="outlined"
                        type={type}
                        name={name}
                        value={values[name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </styles.ThemeProvider>
                {error_message && <ErrorMessage
                    name={name}
                    component="span"
                    className={`error-message`}
                />}
            </div>
        }
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
                                                {policyTableFieldsWithProps.map((field, index) => {
                                                    return <React.Fragment key={index}>
                                                        {policyFieldMapping(handleChange, values, handleBlur, errors, touched, setFieldValue, field)}
                                                    </React.Fragment>
                                                })}
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
