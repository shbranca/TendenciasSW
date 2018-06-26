// ----------
// Constants
// ----------
var constants = {
    ajax: {
        message: {
            error: "Ocurrió un problema en el servidor",
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
            text: 'Asistido'
        },
        absence: {
            value: 0,
            text: 'Falta'
        },
        late: {
            value: 2,
            text: 'Tardanza'
        }
    },
    console: {
        message: {
            deprecatedNow: 'Método deprecado. Será eliminado en el siguiente commit.',
            deprecatedSoon: 'Método deprecado. Será eliminado en los próximos commits.'
        }
    },
    date: {
        days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"]
    },
    guid: {
        empty: '00000000-0000-0000-0000-000000000000'
    },
    toastr: {
        message: {
            error: {
                get: 'No se pudo obtener los registros',
                create: 'No se pudo crear el registro',
                update: 'No se pudo actualizar el registro',
                delete: 'No se pudo eliminar el registro'
            },
            success: {
                create: 'Registro creado exitósamente',
                update: 'Registro actualizado exitósamente',
                delete: 'Registro eliminado exitósamente'
            }
        },
        title: {
            error: 'Error',
            success: 'Éxito'
        }
    },
    status: {
        active: 1,
        inactive: 0
    }
};

// ----------
// Datepicker
// ----------
!function (a) {
    a.fn.datepicker.dates.es = {
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
}(jQuery);

$.fn.datepicker.defaults.autoclose = true;
$.fn.datepicker.defaults.language = "es";
$.fn.datepicker.defaults.templates = {
    leftArrow: "<i class=\"la la-angle-left\"></i>",
    rightArrow: "<i class=\"la la-angle-right\"></i>"
};
$.fn.datepicker.defaults.todayHighlight = true;

// ----------
// jQuery Custom
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

    $.fn.fullCalendar2 = function (settings) {
        var defaultSettings = {
            allDaySlot: false,
            aspectRatio: 2,
            businessHours: {
                dow: [1, 2, 3, 4, 5, 6],
                end: "24:00",
                start: "07:00"
            },
            columnFormat: "dddd",
            contentHeight: 600,
            dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            defaultView: "agendaWeek",
            editable: false,
            eventRender: function (event, element) {
                if (element.hasClass("fc-day-grid-event")) {
                    element.data("content", event.description);
                    element.data("placement", "top");
                    mApp.initPopover(element);
                } else if (element.hasClass("fc-time-grid-event")) {
                    element.find(".fc-title").append("<div class=\"fc-description\">" + event.description + "</div>");
                } else if (element.find(".fc-list-item-title").length !== 0) {
                    element.find(".fc-list-item-title").append("<div class=\"fc-description\">" + event.description + "</div>");
                }

                var fc_title = element.find(".fc-title").clone().children().remove().end().text();

                element.css("border-color", "#" + fc_title.proto().toRGB()).css("border-width", "2px");
            },
            events: {
                className: "m-fc-event--primary",
                error: function () {
                    toastr.error("Ocurrió un problema con el servidor", "Error");
                },
                url: null
            },
            firstDay: 1,
            header: false,
            height: 600,
            locale: "es",
            maxTime: "24:00:00",
            minTime: "07:00:00",
            monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"],
            slotDuration: "00:30:00",
            timeFormat: "h(:mm)A"
        };
        var tmpSettings = defaultSettings.merge(settings);

        this.fullCalendar(tmpSettings);
    }
})(jQuery);

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
    url: "Por favor, escriba una URL válida."
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
// mDatatable
// ----------
$.fn.mDatatable.defaults = {
    data: {
        type: "remote",
        pageSize: 10,
        saveState: {
            cookie: true,
            webstorage: true
        }
    },
    layout: {
        class: "", // custom wrapper class
        footer: false, // display/hide footer
        scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed
        theme: "default" // datatable theme
    },
    pagination: true,
    search: {
        input: $("#search")
    },
    sortable: true, // column sorting,
    toolbar: {
        items: { // toolbar items
            info: false,
            pagination: { // pagination
                pageSizeSelect: [10, 20, 30, 50, 100] // page size select
            }
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
                        select: "Seleccionar tamaño de página"
                    },
                    info: "Viendo {{start}} - {{end}} de {{total}} registros"
                }
            }
        }
    }
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
    cancelButtonColor: "#e73d4a",
    cancelButtonText: "No",
    confirmButtonColor: "#27a4b0",
    confirmButtonText: "Sí",
    showCancelButton: false,
    showConfirmButton: true
});

// ----------
// jQueryValidator
// ----------


























// Full Calendar
var loadCalendarComponent = function (parentSelector, urlResource) {
	$(parentSelector).load("/ViewComponent/Schedule", function (e) {

        $("#m_calendar").fullCalendar();
	});
};





















// Round
function roundNumber(num, scale) {
	if (!("" + num).includes("e")) {
		return +(Math.round(num + "e+" + scale) + "e-" + scale);
	} else {
		var arr = ("" + num).split("e");
		var sig = ""
		if (+arr[1] + scale > 0) {
			sig = "+";
		}
		return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
	}
}

/*function showSuccessNotification() {
    toastr.success("Tarea completada satisfactoriamente", "Éxito");
}

function showErrorNotification() {
    toastr.error("Ocurrió un problema con su solicitud", "Error");
}*/

var _app = {
    dom: {
        replace: function (elementName, nodeType, data) {
            var element = $(elementName);

            if (element != null) {
                for (var i = 0; i < element.length; i++) {
                    var childElement = element[i];
                    var childNodes = childElement.childNodes;

                    for (var j = 0; j < childNodes.length; j++) {
                        var childNode = childNodes[0];

                        if (childNode.nodeType == nodeType) {
                            //childNode.data = html;
                            childNode.nodeValue = html;
                            //childNode.textContent = html;
                            //childNode.wholeText = html;
                        }
                    }
                }
            }
        }
    },
    form: {
        async: {
            send: function (element, event, obj) {
                var formAsyncSettings = this.settings.proto().merge(obj.proto().tryGet('settings'));

                event.preventDefault();
                $.ajax(formAsyncSettings);
            },
            settings: {
                type: "POST"
            }
        },
        fill: function (elementId, data, action, url) {
            var form = document.getElementById(elementId);

            form.setAttribute('data-action', action);
            form.setAttribute('data-url', url);

            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    var value = data[key];

                    if (value != null) {
                        form[key].value = value;
                    }
                }
            }
        },
        loader: {
            hide: function (element) {
                if (element.constructor === RadioNodeList) {
                    for (var i = 0; i < element.length; i++) {
                        element[i].classList.remove('m-loader', 'm-loader--light', 'm-loader--right');
                        element[i].disabled = false;
                    }
                } else {
                    element.classList.remove('m-loader', 'm-loader--light', 'm-loader--right');
                    element.disabled = false;
                }
            },
            show: function (element) {
                if (element.constructor === RadioNodeList) {
                    for (var i = 0; i < element.length; i++) {
                        element[i].classList.add('m-loader', 'm-loader--light', 'm-loader--right');
                        element[i].disabled = true;
                    }
                } else {
                    element.classList.add('m-loader', 'm-loader--light', 'm-loader--right');
                    element.disabled = true;
                }
            }
        },
        reset: function (elementId) {
            var form = document.getElementById(elementId);

            form.removeAttribute('data-url');
            form.reset();

            $('#' + elementId + ', .select2').val('').trigger('change');
        }
    },
    select2: {
        get: {
            all: function (callback) {
                for (var key in _app.select2.list) {
                    this.single(key, callback);
                }
            },
            multiple: function (keys, callback) {
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];

                    if (_app.select2.list.hasOwnProperty(key)) {
                        this.single(key, callback);
                    }
                }
            },
            single: function (key, callback) {
                var element = _app.select2.list[key];

                callback(key, element);
            }
        },
        list: {},
        load: {
            all: function () {
                for (var key in _app.select2.elements) {
                    this.single(key);
                }
            },
            multiple: function (keys) {
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];

                    if (_app.select2.elements.hasOwnProperty(key)) {
                        this.single(key);
                    }
                }
            },
            single: function (key) {
                var element = _app.select2.elements[key];
                var select2Settings = _app.select2.settings.proto().merge(element.proto().tryGet('settings'));
                var selector = $(element.selector);

                selector.select2(select2Settings);

                var handler = selector;
                _app.select2.list[key] = handler;
            }
        },
        settings: {
            data: {},
            minimumResultsForSearch: -1
        },
        unload: {
            all: function () {
                for (var key in _app.select2.list) {
                    this.single(key);
                }
            },
            multiple: function (keys) {
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];

                    if (_app.select2.list.hasOwnProperty(key)) {
                        this.single(key);
                    }
                }
            },
            single: function (key) {
                var element = _app.select2.list[key];

                if (element != null) {
                    var selector = $(element.selector);

                    if (selector.hasClass('select2-hidden-accessible')) {
                        selector.select2('destroy');

                        // Comment this code below for an interesting Kirby offline effect (absorbing options)
                        selector.html('');
                    }
                }
            }
        }
    },
    validate: {
        get: {
            all: function (callback) {
                for (var key in _app.validate.list) {
                    this.single(key, callback);
                }
            },
            multiple: function (keys, callback) {
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];

                    if (_app.validate.list.hasOwnProperty(key)) {
                        this.single(key, callback);
                    }
                }
            },
            single: function (key, callback) {
                var handler = _app.validate.list[key];

                callback(key, handler);
            }
        },
        list: {},
        load: {
            all: function () {
                for (var key in _app.validate.elements) {
                    this.single(key);
                }
            },
            multiple: function (keys) {
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];

                    if (_app.validate.elements.hasOwnProperty(key)) {
                        this.single(key);
                    }
                }
            },
            single: function (key) {
                var element = _app.validate.elements[key];
                var validateSettings = _app.validate.settings.proto().merge(element.settings);

                var handler = $(element.selector).validate(validateSettings);
                _app.validate.list[key] = handler;
            }
        },
        resetForm: {
            all: function () {
                for (var key in _app.validate.list) {
                    this.single(key);
                }
            },
            multiple: function (keys) {
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];

                    if (_app.validate.list.hasOwnProperty(key)) {
                        this.single(key);
                    }
                }
            },
            single: function (key) {
                var handler = _app.validate.list[key];

                handler.resetForm();
            }
        },
        settings: {}
	}
};

Object.defineProperty(Array.prototype, 'proto', {
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

                    for (var i = 0; i < arrSource.length; i++) {
                        var arrSourceItem = arrSource[i];
                        var arrTargetItem = arrTarget[i];

                        if (arrTargetItem !== void 0) {
                            if (arrTargetItem == null && (arrSourceItem != null || arrSourceItem.constructor === Array)) {
                                arrTarget[i] = arrSourceItem;
                            } else if ((arrTargetItem != null || arrTargetItem.constructor === Array) && arrSourceItem == null) {
                                continue;
                            } else if (arrTargetItem.constructor === Array && arrSourceItem.constructor === Array) {
                                arrTarget[i] = arrTargetItem.concat(arrSourceItem);
                            } else if (arrTargetItem.constructor === Object && arrSourceItem.constructor === Object) {
                                arrTarget[i] = arrTargetItem.proto().merge(arrSourceItem);
                            } else if (arrTargetItem.constructor === Function && arrSourceItem.constructor === Function) {
                                arrTarget[i] = function () {
                                    arrTargetItem.apply(null, arguments);
                                    arrSourceItem.apply(null, arguments);
                                };
                            } else {
                                //TODO: Validate if it should replace or not
                                arrTarget[i] = arrSourceItem;
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

Object.defineProperty(Int32Array.prototype, 'proto', {
    value: function () {
        var self = this;
        var result = {
            toRGB: function () {
                var number = self;
                var hash = (number & 0x00FFFFFF);
                var hashBase = hash.toString(16);
                var rgb = "00000".substring(0, 6 - hashBase.length) + hashBase.toUpperCase();

                return rgb;
            }
        };

        return result;
    },
    enumerable: false
});

Object.defineProperty(Object.prototype, 'proto', {
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
                var keys = childs.split('.');

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

Object.defineProperty(String.prototype, 'proto', {
    value: function () {
        var self = this;
        var result = {
            decode: function () {
                var result = self;

                if(result) {
                    result = window.atob(result);
                    result = JSON.parse(result);
                }

                return result;
            },
            format: function () {
                var str = self;

                for (argument in arguments) {
                    str = str.replace('{' + argument + '}', arguments[argument]);
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
            }
        };

        return result;
    },
    enumerable: false
});

function post(path, params, method) {
    method = method || "post";
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    var token = document.createElement("input");
    token.setAttribute("type", "hidden");
    token.setAttribute("name", "_token");
    token.setAttribute("value", $('meta[name="csrf-token"]').attr('content'));
    form.appendChild(token);

    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }
    document.body.appendChild(form);
    form.submit();
}
