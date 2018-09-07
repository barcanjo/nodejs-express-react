var React = require('react');
var DefaultLayout = require('../layouts/default');

class NotFoundPage extends React.Component {
  render() {
    return(
      <DefaultLayout title="Not found">
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-4">Oh não :(</h1>

              <span>Nenhum sinal de dados encontrado!</span>
          </div>
        </div>
      </DefaultLayout>
    );
  }
}

module.exports = NotFoundPage;
