var _app = (typeof _app !== "undefined") ? _app : {};
_app.modules = (typeof _app.modules !== "undefined") ? _app.modules : {};

_app.modules.select = {
    fill: function (options) {
        options.data = options.data || {};
        options.name = options.name || "name";
        options.nullable = options.nullable || false;
        options.value = options.value || "id";

        var html = "";

        if (options.nullable) {
            html += "<option value";

            if (options.selected == null) {
                html += " selected=\"selected\"";
            }

            html += ">---</option>";
        }

        if (options.data.constructor === Array) {
            for (var i = 0; i < options.data.length; i++) {
                var dataRow = options.data[i];
                var value = dataRow[options.value];
                html += "<option value=\"";
                html += value;
                html += "\"";

                if (options.selectedValue == value) {
                    html += " selected=\"selected\"";
                }

                html += ">";
                html += dataRow[options.name];
                html += "</option>";
            }
        } else if (options.data.constructor === Object) {
            for (var value in options.data) {
                var name = options.data[value];
                html += "<option value=\"";
                html += value;
                html += "\"";

                if (options.selectedValue == value) {
                    html += " selected=\"selected\"";
                }

                html += ">";
                html += name;
                html += "</option>";
            }
        }

        options.element.innerHTML = html;
    }
};
