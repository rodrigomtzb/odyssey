import React, { useEffect, useState, Children } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TablePagination,
  TableFooter,
} from "@mui/material";
import { Badge } from "react-bootstrap";

const TableBase = ({
  children,
  data = [],
  dataKey = [],
  titles = [],
  sorting = true,
  paging = true,
}) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(dataKey[0]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const getSortedData = () => {
    if (sorting) {
      return [...data].sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        if (order === "asc") {
          return aValue > bValue ? 1 : -1;
        }
        return aValue < bValue ? 1 : -1;
      });
    }
    return data;
  };

  const getSortedChildren = () => {
    if (sorting) {
      return Children.toArray(children).sort((a, b) => {
        const aValue = getChildData(a, dataKey.indexOf(orderBy));
        const bValue = getChildData(b, dataKey.indexOf(orderBy));
        if (order === "asc") {
          return aValue > bValue ? 1 : -1;
        }
        return aValue < bValue ? 1 : -1;
      });
    }
    return Children.toArray(children);
  };

  const getChildData = (child, key) => {
    const cells = child.props.children;
    const cellArray = Array.isArray(cells) ? cells : [cells];
    return cellArray[key]?.props?.children || "";
  };

  const getPaginatedData = (sortedData) => {
    if (paging) {
      return sortedData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
    }
    return sortedData;
  };

  const getPaginatedChildren = (sortedChildren) => {
    if (paging) {
      return sortedChildren.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
    }
    return sortedChildren;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const totalRows = children ? Children.count(children) : data.length;

    if (page > Math.ceil(totalRows / rowsPerPage) - 1) {
      setPage(0);
    }
  }, [children, data, rowsPerPage, page]);

  const renderRows = () => {
    if (children) {
      const sortedChildren = getSortedChildren();
      const paginatedChildren = getPaginatedChildren(sortedChildren);
      return paginatedChildren;
    } else {
      const sortedData = getSortedData();
      const paginatedData = getPaginatedData(sortedData);
      return paginatedData.map((row, index) => (
        <TableRow key={index} sx={{
            backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
            "&:hover": { backgroundColor: "#e0f7fa" },
            borderBottom: "2px solid #ddd",
          }}>
          {dataKey.map((key) =>
            key === "enabled" ? (
              <TableCell key={key}>
                {row[key] == true ? (
                  <Badge bg="success">Activo</Badge>
                ) : (
                  <Badge bg="danger">Inactivo</Badge>
                )}
              </TableCell>
            ) : key === "icon" ? (
              <TableCell key={key}>
                <i className={`bi bi-${row[key]}`} />
              </TableCell>
            ) : (
              <TableCell key={key}>{row[key]}</TableCell>
            )
          )}
        </TableRow>
      ));
    }
  };

  return (
    <Paper
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid #ccc",
      }}
    >
      <TableContainer>
        <Table>
          <TableHead
            sx={{
              backgroundColor: "#14233b",
              "& .MuiTableCell-root": { color: "white" },
            }}
          >
            <TableRow>
              {titles.map((title, index) => (
                <TableCell
                  key={dataKey[index] || index}
                  align="left"
                  className="text-white"
                >
                  {sorting ? (
                    <TableSortLabel
                      className="text-white"
                      active={orderBy === dataKey[index]}
                      direction={orderBy === dataKey[index] ? order : "asc"}
                      onClick={() => handleSort(dataKey[index])}
                    >
                      {title}
                    </TableSortLabel>
                  ) : (
                    title
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {renderRows().length > 0 ? (
              renderRows()
            ) : (
              <TableRow>
                <TableCell colSpan={titles.length || 1} align="center">
                  No hay datos disponibles.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {paging && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[
                    5,
                    10,
                    25,
                    { label: "Todos", value: -1 },
                  ]}
                  colSpan={titles.length || 1}
                  count={children ? Children.count(children) : data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage="Filas por Página:"
                  labelDisplayedRows={({ from, to, count }) =>
                    `${from} – ${to} de ${
                      count !== -1 ? count : `más de ${to}`
                    }`
                  }
                  sx={{
                    "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                      {
                        marginBottom: 0,
                        fontWeight: "bold",
                      },
                  }}
                />
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableBase;
