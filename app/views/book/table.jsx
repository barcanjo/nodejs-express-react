var React = require('react');

class BookTable extends React.Component {
  render() {
    return(
      <table className="table table-striped table-borderless">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.books.map(book => {
              return (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.name}</td>
                  <td>{book.description}</td>
                  <td>{book.price}</td>
                </tr>
              )
            } )
          }
        </tbody>
      </table>
    );
  }
}

module.exports = BookTable;
