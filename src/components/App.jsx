import React from 'react';
import { Component } from 'react';
import { Container } from './Container/Container';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: JSON.parse(localStorage.getItem('contacts')) ?? [],

    // contacts: [
    //   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    //   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    //   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    //   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    // ],
    filter: '',
  };

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onAddContact = contact => {
    if (this.state.contacts.some(c => c.name === contact.name)) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    const finalContact = {
      id: nanoid(),
      name: contact.name,
      number: contact.number,
    };

    this.setState({
      contacts: [finalContact, ...this.state.contacts],
    });
  };

  handleFilter = ({ target: { value } }) => {
    this.setState({
      filter: value,
    });
  };

  deleteContact = contactId => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== contactId),
    });
  };

  render() {
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name
        .toLowerCase()
        .trim()
        .includes(this.state.filter.toLowerCase())
    );

    return (
      <Container>
        <h2>Phonebook</h2>
        <ContactForm onAddContact={this.onAddContact} />

        <h2>Contacts</h2>
        {this.state.contacts.length > 1 && (
          <Filter
            value={this.state.filter}
            onFilterChange={this.handleFilter}
          />
        )}
        {this.state.contacts.length > 0 ? (
          <ContactList
            contacts={filteredContacts}
            deleteContact={this.deleteContact}
          />
        ) : (
          <p>Your phonebook is empty . Please add contact.</p>
        )}
      </Container>
    );
  }
}
