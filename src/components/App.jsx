import { Component } from 'react';
import './App.css';
import Contacts from './Contacts/Contacts.jsx';
import { Filter } from './Filter/Filter.jsx';
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

  deleteContact = idToDelete => {
    // const { contacts } = this.state;
    const deletedContact = this.state.contacts.find(
      ({ id }) => id === idToDelete
    ).name;
    const contactsWithoutDeleted = this.state.contacts.filter(
      contact => contact.id !== idToDelete
    );
    this.setState({
      contacts: [...contactsWithoutDeleted],
    });
    console.log(`${deletedContact} was deleted.`);
  };

  handleFilter = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  filterContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.filterContacts();

    return (
      <div className="app">
        <h2>Phonebook</h2>
        <Form contacts={contacts} addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handleFilter} />
        <Contacts
          contacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
