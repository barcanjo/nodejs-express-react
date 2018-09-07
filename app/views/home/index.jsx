var React = require('react');
var DefaultLayout = require('../layouts/default');
var BookTable = require('../book/table');

class Index extends React.Component {
  render() {
    return (
      <DefaultLayout title="Home">
        <BookTable books={this.props.books} />
      </DefaultLayout>
    );
  }
}

module.exports = Index;
