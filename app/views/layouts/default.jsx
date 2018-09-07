var React = require('react');
var Nav = require('./nav');

class DefaultLayout extends React.Component {
  render() {
    return (
      <html>
        <head>
          <link type="text/css" rel="stylesheet" href="/bootstrap/dist/css/bootstrap.min.css" />
          <link type="text/css" rel="stylesheet" href="/sweetalert2/dist/sweetalert2.min.css" />
          <title>{this.props.title}</title>
        </head>
        <body>
          <Nav />
          <div className="container">
            {this.props.children}
          </div>
        </body>
        <script src="/sweetalert2/dist/sweetalert2.min.js"></script>
        <script src="/socket.io/socket.io.js"></script>
        <script src="/assets/js/promotion.js"></script>
      </html>
    );
  }
}

module.exports = DefaultLayout;
