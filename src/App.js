import React, { Component } from 'react'
import firebase, { auth, provider } from './firebase.js'
import { Table, Input, Button, Image, Grid } from 'semantic-ui-react'
import TabForm from './TabForm.js'


class App extends Component {
  constructor(){
    super();
    this.state = {
      title: '',
      artist: '',
      tabs: [],
      // user: null
    }
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.logout = this.logout.bind(this);
    // this.login = this.login.bind(this);
  }


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  //
  // LOGGING IN/OUT FUNCTIONS
  //

  // logout() {
  //   auth.signOut()
  //   .then(() => {
  //     this.setState({
  //       user: null
  //     });
  //   });
  // }
  //
  // login() {
  //   auth.signInWithPopup(provider)
  //     .then((result) => {
  //       const user = result.user;
  //       this.setState({
  //         user
  //       });
  //     });
  // }


  //
  // QUERYING FIREBASE TO DISPLAY DATA
  //

  componentDidMount() {
    // auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     this.setState({ user });
    //   }
    // });

    const tabsRef = firebase.database().ref('tabs');
    tabsRef.on('value', (snapshot) => {
      let tabs = snapshot.val();
      let newState = [];
      for (let tab in tabs) {
        newState.push({
          id: tab,
          track: tabs[tab].track,
          artist: tabs[tab].artist,
          tabLink: tabs[tab].tabLink
        });
      }
      this.setState({
        tabs: newState
      });
    });
  }


  //
  // REMOVING AN ITEM FROM LIST
  //

  // removeItem(itemId) {
  //   const itemRef = firebase.database().ref(`/items/${itemId}`);
  //   itemRef.remove();
  // }


  render() {
    return (
      <div>
        <div>
          <h1>Welcome</h1>
          {/* {this.state.user ?
            <Button onClick={this.logout}>Logout</Button>
            :
            <Button onClick={this.login}>Login</Button>
          } */}
        </div>

        {/* {this.state.user ? */}
          <div>
            <TabForm />
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Track</Table.HeaderCell>
                    <Table.HeaderCell>Artist</Table.HeaderCell>
                    <Table.HeaderCell>Link</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.state.tabs.map((tab) => {
                    return (
                      <Table.Row key={tab.id}>
                        <Table.Cell>{tab.track}</Table.Cell>
                        <Table.Cell>{tab.artist}</Table.Cell>
                        <Table.Cell><a href={tab.tabLink}>{tab.tabLink}</a></Table.Cell>
                        {/* <Table.Cell><Button onClick={() => this.removeItem(item.id)}>Remove Item</Button></Table.Cell> */}
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table>
            </div>
          {/* : */}
          {/* <p> You must be logged in to view this </p> */}
        {/* } */}
      </div>
    );
  }
}

export default App;
