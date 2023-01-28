import { Component } from 'react';
import css from 'components/ContactForm/ContactForm.module.css';

import contacts from 'components/contacts';
import ContactList from 'components/Contacts/Contacts';
import Filter from 'components/Filter/Filter';
import { nanoid } from 'nanoid';
import Form from 'components/Form/Form';

class ContactForm extends Component {
  state = {
    contacts: [...contacts],
    filter: '',
  };

  removeContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(contact => contact.id !== id);
      return { contacts: newContacts };
    });
  };
  addContact = ({ name, number }) => {
    if (this.isDublicate(name)) {
      return alert(`${name} is already in contacts`);
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(prevState => {
      return {
        contacts: [newContact, ...prevState.contacts],
      };
    });
  };
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  isDublicate(name) {
    const normalizedName = name.toLowerCase();
    const { contacts } = this.state;
    const result = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });
    return Boolean(result);
  }
  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });
    return result;
  }
  render() {
    const { addContact, handleChange, removeContact } = this;
    const contacts = this.getFilteredContacts();

    return (
      <div className={css.style}>
        <h4>Phonebook</h4>
        <div className={css.wrapper}>
          <div className={css.block}>
            <Form onSubmit={addContact}></Form>
          </div>
          <div>
            <h4>Contacts</h4>
            <Filter handleChange={handleChange}></Filter>
            <ContactList
              removeContact={removeContact}
              contacts={contacts}
            ></ContactList>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactForm;

// ContactForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };
