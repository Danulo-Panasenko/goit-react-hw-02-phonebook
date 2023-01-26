import { Component } from 'react';
import css from 'components/ContactForm/ContactForm.module.css';
import Button from 'components/Button/Button';
import { nanoid } from 'nanoid';
class ContactForm extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],

    name: '',
    number: '',
  };

  removeContact(id) {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(contact => contact.id !== id);
      return { contacts: newContacts };
    });
  }
  addContact = e => {
    e.preventDefault();
    this.setState(prevState => {
      const { name, number, contacts } = prevState;
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return { contacts: [newContact, ...contacts], name: '', number: '' };
    });
  };
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };
  render() {
    const { addContact, handleChange, name, number } = this;
    const Contact = this.state.contacts.map(({ id, name, number }) => (
      <li key={id}>
        {name}:{number}
        <Button onClick={() => this.removeContact(id)} type="button">
          Delete
        </Button>
      </li>
    ));
    return (
      <div>
        <h4>Phonebook</h4>
        <div className={css.wrapper}>
          <div className={css.block}>
            <form action="" onSumbit={addContact}>
              <div className={css.formGroup}>
                <label className={css.label}>Name</label>
                <input
                  value={name}
                  onChange={handleChange}
                  placeholder="Name"
                  className={css.input}
                  type="text"
                  name="name"
                  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                  required
                />
              </div>
              <div className={css.formGroup}>
                <label className={css.label}>Number</label>
                <input
                  value={number}
                  onChange={handleChange}
                  placeholder="Number"
                  className={css.input}
                  type="tel"
                  name="number"
                  pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                  required
                />
              </div>
              <Button type="sumbit">Add contact</Button>
            </form>
          </div>
          <div>
            <h4>Contacts</h4>
            <label className={css.label}>Find contacts by name</label>
            <input className={css.input} />
            <ul>{Contact}</ul>
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
