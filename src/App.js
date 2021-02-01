import React from 'react';
import './App.css';
import House from './house';


const HOUSES_ENDPOINT = 'http://ancient-taiga-31359.herokuapp.com/api/houses';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.addNewRoom = this.addNewRoom.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
  }

  render() {
    const houses = this.state    
      ? this.state.houses.map((house, index) => // if the STATE is not null, then we will render a house - if null, renders nothing
        <House 
          key={index}               //// One of REACT best practices to always have a key
          data={house}
          addNewRoom={this.addNewRoom}
          deleteRoom={this.deleteRoom} />)
        : null;
        return (
          <div>
            {houses}
          </div>
        );
  }

  componentDidMount() {
    fetch(HOUSES_ENDPOINT)
      .then(res => res.json())
      .then(data => {
        this.setState({
          houses: data
        });
      });
  }

  deleteRoom(e, house, room) {
    const index = house.rooms.indexOf(room);   // now able to have an index an identify which room to delete from array (API)
    house.rooms.splice(index, 1);  // this will remove the room as the name suggests
    updateHouse(house)
    .then(() => {
      this.setState(state => {
        for (let h of state.houses) {
          if (h._id === house._id) {
            let h = house;
            break;
          }
        }
        return state;
      });
    });
    e.preventDefault();
  }

  addNewRoom(e, house, room) {
    house.rooms.push(room);
    updateHouse(house)
    .then(() => {
      this.setState(state => {
        for (let h of state.houses) {
          if (h._id === house._id) {
            let h = house;
            break;
          }
        }
        return state;
      });
    });
    e.preventDefault();
  }
}

function updateHouse(house) {
  return fetch(`${HOUSES_ENDPOINT}/${house._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(house)
  });
}