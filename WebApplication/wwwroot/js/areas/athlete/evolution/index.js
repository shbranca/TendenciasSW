var EvolutionAthleteTable = function () {
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
                    url: ('/atleta/evolucion/getevolutions/').proto().parseURL()
                }
            },
            pageSize: 10,
            saveState: {
                cookie: true,
                webstorage: true
            }
        },
        columns: [
            {
                field: 'fiftyMeters',
                title: '50 metros',
                width: 70
            },
            {
                field: 'oneHundredMeters',
                title: '100 metros',
                width: 70
            },
            {
                field: 'fourHundredMeters',
                title: '400 metros',
                width: 70
            },
            {
                field: 'createdAt',
                title: 'Fecha',
                width: 100
            } 
        ]
    };
 
    return {
        init: function () {
            datatable = $(".m-datatable").mDatatable(options); 
        },
        reloadTable: function () {
            datatable.reload();
        }
    }

}();


$(function () {
    EvolutionAthleteTable.init();
});
