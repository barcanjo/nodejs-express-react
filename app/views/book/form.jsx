var React = require('react');
var DefaultLayout = require('../layouts/default');

class Form extends React.Component {
  render() {
    return(
      <DefaultLayout title="New book">
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-4">New book</h1>
      				<a href="/books">All books</a>
    					<form action="/book/save" method="post">
    						<div className="form-group">
    							{this.props.errors.map((err, i) => {
                    return (
                      <div key={'err-' + i} className="alert alert-danger" role="alert">
      									<strong>{err.param} </strong>{err.msg}
      								</div>
                    )
                  })}
    						</div>
    						<div className="form-group">
                  <label htmlFor="name"></label>
    							<input className="form-control" type="text" id="name" name="name" value={this.props.book.name} aria-describedby="name-helper" placeholder="Enter the book name" />
    							<small id="name-helper" className="form-text text-muted">The name that will show on page of books</small>
    						</div>
    						<div className="form-group">
                  <label htmlFor="description"></label>
    							<input className="form-control" type="text" id="description" name="description" value={this.props.book.description} aria-describedby="description-helper" placeholder="Enter the book description" />
    							<small id="description-helper" className="form-text text-muted">A text that describe the book shown on detail page of book</small>
                </div>
    						<div className="form-group">
                  <label htmlFor="price"></label>
                  <input className="form-control" type="text" id="price" name="price" value={this.props.book.price} aria-describedby="price-helper" placeholder="Enter the book price" />
    							<small id="price-helper" className="form-text text-muted">The price book for buy</small>
    						</div>
    						<button className="btn btn-primary btn-lg btn-block" type="submit">Save</button>
    					</form>
    				</div>
    			</div>
        </DefaultLayout>
    );
  }
}

module.exports = Form;
