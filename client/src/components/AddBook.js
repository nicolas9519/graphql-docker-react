import { flowRight } from 'lodash';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { addBookMutation, getAuthorsQuery, getBooksQuery } from '../queries/queries';

class AddBook extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: '',
    };
  }

  displayAuthors = () => {
    const data = this.props.getAuthorsQuery;
    if (data.loading) {
      return (<option disabled>Loading...</option>)
    }
    return data.authors.map(author => (<option key={author.id} value={author.id}>{author.name}</option>))
  };

  submitForm = (e) => {
    e.preventDefault();
    this.props.addBookMutation({
      variables: this.state,
      refetchQueries: [
        { query: getBooksQuery }
      ]
    });
  }

  render() {
    const { name, genre, authorId } = this.state;
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Book Name:</label>
          <input type="text" value={name} onChange={(e) => this.setState({ name: e.target.value })} />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" value={genre} onChange={(e) => this.setState({ genre: e.target.value })} />
        </div>
        <div className="field">
          <label>Author:</label>
          <select value={authorId} onChange={(e) => this.setState({ authorId: e.target.value })}>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default flowRight(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
