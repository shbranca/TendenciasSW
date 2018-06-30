var AthletesTable = function () {
    var datatable;

    var options = {
        search: {
            input: $('#search')
        },
        data: {
            type: 'remote',
            source: {
                read: {
                    method: 'GET',
                    url: ('/coach/atletas/get').proto().parseURL(),
                },
            },
            pageSize: 10,
            saveState: {
                cookie: true,
                webstorage: true
            }
        },
        layout: {
            theme: 'default', // datatable theme
            class: '', // custom wrapper class
            scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
            footer: false // display/hide footer
        },
        // column sorting
        sortable: true,
        pagination: true,
        toolbar: {
            // toolbar items
            items: {
                // pagination
                pagination: {
                    // page size select
                    pageSizeSelect: [10, 20, 30, 50, 100],
                },
                info: false
            }
        },
        columns: [
            {
                field: 'paternalSurname',
                title: 'Apellido Paterno',
                width: 70
            },
            {
                field: 'maternalSurname',
                title: 'Apellido Materno',
                width: 70
            },
            {
                field: 'names',
                title: 'Nombres',
                width: 70
            },
            {
                field: 'userName',
                title: 'Usuario',
                width: 60
            },
            {
                field: 'email',
                title: 'Correo electrónico',
                width: 200
            },
            {
                field: 'phoneNumber',
                title: 'Teléfono',
                width: 80
            },
            {
                field: 'options',
                title: 'Opciones',
                width: 200,
                sortable: false,
                filterable: false,
                template: function (row) {
                    return '<a href="/coach/atletas/atleta/' + row.id + '" class="btn btn-primary btn-sm m-btn m-btn--icon btn-edit" title="Velocidad"><span><i class="la la-edit"></i><span>Velocidad</span></span></a>'
                }
            }
        ]
    };
     
    return {
        init: function () {
            datatable = $(".m-datatable").mDatatable(options);
    
        }
    }
}();

$(function () {
    AthletesTable.init();
});