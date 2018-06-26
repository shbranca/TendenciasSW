var Form = function () {
    var form = $("#edit-form").validate(); 

    var form = {
        begin: function () {
            $('#edit-form input').attr('disabled', true);
            $('#edit-form select').attr('disabled', true);
            $('#btnSave').addLoader();
        },
        complete: function () {
            $('#edit-form input').attr('disabled', false);
            $('#edit-form select').attr('disabled', false);
            $('#btnSave').removeLoader();
        },
        success: function (e) {
            toastr.success(_app.constants.toastr.message.success.task, _app.constants.toastr.title.success);
        },
        failure: function (e) {
            toastr.error(_app.constants.toastr.message.error.task, _app.constants.toastr.title.error);
            if (e.responseText != null) $('#alert-text').html(e.responseText);
            else $('#alert-text').html(_app.constants.toastr.message.error.task);
            $('#m-form_alert').removeClass('m--hide').show();
            mApp.scrollTop();
        }
    }

    return {
        init: function () {
            
        },
        begin: function () {
            form.begin();
        },
        complete: function () {
            form.complete();
        },
        success: function () {
            form.success();
        },
        failure: function () {
            form.failure();
        }
    }
}();

$(function () {
    Form.init();
});