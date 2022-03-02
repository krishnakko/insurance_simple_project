import { TableSortLabel } from '@material-ui/core';
import { KeyboardArrowRight, ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import React from 'react'
import { useStyles } from './tableStyles';

export function CustomSorting(props: any) {
    const classes = useStyles();
    const column = props.column;

    return (
        <>
            {
                props.sortableColumns ?
                    <React.Fragment>
                        {
                            props.sortableColumns.includes(column["id"]) ?
                                (<span
                                    onClick={() => {
                                        if (props.sortingAction) {
                                            props.sortingAction(column["id"])
                                        }
                                    }}
                                    className={`${classes.tableLabel} sortableColumn cursorPointer`}>
                                    {/* <span onClick={props.sortingAction(column.render("Header"))} className={classes.tableLabel}> */}
                                    <span>{column.render("Header")}</span>
                                    <span className="sortIcons">
                                        {
                                            props.filters && props.filters.sortBy === column["id"] ?
                                                <React.Fragment>
                                                    {
                                                        props.filters.sort === "ASC" ?
                                                            <React.Fragment>
                                                                <span><ArrowDropUp/></span>
                                                                <span className="opacityHalf"><ArrowDropDown/></span>
                                                            </React.Fragment> :
                                                            <React.Fragment>
                                                                <span className="opacityHalf"><ArrowDropUp/></span>
                                                                <span><ArrowDropDown/></span>
                                                            </React.Fragment>
                                                    }

                                                </React.Fragment> :
                                                <React.Fragment>
                                                    <span className="opacityHalf"><ArrowDropUp/></span>
                                                    <span className="opacityHalf"><ArrowDropDown/></span>
                                                </React.Fragment>
                                        }
                                    </span>
                                </span>
                                ) : (
                                    <span className={classes.tableLabel}>
                                        {column.render("Header")}
                                    </span>
                                )
                        }
                    </React.Fragment>
                    : <React.Fragment>
                        {column.canGroupBy && (
                            <TableSortLabel
                                active
                                direction={column.isGrouped ? "desc" : "asc"}
                                IconComponent={KeyboardArrowRight}
                                {...column.getGroupByToggleProps()}
                                className={classes.headerIcon}
                            />
                        )}
                        {column.canSort ? (
                            <TableSortLabel
                                active={column.isSorted}
                                direction={column.isSortedDesc ? "desc" : "asc"}
                                {...column.getSortByToggleProps()}
                                className={classes.tableSortLabel}
                            >
                                {column.render("Header")}
                            </TableSortLabel>
                        ) : (
                            <span className={classes.tableLabel}>
                                {column.render("Header")}
                            </span>
                        )}
                    </React.Fragment>
            }
        </>
    )
}