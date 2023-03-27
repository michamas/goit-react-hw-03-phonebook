import { nanoid } from 'nanoid';
import { Component } from 'react';
import './App.css';
import Contacts from './Contacts/Contacts.jsx';
import Filter from './Filter/Filter.jsx';
import Form from './Form/Form.jsx';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Geralt z Rivii', number: '459-12-56' },
      { id: 'id-2', name: 'Clint Eastwood', number: '443-89-12' },
      { id: 'id-3', name: 'Le Chiffre', number: '645-17-79' },
      { id: 'id-4', name: 'Buzz Lightyear ', number: '227-91-26' },
      { id: 'id-5', name: 'Merida Waleczna', number: '223-91-26' },
    ],
    filter: '',
  };

  addContact = newContact => {
    this.setState({
      contacts: [...this.state.contacts, newContact],
    });
  };

  render() {
    const { contacts } = this.state;

    return (
      <div className="app">
        <h2>Phonebook</h2>
        <Form contacts={contacts} addContact={this.addContact} />
        <h2>Contacts</h2>
        <Contacts contacts={contacts} />
      </div>
    );
  }
}
