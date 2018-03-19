import React, { Component } from 'react'
import firebase, { auth, provider } from './firebase.js'
import TabForm from './TabForm.js'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import styled from 'styled-components';


const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: -88
  },
  addTab: {
    marginTop: 30
  },
  root: {
    width: '75%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

const Link = styled.a`
  text-decoration: underline;
  color: #000;

  &:hover{
    color: #000;
    text-decoration: none;
  }
`;


class AppMUI extends Component {
  constructor(){
    super();
    this.state = {
      title: '',
      artist: '',
      tabs: [],
    }
  }


  //
  // QUERYING FIREBASE TO DISPLAY DATA
  //

  componentDidMount() {
    const tabsRef = firebase.database().ref('tabs');
    tabsRef.on('value', (snapshot) => {
      let tabs = snapshot.val();
      let newState = [];
      for (let tab in tabs) {
        newState.push({
          id: tab,
          track: tabs[tab].track,
          artist: tabs[tab].artist,
          tuning: tabs[tab].tuning,
          capo: tabs[tab].capo,
          tabLink: tabs[tab].tabLink
        });
      }
      this.setState({
        tabs: newState
      });
    });
  }


  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.container}>
          <div className={classes.addTab}>
            <TabForm />
          </div>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Track</TableCell>
                  <TableCell>Artist</TableCell>
                  <TableCell>Tuning</TableCell>
                  <TableCell>Capo</TableCell>
                  <TableCell>URL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.tabs.map(tab => {
                  return (
                    <TableRow key={tab.id}>
                      <TableCell>{tab.track}</TableCell>
                      <TableCell>{tab.artist}</TableCell>
                      <TableCell>{tab.tuning}</TableCell>
                      <TableCell>{tab.capo}</TableCell>
                      <TableCell><a href={tab.tabLink} target="_blank"><Link>{tab.tabLink}</Link></a></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    );
  }
}

AppMUI.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppMUI);
