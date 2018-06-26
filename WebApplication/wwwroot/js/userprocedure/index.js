var procedure = (function () {
    var result = {
        ajax: {
            list: {},
            load: {
                request: function (element, event) {
                    var formElements = element.elements;

                    procedure.ajax.list["procedure-ajax-request"] = $.ajax({
                        data: {
                            ProcedureId: formElements["ProcedureId"].value,
                            Comment: formElements["Comment"].value
                        },
                        type: element.method,
                        url: element.action,
                        beforeSend: function (jqXHR, settings) {
                            $(element).addLoader();
                        },
                        complete: function (jqXHR, textStatus) {
                            $(element).removeLoader();
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            toastr.error(_app.constants.toastr.message.error.create, _app.constants.toastr.title.error);
                        },
                        success: function (data, textStatus, jqXHR) {
                            _app.modules.form.reset({
                                element: element
                            });
                            userProcedure.datatable.list["user-procedure-datatable-get"].reload();
                            procedure.modal.list["procedure-modal-request"].modal("hide");
                            toastr.success(_app.constants.toastr.message.success.create, _app.constants.toastr.title.success);
                        }
                    });
                }
            }
        },
        datatable: {
            list: {},
            load: {
                get: function () {
                    procedure.datatable.list["procedure-datatable-get"] = $("#procedure-datatable-get").mDatatable({
                        data: {
                            source: {
                                read: {
                                    method: "GET",
                                    url: "/tramites/get"
                                }
                            }
                        },
                        columns: [
                            {
                                field: "name",
                                title: "Nombre del Trámite"
                            },
                            {
                                field: "duration",
                                title: "Duración",
                                template: function (row) {
                                    var template = "";
                                    template += row.duration;
                                    template += row.duration !== 1 ? " días" : " día";

                                    return template;
                                }
                            },
                            {
                                field: "cost",
                                title: "Costo",
                                template: function (row) {
                                    var template = "";
                                    template += "S/. ";
                                    template += row.cost.toFixed(2);

                                    return template;
                                }
                            },
                            {
                                field: "options",
                                title: "Opciones",
                                sortable: false,
                                filterable: false,
                                template: function (row) {
                                    var template = "";
                                    template += "<button class=\"btn btn-primary btn-sm m-btn m-btn--icon\" onclick=\"procedure.modal.load.request(this, event, '";
                                    template += row.proto().encode();
                                    template += "')\"><span><i class=\"la la-book\"></i><span> Solicitar </span></span></button> ";

                                    return template;
                                }
                            }
                        ]
                    });
                }
            }
        },
        modal: {
            list: {},
            load: {
                request: function (element, event, data) {
                    var procedureModalRequestForm = document.getElementById("procedure-modal-request-form");
                    data = data.proto().decode();

                    _app.modules.form.reset({
                        element: procedureModalRequestForm
                    });
                    _app.modules.form.fill({
                        element: procedureModalRequestForm,
                        data: {
                            ProcedureId: data.id
                        }
                    });

                    procedure.modal.list["procedure-modal-request"] = $("#procedure-modal-request").modal("show");
                }
            }
        },
        validate: {
            list: {},
            load: {
                request: function () {
                    procedure.validate.list["procedure-modal-request-form"] = $("#procedure-modal-request-form").validate({
                        submitHandler: function (form, event) {
                            event.preventDefault();
                            procedure.ajax.load.request(form, event);
                        }
                    });
                }
            }
        }
    };

    return result;
})();

var userProcedure = (function () {
    var result = {
        datatable: {
            list: {},
            load: {
                get: function () {
                    userProcedure.datatable.list["user-procedure-datatable-get"] = $("#user-procedure-datatable-get").mDatatable({
                        data: {
                            source: {
                                read: {
                                    method: "GET",
                                    url: "/tramites/usuarios/get"
                                }
                            }
                        },
                        columns: [
                            {
                                field: "procedure.name",
                                title: "Nombre del Trámite"
                            },
                            {
                                field: "status",
                                title: "Estado",
                                template: function (row) {
                                    var template = "";
                                    template += userProcedureStatusValues[row.status];

                                    return template;
                                }
                            },
                            {
                                field: "total",
                                title: "Total",
                                template: function (row) {
                                    var template = "";
                                    template += "S/. ";
                                    template += row.total.toFixed(2);

                                    return template;
                                }
                            },
                            {
                                field: "paidAmount",
                                title: "Monto Pagado",
                                template: function (row) {
                                    var template = "";
                                    template += "S/. ";
                                    template += row.paidAmount.toFixed(2);

                                    return template;
                                }
                            },
                            {
                                field: "createdAt",
                                title: "Fecha de Solicitud"
                            }
                        ]
                    });
                }
            }
        }
    };

    return result;
})();

window.onload = function () {
    procedure.datatable.load.get();
    procedure.validate.load.request();
    userProcedure.datatable.load.get();

    $(".nav-link.m-tabs__link").on("shown.bs.tab", function (event) {
        procedure.datatable.list["procedure-datatable-get"].adjustCellsWidth();
        userProcedure.datatable.list["user-procedure-datatable-get"].adjustCellsWidth();
    });
};
