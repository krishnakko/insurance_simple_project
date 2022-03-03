import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import { Link } from "react-router-dom";
import './tableComponent.scss';
import { TransparentLoader } from '../../components/Loader/loader';
import { CustomPagination } from './customPagination';
import Button from "@material-ui/core/Button";


export default function TableComponent(props) {
    const { columns, data } = props;
    const records = data["data"] ? data["data"] : [];
    const recordCount = data["count"] ? data["count"] : 0;

    return (
        <div className="tableTopDiv">


            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>

                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {props.name === "InsuranceTable" &&
                                    <TableCell align="left">Actions</TableCell>}
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                props.loadingData &&
                                <div className="transparentLoader"><TransparentLoader /></div>
                            }
                            {
                                props.loadingData && records.length < 1 ?
                                    <div className="insideTableLoader"></div>
                                    // ""
                                    :
                                    records.length < 1 ?
                                        <React.Fragment>
                                            {
                                                records.length < 1 ?
                                                    <div className="noRecordsDiv"></div> : ""
                                            }
                                        </React.Fragment>
                                        : <React.Fragment>
                                            {records
                                                .map((row) => {
                                                    return (
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                            {props.name === "InsuranceTable" &&
                                                                <TableCell align="right">
                                                                    <Button aria-label="edit" className="editButton" onClick={() => props.handleEdit(window.btoa(row.policy_id))}>

                                                                        {/* <Link to={{
                                                                            pathname: "/policy/" + window.btoa(row.policy_id) + "/edit",
                                                                            state: { from: "table" }
                                                                        }}>Edit
                                                                        </Link> */}
                                                                        Edit
                                                                    </Button>
                                                                </TableCell>}

                                                            {columns.map((column) => {
                                                                const value = row[column.id];
                                                                return (
                                                                    <TableCell key={column.id} align={column.align}>
                                                                        {column.format && typeof value === 'number'
                                                                            ? column.format(value)
                                                                            : typeof value === 'boolean' ? (value ? '1' : '0') : value}
                                                                    </TableCell>
                                                                );
                                                            })}
                                                        </TableRow>
                                                    );
                                                })}
                                        </React.Fragment>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                {recordCount > 0 && <CustomPagination paginationHandling={props.paginationHandling} paginationData={props.paginationData} />}
            </Paper>
        </div>
    );
}
