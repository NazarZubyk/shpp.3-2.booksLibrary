var pathname = $(location).attr('pathname');
var bookIdPosition = pathname.lastIndexOf('/') + 1;
var isBookInUse = false;
var bookId;

// doAjaxQuery('GET', '/api/v1/books/' + pathname.substr(bookIdPosition), null, function(res) {
//     view.fillBookInfo(res.data);
//     if (res.data.event) {
//         isBookInUse = true;
//         bookId = res.data.id;
//     }
// });

/* --------------------Show the result, for sending the -----------------------
----------------------email in the queue for the book ---------------------- */
// var showResultSendEmailToQueue = function(email, result) {
//     var busy = $('#bookID').attr('busy');
//     $('.form-queue', '.btnBookID', (busy === null) ? '.freeBook' : '.busyBook').css('display', 'none');
//     $('.response').css('display', 'block');
//     $('span.youEmail').text(' ' + email);
// };

/*--------------- Send email. Get in Queue in for a book ---------------------*/
// var sendEmailToQueue = function(id, email) {
//     doAjaxQuery('GET', '/api/v1/books/' + id + '/order?email=' + email, null, function(res) {
//         showResultSendEmailToQueue(email, res.success);
//     });
// };

/* --------------- Checking validity of email when typing in input -----------*/
// $('.orderEmail').keyup(function(event) {
//     var email = $(this).val();
//     var isEmail = controller.validateEmail(email);
//     if (email === '') {
//         $('.input-group').removeClass('has-error has-success');
//         view.hideElement('.glyphicon-remove', '.glyphicon-ok');
//     } else {
//         if (isEmail) {
//             view.showSuccessEmail();
//             if (event.keyCode == 13) {
//
//                 var id = $('#bookID').attr('book-id');
//                 sendEmailToQueue(id, email);
//             }
//         } else {
//             view.showErrEmail();
//         }
//     }
// });
/*------------------ Sending email by clicking on the button ----------------*/
$('.btnBookID').click(function(event) {
    // var email = $('.orderEmail').val();
    // var isEmail = controller.validateEmail(email);
    // if (isEmail) {
    //     view.showSuccessEmail();
    //     var id = $('#bookID').attr('book-id');
    //     sendEmailToQueue(id, email);
    // } else {
    //     view.showErrEmail();
    // }
    // if (isBookInUse) {
    //     view.showSubscribe(
    //         "Сейчас эта книга находится на руках, у одного из наших учеников." +
    //         " Оставь свой email и мы сообщим, как только книга вновь" +
    //         " появится в библиотеке", bookId);
    // } else 
    {
        alert(
            "Тут могла бути інформація про наявність книги" +
            "чи доступність її в бібліотеці" +
            "або контакні дані"
            );
            var bookID = document.getElementById('id').getAttribute('book-id');
        fetch('/book/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                click: true,
                bookID: bookID
            })
        })
    }
});
