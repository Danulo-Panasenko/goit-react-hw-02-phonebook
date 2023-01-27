import { Component } from 'react';
import css from './Form.module.css';
import Button from 'components/Button/Button';
import inititalState from './inititalState.js';
import PropTypes from 'prop-types';
class Form extends Component {
  state = { ...inititalState };
  handleSumbit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const result = onSubmit({ ...this.state });
    if (result) {
      this.reset();
    }
  };
  reset() {
    this.state({ ...inititalState });
  }
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };
  render() {
    const { handleChange, handleSumbit } = this;
    const { name, number } = this.state;
    return (
      <form action="" onSubmit={handleSumbit}>
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
    );
  }
}
export default Form;

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
