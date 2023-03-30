import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';

const { Component } = require('react');

class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  //   // or
  //   handleChange = (key, value) => {
  //     this.setState({
  //       [key]: value,
  //     });
  //   };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;
    const { addContact, contacts } = this.props;

    //log whats been set by handleChange
    console.log(`Name: ${name}, number: ${number}`);

    const newContact = {
      name: name,
      number: number,
      id: nanoid(),
    };

    let isContactAlready = false;

    contacts.forEach(contact => {
      if (contact.name.toLowerCase() === newContact.name.toLowerCase()) {
        Notify.info(`${newContact.name} is already in your phonebook.`);
        // return;
        isContactAlready = true;
      }
      // } else {
      //   console.log('esle');
      //   addContact(newContact);
      // }
    });

    if (!isContactAlready) {
      addContact(newContact);
    } else {
      Notify.info('This contact already exists.');
    }

    this.resetState();
  };

  // reset state to initial state
  resetState = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const nameID = nanoid();
    const numberID = nanoid();
    const { name, number } = this.state;

    return (
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
    );
  }
}

export default Form;
