var socket = io();
socket.on('newPromotion',function(data) {
  var book = data;
  swal('Livro em promoção', `${book.name}\n${book.description}\n${book.price}`, 'info');
});
