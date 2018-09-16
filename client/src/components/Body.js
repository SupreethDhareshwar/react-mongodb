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

import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import TextField from '@material-ui/core/TextField';

import SearchIcon from '@material-ui/icons/Search';


import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
 
  actions: {
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  title: {
    flex: '0 0 auto',
  },
});

class EnhancedTableToolbar extends React.Component {
constructor(props){
  super(props)
  this.state={
    languageValue : "English",
    countryValue:"USA"
  }
}
handleChange = (evt)=>{
    this.props.onRequestSearch(evt);

}
handleLanguageSelect=(evt)=>{
  this.setState({
    languageValue:evt.target.value
  })
  this.props.onRequestLanguageFilter(evt);
}
handleCountrySelect=(evt)=>{
  this.setState({
    countryValue:evt.target.value
  })
  this.props.onRequestCountryFilter(evt);
}
render() {
    const { classes } = this.props;

   return( <Toolbar
      className={classes.root}  >
      <div className={classes.actions}>
         <IconButton aria-label="Filter list">
            <SearchIcon />
          </IconButton>
          <TextField onChange={this.handleChange } placeholder="Enter Movie Name"></TextField>
          <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">Language</InputLabel>
          <Select
            onChange={this.handleLanguageSelect}
            value={this.state.languageValue}
          >
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Japanese">Japanese</MenuItem>
            <MenuItem value="French">French</MenuItem>
            <MenuItem value="Mandarin">Mandarin</MenuItem>
            <MenuItem value="Aboriginal">Aboriginal</MenuItem>
            <MenuItem value="Spanish">Spanish</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">Country</InputLabel>
          <Select
            onChange={this.handleCountrySelect}
            value={this.state.countryValue}
          >
            <MenuItem value="USA">USA</MenuItem>
            <MenuItem value="New Zealand">New Zealand</MenuItem>
            <MenuItem value="Canada">Canada</MenuItem>
            <MenuItem value="Australia">Australia</MenuItem>
            <MenuItem value="Belgium">Belgium</MenuItem>
            <MenuItem value="Japan">Japan</MenuItem>
            <MenuItem value="Germany">Germany</MenuItem>
            <MenuItem value="China">China</MenuItem>
            <MenuItem value="France">France</MenuItem>
          </Select>
        </FormControl>
      </div>
    </Toolbar>
  );
}
}

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);


const columnData = [
  { id: 'movie_title', numeric: false, disablePadding: false, label: 'Movie Title' },
  { id: 'title_year', numeric: false, disablePadding: false, label: 'Year' }
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
    width: '45%',
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
      orderBy: 'movie_title',
      data: [],
      filteredData:[],
      page: 0,
      rowsPerPage: 5,
      query:"",
      selectedLanguage:"English",
      selectedCountry:"USA"
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
handleKeySearch=(event)=>{
     //Filtering Data by searched Movie title

  let completeData=JSON.parse(JSON.stringify(this.state.data));
  let searchedData=completeData.filter((obj)=>{
    return ((-1 !== obj.movie_title.toLowerCase().indexOf(event.target.value.toLowerCase())) && (obj.language === this.state.selectedLanguage) && (obj.country === this.state.selectedCountry) );
 })
  this.setState({ 
    query:event.target.value,
    filteredData:searchedData
   });

}
handleLanguageSelect=(event)=>{
   //Filtering Data by selected Language 
let completeData=JSON.parse(JSON.stringify(this.state.data));
let searchedData=completeData.filter((obj)=>{
  return ((-1 !== obj.movie_title.toLowerCase().indexOf(this.state.query.toLowerCase())) && ( obj.language === event.target.value ) && (obj.country === this.state.selectedCountry));
});
this.setState({ 
  selectedLanguage:event.target.value,
  filteredData:searchedData
 });
}
handleCountrySelect=(event)=>{
  //Filtering Data by selected Country 
  let completeData=JSON.parse(JSON.stringify(this.state.data));
  let searchedData=completeData.filter((obj)=>{
    return ((-1 !== obj.movie_title.toLowerCase().indexOf(this.state.query.toLowerCase())) && ( obj.language === this.state.selectedLanguage ) && (obj.country === event.target.value ));
  });
  this.setState({ 
    selectedCountry:event.target.value,
    filteredData:searchedData
   });
}
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, rowsPerPage, page,filteredData } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
        <EnhancedTableToolbar onRequestSearch={this.handleKeySearch} onRequestLanguageFilter={this.handleLanguageSelect} 
        onRequestCountryFilter={this.handleCountrySelect}
        />
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((n,indx) => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={indx}
                    onClick={()=> this.props.sendRowData(n) }
                  >
                    <TableCell component="th" scope="row" >
                      {n.movie_title}
                    </TableCell>
                    <TableCell numeric>{n.title_year}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
  componentDidMount(){
  //   fetch("http://starlord.hackerearth.com/movieslisting",
  //   {
  //     method: "GET", // *GET, POST, PUT, DELETE, etc.
     
  //   }
  // ) // Call the fetch function passing the url of the API as a parameter
  //   .then((response)=> {
  //       response.json().then((responseData)=>{
  //         console.log(responseData);
  //         //TODO Set Select dropdown option dynamically from fetched server data
  //         // const uniqueLanguages = [...new Set(responseData.map(item => item.language))];
  //         // let searchedData=responseData.filter((obj)=>{
  //         //   return (( obj.language === this.state.selectedLanguage ) && (obj.country === this.state.selectedCountry));
  //         // });
  //         //  this.setState({
  //         //    data:responseData,
  //         //    filteredData:searchedData
  //         //  })
  //       });
     
  //       // Your code for handling the data you get from the API
  //   })
  //   .catch(function(error) {
  //       // This is where you run code if the server returns any errors
  //   });
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
