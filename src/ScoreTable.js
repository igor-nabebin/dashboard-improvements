/* eslint-disable no-script-url */

import React from "react";

import Title from "./Title";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  filterBlock: {
    width: "auto",
  },
}));

const columns = [
  {
    id: "last_name",
    label: "Last Name",
    filterable: true,
    filterType: "input",
  },
  {
    id: "first_name",
    label: "First Name",
    filterable: true,
    filterType: "input",
  },
  { id: "gender", label: "Gender", filterable: true, filterType: "select" },
  { id: "city", label: "City", filterable: true, filterType: "input" },
  { id: "country", label: "Country", filterable: true, filterType: "select" },
  { id: "score", label: "Score", filterable: false, align: "right" },
];

const defaultRowsAmount = 10;

const filterData = (data, query, key, strict = false) => {
  return data.filter(row =>
    strict
      ? query === "" || row[key] === query
      : row[key] && row[key].toLowerCase().includes(query.toLowerCase())
  );
};

const sortData = (data, orderBy, order) => {
  return [...data].sort((row1, row2) => {
    if (
      typeof row1[orderBy] === "string" ||
      typeof row2[orderBy] === "string"
    ) {
      // Strings comparison
      const [value1, value2] = [row1[orderBy] || "", row2[orderBy] || ""];
      return value1.localeCompare(value2) * (order === "desc" ? -1 : 1);
    } else if (
      typeof row1[orderBy] === "number" ||
      typeof row2[orderBy] === "number"
    ) {
      // Numbers comparison
      const [value1, value2] = [row1[orderBy] || 0, row2[orderBy] || 0];
      return (value1 - value2) * (order === "desc" ? -1 : 1);
    } else {
      // if e.g. both row1[orderBy] and row2[orderBy] are null
      return 0;
    }
  });
};

export default function ScoreTable(props) {
  const { data } = props;

  const [isListExpanded, setIsListExpanded] = React.useState(false);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("last_name");
  const [filterBy, setFilterBy] = React.useState("last_name");
  const [searchQuery, setSearchQuery] = React.useState("");

  const showMoreBtnHandler = () => {
    setIsListExpanded(!isListExpanded);
  };
  const createSortHandler = sortBy => {
    if (orderBy === sortBy) setOrder(order === "desc" ? "asc" : "desc");
    setOrderBy(sortBy);
  };
  const searchInputHandler = event => setSearchQuery(event.target.value);
  const searchByHandler = event => {
    setFilterBy(event.target.value);
    setSearchQuery("");
  };
  const filterHandler = event =>
    setSearchQuery(event.target.value === "none" ? null : event.target.value);

  const filterableColumns = columns.filter(column => column.filterable);
  const getFilterInfo = filterId =>
    columns.find(column => column.id === filterId);
  const classes = useStyles();
  const filteredData = filterData(
    data,
    searchQuery,
    [filterBy],
    getFilterInfo(filterBy).filterType === "select"
  );
  const sortedData = sortData(filteredData, orderBy, order);
  const rows = sortedData.slice(
    0,
    isListExpanded ? sortedData.length : defaultRowsAmount
  );
  const allParamValues = param => {
    const allParamsSet = data.reduce((allValues, curPerson) => {
      return allValues.add(curPerson[param]);
    }, new Set());
    return [...allParamsSet].sort();
  };

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Title id="table-title">Scores listing ({sortedData.length})</Title>
        <Grid container className={classes.filterBlock} alignItems="flex-end">
          {getFilterInfo(filterBy).filterType === "input" && (
            <TextField
              id="filter-input"
              label={getFilterInfo(filterBy).label}
              type="search"
              className={classes.textField}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              value={searchQuery || ""}
              onChange={searchInputHandler}
            />
          )}
          {getFilterInfo(filterBy).filterType === "select" && (
            <FormControl className={classes.formControl} id="filter-select">
              <InputLabel shrink htmlFor="filter-label-placeholder">
                {filterBy}
              </InputLabel>
              <Select
                value={searchQuery !== null ? searchQuery : "none"}
                onChange={filterHandler}
                input={<Input name="filter" id="filter-label-placeholder" />}
                displayEmpty
                name="filter"
                className={classes.selectEmpty}
              >
                <MenuItem value="">All</MenuItem>
                {allParamValues(filterBy).map(param => (
                  <MenuItem
                    key={param}
                    value={param || "none"}
                    id={`filter-select-${param || "none"}`}
                  >
                    {param || "Not specified"}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <FormControl className={classes.formControl} id="filter-selector">
            <InputLabel shrink htmlFor="filterBy-label-placeholder">
              Search by
            </InputLabel>
            <Select
              value={filterBy}
              onChange={searchByHandler}
              input={<Input name="filterBy" id="filterBy-label-placeholder" />}
              displayEmpty
              name="filterBy"
              className={classes.selectEmpty}
            >
              {filterableColumns.map(column => (
                <MenuItem
                  key={column.id}
                  id={`filter-selector-${column.id}`}
                  value={column.id}
                >
                  {column.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell align={column.align} key={column.id}>
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={order}
                  id={`head-${column.id}`}
                  onClick={() => createSortHandler(column.id)}
                >
                  {column.label}
                  {orderBy === column.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id} id={`id${row.id}`} className="person">
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  id={`id${row.id}+${column.id}`}
                  className={column.id}
                  align={column.align}
                >
                  {row[column.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {sortedData.length > defaultRowsAmount && (
        <div className={classes.seeMore}>
          <Button color="primary" onClick={showMoreBtnHandler}>
            {isListExpanded ? "See less scores" : "See more scores"}
          </Button>
        </div>
      )}
    </React.Fragment>
  );
}
