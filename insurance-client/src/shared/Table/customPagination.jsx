import { InputBase, TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import * as styles from '@material-ui/core/styles';
import * as icons from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import "./customPagination.scss";


const BootstrapInput = styles.withStyles((theme) =>
    styles.createStyles({
        root: {
            'label + &': {
                marginTop: theme.spacing(3),
            },
        },
        input: {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #ced4da',
            fontSize: 12,
            padding: '7px 26px 7px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:focus': {
                borderRadius: 4,
                borderColor: '#80bdff',
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
            },
        },
    }),
)(InputBase);

const useStyles = styles.makeStyles((theme) =>
    styles.createStyles({
        margin: {
            margin: theme.spacing(1),
        },
    }),
);

export function CustomPagination(props) {
    const classes = useStyles();
    const [pageSize, setPageSize] = useState(10);
    const pageSizes = [5, 10, 25, 50, 100];
    const [pager, setPager] = useState({
        totalItems: 0,
        currentPage: 1,
        pageSize: 10,
        totalPages: 1,
        startPage: 1,
        endPage: 1,
        startIndex: 1,
        endIndex: 10,
        pages: [1, 2, 3]
    });

    useEffect(() => {
        const pgData = props.paginationData;
        let currentPage = pager.currentPage;
        let pageSizeN = pager.pageSize;
        if (pgData.offset === 0 || !pgData.offset) {
            currentPage = 1;
        } else {
            currentPage = Math.ceil(pgData.offset / pgData.limit) + 1;
        }
        pageSizeN = pgData.limit;
        setPageSize(pageSizeN);
        const pagerObj = getPager(pgData.count, currentPage, pageSizeN);
        setPager(pagerObj);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.paginationData])

    const setPage = (pageNum, pageNewSize = pager.pageSize) => {
        if (pageNum === pager.currentPage) {
            return false;
        }
        var pgData = props.paginationData;
        let pagerObj = {};
        if (pageNum) {
            pagerObj = getPager(pgData.count, pageNum, pageSize);
        } else {
            setPageSize(pageNewSize);
            pagerObj = getPager(pgData.count, pageNum, pageNewSize);
        }
        setPager(pagerObj);
        props.paginationHandling(pagerObj);
    }

    const getPager = (totalItems, currentPage, pageSize, neighbors = 1) => {
        // default to first page
        currentPage = currentPage || 1;
        const pageLimit = 1 + neighbors * 2;
        // default page size is 10
        pageSize = pageSize || 10;

        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);
        var middlePage = Math.ceil(pageLimit / 2);

        var startPage, endPage;
        if (totalPages <= pageLimit) {
            // less than pageLimit total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than pageLimit total pages so calculate start and end pages
            if (currentPage <= middlePage) {
                startPage = 1;
                endPage = pageLimit;
            } else if (currentPage + 1 >= totalPages) {
                startPage = totalPages - middlePage;
                endPage = totalPages;
            } else {
                startPage = currentPage - neighbors;
                endPage = currentPage + neighbors;
            }
        }
        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        // create an array of pages to ng-repeat in the pager control
        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }


    return (
        <div className="customPaginationMainDiv">
            <div className="leftPart">
                <div>
                    <div className="currentRecInfoDiv">
                        Showing {pager.startIndex + 1} - {pager.endIndex + 1} of {pager.totalItems}
                    </div>
                    <div className="pagesDropDownDiv">
                        <FormControl className={classes.margin}>
                            <Select
                                labelId="demo-customized-select-label"
                                id="demo-customized-select"
                                value={pager.pageSize}
                                onChange={(e) => setPage(undefined, e.target.value)}
                                input={<BootstrapInput />}
                            >
                                {
                                    pageSizes.map((size) => {
                                        return <MenuItem value={size} >{size}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>
            <div className="rightPart">
                <div>
                    <div className="pageNavigationDiv">
                        <ul>
                            <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                                <button onClick={() => setPage(1)}><icons.FirstPageTwoTone /></button>
                            </li>
                            <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                                <button onClick={() => setPage(pager.currentPage - 1)}><icons.NavigateBeforeTwoTone /></button>
                            </li>

                            {pager.pages.map((page, index) =>
                                <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                                    <button onClick={() => setPage(page)}>{page}</button>
                                </li>
                            )}

                            <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                                <button onClick={() => setPage(pager.currentPage + 1)}><icons.NavigateNextTwoTone /></button>
                            </li>
                            <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                                <button onClick={() => setPage(pager.totalPages)}><icons.LastPageTwoTone /></button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}