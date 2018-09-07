var React = require('react');
var DefaultLayout = require('../layouts/default');

class InternalErrorPage extends React.Component {
  render() {
    return(
      <DefaultLayout title="Internal Error">
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-4">Oh não :(</h1>

              <span>Houve um erro no sistema!</span>
          </div>
        </div>
      </DefaultLayout>
    );
  }
}

module.exports = InternalErrorPage;
