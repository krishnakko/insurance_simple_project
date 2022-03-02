// import { TablePagination as _MuiTablePagination } from "@material-ui/core";
// import React, { PropsWithChildren, ReactElement, useCallback } from "react";
// import { TableInstance } from "react-table";
// import LastPageIcon from "@material-ui/icons/LastPage";
// import FirstPageIcon from "@material-ui/icons/FirstPage";
// import NavigateNextIcon from "@material-ui/icons/NavigateNext";
// import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

// // const rowsPerPageOptions = [5, 10, 25, 50, 100];

// // avoid all of the redraws caused by the internal withStyles
// const interestingPropsEqual = (prevProps: any, nextProps: any) =>
//   prevProps.count === nextProps.count &&
//   prevProps.rowsPerPage === nextProps.rowsPerPage &&
//   prevProps.page === nextProps.page &&
//   prevProps.onChangePage === nextProps.onChangePage &&
//   prevProps.onChangeRowsPerPage === nextProps.onChangeRowsPerPage;

// // a bit of a type hack to keep OverridableComponent working as desired
// type T = typeof _MuiTablePagination;
// // const MuiTablePagination: T = React.memo(
// //   _MuiTablePagination,
// //   interestingPropsEqual
// // ) as T;

// export function TablePagination<T extends object>({
//   instance,
// }: PropsWithChildren<{ instance: TableInstance<T> }>): ReactElement | null {
//   const {
//     state: { pageIndex, pageSize, rowCount = instance.rows.length },
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     pageCount,
//     gotoPage,
//     nextPage,
//     previousPage,
//     setPageSize,
//   } = instance;

//   // const handleChangePage = useCallback(
//   //   (
//   //     event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
//   //     newPage: number
//   //   ) => {
//   //     if (newPage === pageIndex + 1) {
//   //       nextPage();
//   //     } else if (newPage === pageIndex - 1) {
//   //       previousPage();
//   //     } else {
//   //       gotoPage(newPage);
//   //     }
//   //   },
//   //   [gotoPage, nextPage, pageIndex, previousPage]
//   // );

//   // const onChangeRowsPerPage = useCallback(
//   //   (e) => {
//   //     setPageSize(Number(e.target.value));
//   //   },
//   //   [setPageSize]
//   // );

//   return rowCount ? (
//     <div className="pagination-wrapper">
//       {/* <span>Showing</span>
//       <MuiTablePagination
//         className="table-pagination"
//         rowsPerPageOptions={rowsPerPageOptions}
//         component="div"
//         count={rowCount}
//         rowsPerPage={pageSize}
//         page={pageIndex}
//         onChangePage={handleChangePage}
//         onChangeRowsPerPage={onChangeRowsPerPage}
//       /> */}
//       <div className="pagination">
//         <p>Rows per page</p>
//         <select
//           className="setPageSize"
//           value={pageSize}
//           onChange={(e) => {
//             setPageSize(Number(e.target.value));
//           }}
//         >
//           {[5, 10, 25, 50, 100].map((pageSize) => (
//             <option key={pageSize} value={pageSize}>
//               {pageSize}
//             </option>
//           ))}
//         </select>
//         <span className="total-count">Total count : {rowCount}</span>
//         <span className="pageData">
//           Page{" "}
//           <span>
//             {pageIndex + 1} of {pageOptions.length}
//           </span>{" "}
//         </span>
//         <span className="goToPage">
//           Go to page:{" "}
//           <input
//             type="number"
//             defaultValue={pageIndex + 1}
//             onChange={(e) => {
//               let page: any;
//               if (/[^0-9]+/.test(e.target.value)) {
//                 e.target.value = e.target.value.replace(/[^0-9]*/g, "")
//                 page = e.target.value ? Number(e.target.value) - 1 : 0;
//               } else {
//                 page = e.target.value ? Number(e.target.value) - 1 : 0;
//               }
//               if (page >= pageOptions.length) {
//                 gotoPage(pageCount - 1)
//               } else {
//                 gotoPage(page);
//               }
//             }}
//             style={{ width: "100px" }}
//           />
//         </span>{" "}
//         <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
//           <FirstPageIcon />
//         </button>{" "}
//         <button onClick={() => previousPage()} disabled={!canPreviousPage}>
//           <NavigateBeforeIcon />
//         </button>{" "}
//         <button onClick={() => nextPage()} disabled={!canNextPage}>
//           <NavigateNextIcon />
//         </button>{" "}
//         <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
//           <LastPageIcon />
//         </button>{" "}
//       </div>
//     </div>
//   ) : null;
// }
