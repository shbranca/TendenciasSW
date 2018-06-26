var SurveyTable = function () {
    var loadData = function (id) {
        $.ajax({
            url: ("/coach/encuestas/get/" + id).proto().parseURL(),
            type: "GET",
            data: {
                id: id
            },
            success: function (result) {
                $("#Name").val(result.name);
                $("#PublicationDate").val(result.publicationDate);
                $("#FinishDate").val(result.finishDate);
                $("#Code").val(result.code);
                $("#Description").val(result.description);
            },
            error: function () {
                toastr.error("Error al cargar la encuesta", _app.constants.toastr.title.error);
            }
        });
    };

    var loadQuestions = function (id) {
        $.ajax({
            url: ("/coach/encuestas/preguntas/get/" + id).proto().parseURL(),
            type: "GET",
            data: {
                id: id
            },
            success: function (result) {
                var div = "";
                if (result.length > 0) {
                    for (var i = 0; i < result.length; i++) {
                        if (i % 2 === 0) {
                            div += "<div class=\"row\">";
                            div += "    <div class=\"col-md-6\">";
                            div += "    <div class=\"form-group m-form__group m--margin-bottom-25\">";
                            div += "        <label>" + (i + 1) + ".- " + result[i].description + "</label>";
                            div += "        <div style=\"float: right;\">";
                            div += '            <a style=\"color:#1b76d6;cursor: pointer;\" class=\"edit\" data-id="' + result[i].id + '"><i class=\"fa fa-pencil-square-o\"></i></a>';
                            div += '            <a style=\"color:#EC6248;cursor: pointer;\" class=\"delete\" data-id="' + result[i].id + '"><i class=\"fa fa-trash-o\"></i></a>';
                            div += "        </div> ";
                            if (result[i].type === 0) {
                                div += "<input class=\"form-control m-input col-md-12\" value=\"\" disabled=\"disabled\">";
                            }
                            else if (result[i].type === 1) {
                                if (result[i].answers !== null && result[i].answers.length > 0) {
                                    div += "<div class=\"m-radio-inline\">";
                                    for (var j = 0; j < result[i].answers.length; j++) {
                                        div += "<label class=\"m-radio\">";
                                        div += "    <input type=\"radio\" disabled=\"disabled\">" + result[i].answers[j].description;
                                        div += "    <span></span>";
                                        div += "</label>";
                                    }
                                    div += "</div>";
                                }
                            }
                            else {
                                if (result[i].answers !== null && result[i].answers.length > 0) {
                                    div += "<div class=\"m-checkbox-inline\">";
                                    for (var j = 0; j < result[i].answers.length; j++) {
                                        div += "<label class=\"m-checkbox\">";
                                        div += "    <input type=\"checkbox\" disabled=\"disabled\">" + result[i].answers[j].description;
                                        div += "    <span></span>";
                                        div += "</label>";
                                    }
                                    div += "</div>";
                                }
                            }
                            div += "    </div>";
                            div += "    </div>";
                            if (i + 1 === result.length)
                                div += "</div>";
                        }
                        else {
                            div += "    <div class=\"col-md-6\">";
                            div += "    <div class=\"form-group m-form__group m--margin-bottom-25\">";
                            div += "        <label>" + (i + 1) + ".- " + result[i].description + "</label>";
                            div += "        <div style=\"float: right;\">";
                            div += '            <a style=\"color:#1b76d6;cursor: pointer;\" class=\"edit\" data-id="' + result[i].id + '"><i class=\"fa fa-pencil-square-o\"></i></a>';
                            div += '            <a style=\"color:#EC6248;cursor: pointer;\" class=\"delete\" data-id="' + result[i].id + '"><i class=\"fa fa-trash-o\"></i></a>';
                            div += "        </div> ";
                            if (result[i].type === 0) {
                                div += "<input class=\"form-control m-input col-md-12\" value=\"\" disabled=\"disabled\">";
                            }
                            else if (result[i].type === 1) {
                                if (result[i].answers !== null && result[i].answers.length > 0) {
                                    div += "<div class=\"m-radio-inline\">";
                                    for (var j = 0; j < result[i].answers.length; j++) {
                                        div += "<label class=\"m-radio\">";
                                        div += "    <input type=\"radio\" disabled=\"disabled\">" + result[i].answers[j].description;
                                        div += "    <span></span>";
                                        div += "</label>";
                                    }
                                    div += "</div>";
                                }
                            }
                            else {
                                if (result[i].answers !== null && result[i].answers.length > 0) {
                                    div += "<div class=\"m-checkbox-inline\">";
                                    for (var j = 0; j < result[i].answers.length; j++) {
                                        div += "<label class=\"m-checkbox\">";
                                        div += "    <input type=\"checkbox\" disabled=\"disabled\">" + result[i].answers[j].description;
                                        div += "    <span></span>";
                                        div += "</label>";
                                    }
                                    div += "</div>";
                                }
                            }
                            div += "    </div>";
                            div += "    </div>";
                            div += "</div>";
                        }
                    }
                }
                document.getElementById("questions").innerHTML = div;

                $(".delete").click(function () {
                    deleteConfirmation($(this).data("id"));
                });
                $(".edit").click(function () {
                    loadQuestion($(this).data("id"));
                });
            },
            error: function () {
                toastr.error("Error al cargar las preguntas", _app.constants.toastr.title.error);
            }
        });
    };

    var saveData = function (id) {
        $.ajax({
            url: "/coach/encuestas/editar/post",
            type: "POST",
            data: {
                id: id,
                name: $("#Name").val(),
                publicationDate: $("#PublicationDate").val(),
                finishDate: $("#FinishDate").val(),
                code: $("#Code").val(),
                description: $("#Description").val()
            },
            success: function () {
                toastr.success(_app.constants.toastr.message.success.task, _app.constants.toastr.title.success);
            },
            error: function () {
                toastr.error("No se pudo actualizar la información", _app.constants.toastr.title.error);
            }
        });
    };

    var addQuestion = function (id) {
        var answers = [];
        var elements = document.getElementsByClassName("answer");
        var ids = document.getElementsByClassName("answerId");
        if (elements.length < 2 && parseInt($('#Type').val()) !== 0) {
            toastr.error("Agregue por lo menos dos respuestas", _app.constants.toastr.title.error);
            return;
        }

        if (parseInt($('#Type').val()) !== 0) {
            for (var i = 0; i < elements.length; i++) {
                if (elements[i].value === "") {
                    toastr.error("Campos vacíos", _app.constants.toastr.title.error);
                    return;
                }
                var answer = { description: elements[i].value, id: ids[i].value };
                answers.push(answer);
            }
        }
        $.ajax({
            url: "/coach/encuestas/registrar/pregunta/post",
            type: "POST",
            data: {
                id: $("#questionId").val(),
                surveyId: id,
                type: parseInt($('#Type').val()),
                description: $("#qDescription").val(),
                answers: answers
            },
            beforeSend: function () {
                DefaultAjaxFunctions.beginAjaxCall();
            },
            success: function () {
                $("#question_modal").modal("hide");
                $('#Type').val(0);
                $('#qDescription').val("");
                document.getElementById("question-answers").innerHTML = "";
                toastr.success(_app.constants.toastr.message.success.task, _app.constants.toastr.title.success);
            },
            error: function () {
                toastr.error("No se puedo agregar la pregunta", _app.constants.toastr.title.error);
            },
            complete: function () {
                loadQuestions(id);
                DefaultAjaxFunctions.endAjaxCall();
            }
        });
    };

    var deleteConfirmation = function (id) {
        swal({
            title: "¿Está seguro?",
            text: "La pregunta será eliminada permanentemente",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, eliminarla",
            confirmButtonClass: "btn btn-danger m-btn m-btn--custom",
            cancelButtonText: "Cancelar"
        }).then(function (result) {
            if (result.value) {
                $.ajax({
                    url: "/admin/encuestas/preguntas/eliminar",
                    type: "POST",
                    data: {
                        id: id
                    },
                    success: function () {
                        loadQuestions(window.location.href.split("/")[6]);
                        toastr.success(_app.constants.toastr.message.success.task, _app.constants.toastr.title.success);
                    },
                    error: function () {
                        toastr.error("La pregunta tiene información relacionada", _app.constants.toastr.title.error);
                    }
                });
            }
        });
    };

    var loadQuestion = function (id) {
        $.ajax({
            url: ("/coach/encuestas/pregunta/get/" + id).proto().parseURL(),
            type: "GET",
            data: {
                id: id
            },
            success: function (result) {
                $("#questionId").val(result.id);
                $("#question_modal").modal("show");
                $('#Type').val(result.type);
                $('#qDescription').val(result.description);
                document.getElementById("question-answers").innerHTML = "";
                if (result.type !== 0) {
                    $("#question-text").css("display", "none");
                    $("#question-multiple").css("display", "block");
                    $("#question-answers").css("display", "block");
                    for (var i = 0; i < result.answers.length; i++) {
                        var htmldata = '<div class="form-group col-lg-12" style="display:flex;"><input class="answerId" value="' + result.answers[i].id + '" hidden/><input class="form-control m-input answer" style="margin-right: 10px;" required value="' + result.answers[i].description + '"><button class="btn btn-danger btn-sm m-btn--icon delete-answer" type="button" onclick="this.parentNode.outerHTML = \'\';"><span><i class="la la-trash"></i></span></button></div>';
                        var e = document.createElement('div');
                        e.innerHTML = htmldata;
                        document.getElementById("question-answers").appendChild(e.firstChild);
                    }
                }
                else {
                    $("#question-text").css("display", "block");
                    $("#question-multiple").css("display", "none");
                    $("#question-answers").css("display", "none");
                }
            },
            error: function () {
                toastr.error("Error al cargar la pregunta", _app.constants.toastr.title.error);
            }
        });
    };
    var initFormDatepickers = function () {
        $("#PublicationDate").datepicker()
            .on("changeDate", function (e) {
                $("#FinishDate").datepicker("setStartDate", e.date);
            });
        $("#FinishDate").datepicker()
            .on("changeDate", function (e) {
                $("#PublicationDate").datepicker("setEndDate", e.date);
            });
    };
    return {
        init: function () {
            var id = window.location.href.split("/")[6];
            console.log(id);
            initFormDatepickers();
            loadData(id);
            loadQuestions(id);

            $('#Type').on('change', function () {
                switch (this.value) {
                    case "0": $("#question-text").css("display", "block");
                        $("#question-multiple").css("display", "none");
                        $("#question-answers").css("display", "none"); break;
                    case "1": $("#question-text").css("display", "none");
                        $("#question-multiple").css("display", "block");
                        $("#question-answers").css("display", "block"); break;
                    case "2": $("#question-text").css("display", "none");
                        $("#question-multiple").css("display", "block");
                        $("#question-answers").css("display", "block"); break;
                }
            });
            $("#add-answer").click(function () {
                var htmldata = '<div class="form-group col-lg-12" style="display:flex;"><input class="answerId" value="" hidden/><input class="form-control m-input answer" style="margin-right: 10px;" required><button class="btn btn-danger btn-sm m-btn--icon delete-answer" type="button" onclick="this.parentNode.outerHTML = \'\';"><span><i class="la la-trash"></i></span></button></div>';
                var e = document.createElement('div');
                e.innerHTML = htmldata;
                document.getElementById("question-answers").appendChild(e.firstChild);
            });

            $("#question_modal").on("hidden.bs.modal",
                function () {
                    $("#questionId").val("");
                    $("#qDescription").val("");
                    $("#Type").val(0);
                });

            $(".back").click(function () {
                window.location = '/admin/encuestas';
            });
            $(".save").click(function () {
                saveData(id);
            });
            $(".add").click(function () {
                addQuestion(id);
            });
        }
    };
}();

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
        $("#question_modal").modal("hide");
        toastr.success(_app.constants.toastr.message.success.task, _app.constants.toastr.title.success);
    };
    var createFailure = function (e) {
        if (e.responseText !== null && e.responseText !== "") $("#create_msg_txt").html(e.responseText);
        else $("#create_msg_txt").html(_app.constant.ajax.message.error);

        $("#create_msg").removeClass("m--hide").show();
    };
    var editFailure = function (e) {
        if (e.responseText !== null && e.responseText !== "") $("#edit_msg_txt").html(e.responseText);
        else $("#edit_msg_txt").html("asdasd");

        $("#edit_msg").removeClass("m--hide").show();
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
        },
        editFailure: function (e) {
            editFailure(e);
        }
    };
}();

jQuery(document).ready(function () {
    SurveyTable.init();
});