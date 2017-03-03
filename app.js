var DocName = "prueba.csv";
var status = "status";
var data2graph = "cantidad";
Papa.parse(DocName, {
    header: true,
    download: true,
    dynamicTyping: true,
    complete: function(results1) {
        console.log(results1);
        getData(results1.data);
    }
});
function getData(data){
    var typeStatus = [];
    //Obteniendo los tipos de status
    for(var i = 0; i < data.length; i++){
        if(typeStatus.indexOf(data[i][status]) < 0 && data[i][status] != undefined && data[i][status] != ""){
            typeStatus.push(data[i][status]);
        }
    }
    var dataOfStatus = [];
    //inicializar valores de status en cero
    for(var i = 0; i < typeStatus.length; i++){
        dataOfStatus.push(0);
    }
    //asignar a cada variable del array
    for(var i = 0; i < data.length; i++){
        for(var j = 0; j < typeStatus.length; j++){
            if(data[i][status] == typeStatus[j]){
                dataOfStatus[j] += data[i][data2graph];
            }
        }
    }
    //Creando el objeto de los datos a graficar
    
    var datos = [];
    for(var i = 0; i< typeStatus.length; i++){
        var datax = [];
        datos.push([typeStatus[i], dataOfStatus[i]]);
    }
    var series = [];
    series.push({
        "name" : "Total",
        "data" : datos
    });
    //asignado los valores al objeto a graficar
    console.log(series);
    graficar(series);
}
var graficar = (function (datos) {
    $('#container').highcharts({
        chart: {
            type: 'funnel',
            marginRight: 100
        },
        title: {
            text: 'Ventas Año en Curso',
            x: -50
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b> ({point.y:,.0f})',
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                    softConnector: true
                },
                neckWidth: '30%',
                neckHeight: '25%'

                //-- Other available options
                // height: pixels or percent
                // width: pixels or percent
            }
        },
        legend: {
            enabled: false
        },
        series: datos
    });
});