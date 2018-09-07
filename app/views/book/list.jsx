var React = require('react');
var DefaultLayout = require('../layouts/default');
var BookTable = require('./table');

class BookList extends React.Component {
  render() {
    return(
      <DefaultLayout title="Books">
        <BookTable books={this.props.books} />
      </DefaultLayout>
    );
  }
}

module.exports = BookList;
