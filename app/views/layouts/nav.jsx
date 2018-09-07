var React = require('react');

class Nav extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">Books</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link active" href="/">Home <span className="sr-only">(current)</span></a>
            <a className="nav-item nav-link" href="/book/save">New</a>
            <a className="nav-item nav-link" href="/promotion">Promotion</a>
          </div>
        </div>
      </nav>
    );
  }
}

module.exports = Nav;
