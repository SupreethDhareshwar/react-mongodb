//src/components/LeftArea.js

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

import Client from "./Client";

const columnData = [
  { id: 'title', numeric: false, disablePadding: false, label: 'Title' },
  { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
  { id: 'event', numeric: false, disablePadding: false, label: 'Event' },
  { id: 'main_speaker', numeric: false, disablePadding: false, label: 'Main Speaker' },
  { id: 'published_date', numeric: false, disablePadding: false, label: 'Published Date' },
  { id: 'views', numeric: true, disablePadding: false, label: 'Views' },
  { id: 'tags', numeric: false, disablePadding: false, label: 'Tags' },
  { id: 'url', numeric: false, disablePadding: false, label: 'Link' }

];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    width: '92%',
    marginTop: theme.spacing.unit * 3,
    marginLeft:theme.spacing.unit*3,
    paddingLeft:theme.spacing.unit*3,
    paddingRight:theme.spacing.unit*3,
    display:'inline-block'
  },
  table: {
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'asc',
      orderBy: 'title',
      data: [],
      filteredData:[],
      page: 0,
      rowsPerPage: 100
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const filteredData =
      order === 'desc'
        ? this.state.filteredData.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.filteredData.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ filteredData, order, orderBy });
  };

  handleChangePage = (event, newPage) => {
    Client.tableData(newPage,responseData=>{
      console.log(responseData);
      this.setState({
                   filteredData:responseData,
                   data:responseData,
                   page:newPage
                 });
    });
  };


  render() {
    const { classes } = this.props;
    const { data, order, orderBy, rowsPerPage, page,filteredData } = this.state;

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {filteredData.map((n,indx) => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={indx}
                  >
                    <TableCell component="th" scope="row" >
                      {n.title}
                    </TableCell>
                    <TableCell component="th" scope="row" >
                      {n.description}
                    </TableCell>
                    <TableCell component="th" scope="row" >
                      {n.event}
                    </TableCell>
                    <TableCell component="th" scope="row" >
                      {n.main_speaker}
                    </TableCell>
                    <TableCell component="th" scope="row" >
                      {n.published_date}
                    </TableCell>
                    <TableCell numeric>{n.views}</TableCell>
                    <TableCell component="th" scope="row" >
                      {n.tags}
                    </TableCell>
                    <TableCell component="th" scope="row" >
                     <a target="_blank" href={n.url}>Link</a>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={22000}
          rowsPerPage={rowsPerPage}
          page={page}
          rowsPerPageOptions={[100]}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
        />
      </Paper>
    );
  }
  componentDidMount(){
    Client.tableData(this.state.page,responseData=>{
      console.log(responseData);
      this.setState({
                  data:responseData,
                   filteredData:responseData
                 });
    });
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
