
console.log("📦 geogebra-javascript.js cargado correctamente");

function ggbOnInit() {
	console.log("🚀 ggbOnInit() llamada");
	 esperarAppletYActivar();
}
// Fallback: si GeoGebra nunca llama a ggbOnInit, lo hacemos nosotros
document.addEventListener("DOMContentLoaded", () => {
    console.log("🕓 DOM listo, esperando ggbApplet...");
    esperarAppletYActivar();
});	

function esperarAppletYActivar() {
    let intentos = 0;
    const maxIntentos = 50; // ~10 segundos

    const intervalo = setInterval(() => {
        intentos++;
        const ggbApplet = window.ggbApplet;

        if (ggbApplet && typeof ggbApplet.registerAddListener === "function") {
            clearInterval(intervalo);
            inicializarListeners(ggbApplet);
        } else if (intentos > maxIntentos) {
            clearInterval(intervalo);
            console.error("❌ No se detectó ggbApplet tras varios intentos");
        }
    }, 200);
}
	

function inicializarListeners(ggbApplet) {
    console.log("✅ GeoGebra listo. Listeners activados.");   	
  	
    ggbApplet.registerObjectUpdateListener("actualizacion1", "fuerzaActualizacionF1");
    ggbApplet.registerObjectUpdateListener("actualizacion2", "fuerzaActualizacionF2");
    ggbApplet.registerObjectUpdateListener("actualizacion3", "fuerzaActualizacionF3");
    ggbApplet.registerObjectUpdateListener("leyendaAdvertenciaIntervalo", "actualizaAdvertencia");
}

function actualizaAdvertencia() {
    ggbApplet.unregisterObjectUpdateListener("actualizaAdvertencia");
    var str = "";
    var arrayAdvertencias = [];
    var arrayAdvertenciasValidadas = [];
    var longArray = 0;
    var lAI = ggbApplet.getValue("leyendaAdvertenciaIntervalo");

    if (lAI == 1) {
        for (var k = 0; k <= 2; k++) {
            arrayAdvertencias[k] = ggbApplet.getValue("leyendaAdvertenciaIntervaloF" + (k + 1));
            if (arrayAdvertencias[k] == 1) {
                longArray = arrayAdvertenciasValidadas.push(k + 1);
            }
        }

        if (longArray != 0) {
            for (k = 0; k <= (longArray - 1); k++) {
                if (k == 0) {
                    str += "f_{" + arrayAdvertenciasValidadas[k] + "}";
                } else if (k == longArray - 1) {
                    str += "\\; y \\;f_{" + arrayAdvertenciasValidadas[k] + "}";
                } else {
                    str = str + "\\;,f_{" + arrayAdvertenciasValidadas[k] + "}";
                }
            }
        } else {
            str = "";
        }
    } else {
        str = "";
    }
    ggbApplet.setTextValue("textoF", str);
    ggbApplet.registerObjectUpdateListener("leyendaAdvertenciaIntervalo", "actualizaAdvertencia");
}

function fuerzaActualizacionF1() {
    //alert("EUREKA GLOBAL F1");
    ggbApplet.unregisterObjectUpdateListener("actualizacion1");
    ggbApplet.unregisterObjectUpdateListener("actualizacion2");
    ggbApplet.unregisterObjectUpdateListener("actualizacion3");
    var status1 = 0;
    status1 = ggbApplet.getValue("actualizacion1");
    if (status1 == 1) {
        //alert("modifica");
        var str = ggbApplet.getValueString("cadenaFiltradaDesigualdades1", false) + "";
        var str1 = "";
        var str2 = str;
        var str3 = "";
        var dominioPorDefecto = ggbApplet.getValueString("cadenaDominioPorDefecto", false) + "";
        var index = 0;
        var cS1 = ggbApplet.getValue("codigoSimbolo1");
        var cS2 = ggbApplet.getValue("codigoSimbolo2");
        var X10 = ggbApplet.getValue("x_{10}");
        var X11 = ggbApplet.getValue("x_{11}");
        //alert("cS1=" + cS1 +"\cS2="+ cS2 +"\X10="+ X10 +"\X11="+ X11);
        if ((cS2 == 2) && (ggbApplet.isDefined("x_{11}") == true)) {
            str1 = X11 + ">=x>=" + X11;
            ggbApplet.setValue("muestraF1entera", 0);
            str2 = str1;
            ggbApplet.setValue("muestraFP1", 1);
            ggbApplet.setValue("leyendaAdvertenciaIntervaloF1", 0);
            ggbApplet.setValue("muestraDominioF1", 1);
            //alert("cS2 =");
        } else if ((cS1 == 2) && (ggbApplet.isDefined("x_{10}") == true)) {
            str1 = X10 + ">=x>=" + X10;
            ggbApplet.setValue("muestraF1entera", 0);
            str2 = str1;
            ggbApplet.setValue("muestraFP1", 1);
            ggbApplet.setValue("leyendaAdvertenciaIntervaloF1", 0);
            ggbApplet.setValue("muestraDominioF1", 1);
            //alert("cS1 =");
        } else if ((ggbApplet.isDefined("x_{10}") == false) && (ggbApplet.isDefined("x_{11}") == false)) {
            str1 = dominioPorDefecto;
            ggbApplet.setValue("muestraF1entera", 1);
            str2 = str1;
            ggbApplet.setValue("muestraFP1", 0);
            ggbApplet.setValue("leyendaAdvertenciaIntervaloF1", 1);
            ggbApplet.setValue("muestraDominioF1", 0);
            //alert("no data");
        } else if ((cS1 == 1) && (cS2 == 1)) {
            str1 = dominioPorDefecto;
            ggbApplet.setValue("muestraF1entera", 1);
            str2 = str1;
            ggbApplet.setValue("muestraFP1", 0);
            ggbApplet.setValue("leyendaAdvertenciaIntervaloF1", 1);
            ggbApplet.setValue("muestraDominioF1", 0);
            //alert("no simbolos");
        } else if (((cS1 == 1) && (ggbApplet.isDefined("x_{11}") == false)) || ((cS2 == 1) && (ggbApplet.isDefined("x_{10}") == false))) {
            str1 = dominioPorDefecto;
            ggbApplet.setValue("muestraF1entera", 1);
            str2 = str1;
            ggbApplet.setValue("muestraFP1", 0);
            ggbApplet.setValue("leyendaAdvertenciaIntervaloF1", 1);
            ggbApplet.setValue("muestraDominioF1", 0);
            //alert("dato-simbolo no asociados");
        } else if ((cS1 == 1) && (ggbApplet.isDefined("x_{10}") == true)) {
            ggbApplet.setValue("muestraF1entera", 0);
            index = str.indexOf("x");
            str1 = str.slice(index);
            str2 = str1;
            ggbApplet.setValue("muestraFP1", 1);
            ggbApplet.setValue("leyendaAdvertenciaIntervaloF1", 1);
            ggbApplet.setValue("muestraDominioF1", 0);
            //alert("sin simbolo izqdo.");
        } else if ((cS1 != 1) && (ggbApplet.isDefined("x_{10}") == false)) {
            ggbApplet.setValue("muestraF1entera", 0);
            index = str.indexOf("x");
            str1 = str.slice(index);
            str2 = str1;
            ggbApplet.setValue("muestraFP1", 1);
            ggbApplet.setValue("leyendaAdvertenciaIntervaloF1", 1);
            ggbApplet.setValue("muestraDominioF1", 0);
            //alert("sin dato izqdo.");
        } else if ((cS2 == 1) && (ggbApplet.isDefined("x_{11}") == true)) {
            ggbApplet.setValue("muestraF1entera", 0);
            index = str.indexOf("x");
            str1 = str.slice(0, index + 1);
            str2 = str1;
            ggbApplet.setValue("muestraFP1", 1);
            ggbApplet.setValue("leyendaAdvertenciaIntervaloF1", 1);
            ggbApplet.setValue("muestraDominioF1", 0);
            //alert("sin simbolo dcho.");
        } else if ((cS2 != 1) && (ggbApplet.isDefined("x_{11}") == false)) {
            ggbApplet.setValue("muestraF1entera", 0);
            index = str.indexOf("x");
            str1 = str.slice(0, index + 1);
            str2 = str1;
            ggbApplet.setValue("muestraFP1", 1);
            ggbApplet.setValue("leyendaAdvertenciaIntervaloF1", 1);
            ggbApplet.setValue("muestraDominioF1", 0);
            //alert("sin dato-simbolo dcho.");	
        } else {
            str1 = ggbApplet.evalCommandCAS("domDef1:=cadenaFiltradaDesigualdades1", "");
            ggbApplet.setValue("muestraF1entera", 0);
            ggbApplet.setValue("muestraFP1", 1);
            ggbApplet.setValue("leyendaAdvertenciaIntervaloF1", 0);
            ggbApplet.setValue("muestraDominioF1", 1);
            //alert("default");
        }
        ggbApplet.setTextValue("cadenaFiltrada2Desigualdades1", str2);
        ggbApplet.evalCommand("dominioDefinicionF1:=" + str1);
        str3 = ggbApplet.evalCommandCAS("domExtF1:=cadenaFiltrada3DesigualdadesF1", "");
        ggbApplet.evalCommand("dExtF1:=" + str3);
        str1 = ggbApplet.evalCommandCAS("dominioF:=dominioDefinicionF1(x) ∨ dominioDefinicionF2(x) ∨ dominioDefinicionF3(x)", "");
        ggbApplet.evalCommand("dominioDefinicionF:=" + str1);
        //alert("str1--" + str1+"  str2--"+ str2+"  str3--"+str3);
        var nASVF = 0;
        var nADEVF = 0;
        var elementoASVF1 = -100;
        var elementoADEV = -100;
        var cSD = ggbApplet.getValue("codigoSimbolo2");
        var asintotas = [];
        var numAsintotas = ggbApplet.getValue("numeroAsintotasVF1");
        var discontEvit = [];
        var discontEvitV = [];
        var numDE = ggbApplet.getValue("numeroDiscontinuidadesEvitablesF1");
        var numDEV = 0;
        var str = "{";
        var pto = {
            x: 0,
            y: 0
        };
        var index = 0;
        ggbApplet.evalCommand("listaValidadaADEF1={}");
        ggbApplet.evalCommand("listaCodigosASF1={}");
        for (var i = 0; i <= numAsintotas - 1; i++) {
            asintotas[i] = ggbApplet.getListValue("abscisasAsintotasF1", i + 1);
        }
        for (var j = 0; j <= numDE - 1; j++) {
            discontEvit[j] = ggbApplet.getListValue("listaAbscisasDiscontinuidadesEvitablesF1", j + 1);
        }
        nASVF = ggbApplet.getValue("numeroASVF1");
        //alert("numDEV=" + numDEV + "   AbsValDE=" + str + "   nASVF=" + nASVF);
        for (var k = 1; k <= nASVF; k++) {
            elementoASVF1 = ggbApplet.getListValue("listaValidadaASF1", k);
            if (asintotas.includes(elementoASVF1)) {
                ggbApplet.setListValue("listaCodigosASF1", k, 1);
            } else if (discontEvit.includes(elementoASVF1)) {
                ggbApplet.setListValue("listaCodigosASF1", k, 2);
                numDEV = discontEvitV.push(elementoASVF1);
            } else if ((nASVF == 1) && (cSD == 2)) {
                ggbApplet.setListValue("listaCodigosASF1", k, 4);
            } else {
                ggbApplet.setListValue("listaCodigosASF1", k, 0);
            }
        }
        if (numDEV != 0) {
            for (var n = 1; n <= numDEV; n++) {
                if (n == numDEV) {
                    str += discontEvitV[n - 1] + "}";
                } else {
                    str += discontEvitV[n - 1] + ",";
                }
            }
            ggbApplet.evalCommand("listaValidadaADEF1=" + str);
            //alert("numDEV=" + numDEV + "   AbsValDE=" + str + "   nASVF=" + nASVF);
        } else {
            ggbApplet.evalCommand("listaValidadaADEF1={}");
        }
        //código generador de los puntos las DEs
        ggbApplet.evalCommand("listaValidadaDiscontinuidadesEvitablesF1={}");
        str = "{"
        nADEVF = discontEvitV.length;
        if (nADEVF != 0) {
            for (var k = 0; k <= nADEVF - 1; k++) {
                elementoADEV = discontEvitV[k];
                index = discontEvit.indexOf(elementoADEV);
                ggbApplet.evalCommand("PtoAuxiliar=Element(listaDiscontinuidadesEvitablesF1," + (index + 1) + ")");
                pto.x = ggbApplet.getXcoord("PtoAuxiliar");
                pto.y = ggbApplet.getYcoord("PtoAuxiliar");
                //alert("" + pto.x + "");
                if (k == nADEVF - 1) {
                    str += "(" + pto.x + "," + pto.y + ")}";
                } else {
                    str += "(" + pto.x + "," + pto.y + "),"
                }
            }
            ggbApplet.evalCommand("listaValidadaDiscontinuidadesEvitablesF1=" + str);
        } else {
            ggbApplet.evalCommand("listaValidadaDiscontinuidadesEvitablesF1={}");
        }
        /*codigo de cómputo e impresion del dominio*/
        //var nASVF = ggbApplet.getValue("numeroASVF1");
        var elementoLVASF = -100;
        var codigoASF = 5;
        var str1 = "";
        var sInf = ggbApplet.getValueString("simboloInfinito", false) + "";
        var sUnion = ggbApplet.getValueString("simboloUnion", false) + "";
        var sVacio = ggbApplet.getValueString("simboloVacio", false) + "";
        var cS1 = ggbApplet.getValue("codigoSimbolo1");
        var cS2 = ggbApplet.getValue("codigoSimbolo2");
        ggbApplet.evalCommand("errorDEpuntoAisladoF1=false");
        if (nASVF == 1) {
            elementoLVASF = ggbApplet.getListValue("listaValidadaASF1", 1);
            codigoASF = ggbApplet.getListValue("listaCodigosASF1", 1);
            if (((codigoASF == 1) || (codigoASF == 2))) {
                if ((cS1 == 3) || (cS2 == 6)) {
                    str1 = str1 + "(" + elementoLVASF + "," + sInf + ")";
                }
                if ((cS1 == 4) || (cS2 == 5)) {
                    str1 = str1 + "(" + elementoLVASF + "," + sInf + ")";
                }
                if ((cS1 == 5) || (cS2 == 4)) {
                    str1 = str1 + "(-" + sInf + "," + elementoLVASF + ")";
                }
                if ((cS1 == 6) || (cS2 == 3)) {
                    str1 = str1 + "(-" + sInf + "," + elementoLVASF + ")";
                }
                //v3
                if (cS2 == 2) {
                    str1 = str1 + sVacio;
                    ggbApplet.evalCommand("errorDEpuntoAisladoF1=true");
                }
            } else {
                if ((cS1 == 3) || (cS2 == 6)) {
                    str1 = str1 + "(" + elementoLVASF + "," + sInf + ")";
                }
                if ((cS1 == 4) || (cS2 == 5)) {
                    str1 = str1 + "[" + elementoLVASF + "," + sInf + ")";
                }
                if ((cS1 == 5) || (cS2 == 4)) {
                    str1 = str1 + "(-" + sInf + "," + elementoLVASF + "]";
                }
                if ((cS1 == 6) || (cS2 == 3)) {
                    str1 = str1 + "(-" + sInf + "," + elementoLVASF + ")";
                }
                if (cS2 == 2) {
                    str1 = str1 + "{" + elementoLVASF + "}";
                }
            }
        } else {
            for (var i = 1; i <= nASVF; i++) {
                elementoLVASF = ggbApplet.getListValue("listaValidadaASF1", i);
                codigoASF = ggbApplet.getListValue("listaCodigosASF1", i);
                if (((codigoASF == 1) || (codigoASF == 2)) && ((i != 1) && (i != nASVF))) {
                    str1 = str1 + "," + elementoLVASF + ")" + sUnion + "(" + elementoLVASF;
                    continue;
                } else if (((codigoASF == 1) || (codigoASF == 2)) && (i == 1) && ((cS1 == 1) || (cS2 == 1))) {
                    if ((cS1 == 5) || (cS2 == 4)) {
                        str1 = str1 + "(-" + sInf + "," + elementoLVASF + ")" + sUnion + "(" + elementoLVASF;
                        continue;
                    }
                    if ((cS1 == 6) || (cS2 == 3)) {
                        str1 = str1 + "(-" + sInf + "," + elementoLVASF + ")" + sUnion + "(" + elementoLVASF;
                        continue;
                    }
                    //v2
                    if ((cS1 == 4) || (cS2 == 5)) {
                        str1 = str1 + "(" + elementoLVASF;
                        continue;
                    }
                    if ((cS1 == 3) || (cS2 == 6)) {
                        str1 = str1 + "(" + elementoLVASF;
                        continue;
                    }
                } else if (((codigoASF == 1) || (codigoASF == 2)) && (i == 1) && ((cS1 != 1) && (cS2 != 1))) {
                    if ((cS1 == 6) || (cS2 == 3)) {
                        str1 = str1 + "(" + elementoLVASF;
                        continue;
                    }
                    if ((cS1 == 5) || (cS2 == 4)) {
                        str1 = str1 + "(" + elementoLVASF;
                        continue;
                    }
                } else if (((codigoASF == 1) || (codigoASF == 2)) && (i == nASVF) && ((cS1 == 1) || (cS2 == 1))) {
                    if ((cS1 == 3) || (cS2 == 6)) {
                        str1 = str1 + "," + elementoLVASF + ")" + sUnion + "(" + elementoLVASF + "," + sInf + ")"
                        continue;
                    }
                    if ((cS1 == 4) || (cS2 == 5)) {
                        str1 = str1 + "," + elementoLVASF + ")" + sUnion + "(" + elementoLVASF + "," + sInf + ")"
                        continue;
                    }
                    //v2
                    if ((cS1 == 6) || (cS2 == 3)) {
                        str1 = str1 + "," + elementoLVASF + ")";
                        continue;
                    }
                    if ((cS1 == 5) || (cS2 == 4)) {
                        str1 = str1 + "," + elementoLVASF + ")";
                        continue;
                    }
                } else if (((codigoASF == 1) || (codigoASF == 2)) && (i == nASVF) && ((cS1 != 1) && (cS2 != 1))) {
                    if ((cS1 == 6) || (cS2 == 3)) {
                        str1 = str1 + "," + elementoLVASF + ")";
                        continue;
                    }
                    if ((cS1 == 5) || (cS2 == 4)) {
                        str1 = str1 + "," + elementoLVASF + ")";
                        continue;
                    }
                } else if ((codigoASF == 0) && (i == 1)) {
                    if ((cS1 == 3) || (cS2 == 6)) {
                        str1 = str1 + "(" + elementoLVASF;
                        continue;
                    }
                    if ((cS1 == 4) || (cS2 == 5)) {
                        str1 = str1 + "[" + elementoLVASF;
                        continue;
                    }
                } else if ((codigoASF == 0) && (i == nASVF)) {
                    if ((cS1 == 5) || (cS2 == 4)) {
                        str1 = str1 + "," + elementoLVASF + "]";
                        continue;
                    }
                    if ((cS1 == 6) || (cS2 == 3)) {
                        str1 = str1 + "," + elementoLVASF + ")";
                        continue;
                    }
                }
            }
        }
        ggbApplet.setTextValue("texto2F1", str1);
    } else {
        alert("no modifica");
    }
    ggbApplet.setValue("actualizacionDominioF1", 0);
    ggbApplet.setValue("actualizacionFuncion1", 0);
    ggbApplet.evalCommand("limites=true");
    ggbApplet.registerObjectUpdateListener("actualizacion1", "fuerzaActualizacionF1");
    ggbApplet.registerObjectUpdateListener("actualizacion2", "fuerzaActualizacionF2");
    ggbApplet.registerObjectUpdateListener("actualizacion3", "fuerzaActualizacionF3");
}

function fuerzaActualizacionF2() {
    //alert("EUREKA GLOBAL F2");
    ggbApplet.unregisterObjectUpdateListener("actualizacion2");
    ggbApplet.unregisterObjectUpdateListener("actualizacion1");
    ggbApplet.unregisterObjectUpdateListener("actualizacion3");
    var status2 = 0;
    status2 = ggbApplet.getValue("actualizacion2");
    if (status2 == 1) {
        //alert("modifica 2");
        var str = ggbApplet.getValueString("cadenaFiltradaDesigualdades2", false) + "";
        var str1 = "";
        var str2 = str;
        var str3 = "";
        var dominioPorDefecto = ggbApplet.getValueString("cadenaDominioPorDefecto", false) + "";
        var index = 0;
        var cS3 = ggbApplet.getValue("codigoSimbolo3");
        var cS4 = ggbApplet.getValue("codigoSimbolo4");
        var X21 = ggbApplet.getValue("x_{21}");
        var X22 = ggbApplet.getValue("x_{22}");
        //alert("cS3=" + cS3 +"\cS4="+ cS4 +"\X21="+ X21 +"\X22="+ X22);
        if ((cS4 == 2) && (ggbApplet.isDefined("x_{22}") == true)) {
            str1 = X22 + ">=x>=" + X22;
            ggbApplet.setValue("muestraF2entera", 0);
            str2 = str1;
            ggbApplet.setValue("muestraFP2", 1);
            ggbApplet.setValue("leyendaAdvertenciaIntervaloF2", 0);
            ggbApplet.setValue("muestraDominioF2", 1);
            //alert("cS4 =");
        } else if ((cS3 == 2) && (ggbApplet.isDefined("x_{21}") == true)) {
            str1 = X21 + ">=x>=" + X21;
            ggbApplet.setValue("muestraF2entera", 0);
            str2 = str1;
            ggbApplet.setValue("muestraFP2", 1);
            ggbApplet.setValue("leyendaAdvertenciaIntervaloF2", 0);
            ggbApplet.setValue("muestraDominioF2", 1);
            //alert("cS3 =");
        } else if ((ggbApplet.isDefined("x_{21}") == false) && (ggbApplet.isDefined("x_{22}") == false)) {
            str1 = dominioPorDefecto;
            ggbApplet.setValue("muestraF2entera", 1);
            str2 = str1;
            ggbApplet.setValue("muestraFP2", 0);
            ggbApplet.setValue("leyendaAdvertenciaIntervaloF2", 1);
            ggbApplet.setValue("muestraDominioF2", 0);
            //alert("no data 2");
        } else if ((cS3 == 1) && (cS4 == 1)) {
            str1 = dominioPorDefecto;
            ggbApplet.setValue("muestraF2entera", 1);
            str2 = str1;
            ggbApplet.setValue("muestraFP2", 0);
            ggbApplet.setValue("leyendaAdvertenciaIntervaloF2", 1);
            ggbApplet.setValue("muestraDominioF2", 0);
            //alert("no simbolos 2");
        } else if (((cS3 == 1) && (ggbApplet.isDefined("x_{22}") == false)) || ((cS4 == 1) && (ggbApplet.isDefined("x_{21}") == false))) {
            str1 = dominioPorDefecto;
            ggbApplet.setValue("muestraF2entera", 1);
            str2 = str1;
            ggbApplet.setValue("muestraFP2", 0);
            ggbApplet.setValue("leyendaAdvertenciaIntervaloF2", 1);
            ggbApplet.setValue("muestraDominioF2", 0);
            //alert("dato-simbolo no asociados 2");
        } else if ((cS3 == 1) && (ggbApplet.isDefined("x_{21}") == true)) {
            ggbApplet.setValue("muestraF2entera", 0);
            index = str.indexOf("x");
            str1 = str.slice(index);
            str2 = str1;
            ggbApplet.setValue("muestraFP2", 1);
            ggbApplet.setValue("leyendaAdvertenciaIntervaloF2", 1);
            ggbApplet.setValue("muestraDominioF2", 0);
            //alert("sin simbolo izqdo. 2");
        } else if ((cS3 != 1) && (ggbApplet.isDefined("x_{21}") == false)) {
            ggbApplet.setValue("muestraF2entera", 0);
            index = str.indexOf("x");
            str1 = str.slice(index);
            str2 = str1;
            ggbApplet.setValue("muestraFP2", 1);
            ggbApplet.setValue("leyendaAdvertenciaIntervaloF2", 1);
            ggbApplet.setValue("muestraDominioF2", 0);
            //alert("sin dato izqdo. 2");
        } else if ((cS4 == 1) && (ggbApplet.isDefined("x_{22}") == true)) {
            ggbApplet.setValue("muestraF2entera", 0);
            index = str.indexOf("x");
            str1 = str.slice(0, index + 1);
            str2 = str1;
            ggbApplet.setValue("muestraFP2", 1);
            ggbApplet.setValue("leyendaAdvertenciaIntervaloF2", 1);
            ggbApplet.setValue("muestraDominioF2", 0);
            //alert("sin simbolo dcho. 2");
        } else if ((cS4 != 1) && (ggbApplet.isDefined("x_{22}") == false)) {
            ggbApplet.setValue("muestraF2entera", 0);
            index = str.indexOf("x");
            str1 = str.slice(0, index + 1);
            str2 = str1;
            ggbApplet.setValue("muestraFP2", 1);
            ggbApplet.setValue("leyendaAdvertenciaIntervaloF2", 1);
            ggbApplet.setValue("muestraDominioF2", 0);
            //alert("sin dato-simbolo dcho. 2");	
        } else {
            str1 = ggbApplet.evalCommandCAS("domDef2:=cadenaFiltradaDesigualdades2", "");
            ggbApplet.setValue("muestraF2entera", 0);
            ggbApplet.setValue("muestraFP2", 1);
            ggbApplet.setValue("leyendaAdvertenciaIntervaloF2", 0);
            ggbApplet.setValue("muestraDominioF2", 1);
            //alert("default 2");
        }
        ggbApplet.setTextValue("cadenaFiltrada2Desigualdades2", str2);
        ggbApplet.evalCommand("dominioDefinicionF2:=" + str1);
        str3 = ggbApplet.evalCommandCAS("domExtF2:=cadenaFiltrada3DesigualdadesF2", "");
        ggbApplet.evalCommand("dExtF2:=" + str3);
        str1 = ggbApplet.evalCommandCAS("dominioF:=dominioDefinicionF1(x) ∨ dominioDefinicionF2(x) ∨ dominioDefinicionF3(x)", "");
        ggbApplet.evalCommand("dominioDefinicionF:=" + str1);
        //alert("str1--" + str1+"  str2--"+ str2+"  str3--"+str3);
        var nASVF = 0;
        var nADEVF = 0;
        var elementoASVF2 = -100;
        var elementoADEV = -100;
        var cSD = ggbApplet.getValue("codigoSimbolo4");
        var asintotas = [];
        var numAsintotas = ggbApplet.getValue("numeroAsintotasVF2");
        var discontEvit = [];
        var discontEvitV = [];
        var numDE = ggbApplet.getValue("numeroDiscontinuidadesEvitablesF2");
        var numDEV = 0;
        var str = "{";
        var pto = {
            x: 0,
            y: 0
        };
        var index = 0;
        ggbApplet.evalCommand("listaValidadaADEF2={}");
        ggbApplet.evalCommand("listaCodigosASF2={}");
        for (var i = 0; i <= numAsintotas - 1; i++) {
            asintotas[i] = ggbApplet.getListValue("abscisasAsintotasF2", i + 1);
        }
        for (var j = 0; j <= numDE - 1; j++) {
            discontEvit[j] = ggbApplet.getListValue("listaAbscisasDiscontinuidadesEvitablesF2", j + 1);
        }
        nASVF = ggbApplet.getValue("numeroASVF2");
        //alert("numDEV=" + numDEV + "   AbsValDE=" + str + "   nASVF=" + nASVF);
        for (var k = 1; k <= nASVF; k++) {
            elementoASVF2 = ggbApplet.getListValue("listaValidadaASF2", k);
            if (asintotas.includes(elementoASVF2)) {
                ggbApplet.setListValue("listaCodigosASF2", k, 1);
            } else if (discontEvit.includes(elementoASVF2)) {
                ggbApplet.setListValue("listaCodigosASF2", k, 2);
                numDEV = discontEvitV.push(elementoASVF2);
            } else if ((nASVF == 1) && (cSD == 2)) {
                ggbApplet.setListValue("listaCodigosASF2", k, 4);
            } else {
                ggbApplet.setListValue("listaCodigosASF2", k, 0);
            }
        }
        if (numDEV != 0) {
            for (var n = 1; n <= numDEV; n++) {
                if (n == numDEV) {
                    str += discontEvitV[n - 1] + "}";
                } else {
                    str += discontEvitV[n - 1] + ",";
                }
            }
            ggbApplet.evalCommand("listaValidadaADEF2=" + str);
            //alert("numDEV=" + numDEV + "   AbsValDE=" + str + "   nASVF=" + nASVF);
        } else {
            ggbApplet.evalCommand("listaValidadaADEF2={}");
        }
        //código generador de los puntos las DEs
        ggbApplet.evalCommand("listaValidadaDiscontinuidadesEvitablesF2={}");
        str = "{"
        nADEVF = discontEvitV.length;
        if (nADEVF != 0) {
            for (var k = 0; k <= nADEVF - 1; k++) {
                elementoADEV = discontEvitV[k];
                index = discontEvit.indexOf(elementoADEV);
                ggbApplet.evalCommand("PtoAuxiliar2=Element(listaDiscontinuidadesEvitablesF2," + (index + 1) + ")");
                pto.x = ggbApplet.getXcoord("PtoAuxiliar2");
                pto.y = ggbApplet.getYcoord("PtoAuxiliar2");
                //alert("" + pto.x + "2");
                if (k == nADEVF - 1) {
                    str += "(" + pto.x + "," + pto.y + ")}";
                } else {
                    str += "(" + pto.x + "," + pto.y + "),"
                }
            }
            ggbApplet.evalCommand("listaValidadaDiscontinuidadesEvitablesF2=" + str);
        } else {
            ggbApplet.evalCommand("listaValidadaDiscontinuidadesEvitablesF2={}");
        }
        /*codigo de cómputo e impresion del dominio*/
        //var nASVF = ggbApplet.getValue("numeroASVF2");
        var elementoLVASF = -100;
        var codigoASF = 5;
        var str1 = "";
        var sInf = ggbApplet.getValueString("simboloInfinito", false) + "";
        var sUnion = ggbApplet.getValueString("simboloUnion", false) + "";
        var sVacio = ggbApplet.getValueString("simboloVacio", false) + "";
        var cS3 = ggbApplet.getValue("codigoSimbolo3");
        var cS4 = ggbApplet.getValue("codigoSimbolo4");
        ggbApplet.evalCommand("errorDEpuntoAisladoF2=false");
        if (nASVF == 1) {
            elementoLVASF = ggbApplet.getListValue("listaValidadaASF2", 1);
            codigoASF = ggbApplet.getListValue("listaCodigosASF2", 1);
            if (((codigoASF == 1) || (codigoASF == 2))) {
                if ((cS3 == 3) || (cS4 == 6)) {
                    str1 = str1 + "(" + elementoLVASF + "," + sInf + ")";
                }
                if ((cS3 == 4) || (cS4 == 5)) {
                    str1 = str1 + "(" + elementoLVASF + "," + sInf + ")";
                }
                if ((cS3 == 5) || (cS4 == 4)) {
                    str1 = str1 + "(-" + sInf + "," + elementoLVASF + ")";
                }
                if ((cS3 == 6) || (cS4 == 3)) {
                    str1 = str1 + "(-" + sInf + "," + elementoLVASF + ")";
                }
                //v3
                if (cS4 == 2) {
                    str1 = str1 + sVacio;
                    ggbApplet.evalCommand("errorDEpuntoAisladoF2=true");
                }
            } else {
                if ((cS3 == 3) || (cS4 == 6)) {
                    str1 = str1 + "(" + elementoLVASF + "," + sInf + ")";
                }
                if ((cS3 == 4) || (cS4 == 5)) {
                    str1 = str1 + "[" + elementoLVASF + "," + sInf + ")";
                }
                if ((cS3 == 5) || (cS4 == 4)) {
                    str1 = str1 + "(-" + sInf + "," + elementoLVASF + "]";
                }
                if ((cS3 == 6) || (cS4 == 3)) {
                    str1 = str1 + "(-" + sInf + "," + elementoLVASF + ")";
                }
                if (cS4 == 2) {
                    str1 = str1 + "{" + elementoLVASF + "}";
                }
            }
        } else {
            for (var i = 1; i <= nASVF; i++) {
                elementoLVASF = ggbApplet.getListValue("listaValidadaASF2", i);
                codigoASF = ggbApplet.getListValue("listaCodigosASF2", i);
                if (((codigoASF == 1) || (codigoASF == 2)) && ((i != 1) && (i != nASVF))) {
                    str1 = str1 + "," + elementoLVASF + ")" + sUnion + "(" + elementoLVASF;
                    continue;
                } else if (((codigoASF == 1) || (codigoASF == 2)) && (i == 1) && ((cS3 == 1) || (cS4 == 1))) {
                    if ((cS3 == 5) || (cS4 == 4)) {
                        str1 = str1 + "(-" + sInf + "," + elementoLVASF + ")" + sUnion + "(" + elementoLVASF;
                        continue;
                    }
                    if ((cS3 == 6) || (cS4 == 3)) {
                        str1 = str1 + "(-" + sInf + "," + elementoLVASF + ")" + sUnion + "(" + elementoLVASF;
                        continue;
                    }
                    //v2
                    if ((cS3 == 4) || (cS4 == 5)) {
                        str1 = str1 + "(" + elementoLVASF;
                        continue;
                    }
                    if ((cS3 == 3) || (cS4 == 6)) {
                        str1 = str1 + "(" + elementoLVASF;
                        continue;
                    }
                } else if (((codigoASF == 1) || (codigoASF == 2)) && (i == 1) && ((cS3 != 1) && (cS4 != 1))) {
                    if ((cS3 == 6) || (cS4 == 3)) {
                        str1 = str1 + "(" + elementoLVASF;
                        continue;
                    }
                    if ((cS3 == 5) || (cS4 == 4)) {
                        str1 = str1 + "(" + elementoLVASF;
                        continue;
                    }
                } else if (((codigoASF == 1) || (codigoASF == 2)) && (i == nASVF) && ((cS3 == 1) || (cS4 == 1))) {
                    if ((cS3 == 3) || (cS4 == 6)) {
                        str1 = str1 + "," + elementoLVASF + ")" + sUnion + "(" + elementoLVASF + "," + sInf + ")"
                        continue;
                    }
                    if ((cS3 == 4) || (cS4 == 5)) {
                        str1 = str1 + "," + elementoLVASF + ")" + sUnion + "(" + elementoLVASF + "," + sInf + ")"
                        continue;
                    }
                    //v2
                    if ((cS3 == 6) || (cS4 == 3)) {
                        str1 = str1 + "," + elementoLVASF + ")";
                        continue;
                    }
                    if ((cS3 == 5) || (cS4 == 4)) {
                        str1 = str1 + "," + elementoLVASF + ")";
                        continue;
                    }
                } else if (((codigoASF == 1) || (codigoASF == 2)) && (i == nASVF) && ((cS3 != 1) && (cS4 != 1))) {
                    if ((cS3 == 6) || (cS4 == 3)) {
                        str1 = str1 + "," + elementoLVASF + ")";
                        continue;
                    }
                    if ((cS3 == 5) || (cS4 == 4)) {
                        str1 = str1 + "," + elementoLVASF + ")";
                        continue;
                    }
                } else if ((codigoASF == 0) && (i == 1)) {
                    if ((cS3 == 3) || (cS4 == 6)) {
                        str1 = str1 + "(" + elementoLVASF;
                        continue;
                    }
                    if ((cS3 == 4) || (cS4 == 5)) {
                        str1 = str1 + "[" + elementoLVASF;
                        continue;
                    }
                } else if ((codigoASF == 0) && (i == nASVF)) {
                    if ((cS3 == 5) || (cS4 == 4)) {
                        str1 = str1 + "," + elementoLVASF + "]";
                        continue;
                    }
                    if ((cS3 == 6) || (cS4 == 3)) {
                        str1 = str1 + "," + elementoLVASF + ")";
                        continue;
                    }
                }
            }
        }
        ggbApplet.setTextValue("texto2F2", str1);
    } else {
        alert("no modifica 2");
    }
    ggbApplet.setValue("actualizacionDominioF2", 0);
    ggbApplet.setValue("actualizacionFuncion2", 0);
    ggbApplet.setValue("limites", 1);
    ggbApplet.registerObjectUpdateListener("actualizacion2", "fuerzaActualizacionF2");
    ggbApplet.registerObjectUpdateListener("actualizacion1", "fuerzaActualizacionF1");
    ggbApplet.registerObjectUpdateListener("actualizacion3", "fuerzaActualizacionF3");
}

function fuerzaActualizacionF3() {
    //alert("EUREKA GLOBAL F3");
    ggbApplet.unregisterObjectUpdateListener("actualizacion3");
    ggbApplet.unregisterObjectUpdateListener("actualizacion1");
    ggbApplet.unregisterObjectUpdateListener("actualizacion2");
    var status3 = 0;
    status3 = ggbApplet.getValue("actualizacion3");
    if (status3 == 1) {
        //alert("modifica 3");
        var str = ggbApplet.getValueString("cadenaFiltradaDesigualdades3", false) + "";
        var str1 = "";
        var str2 = str;
        var str3 = "";
        var dominioPorDefecto = ggbApplet.getValueString("cadenaDominioPorDefecto", false) + "";
        var index = 0;
        var cS5 = ggbApplet.getValue("codigoSimbolo5");
        var cS6 = ggbApplet.getValue("codigoSimbolo6");
        var X32 = ggbApplet.getValue("x_{32}");
        var X33 = ggbApplet.getValue("x_{33}");
        //alert("cS5=" + cS5 +"\cS6="+ cS6 +"\X32="+ X32 +"\X33="+ X33);
        if ((cS6 == 2) && (ggbApplet.isDefined("x_{33}") == true)) {
            str1 = X33 + ">=x>=" + X33;
            ggbApplet.setValue("muestraF3entera", 0);
            str2 = str1;
            ggbApplet.setValue("muestraFP3", 1);
            ggbApplet.setValue("leyendaAdvertenciaIntervaloF3", 0);
            ggbApplet.setValue("muestraDominioF3", 1);
            //alert("cS6 =");
        } else if ((cS5 == 2) && (ggbApplet.isDefined("x_{32}") == true)) {
            str1 = X32 + ">=x>=" + X32;
            ggbApplet.setValue("muestraF3entera", 0);
            str2 = str1;
            ggbApplet.setValue("muestraFP3", 1);
            ggbApplet.setValue("leyendaAdvertenciaIntervaloF3", 0);
            ggbApplet.setValue("muestraDominioF3", 1);
            //alert("cS5 =");
        } else if ((ggbApplet.isDefined("x_{32}") == false) && (ggbApplet.isDefined("x_{33}") == false)) {
            str1 = dominioPorDefecto;
            ggbApplet.setValue("muestraF3entera", 1);
            str2 = str1;
            ggbApplet.setValue("muestraFP3", 0);
            ggbApplet.setValue("leyendaAdvertenciaIntervaloF3", 1);
            ggbApplet.setValue("muestraDominioF3", 0);
            //alert("no data 3");
        } else if ((cS5 == 1) && (cS6 == 1)) {
            str1 = dominioPorDefecto;
            ggbApplet.setValue("muestraF3entera", 1);
            str2 = str1;
            ggbApplet.setValue("muestraFP3", 0);
            ggbApplet.setValue("leyendaAdvertenciaIntervaloF3", 1);
            ggbApplet.setValue("muestraDominioF3", 0);
            //alert("no simbolos 3");
        } else if (((cS5 == 1) && (ggbApplet.isDefined("x_{33}") == false)) || ((cS6 == 1) && (ggbApplet.isDefined("x_{32}") == false))) {
            str1 = dominioPorDefecto;
            ggbApplet.setValue("muestraF3entera", 1);
            str2 = str1;
            ggbApplet.setValue("muestraFP3", 0);
            ggbApplet.setValue("leyendaAdvertenciaIntervaloF3", 1);
            ggbApplet.setValue("muestraDominioF3", 0);
            //alert("dato-simbolo no asociados 3");
        } else if ((cS5 == 1) && (ggbApplet.isDefined("x_{32}") == true)) {
            ggbApplet.setValue("muestraF3entera", 0);
            index = str.indexOf("x");
            str1 = str.slice(index);
            str2 = str1;
            ggbApplet.setValue("muestraFP3", 1);
            ggbApplet.setValue("leyendaAdvertenciaIntervaloF3", 1);
            ggbApplet.setValue("muestraDominioF3", 0);
            //alert("sin simbolo izqdo. 3");
        } else if ((cS5 != 1) && (ggbApplet.isDefined("x_{32}") == false)) {
            ggbApplet.setValue("muestraF3entera", 0);
            index = str.indexOf("x");
            str1 = str.slice(index);
            str2 = str1;
            ggbApplet.setValue("muestraFP3", 1);
            ggbApplet.setValue("leyendaAdvertenciaIntervaloF3", 1);
            ggbApplet.setValue("muestraDominioF3", 0);
            //alert("sin dato izqdo. 3");
        } else if ((cS6 == 1) && (ggbApplet.isDefined("x_{33}") == true)) {
            ggbApplet.setValue("muestraF3entera", 0);
            index = str.indexOf("x");
            str1 = str.slice(0, index + 1);
            str2 = str1;
            ggbApplet.setValue("muestraFP3", 1);
            ggbApplet.setValue("leyendaAdvertenciaIntervaloF3", 1);
            ggbApplet.setValue("muestraDominioF3", 0);
            //alert("sin simbolo dcho. 3");
        } else if ((cS6 != 1) && (ggbApplet.isDefined("x_{33}") == false)) {
            ggbApplet.setValue("muestraF3entera", 0);
            index = str.indexOf("x");
            str1 = str.slice(0, index + 1);
            str2 = str1;
            ggbApplet.setValue("muestraFP3", 1);
            ggbApplet.setValue("leyendaAdvertenciaIntervaloF3", 1);
            ggbApplet.setValue("muestraDominioF3", 0);
            //alert("sin dato-simbolo dcho. 3");	
        } else {
            str1 = ggbApplet.evalCommandCAS("domDef3:=cadenaFiltradaDesigualdades3", "");
            ggbApplet.setValue("muestraF3entera", 0);
            ggbApplet.setValue("muestraFP3", 1);
            ggbApplet.setValue("leyendaAdvertenciaIntervaloF3", 0);
            ggbApplet.setValue("muestraDominioF3", 1);
            //alert("default 3");
        }
        ggbApplet.setTextValue("cadenaFiltrada2Desigualdades3", str2);
        ggbApplet.evalCommand("dominioDefinicionF3:=" + str1);
        str3 = ggbApplet.evalCommandCAS("domExtF3:=cadenaFiltrada3DesigualdadesF3", "");
        ggbApplet.evalCommand("dExtF3:=" + str3);
        str1 = ggbApplet.evalCommandCAS("dominioF:=dominioDefinicionF1(x) ∨ dominioDefinicionF2(x) ∨ dominioDefinicionF3(x)", "");
        ggbApplet.evalCommand("dominioDefinicionF:=" + str1);
        //alert("str1--" + str1+"  str2--"+ str2+"  str3--"+str3);
        var nASVF = 0;
        var nADEVF = 0;
        var elementoASVF3 = -100;
        var elementoADEV = -100;
        var cSD = ggbApplet.getValue("codigoSimbolo6");
        var asintotas = [];
        var numAsintotas = ggbApplet.getValue("numeroAsintotasVF3");
        var discontEvit = [];
        var discontEvitV = [];
        var numDE = ggbApplet.getValue("numeroDiscontinuidadesEvitablesF3");
        var numDEV = 0;
        var str = "{";
        var pto = {
            x: 0,
            y: 0
        };
        var index = 0;
        ggbApplet.evalCommand("listaValidadaADEF3={}");
        ggbApplet.evalCommand("listaCodigosASF3={}");
        for (var i = 0; i <= numAsintotas - 1; i++) {
            asintotas[i] = ggbApplet.getListValue("abscisasAsintotasF3", i + 1);
        }
        for (var j = 0; j <= numDE - 1; j++) {
            discontEvit[j] = ggbApplet.getListValue("listaAbscisasDiscontinuidadesEvitablesF3", j + 1);
        }
        nASVF = ggbApplet.getValue("numeroASVF3");
        //alert("numDEV=" + numDEV + "   AbsValDE=" + str + "   nASVF=" + nASVF);
        for (var k = 1; k <= nASVF; k++) {
            elementoASVF3 = ggbApplet.getListValue("listaValidadaASF3", k);
            if (asintotas.includes(elementoASVF3)) {
                ggbApplet.setListValue("listaCodigosASF3", k, 1);
            } else if (discontEvit.includes(elementoASVF3)) {
                ggbApplet.setListValue("listaCodigosASF3", k, 2);
                numDEV = discontEvitV.push(elementoASVF3);
            } else if ((nASVF == 1) && (cSD == 2)) {
                ggbApplet.setListValue("listaCodigosASF3", k, 4);
            } else {
                ggbApplet.setListValue("listaCodigosASF3", k, 0);
            }
        }
        if (numDEV != 0) {
            for (var n = 1; n <= numDEV; n++) {
                if (n == numDEV) {
                    str += discontEvitV[n - 1] + "}";
                } else {
                    str += discontEvitV[n - 1] + ",";
                }
            }
            ggbApplet.evalCommand("listaValidadaADEF3=" + str);
            //alert("numDEV=" + numDEV + "   AbsValDE=" + str + "   nASVF=" + nASVF);
        } else {
            ggbApplet.evalCommand("listaValidadaADEF3={}");
        }
        //código generador de los puntos las DEs
        ggbApplet.evalCommand("listaValidadaDiscontinuidadesEvitablesF3={}");
        str = "{"
        nADEVF = discontEvitV.length;
        if (nADEVF != 0) {
            for (var k = 0; k <= nADEVF - 1; k++) {
                elementoADEV = discontEvitV[k];
                index = discontEvit.indexOf(elementoADEV);
                ggbApplet.evalCommand("PtoAuxiliar3=Element(listaDiscontinuidadesEvitablesF3," + (index + 1) + ")");
                pto.x = ggbApplet.getXcoord("PtoAuxiliar3");
                pto.y = ggbApplet.getYcoord("PtoAuxiliar3");
                //alert("" + pto.x + "");
                if (k == nADEVF - 1) {
                    str += "(" + pto.x + "," + pto.y + ")}";
                } else {
                    str += "(" + pto.x + "," + pto.y + "),"
                }
            }
            ggbApplet.evalCommand("listaValidadaDiscontinuidadesEvitablesF3=" + str);
        } else {
            ggbApplet.evalCommand("listaValidadaDiscontinuidadesEvitablesF3={}");
        }
        /*codigo de cómputo e impresion del dominio*/
        //var nASVF = ggbApplet.getValue("numeroASVF3");
        var elementoLVASF = -100;
        var codigoASF = 5;
        var str1 = "";
        var sInf = ggbApplet.getValueString("simboloInfinito", false) + "";
        var sUnion = ggbApplet.getValueString("simboloUnion", false) + "";
        var sVacio = ggbApplet.getValueString("simboloVacio", false) + "";
        var cS5 = ggbApplet.getValue("codigoSimbolo5");
        var cS6 = ggbApplet.getValue("codigoSimbolo6");
        ggbApplet.evalCommand("errorDEpuntoAisladoF3=false");
        if (nASVF == 1) {
            elementoLVASF = ggbApplet.getListValue("listaValidadaASF3", 1);
            codigoASF = ggbApplet.getListValue("listaCodigosASF3", 1);
            if (((codigoASF == 1) || (codigoASF == 2))) {
                if ((cS5 == 3) || (cS6 == 6)) {
                    str1 = str1 + "(" + elementoLVASF + "," + sInf + ")";
                }
                if ((cS5 == 4) || (cS6 == 5)) {
                    str1 = str1 + "(" + elementoLVASF + "," + sInf + ")";
                }
                if ((cS5 == 5) || (cS6 == 4)) {
                    str1 = str1 + "(-" + sInf + "," + elementoLVASF + ")";
                }
                if ((cS5 == 6) || (cS6 == 3)) {
                    str1 = str1 + "(-" + sInf + "," + elementoLVASF + ")";
                }
                //v3
                if (cS6 == 2) {
                    str1 = str1 + sVacio;
                    ggbApplet.evalCommand("errorDEpuntoAisladoF3=true");
                }
            } else {
                if ((cS5 == 3) || (cS6 == 6)) {
                    str1 = str1 + "(" + elementoLVASF + "," + sInf + ")";
                }
                if ((cS5 == 4) || (cS6 == 5)) {
                    str1 = str1 + "[" + elementoLVASF + "," + sInf + ")";
                }
                if ((cS5 == 5) || (cS6 == 4)) {
                    str1 = str1 + "(-" + sInf + "," + elementoLVASF + "]";
                }
                if ((cS5 == 6) || (cS6 == 3)) {
                    str1 = str1 + "(-" + sInf + "," + elementoLVASF + ")";
                }
                if (cS6 == 2) {
                    str1 = str1 + "{" + elementoLVASF + "}";
                }
            }
        } else {
            for (var i = 1; i <= nASVF; i++) {
                elementoLVASF = ggbApplet.getListValue("listaValidadaASF3", i);
                codigoASF = ggbApplet.getListValue("listaCodigosASF3", i);
                if (((codigoASF == 1) || (codigoASF == 2)) && ((i != 1) && (i != nASVF))) {
                    str1 = str1 + "," + elementoLVASF + ")" + sUnion + "(" + elementoLVASF;
                    continue;
                } else if (((codigoASF == 1) || (codigoASF == 2)) && (i == 1) && ((cS5 == 1) || (cS6 == 1))) {
                    if ((cS5 == 5) || (cS6 == 4)) {
                        str1 = str1 + "(-" + sInf + "," + elementoLVASF + ")" + sUnion + "(" + elementoLVASF;
                        continue;
                    }
                    if ((cS5 == 6) || (cS6 == 3)) {
                        str1 = str1 + "(-" + sInf + "," + elementoLVASF + ")" + sUnion + "(" + elementoLVASF;
                        continue;
                    }
                    //v2
                    if ((cS5 == 4) || (cS6 == 5)) {
                        str1 = str1 + "(" + elementoLVASF;
                        continue;
                    }
                    if ((cS5 == 3) || (cS6 == 6)) {
                        str1 = str1 + "(" + elementoLVASF;
                        continue;
                    }
                } else if (((codigoASF == 1) || (codigoASF == 2)) && (i == 1) && ((cS5 != 1) && (cS6 != 1))) {
                    if ((cS5 == 6) || (cS6 == 3)) {
                        str1 = str1 + "(" + elementoLVASF;
                        continue;
                    }
                    if ((cS5 == 5) || (cS6 == 4)) {
                        str1 = str1 + "(" + elementoLVASF;
                        continue;
                    }
                } else if (((codigoASF == 1) || (codigoASF == 2)) && (i == nASVF) && ((cS5 == 1) || (cS6 == 1))) {
                    if ((cS5 == 3) || (cS6 == 6)) {
                        str1 = str1 + "," + elementoLVASF + ")" + sUnion + "(" + elementoLVASF + "," + sInf + ")"
                        continue;
                    }
                    if ((cS5 == 4) || (cS6 == 5)) {
                        str1 = str1 + "," + elementoLVASF + ")" + sUnion + "(" + elementoLVASF + "," + sInf + ")"
                        continue;
                    }
                    //v2
                    if ((cS5 == 6) || (cS6 == 3)) {
                        str1 = str1 + "," + elementoLVASF + ")";
                        continue;
                    }
                    if ((cS5 == 5) || (cS6 == 4)) {
                        str1 = str1 + "," + elementoLVASF + ")";
                        continue;
                    }
                } else if (((codigoASF == 1) || (codigoASF == 2)) && (i == nASVF) && ((cS5 != 1) && (cS6 != 1))) {
                    if ((cS5 == 6) || (cS6 == 3)) {
                        str1 = str1 + "," + elementoLVASF + ")";
                        continue;
                    }
                    if ((cS5 == 5) || (cS6 == 4)) {
                        str1 = str1 + "," + elementoLVASF + ")";
                        continue;
                    }
                } else if ((codigoASF == 0) && (i == 1)) {
                    if ((cS5 == 3) || (cS6 == 6)) {
                        str1 = str1 + "(" + elementoLVASF;
                        continue;
                    }
                    if ((cS5 == 4) || (cS6 == 5)) {
                        str1 = str1 + "[" + elementoLVASF;
                        continue;
                    }
                } else if ((codigoASF == 0) && (i == nASVF)) {
                    if ((cS5 == 5) || (cS6 == 4)) {
                        str1 = str1 + "," + elementoLVASF + "]";
                        continue;
                    }
                    if ((cS5 == 6) || (cS6 == 3)) {
                        str1 = str1 + "," + elementoLVASF + ")";
                        continue;
                    }
                }
            }
        }
        ggbApplet.setTextValue("texto2F3", str1);
    } else {
        alert("no modifica 3");
    }
    ggbApplet.setValue("actualizacionDominioF3", 0);
    ggbApplet.setValue("actualizacionFuncion3", 0);
    ggbApplet.setValue("limites", 1);
    ggbApplet.registerObjectUpdateListener("actualizacion3", "fuerzaActualizacionF3");
    ggbApplet.registerObjectUpdateListener("actualizacion1", "fuerzaActualizacionF1");
    ggbApplet.registerObjectUpdateListener("actualizacion2", "fuerzaActualizacionF2");
}