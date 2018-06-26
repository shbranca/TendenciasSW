var _app = typeof _app !== "undefined" ? _app : {};

// ----------
// Config
// ----------
_app.constants = {
    ajax: {
        message: {
            error: "Ocurrió un problema al procesar su consulta",
            success: "Tarea realizada satisfactoriamente"
        },
        status: {
            beforeSend: 0,
            success: 1,
            error: 2,
            complete: 3
        }
    },
    assistance: {
        assisted: {
            value: 1,
            text: "Asistido"
        },
        absence: {
            value: 0,
            text: "Falta"
        },
        late: {
            value: 2,
            text: "Tardanza"
        }
    },
    broadcastMedium: {
        internet: {
            value: 1,
            text: "Internet"
        },
        socialNetworks: {
            value: 2,
            text: "Redes Sociales"
        },
        familyAndFriends: {
            value: 3,
            text: "Familia y/o amigos"
        },
        other: {
            value: 4,
            text: "Otro"
        }
    },
    console: {
        message: {
            deprecatedNow: "Método deprecado. Será eliminado en el siguiente commit.",
            deprecatedSoon: "Método deprecado. Será eliminado en los próximos commits."
        }
    },
    date: {
        days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"]
    },
    finishedSecondaryEducation: {
        yes: {
            value: 1,
            text: "Sí"
        },
        notYet: {
            value: 2,
            text: "No, cursando 5° año"
        },
        anotherCase: {
            value: 3,
            text: "Otros casos"
        }
    },
    formats: {
        datepicker: "dd/mm/yyyy",
        momentJsDate: "DD-MM-YYYY"
    },
    genre: {
        female: {
            value: 2,
            text: "Femenino"
        },
        male: {
            value: 1,
            text: "Masculino"
        }
    },
    guid: {
        empty: "00000000-0000-0000-0000-000000000000"
    },
    maritalStatus: {
        single: {
            value: 1,
            text: "Soltero"
        },
        married: {
            value: 2,
            text: "Casado"
        },
        divorced: {
            value: 3,
            text: "Divorciado"
        },
        widowed: {
            value: 4,
            text: "Viudo"
        }
    },
    representativeType: {
        none: {
            value: 1,
            text: "Ninguno"
        },
        mother: {
            value: 2,
            text: "Madre"
        },
        father: {
            value: 3,
            text: "Padre"
        },
        other: {
            value: 4,
            text: "Otro"
        }
    },
    secondaryEducationType: {
        public: {
            value: 1,
            text: "Estatal"
        },
        private: {
            value: 2,
            text: "Particular"
        },
        parochial: {
            value: 3,
            text: "Parroquial"
        },
        other: {
            value: 4,
            text: "Otro"
        }
    },
    status: {
        active: 1,
        inactive: 0
    },
    swal: {
        title: {
            delete: "¿Desea eliminar el registro?"
        }
    },
    termStates: {
        inactive: {
            value: 0,
            text: "Inactivo"
        },
        active: {
            value: 1,
            text: "Activo"
        },
        finished: {
            value: 2,
            text: "Finalizado"
        }
    },
    request: {
        approved: {
            text: "Aceptado",
            value: 4
        },
        disapproved: {
            text: "No Procede",
            value: 5
        },
        inProcess: {
            text: "En Proceso",
            value: 3
        }
    },
    toastr: {
        message: {
            error: {
                create: "No se pudo crear el registro",
                delete: "No se pudo eliminar el registro",
                get: "No se pudo obtener el registro",
                update: "No se pudo actualizar el registro",
                task: "Ocurrió un problema al procesar su consulta"
            },
            success: {
                create: "Registro creado exitósamente",
                delete: "Registro eliminado exitósamente",
                update: "Registro actualizado exitósamente",
                task: "Tarea realizada satisfactoriamente"
            }
        },
        title: {
            error: "Error",
            success: "Éxito"
        }
    },
    url: {
        root: ""
    }
};

// ----------
// Defaults
// ----------

// ----------
// Datepicker
// ----------
$.fn.datepicker.dates.es = {
    clear: "Borrar",
    days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
    daysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    format: "dd/mm/yyyy",
    months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"],
    monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    monthsTitle: "Meses",
    today: "Hoy",
    weekStart: 1
};

$.fn.datepicker.defaults.autoclose = true;
$.fn.datepicker.defaults.language = "es";
$.fn.datepicker.defaults.templates = {
    leftArrow: "<i class=\"la la-angle-left\"></i>",
    rightArrow: "<i class=\"la la-angle-right\"></i>"
};
$.fn.datepicker.defaults.todayHighlight = true;

// ----------
// jQuery
// ----------
(function ($) {
    $.fn.addLoader = function () {
        this.addClass("m-loader m-loader--right m-loader--light").attr("disabled", true);
        return this;
    };

    $.fn.removeLoader = function () {
        this.removeClass("m-loader m-loader--right m-loader--light").attr("disabled", false);
        return this;
    };
})(jQuery);

// ----------
// jQuery AJAX
// ----------
$.ajaxSetup({
    headers: {
        "X-CSRF-TOKEN": $("meta[name=\"csrf-token\"]").attr("content")
    }
});

// ----------
// jQuery Validation
// ----------
$.extend($.validator.messages, {
    cifES: "Por favor, escriba un CIF válido.",
    creditcard: "Por favor, escriba un número de tarjeta válido.",
    date: "Por favor, escriba una fecha válida.",
    dateISO: "Por favor, escriba una fecha (ISO) válida.",
    digits: "Por favor, escriba sólo dígitos.",
    email: "Por favor, escriba un correo electrónico válido.",
    equalTo: "Por favor, escriba el mismo valor de nuevo.",
    extension: "Por favor, escriba un valor con una extensión permitida.",
    max: $.validator.format("Por favor, escriba un valor menor o igual a {0}."),
    maxlength: $.validator.format("Por favor, no escriba más de {0} caracteres."),
    min: $.validator.format("Por favor, escriba un valor mayor o igual a {0}."),
    minlength: $.validator.format("Por favor, no escriba menos de {0} caracteres."),
    nieES: "Por favor, escriba un NIE válido.",
    nifES: "Por favor, escriba un NIF válido.",
    number: "Por favor, escriba un número válido.",
    pattern: "Por favor, escriba un formato válido.",
    range: $.validator.format("Por favor, escriba un valor entre {0} y {1}."),
    rangelength: $.validator.format("Por favor, escriba un valor entre {0} y {1} caracteres."),
    remote: "Por favor, llene este campo.",
    required: "Este campo es obligatorio.",
    url: "Por favor, escriba una URL válida.",
    step: "Por favor, ingrese un número entero."
});

jQuery.validator.setDefaults({
    errorPlacement: function (error, element) {
        if (element.parent(".input-group").length) {
            error.insertAfter(element.parent()); // radio/checkbox?      
        }
        else if (element.parent(".m-input-icon").length) {
            error.insertAfter(element.parent());
        }
        else if (element.parent().parent(".m-radio-inline").length) {
            error.insertAfter(element.parent().parent());
        }
        else if (element.hasClass("m-select2")) {
            error.insertAfter(element.next("span")); // select2
        } else {
            error.insertAfter(element); // default
        }

    }
});

// ----------
// Markdown
// ----------
(function ($) {
    $.fn.markdown.messages["es"] = {
        "Bold": "Negrita",
        "Code": "Código",
        "emphasized text": "Texto Enfatizado",
        "enter image description here": "Ingrese una descripción de la imagen aquí",
        "enter image title here": "Ingrese un título para la imagen aquí",
        "enter link description here": "Ingrese una descripción del enlace aquí",
        "Heading": "Título",
        "heading text": "Texto de Cabecera",
        "Image": "Inserte una Imagen",
        "Insert Hyperlink": "Ingrese una URL",
        "Insert Image Hyperlink": "Inserta una URL para la imagen",
        "Italic": "Cursiva",
        "List": "Lista",
        "list text here": "Texto a listar aquí",
        "Ordered List": "Lista Enumerada",
        "Preview": "Previsualización",
        "Quote": "Cita",
        "strong text": "Texto Importante",
        "URL/Link": "URL/Enlace",
        "Unordered List": "Lista"
    };
})(jQuery);

$.fn.markdown.defaults.language = "es";

// ----------
// mDatatable
// ----------
$.fn.mDatatable.defaults = {
    data: {
        type: "remote",
        source: null,
        pageSize: 10,
        saveState: {
            cookie: !1, //!0 ver anterior
            webstorage: !0
        },
        serverPaging: !1, //!0 ver anterio
        serverFiltering: !1, //!0 ver anterior
        serverSorting: !1, //!0 ver anterior
        autoColumns: !1,
        attr: {
            rowProps: []
        }
    },
    layout: {
        theme: "default",
        class: "m-datatable--brand",//        class: "", // custom wrapper class
        scroll: !1,
        height: null,
        footer: !1,
        header: !0,
        smoothScroll: {
            scrollbarShown: !0
        },
        spinner: {
            overlayColor: "#000000",
            opacity: 0,
            type: "loader",
            state: "brand",
            message: !0
        },
        icons: {
            sort: {
                asc: "la la-arrow-up",
                desc: "la la-arrow-down"
            },
            pagination: {
                next: "la la-angle-right",
                prev: "la la-angle-left",
                first: "la la-angle-double-left",
                last: "la la-angle-double-right",
                more: "la la-ellipsis-h"
            },
            rowDetail: {
                expand: "fa fa-caret-down",
                collapse: "fa fa-caret-right"
            }
        }
    },
    sortable: !0,
    resizable: !1,
    filterable: !1,
    pagination: !0,
    editable: !1,
    columns: [],
    search: {
        input: $("#search"),
        onEnter: !1,
        delay: 400
    },
    rows: {
        callback: function () { },
        beforeTemplate: function () { },
        afterTemplate: function () { },
        autoHide: !1
    },
    toolbar: {
        layout: ["pagination", "info"],
        placement: ["bottom"],
        items: {
            pagination: {
                type: "default",
                pages: {
                    desktop: {
                        layout: "default",
                        pagesNumber: 6
                    },
                    tablet: {
                        layout: "default",
                        pagesNumber: 3
                    },
                    mobile: {
                        layout: "compact"
                    }
                },
                navigation: {
                    prev: !0,
                    next: !0,
                    first: !0,
                    last: !0
                },
                pageSizeSelect: [10, 20, 30, 50, 100]
            },
            info: !0
        }
    },
    translate: {
        records: {
            noRecords: "No se encontraron registros",
            processing: "Cargando..."
        },
        toolbar: {
            pagination: {
                items: {
                    default: {
                        first: "Primero",
                        last: "Último",
                        more: "Más páginas",
                        next: "Siguiente",
                        prev: "Anterior",
                        input: "Nro. página",
                        select: "Seleccionar tamaño de página"
                    },
                    info: "Viendo {{start}} - {{end}} de {{total}} registros"
                }
            }
        }
    },
    extensions: {}
};

// ----------
// Select2
// ----------
(function () {
    if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) {
        var e = jQuery.fn.select2.amd;

        return e.define("select2/i18n/es", [], function () {
            return {
                errorLoading: function () {
                    return "No se pudieron cargar los resultados";
                },
                inputTooLong: function (e) {
                    var t = e.input.length - e.maximum,
                        n = "Por favor, elimine " + t + " car";

                    return t == 1 ? n += "ácter" : n += "acteres", n;
                },
                inputTooShort: function (e) {
                    var t = e.minimum - e.input.length,
                        n = "Por favor, introduzca " + t + " car";

                    return t == 1 ? n += "ácter" : n += "acteres", n;
                },
                loadingMore: function () {
                    return "Cargando más resultados…";
                },
                maximumSelected: function (e) {
                    var t = "Sólo puede seleccionar " + e.maximum + " elemento";

                    return e.maximum != 1 && (t += "s"), t;
                },
                noResults: function () {
                    return "No se encontraron resultados";
                },
                searching: function () {
                    return "Buscando…";
                }
            };
        }), { define: e.define, require: e.require };
    }
})();

$.fn.select2.defaults.set("language", "es");
$.fn.select2.defaults.set("width", "100%");

// ----------
// SweetAlert2
// ----------
var swal = swal.mixin({
    allowOutsideClick: () => !swal.isLoading(),
    cancelButtonColor: "#e73d4a",
    cancelButtonText: "No",
    confirmButtonColor: "#27a4b0",
    confirmButtonText: "Sí",
    showCancelButton: false,
    showConfirmButton: true
});

// ----------
// Toastr
// ----------
toastr.options.closeButton = false;
toastr.options.progressBar = false;

// ----------
// Prototypes
// ----------

// ----------
// Array
// ----------
Object.defineProperty(Array.prototype, "proto", {
    value: function () {
        var self = this;
        var result = {
            copy: function () {
                var arr = self;
                var tmpArr = [];

                for (var i = 0; i < arr.length; i++) {
                    var arrItem = arr[i];

                    if (arrItem != null) {
                        if (
                            arrItem.constructor === Array ||
                            arrItem.constructor === Object
                        ) {
                            tmpArr[i] = arrItem.proto().copy();
                            continue;
                        } else if (arrItem.constructor === Date) {
                            tmpArr[i] = new Date(arrItem.getTime());
                            continue;
                        }
                    }

                    tmpArr[i] = arrItem;
                }

                return tmpArr;
            },
            merge: function () {
                var target = self;
                var sources = arguments;

                if (target == null) {
                    target = [];
                } else if (target.constructor !== Array) {
                    return target;
                }

                var arrTarget = target.proto().copy();

                for (var i = 0; i < sources.length; i++) {
                    var source = sources[i];

                    if (source == null) {
                        source = [];
                    } else if (source.constructor !== Array) {
                        continue;
                    }

                    var arrSource = source.proto().copy();

                    for (var j = 0; j < arrSource.length; j++) {
                        var arrSourceItem = arrSource[j];
                        var arrTargetItem = arrTarget[j];

                        if (arrTargetItem !== void 0) {
                            if (arrTargetItem == null && (arrSourceItem != null || arrSourceItem.constructor === Array)) {
                                arrTarget[j] = arrSourceItem;
                            } else if ((arrTargetItem != null || arrTargetItem.constructor === Array) && arrSourceItem == null) {
                                continue;
                            } else if (arrTargetItem.constructor === Array && arrSourceItem.constructor === Array) {
                                arrTarget[j] = arrTargetItem.concat(arrSourceItem);
                            } else if (arrTargetItem.constructor === Object && arrSourceItem.constructor === Object) {
                                arrTarget[j] = arrTargetItem.proto().merge(arrSourceItem);
                            } else if (arrTargetItem.constructor === Function && arrSourceItem.constructor === Function) {
                                arrTarget[j] = function () {
                                    arrTargetItem.apply(null, arguments);
                                    arrSourceItem.apply(null, arguments);
                                };
                            } else {
                                //TODO: Validate if it should replace or not
                                arrTarget[j] = arrSourceItem;
                            }
                        } else {
                            arrTarget.push(arrSourceItem);
                        }
                    }
                }

                return arrTarget;
            }
        };

        return result;
    },
    enumerable: false
});

// ----------
// Number
// ----------
Object.defineProperty(Number.prototype, "proto", {
    value: function (scale) {
        var self = this;
        var result = {
            round: function () {
                var num = self;
                var numString = num + "";
                var roundString = "";

                if (!numString.includes("e")) {
                    roundString = Math.round(num + "e+" + scale) + "e-" + scale;
                } else {
                    var numStrings = numString.split("e");
                    var numStringExponential = numStrings[1];
                    var numExponential = +numStringExponential;
                    var sign = "";

                    if (numExponential + scale > 0) {
                        sign = "+";
                    }

                    var numStringValue = numStrings[0];
                    var numValue = +numStringValue;
                    roundString = Math.round(numValue + "e" + sign + (numExponential + scale)) + "e-" + scale;
                }

                var round = +randomString;

                return round;
            },
            toRGB: function () {
                var num = self;
                var hash = num & 0x00FFFFFF;
                var hashBase = hash.toString(16);
                var rgb = "00000".substring(0, 6 - hashBase.length) + hashBase.toUpperCase();

                return rgb;
            }
        };

        return result;
    },
    enumerable: false
});

// ----------
// Object
// ----------
Object.defineProperty(Object.prototype, "proto", {
    value: function () {
        var self = this;
        var result = {
            copy: function () {
                var obj = self;
                var tmpObj = {};

                for (var key in obj) {
                    var objItem = obj[key];

                    if (objItem != null) {
                        if (
                            objItem.constructor === Array ||
                            objItem.constructor === Object
                        ) {
                            tmpObj[key] = objItem.proto().copy();
                            continue;
                        } else if (objItem.constructor === Date) {
                            tmpObj[key] = new Date(objItem.getTime());
                            continue;
                        }
                    }

                    tmpObj[key] = objItem;
                }

                return tmpObj;
            },
            encode: function () {
                var result = self;

                if (result) {
                    result = JSON.stringify(result);
                    result = window.btoa(result);
                }

                return result;
            },
            htmlElement: function (callback) {
                var elements = self;
                var element = null;

                switch (elements.constructor) {
                    case HTMLCollection:
                        for (element in elements) {
                            if (callback != null) {
                                callback(element);
                            } else {
                                break;
                            }
                        }

                        break;
                    case HTMLElement:
                        element = elements;
                        callback(element);

                        break;
                    case jQuery:
                        var elementsLength = elements.length;

                        for (var i = 0; i < elementsLength; i++) {
                            element = elements[i];

                            if (callback != null) {
                                callback(element);
                            } else {
                                break;
                            }
                        }

                        break;
                    default:
                        break;
                }

                return element;
            },
            isEmpty: function () {
                var obj = self;

                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        return false;
                    }
                }

                return obj === {};
            },
            merge: function () {
                var target = self;
                var sources = arguments;

                if (target == null) {
                    target = {};
                } else if (target.constructor !== Object) {
                    return target;
                }

                var objTarget = target.proto().copy();

                for (var i = 0; i < sources.length; i++) {
                    var source = sources[i];

                    if (source == null) {
                        source = {};
                    } else if (source.constructor !== Object) {
                        continue;
                    }

                    var objSource = source.proto().copy();

                    for (var key in objSource) {
                        var objSourceItem = objSource[key];

                        if (objTarget.hasOwnProperty(key)) {
                            var objTargetItem = objTarget[key];

                            if (objTargetItem == null && (objSourceItem != null || objSourceItem.constructor === Array)) {
                                objTarget[key] = objSourceItem;
                            } else if ((objTargetItem != null || objTargetItem.constructor === Array) && objSourceItem == null) {
                                continue;
                            } else if (objTargetItem.constructor === Array && objSourceItem.constructor === Array) {
                                objTarget[key] = objTargetItem.concat(objSourceItem);
                            } else if (objTargetItem.constructor === Object && objSourceItem.constructor === Object) {
                                objTarget[key] = objTargetItem.proto().merge(objSourceItem);
                            } else if (objTargetItem.constructor === Function && objSourceItem.constructor === Function) {
                                objTarget[key] = function () {
                                    objTargetItem.apply(null, arguments);
                                    objSourceItem.apply(null, arguments);
                                };
                            } else {
                                //TODO: Validate if it should replace or not
                                objTarget[key] = objSourceItem;
                            }
                        } else {
                            objTarget[key] = objSourceItem;
                        }
                    }
                }

                return objTarget;
            },
            tryGet: function (childs) {
                if (childs == null) {
                    return null;
                }

                var obj = self;
                var keys = childs.split(".");

                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];

                    if (obj[key] != null) {
                        obj = obj[key];
                    } else {
                        return null;
                    }
                }

                return obj;
            }
        };

        return result;
    },
    enumerable: false
});

// ----------
// String
// ----------
Object.defineProperty(String.prototype, "proto", {
    value: function () {
        var self = this;
        var result = {
            decode: function () {
                var result = self;

                if (result) {
                    result = window.atob(result);
                    result = JSON.parse(result);
                }

                return result;
            },
            format: function () {
                var str = self;

                for (argument in arguments) {
                    str = str.replace("{" + argument + "}", arguments[argument]);
                }

                return str;
            },
            hash: function () {
                var str = self;
                var hash = 0;

                for (var i = 0; i < str.length; ++i) {
                    hash = str.charCodeAt(i) + ((hash << 5) - hash);
                }

                return hash;
            },
            toRGB: function () {
                var str = self;
                var hash = str.proto().hash();
                var rgb = hash.proto().toRGB();

                return rgb;
            },
            parseURL: function () {
                var str = self;
                var url = window.location.protocol;
                url += "//";
                url += window.location.host;
                url += _app.constants.url.root;
                url += str;

                return url;
            },
            parseBaseURL: function (baseUrl) {
                var str = self;
                var url = window.location.protocol;
                url += "//";
                url += window.location.host;
                url += baseUrl;
                url += str;

                return url;
            }
        };

        return result;
    },
    enumerable: false
});



// Full Calendar
/*var loadCalendarComponent = function (parentSelector, urlResource) {
	$(parentSelector).load("/ViewComponent/Schedule", function (e) {

        $("#m_calendar").fullCalendarExtended();
	});
};*/

/* TODO: Jeffrey esto a tu vista porfa */

/*var _app = {
    datatable: {
        all: function () {
            console.error(_app.constants.console.deprecatedNow);
        },
        multiple: function (keys) {
            console.error(_app.constants.console.deprecatedNow);
        },
        single: function (key) {
            console.error(_app.constants.console.deprecatedNow);
        }
    },
    form: {
        async: {
            send: function (element, event, obj) {
                console.error(_app.constants.console.deprecatedNow);
            }
        },
        fill: function (elementId, data, action, url) {
            console.error(_app.constants.console.deprecatedNow);
        },
        reset: function (elementId) {
            console.error(_app.constants.console.deprecatedNow);
        }
    },
    url: {
        parse: function (url) {
            console.error(_app.constants.console.deprecatedNow);
        }
    },
};*/
