import { InputBase, TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import * as styles from '@material-ui/core/styles';
import * as icons from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import "./customPagination.scss";


const BootstrapInput = styles.withStyles((theme: styles.Theme) =>
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

const useStyles = styles.makeStyles((theme: styles.Theme) =>
    styles.createStyles({
        margin: {
            margin: theme.spacing(1),
        },
    }),
);

export function CustomPagination(props: any) {
    // console.log("paginationData**", props.paginationData);
    const classes = useStyles();
    let typingTimer;
    const [searchClicked, setSearchClicked] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const pageSizes = [5, 10, 25, 50, 100];
    const [pageNumber, setPageNumber] = useState<any>(0);
    const [pageNumberInput, setPageNumberInput] = useState("");
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
    // const [initialPage, setInitialPage]=useState(1);

    useEffect(() => {
        const pgData = props.paginationData;
        // console.log("Rerendering", pgData);
        let totalPages: any = 0;
        let currentPage: number = pager.currentPage;
        let pageSizeN = pager.pageSize;
        if (pgData.offset === 0 || !pgData.offset) {
            currentPage = 1;
        } else {
            currentPage = Math.ceil(pgData.offset / pgData.limit) + 1;
        }
        // if (pgData.limit !== 10) {
        //     pageSizeN = pgData.limit;
        // }
        pageSizeN = pgData.limit;
        setPageSize(pageSizeN);
        if (pgData.count > 0) {
            totalPages = Math.ceil(pgData.count / pgData.limit);
        }
        setPageNumber(currentPage);
        setPageNumberInput(currentPage.toString());
        // console.log("pgData.count, currentPage, pager.pageSize", pgData.count, currentPage, pageSize);
        const pagerObj = getPager(pgData.count, currentPage, pageSizeN);
        setPager(pagerObj);
    }, [props.paginationData])

    const setPage = (pageNum, pageNewSize?) => {
        if (pageNum === pager.currentPage) {
            return false;
        }
        // console.log("setPage pageNum pageNewSize", pageNum, pageNewSize, props.paginationData);
        var pgData = props.paginationData;
        let pagerObj: any = {};
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

    React.useEffect(() => {
        if (searchClicked && pageNumber > 0) {
            typingTimer = setTimeout(async () => {
                setPage(pageNumber);
            }, 1000);
        }
    }, [pageNumber])

    const goToPage = (e) => {
        setSearchClicked(true);
        clearTimeout(typingTimer);
        let page: any;
        if (/[^0-9]+/.test(e.target.value)) {
            e.target.value = e.target.value.replace(/[^0-9]*/g, "")
            page = e.target.value ? Number(e.target.value) : 0;
        } else {
            page = e.target.value ? Number(e.target.value) : 0;
        }
        setPageNumberInput(e.target.value);
        if (page >= pager.totalPages) {
            page = pager.totalPages;
            setPageNumber(page);
            setTimeout(() => {
                setPageNumberInput(pager.totalPages.toString());
            }, 1000)
        } else {
            setPageNumber(page);
        }
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
                    <div className="pagesDropDownDiv">
                        <span>{"Go to page:  "}</span>
                        <TextField
                            id="page-number"
                            // label="Page number"
                            variant="outlined"
                            autoComplete="off"
                            value={pageNumberInput}
                            name="page-number"
                            onChange={(e) => goToPage(e)}
                        />
                    </div>
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