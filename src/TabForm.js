import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import Add from 'material-ui-icons/Add';
import firebase from './firebase.js';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  textFieldTrack: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 645,
  },
  textFieldArtist: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 280,
  },
  textFieldLink: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 645,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  }
});


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    position: 'absolute',
    width: 750,
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    border: '1px solid #e5e5e5',
    backgroundColor: '#fff',
    boxShadow: '0 5px 15px rgba(0, 0, 0, .5)',
    padding: 8 * 4,
  };
}


class TabForm extends Component {
  state={
    track: '',
    artist: '',
    tuning: 'Standard',
    capo: '',
    tabLink: '',
    open: false
  }

  handleSelect = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleText = name => e => {
    this.setState({
      [name]: e.target.value
    })
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  //
  // PUSHING DATA TO FIREBASE
  //

  handleSubmit(e) {
    console.log('here');
    e.preventDefault();
    const tabsRef = firebase.database().ref('tabs');
    const tab = {
      track: this.state.track,
      artist: this.state.artist,
      tuning: this.state.tuning,
      capo: this.state.capo,
      tabLink: this.state.tabLink
    }
    tabsRef.push(tab);
    this.setState({
      track: '',
      artist: '',
      tuning: 'Standard',
      capo: '',
      tabLink: '',
      open: false,
    });
  }


  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button color='primary' onClick={this.handleOpen} raised><Add className={classes.leftIcon} />Add</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          disableAutoFocus={true}
        >
          <div style={getModalStyle()}>
            <form className={classes.container} autoComplete="off">
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      id="track"
                      label="Track"
                      value={this.state.track}
                      onChange={this.handleText('track')}
                      className={classes.textFieldTrack}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl className={classes.formControl} fullWidth={true}>
                    <TextField
                      id="artist"
                      label="Artist"
                      value={this.state.artist}
                      onChange={this.handleText('artist')}
                      className={classes.textFieldArtist}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="tuning-selector">Tuning</InputLabel>
                    <Select
                      value={this.state.tuning}
                      onChange={this.handleSelect}
                      input={<Input name="tuning" id="tuning-selector" />}
                    >
                      <MenuItem value="Standard">Standard</MenuItem>
                      <MenuItem value='E Flat'>E Flat</MenuItem>
                      <MenuItem value='Drop D'>Drop D</MenuItem>
                      <MenuItem value='Drop D Flat'>Drop D Flat</MenuItem>
                      <MenuItem value='Drop C'>Drop C</MenuItem>
                      <MenuItem value='Drop B'>Drop B</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="capo-selector">Capo</InputLabel>
                    <Select
                      value={this.state.capo}
                      onChange={this.handleSelect}
                      input={<Input name="capo" id="capo-selector" />}
                    >
                      <MenuItem value="">None</MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={6}>6</MenuItem>
                      <MenuItem value={7}>7</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      id="tabLink"
                      label="URL"
                      value={this.state.tabLink}
                      onChange={this.handleText('tabLink')}
                      className={classes.textFieldLink}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button color='primary' onClick={this.handleSubmit.bind(this)}><Add className={classes.leftIcon} />Add</Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

TabForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TabForm);;
