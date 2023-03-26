import { nanoid } from 'nanoid';
import { Component } from 'react';
import './App.css';
import Contacts from './Contacts/Contacts.jsx';

const INITIAL_STATE = {
  contacts: [
    { id: 'id-1', name: 'Geralt z Rivii', number: '459-12-56' },
    { id: 'id-2', name: 'Clint Eastwood', number: '443-89-12' },
    { id: 'id-3', name: 'Le Chiffre', number: '645-17-79' },
    { id: 'id-4', name: 'Buzz Lightyear ', number: '227-91-26' },
    { id: 'id-5', name: 'Merida Waleczna', number: '223-91-26' },
  ],
  filter: '',
  name: '',
  number: '',
};

export class App extends Component {
  state = {
    ...INITIAL_STATE,
  };

  // // hooks?
  // const [name, setName] = useState("");

  // universal - updating all inputs with one function
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFilter = event => {
    const { contacts } = this.state;
    const query = event.target.value;
    let updatedContacts = [...contacts];
    updatedContacts = updatedContacts.filter(contact => {
      return contact.toLoweCase().indexOf(query.toLowerCase()) !== -1;
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number, contacts } = this.state;

    //log whats been set by handleChange
    console.log(`Name: ${name}, number: ${number}`);

    const newContact = {
      name: name,
      number: number,
      id: contacts.length + 1,
    };

    this.setState({
      contacts: [...contacts, newContact],
    });
    this.resetState();
  };

  // reset state to initial state
  resetState = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const nameID = nanoid();
    const numberID = nanoid();
    const searchID = nanoid();
    const { contacts, name, number, filter } = this.state;

    return (
      <div className="app">
        <h2>Phonebook</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor={nameID}>
            Name:
            <input
              id={nameID}
              value={name}
              onChange={this.handleChange}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
          <label htmlFor={numberID}>
            Phone number:
            <input
              id={numberID}
              value={number}
              onChange={this.handleChange}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
          <button type="submit">Add contact</button>
        </form>
        <h2>Contacts</h2>
        <label htmlFor={searchID}>
          Find by name:
          <input
            id={searchID}
            type="text"
            value={filter}
            onChange={this.handleFilter}
            name="filter"
          />
        </label>
        <ul className="contacts">
          <Contacts contacts={contacts} />
        </ul>
      </div>
    );
  }
}
