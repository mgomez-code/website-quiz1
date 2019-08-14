function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var lang = getParameterByName('lang');

 if(lang == ''){
      var lang = 'es';
    }

var traduc = [];
	//es
	traduc.push(['Bienvenido','Meetup Quiz','Conociendo de Blockchain de la mano de Æternity','Nombre','Apellido','Registro','puntos','¿Listo para comenzar?','Comenzar','¡Se acabó el tiempo!','Has obtenido','Volver a intentar']);
	//en
	traduc.push(['Welcome','Meetup Quiz','Knowing Blockchain from the hand of Æternity','First name','Surname','Registry','points','Ready to start?','Start','Time is over!','You have obtained','Try again']);
	//fr
	traduc.push(['Bienvenue','Meetup Quiz','Connaître Blockchain  de la main du Æternity','Nom','Le nom','Inscription','points','Prêt à commencer?','Début','Le temps est écoulé!','Vous avez obtenu','Réessayer']);

if(lang == 'es'){
      var langc = 0;
    }
else if(lang == 'en'){
      var langc = 1;
    }
else if(lang == 'fr'){
      var langc = 2;
    }
else {
      var langc = 0;
    }

var bandera = '<img src="img/'+lang+'.png">';
var saludo = traduc[langc][0];
var titulo = traduc[langc][1];
var subtitulo = traduc[langc][2];
var nombre = traduc[langc][3];
var apellido = traduc[langc][4];
var registro = traduc[langc][5];
var puntos = traduc[langc][6];
var iniciar = traduc[langc][7];
var comenzar = traduc[langc][8];
var fin = traduc[langc][9];
var total = traduc[langc][10];
var intentar = traduc[langc][11];


