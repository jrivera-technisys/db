name: 'DetalleConsumoTarjetaChart',
description: ' Control que recorre una colección de datos y genera el gráfico de detalle de consumo por tarjeta de credito seleccionada.',
type: 'control',
render: 
function(obj, target, scope, theme) {
var uid = mcssstyle("uid: " + obj.uid + ";"),
device = API.Controls.getDevice(scope),
targetByXML = obj.xmlattribute("target"),
cssByXML = mcsssolve(obj.xmlattribute('classes')),
controlParams = parseQueryString(obj.xmlattribute("control-parameters"));
   var resourcesJS=  {"jquery_2.2.4":
				{"route": API.Controls.resourcespath()+"/jQuery/jquery-2.2.4.min.js",
				 "tag": "<!--JQUERY_2.2.4-->"
				},
		"slick_js":
				{"route":API.Controls.resourcespath()+"/Slick/slick.min.js",
				 "tag": "<!--SLICK_JS-->"
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
			"slick_css":
			{"route" : API.Controls.resourcespath()+"/Slick/slick.css",
			  "tag": "<!--SLICK_CSS-->"
			},
			"slick_theme_css":
			{"route" : API.Controls.resourcespath()+"/Slick/slick-theme.css",
			  "tag": "<!--SLICK_CSS_THEME-->"
			}
		};

  

//No correr si:
if (device != 'MB' || target == '#' || !obj.visible) return null;
else if (device =="MB"){

//Obtener grupo de los datos
 datosTarjetas = obj.children[0];

//Recorrer los datos tarjeta de la collection
var creditCardData = new Array();
for(var r=0; r<datosTarjetas.rows.length; r++) {

      var data_row = new Object;

      data_row['fecha'] = datosTarjetas.rows[r].cells[2].value;
      data_row['limite'] = datosTarjetas.rows[r].cells[3].value;
      data_row['Disponible Contado'] = datosTarjetas.rows[r].cells[4].value;
      data_row['Disponible Cuotas'] = datosTarjetas.rows[r].cells[5].value;
      //collection con pesos y dolar - tomo el de pesos 
      data_row['Saldo Impago'] = datosTarjetas.rows[r].cells[6].rows[0].cells[0].value;
      data_row['moneda'] = datosTarjetas.rows[r].cells[6].rows[0].cells[1].value;
      //collection con pesos y dolar - tomo el de pesos 
      data_row['Autorizaciones'] = datosTarjetas.rows[r].cells[7].rows[0].cells[0].value;
      //collection con pesos y dolar - tomo el de pesos
      data_row['Consumos'] = datosTarjetas.rows[r].cells[8].rows[0].cells[0].value;
      //collection con pesos y dolar - tomo el de pesos
      data_row['Cuotas Pendientes'] = datosTarjetas.rows[r].cells[9].rows[0].cells[0].value;

    creditCardData.push(data_row);
} 

  
runMobile("setStyle", [target, "height: -1;"]);
runMobile("addContainer",[obj.name+"-container",target,mcsssolve("containerClass")]);

var dataString = JSON.stringify(creditCardData);
var parametrosHtml = '<script type="text/javascript" > consumoPeriodo = ' + dataString + "</script>";
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
      var arrowTag = '<img  id="arrow" class="inline arrow" src="ruta">';
    codigoHtml = codigoHtml.replace("<!--ARROW-->",arrowTag.replace("ruta", API.Controls.resourcespath()+"/images/back-android.png"));
  
   var cardTag = 'src: "ruta"';
    codigoHtml = codigoHtml.replace("/*MACRO*/",cardTag.replace("ruta", API.Controls.resourcespath()+"/images/ATMBANCOMACRO.jpg"));

	runMobile('addWebView',[obj.name,obj.name+"-container",codigoHtml,mcsssolve("webViewClass")]);
  }

}