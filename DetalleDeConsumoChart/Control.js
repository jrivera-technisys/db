name: 'DetalleDeConsumoChart',
description: 'DetalleDeConsumoChart',
type: 'control',
render:
function(obj, target, scope, theme) {
var uid = mcssstyle("uid: " + obj.uid + ";"),
device = API.Controls.getDevice(scope),
targetByXML = obj.xmlattribute("target"),
cssByXML = mcsssolve(obj.xmlattribute('classes')),
controlParams = parseQueryString(obj.xmlattribute("control-parameters"));

 var resourcesJS=  {"jquery":
                {"route": API.Controls.resourcespath()+"/jQuery/jquery-3.1.0.slim.min.js",
                 "tag": "<!--JQUERY-->"
                },
        "chartist_js":
                {"route":API.Controls.resourcespath()+"/Chartist/chartist.min.js",
                 "tag": "<!--CHARTIST_JS-->"
                },
        "numeral_js":
                {"route":API.Controls.resourcespath()+"/Numeral/numeral.js",
                 "tag": "<!--NUMERAL_JS-->"
                }
        };

var resourcesCSS=  {"bootstrap_css":
            {"route": API.Controls.resourcespath()+"/Bootstrap/css/bootstrap.min.css",
                "tag": "<!--BOOTSTRAP_CSS-->"
            },
            "chartist_css":
            {"route" : API.Controls.resourcespath()+"/Chartist/chartist.min.css",
              "tag": "<!--CHARTIST_CSS-->"
            }
        };
  var resourcesIMAGES =  {"hogar":
            {"route": API.Controls.resourcespath()+"/images/dashboard/hogar-01.png",
                "tag": "/*HOGAR*/"
            },
      "indumentaria":
            {"route": API.Controls.resourcespath()+"/images/dashboard/indumentaria-01.png",
                "tag": "/*INDUMENTARIA*/"
            },
      "turismo":
            {"route": API.Controls.resourcespath()+"/images/dashboard/turismo-01.png",
                "tag": "/*TURISMO*/"
            },
       "automovil":
            {"route": API.Controls.resourcespath()+"/images/dashboard/automovil-01.png",
                "tag": "/*AUTOMOVIL*/"
            },
      "gastronomia":
            {"route": API.Controls.resourcespath()+"/images/dashboard/gastronomia-01.png",
                "tag": "/*GASTRONOMIA*/"
            },
      "otros":
            {"route": API.Controls.resourcespath()+"/images/dashboard/otros-01.png",
                "tag": "/*OTROS*/"
            },
      "supermercado":
            {"route": API.Controls.resourcespath()+"/images/dashboard/supermercado-01.png",
                "tag": "/*SUPERMERCADOS*/"
            },
        };




//No correr si:
if (device != 'MB' || target == '#' || !obj.visible) return null;
else if (device =="MB"){

//Obtener grupo de los datos
 graficoPeriodo = obj.children[1];

//Recorrer los datos periodo de la collection
var datosPeriodo = new Array();
for(var r=0; r<graficoPeriodo.rows.length; r++) {
  var data_row = new Object;
  data_row['categoria'] = graficoPeriodo.rows[r].cells[0].value;
  data_row['fecha'] = graficoPeriodo.rows[r].cells[1].value;
  
  
  totalesConsumos = graficoPeriodo.rows[r].cells[1].rows[0];
  data_row['moneda'] = totalesConsumos.cells[0].value;
  data_row['saldo'] = totalesConsumos.cells[1].value;
  data_row['montoDebito'] = totalesConsumos.cells[2].value;
  data_row['montoCredito'] = totalesConsumos.cells[3].value;
  
  
  data_row['fecha'] = graficoPeriodo.rows[r].cells[3].value;
  
  graficoHistorico = graficoPeriodo.rows[r].cells[2];
  var datosHistorico = new Array();
  for(var his=0; his<graficoHistorico.rows.length; his++) {
    var data_row_his = new Object;
    data_row_his['anio'] = graficoHistorico.rows[his].cells[0].value;
    data_row_his['mes'] = graficoHistorico.rows[his].cells[1].value;
    data_row_his['importe'] = graficoHistorico.rows[his].cells[2].value;
    data_row_his['moneda'] = graficoHistorico.rows[his].cells[3].value;
    datosHistorico.push(data_row_his);
  }
  data_row['historico'] = datosHistorico;
  datosPeriodo.push(data_row);
} 

runMobile("setStyle", [target, "height: -1;"]);
runMobile("addContainer",[obj.name+"-container",target,mcsssolve("containerClass")]);

var dataString = JSON.stringify(datosPeriodo);
  
var parametrosHtml = '<script type="text/javascript" > respuesta = ' + dataString + "</script>";
     parametrosHtml += '<script type="text/javascript" > targetVar = "' + target + "#" + obj.uid  + '"</script>';
var codigoHtml= parametrosHtml + this.html();
  

  for (i in resourcesJS){
      var tag = '<script src="ruta"></script>';
        codigoHtml = codigoHtml.replace(resourcesJS[i].tag,tag.replace("ruta",resourcesJS[i].route));
    }
    for (i in resourcesCSS){
      var tag = '<link rel="stylesheet" type="text/css" href="ruta">';
        codigoHtml = codigoHtml.replace(resourcesCSS[i].tag,tag.replace("ruta",resourcesCSS[i].route));
    }
  for (i in resourcesIMAGES){
        var tag = 'var imgurl = "ruta";';
        codigoHtml = codigoHtml.replace(resourcesIMAGES[i].tag,tag.replace("ruta",resourcesIMAGES[i].route));
    }
    var arrowTag = '<img  id="backArrow" class="inline arrow" src="ruta">';
    codigoHtml = codigoHtml.replace("<!--ARROW-->",arrowTag.replace("ruta", API.Controls.resourcespath()+"/images/back-android.png"));
    
   var selectTag = "ruta";
    codigoHtml = codigoHtml.replace("/*SELECT*/",selectTag.replace("ruta", API.Controls.resourcespath()+"/images/arrow_select.png"));

runMobile('addWebView',[obj.name,obj.name+"-container",codigoHtml,mcsssolve("webViewClass")]);
 }
}