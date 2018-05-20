$('#form_upload').on('submit', function(event) {
  event.preventDefault();

  const formData = new FormData($(this)[0]);

  $.ajax({
    type: 'POST',
    url: '/api/uploads',
    data: formData,
    contentType: false,
    processData: false
  })
  .done((data, textStatus, jqXHR) => {
    alert(`1. ${data}\n2. ${textStatus}\n3. ${jqXHR.responseText}`);
  })
  .fail((jqXHR, textStatus, errorThrown) => {
    alert(`a. ${jqXHR.responseText}\nb. ${textStatus}\nc. ${errorThrown}`);
  });
});
