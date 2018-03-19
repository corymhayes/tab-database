import React, { Component } from 'react'
import firebase from './firebase.js'
import { Table, Input, Button, Image, Grid, Modal, Header, Form, Dropdown } from 'semantic-ui-react'


class App extends Component {
  constructor(){
    super();
    this.state = {
      open: false,
      track: '',
      artist: '',
      tuning: 'E A D G B e',
      capo: 'none',
      tabLink: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //
  // TURNING THE MODAL ON/OFF
  //

  handleShow = size => () => this.setState({ size, open:true })
  handleClose = () => this.setState({ open: false })


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  //
  // PUSHING DATA TO FIREBASE
  //

  handleSubmit(e) {
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
      open: false,
      track: '',
      artist: '',
      tuning: 'E A D G B e',
      capo: 'none',
      tabLink: '',
    });
  }

  render() {
    const { open, size } = this.state
    const tuning = [
      {key: 'standard', value: 'standard', text: 'E A D G B e'},
      {key: 'eFlat', value: 'eFlat', text: 'Eb Ab Db Gb Bb eb'},
      {key: 'dropD', value: 'dropD', text: 'D A D G B e'},
      {key: 'dropDFlat', value: 'dropDFlat', text: 'Db Ab Db Gb Bb eb'},
      {key: 'dropC', value: 'dropC', text: 'C G C F# A D'},
      {key: 'dropB', value: 'dropB', text: 'B F# B E G# C#'},
    ]
    const capo = [
      {key: 'none', value: 'none', text: 'none'},
      {key: '1', value: '1', text: '1'},
      {key: '2', value: '2', text: '2'},
      {key: '3', value: '3', text: '3'},
      {key: '4', value: '4', text: '4'},
      {key: '5', value: '5', text: '5'},
      {key: '6', value: '6', text: '6'},
      {key: '7', value: '7', text: '7'}
    ]

    return (
      <div>
        <Button onClick={this.handleShow('small')}>Add Tab</Button>
        <Modal size={size} open={open} onClose={this.handleClose}>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Grid>
                <Grid.Row>
                  <Grid.Column> <Form.Input label='Track' name='track' onChange={this.handleChange} value={this.state.track} /> </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={8}> <Form.Input label='Artist' name='artist' onChange={this.handleChange} value={this.state.artist} /> </Grid.Column>
                  <Grid.Column width={5}>
                    <Form.Select selection label='Tuning' options={tuning}/>
                  </Grid.Column>
                  <Grid.Column width={3}> <Form.Select label='Capo' name='capo' fluid selection options={capo} onChange={this.handleSelect} /> </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column> <Form.Input label='URL' name='tabLink' onChange={this.handleChange} value={this.state.tabLink}/> </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column> <Form.Button>Save</Form.Button> </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default App;
