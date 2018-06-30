    
var sendAnswer = (function () {
    var private = {
        ajax: {
            objects: {}
        }
    }
    var events = {
        init: function () {
            $(".add").on('click', function () {
                var dataSend = new Array();
                var elements = document.getElementById("submit-form").elements;
                for (var i = 0; i < elements.length; i++) { 
                    if ($(elements[i]).attr('type') == "text")
                    {
                        console.log($(elements[i]).val());
                        let option = {
                            QuestionId: $(elements[i]).data('questionid'),
                            Description: $(elements[i]).val()
                        };
                        dataSend.push(option);
                    }

                    if ($(elements[i]).prop('checked'))
                    {
                        let option = {
                            QuestionId: $(elements[i]).data('questionid'),
                            AnswerId: $(elements[i]).val(), 
                        };
                        dataSend.push(option);
                    }
                    
                } 
                var SurveyId = $("#SurveyId").val();
                $.ajax({
                    url: "/atleta/encuestas/agregar-respuesta",
                    type: 'POST',
                    data: {
                        model: dataSend,
                        surveyId: SurveyId
                    },
                    success: function () {
                        toastr.success(_app.constants.toastr.message.success.task, _app.constants.toastr.title.success);
                    },
                    error: function () {
                        toastr.error(_app.constants.toastr.message.error.create,"Solo se puede responder la encuesta una vez");
                    }
                }); 

            });
        }
    }

    return {
        init: function () {
            events.init();
        }
    }
}());

var DefaultAjaxFunctions = function () {
    var beginAjaxCall = function () { 
        $(".btn-submit").each(function (index, element) { 
            $(this).addLoader();
        });
    };
    var endAjaxCall = function () {
        $(".btn-submit").each(function (index, element) {
            $(this).removeLoader();
        });
    };
    var ajaxSuccess = function () {   
        toastr.success(_app.constants.toastr.message.success.task, _app.constants.toastr.title.success);
    };
    var createFailure = function (e) {
        toastr.success(_app.constants.toastr.message.error.create, _app.constants.toastr.title.error);
    };

    return {
        beginAjaxCall: function () {
            beginAjaxCall();
        },
        endAjaxCall: function () {
            endAjaxCall();
        },
        ajaxSuccess: function () {
            ajaxSuccess();
        },
        createFailure: function (e) {
            createFailure(e);
        }
    };
}();

$(function () {
    sendAnswer.init();
});