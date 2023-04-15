import { Component } from 'react';
import './App.css';
import Contacts from './Contacts/Contacts.jsx';
import { Filter } from './Filter/Filter.jsx';
import Form from './Form/Form.jsx';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);
    if (parsedContacts) {
      this.setState({
        contacts: parsedContacts,
      });
    }
    // console.log('componentDidMount');
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      // console.log('componentDidUpdate');
    }
  }

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
