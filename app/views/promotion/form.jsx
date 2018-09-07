var React = require('react');
var DefaultLayout = require('../layouts/default');

class Promotion extends React.Component {
  render() {
    return(
      <DefaultLayout title="Promotion">
        <div className="jumbotron">
        	<div className="container">
          	<h1 className="display-4">Promotion</h1>

    				<form action="/promotion" method="post">
    					<div className="form-group">
    						<label htmlFor="id">Book</label>
    						<select className="form-control" name="book[id]">
    							{ this.props.books.map(book => <option key={book.id} value={book.id}>{book.name}</option> ) }
    						</select>
    					</div>
    					<button className="btn btn-primary btn-lg btn-block" type="submit">Save</button>
    				</form>
    			</div>
        </div>
      </DefaultLayout>
    );
  }
}

module.exports = Promotion;
