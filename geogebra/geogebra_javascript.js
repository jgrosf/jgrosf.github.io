
console.log("geogebra-javascript.js cargado correctamente");

function ggbOnInit() {
	console.log("ggbOnInit() llamada");
	esperarAppletYActivar();
}
// si GeoGebra nunca llama a ggbOnInit, se fuerza
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM listo, esperando ggbApplet...");
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
            console.error("No se detectó ggbApplet tras varios intentos");
        }
    }, 200);
}

function inicializarListeners(ggbApplet) {
	console.log("GeoGebra listo. Listeners activados.");
    ggbApplet.registerObjectClickListener("actualizacion1", "fuerzaActualizacionF1");
    ggbApplet.registerObjectUpdateListener("actualizacion2", "fuerzaActualizacionF2");
    ggbApplet.registerObjectUpdateListener("actualizacion3", "fuerzaActualizacionF3");
    ggbApplet.registerObjectUpdateListener("leyendaAdvertenciaIntervalo", "actualizaAdvertencia");
	ggbAplet.refreshViews();
}

function fuerzaActualizacionF1() {
    fuerzaActualizacionFN(1);
    return;
}

window.fuerzaActualizacionF1 = fuerzaActualizacionF1;

function fuerzaActualizacionF2() {
    fuerzaActualizacionFN(2);
    return;
}

window.fuerzaActualizacionF2 = fuerzaActualizacionF2;

function fuerzaActualizacionF3() {
    fuerzaActualizacionFN(3);
    return;
}

window.fuerzaActualizacionF3 = fuerzaActualizacionF3;

function fuerzaActualizacionFN(n) {
    //version basica, sin calculo de limites, derivadas o discontinuidades de salto finito
    alert("EUREKA GLOBAL F" + n);
    ggbApplet.unregisterObjectUpdateListener("actualizacion3");
    ggbApplet.unregisterObjectUpdateListener("actualizacion1");
    ggbApplet.unregisterObjectUpdateListener("actualizacion2");
    ggbApplet.unregisterObjectUpdateListener("leyendaAdvertenciaIntervalo");
    var statusN = 0;
    var error = 0;
    statusN = ggbApplet.getValue("actualizacion" + n);
    //error = ggbApplet.getValue("error");
    if (statusN == 1) {
    computoDominioDefinicion(n);
    generaCodigosAbscisasValidadas(n);
    discriminaErroresDominio();
    /*codigo de cómputo e impresion del dominio*/
    computoImpresionDominio(n);
} else {
    alert("Función no modificada");
}

ggbApplet.setValue("actualizacionDominioF" + n, 0);
ggbApplet.setValue("actualizacionFuncion" + n, 0);
ggbApplet.registerObjectUpdateListener("actualizacion3", "fuerzaActualizacionF3");
ggbApplet.registerObjectUpdateListener("actualizacion1", "fuerzaActualizacionF1");
ggbApplet.registerObjectUpdateListener("actualizacion2", "fuerzaActualizacionF2");
ggbApplet.registerObjectUpdateListener("leyendaAdvertenciaIntervalo", "actualizaAdvertencia");
return;
}

window.fuerzaActualizacionFN = fuerzaActualizacionFN;

function actualizaAdvertencia() {
    ggbApplet.unregisterObjectUpdateListener("leyendaAdvertenciaIntervalo");
    ggbApplet.unregisterObjectUpdateListener("actualizacion3");
    ggbApplet.unregisterObjectUpdateListener("actualizacion1");
    ggbApplet.unregisterObjectUpdateListener("actualizacion2");
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
    ggbApplet.registerObjectUpdateListener("actualizacion1", "fuerzaActualizacionF1");
    ggbApplet.registerObjectUpdateListener("actualizacion2", "fuerzaActualizacionF2");
    ggbApplet.registerObjectUpdateListener("actualizacion3", "fuerzaActualizacionF3");
    ggbApplet.registerObjectUpdateListener("leyendaAdvertenciaIntervalo", "actualizaAdvertencia");
}

  	window.actualizaAdvertencia = actualizaAdvertencia;

function arrayJS2listGGB(array, list) {
    var n = array.length;
    var str = "{"
    for (var k = 1; k <= n; k++) {
        if (k == n) {
            str += array[k - 1] + "}";
        } else {
            str += array[k - 1] + ",";
        }
    }
    //alert(str);
    ggbApplet.evalCommand("" + list + "=" + str);
}

  	window.arrayJS2listGGB = arrayJS2listGGB;

function listGGB2arrayJS(list, array) {
    var num = 0;
    //var arrayAux = [];
    ggbApplet.evalCommand("LongListAux=Length(" + list + ")");
    num = ggbApplet.getValue("LongListAux");
    for (var k = 1; k <= num; k++) {
        array[k - 1] = ggbApplet.getListValue("" + list + "", k);
    }
}

    window.listGGB2arrayJS = listGGB2arrayJS;

function isInfinite(x) {
    var esInfinito = (!isFinite(x)) && (!isNaN(x))
    return esInfinito;
}

    window.isInfinite = isInfinite;

function excepcionPtoAislado() {
    var cS = 0;
    var X = 0;
    var numDE = 0;
    var abscisaDE = 0;
    var tfj = 0; //tramo función j
    var tfk = 0; //tramo función k
    var ordenDominioFunciones = [];
    var numeroFunciones = ggbApplet.getValue("numeroFunciones");

    for (j = 1; j <= 3; j++) {
        cs = ggbApplet.getValue("codigoSimbolo" + 2 * j);
        if (cs == 2) {
            X = ggbApplet.getValue("x_{" + j + "" + j + "}");
            //alert("x_{" + j + "" + j + "}=" + X + "");
            for (k = 1; k <= 3; k++) {
                if (k != j) {
                    ggbApplet.evalCommand("inclusionAux=dominioDefinicionF" + k + "(" + X + ")");
                    if (ggbApplet.getValue("inclusionAux")) {
                        numDE = ggbApplet.getValue("numeroDiscontinuidadesEvitablesF" + k);
                        if (numDE > 0) {
                            for (l = 1; l <= numDE; l++) {
                                abscisaDE = ggbApplet.getListValue("listaValidadaADEF" + k, l);
                                if (abscisaDE == X) {
                                    for (var i = 0; i <= numeroFunciones - 1; i++) {
                                        ordenDominioFunciones[i] = ggbApplet.getListValue("ordenDominioFunciones", i + 1);
                                    }
                                    tfj = ordenDominioFunciones.indexOf(j) + 1;
                                    tfk = ordenDominioFunciones.indexOf(k) + 1;
                                    //eFjk=0;
                                    ggbApplet.setValue("errorFunciones" + j + k, 0);
                                    //eFkj=0;
                                    ggbApplet.setValue("errorFunciones" + k + j, 0);
                                    //eSTjk=0;
                                    ggbApplet.setValue("errorSolapamientoTramos" + tfj + tfk, 0);
                                    //eSTkj=0;
                                    ggbApplet.setValue("errorSolapamientoTramos" + tfk + tfj, 0);
                                    //eRFkj=0;
                                    ggbApplet.setValue("errorRecubrimientoFunciones" + k + j, 0);
                                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada" + (3 + 2 * j) + ",1,1,1)");
                                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada" + (3 + 2 * k) + ",1,1,1)");
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

   window.excepcionPtoAislado = excepcionPtoAislado;

function discriminaErroresDominio() {
    var fti = 0;
    var ftj = 0;
    var maxi = 0;
    var minj = 0;
    var maxj = 0;
    var nf = ggbApplet.getValue("numeroFunciones");
    var nMaxF = 3;

    var x10 = ggbApplet.getValue("x_{10}");
    var x11 = ggbApplet.getValue("x_{11}");
    var x21 = ggbApplet.getValue("x_{21}");
    var x22 = ggbApplet.getValue("x_{22}");
    var x32 = ggbApplet.getValue("x_{32}");
    var x33 = ggbApplet.getValue("x_{33}");
    var min1 = ggbApplet.getValue("minimoIntervaloFuncion1");
    var max1 = ggbApplet.getValue("maximoIntervaloFuncion1");
    var min2 = ggbApplet.getValue("minimoIntervaloFuncion2");
    var max2 = ggbApplet.getValue("maximoIntervaloFuncion2");
    var min3 = ggbApplet.getValue("minimoIntervaloFuncion3");
    var max3 = ggbApplet.getValue("maximoIntervaloFuncion3");
    var eF = 0;
    var eF12 = 0;
    var eRF12 = 0
    var eF21 = 0;
    var eRF21 = 0;
    var eF13 = 0;
    var eRF13 = 0;
    var eF31 = 0;
    var eRF31 = 0;
    var eF23 = 0;
    var eRF23 = 0;
    var eF32 = 0;
    var eRF32 = 0;
    var eDF1 = 0;
    var eDF2 = 0;
    var eDF3 = 0;

    for (i = 1; i <= (nMaxF - 1); i++) {
        for (j = i + 1; j <= nMaxF; j++) {
            ggbApplet.setValue("errorFunciones" + i + j, 0);
            ggbApplet.setValue("errorFunciones" + j + i, 0);
            ggbApplet.setValue("errorRecubrimientoFunciones" + i + j, 0);
            ggbApplet.setValue("errorRecubrimientoFunciones" + j + i, 0);
            ggbApplet.setValue("errorSolapamientoTramos" + i + j, 0);
        }
    }
    if (nf > 1) {
        for (i = 1; i <= (nf - 1); i++) {
            fti = ggbApplet.getListValue("ordenDominioFunciones", i);
            for (j = i + 1; j <= nf; j++) {
                ftj = ggbApplet.getListValue("ordenDominioFunciones", j);
                maxi = ggbApplet.getValue("maximoIntervaloFuncion" + fti);
                minj = ggbApplet.getValue("minimoIntervaloFuncion" + ftj);
                maxj = ggbApplet.getValue("maximoIntervaloFuncion" + ftj);
                if (maxi > minj) {
                    ggbApplet.setValue("errorFunciones" + fti + ftj, 1);
                    ggbApplet.setValue("errorSolapamientoTramos" + i + j, 1);
                } else {
                    ggbApplet.setValue("errorSolapamientoTramos" + i + j, 0);
                    ggbApplet.setValue("errorFunciones" + fti + ftj, 0);
                }
                if (maxi >= maxj) {
                    ggbApplet.setValue("errorRecubrimientoFunciones" + fti + ftj, 1);
                } else {
                    ggbApplet.setValue("errorRecubrimientoFunciones" + fti + ftj, 0);
                }
            }
        }
    }

    eF = ggbApplet.getValue("errorFunciones");
    eF12 = ggbApplet.getValue("errorFunciones12");
    eRF12 = ggbApplet.getValue("errorRecubrimientoFunciones12");
    eF21 = ggbApplet.getValue("errorFunciones21");
    eRF21 = ggbApplet.getValue("errorRecubrimientoFunciones21");
    eF13 = ggbApplet.getValue("errorFunciones13");
    eRF13 = ggbApplet.getValue("errorRecubrimientoFunciones13");
    eF31 = ggbApplet.getValue("errorFunciones31");
    eRF31 = ggbApplet.getValue("errorRecubrimientoFunciones31");
    eF23 = ggbApplet.getValue("errorFunciones23");
    eRF23 = ggbApplet.getValue("errorRecubrimientoFunciones23");
    eF32 = ggbApplet.getValue("errorFunciones32");
    eRF32 = ggbApplet.getValue("errorRecubrimientoFunciones32");

    eDF1 = ggbApplet.getValue("errorDominioFuncion1");
    eDF2 = ggbApplet.getValue("errorDominioFuncion2");
    eDF3 = ggbApplet.getValue("errorDominioFuncion3");

    if (eF == 1) {

        if (eF12 == 1) {
            if (ggbApplet.isDefined("x_{10}") && ggbApplet.isDefined("x_{11}")) {
                if (x10 == max1) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada4,1,0,0.2)");
                } else {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada5,1,0,0.2)");
                }
            } else {
                if (!(ggbApplet.isDefined("x_{10}")) && (ggbApplet.isDefined("x_{11}"))) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada5,1,0,0.2)");
                }
                if ((ggbApplet.isDefined("x_{10}")) && !(ggbApplet.isDefined("x_{11}"))) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada4,1,0,0.2)");
                }
            }
            if (ggbApplet.isDefined("x_{21}") && ggbApplet.isDefined("x_{22}")) {
                if (x21 == min2) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada6,1,0,0.2)");
                    if (eRF12 == 1) {
                        ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada7,1,0,0.2)");
                    }
                } else {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada7,1,0,0.2)");
                    if (eRF12 == 1) {
                        ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada6,1,0,0.2)");
                    }
                }
            } else {
                if (!(ggbApplet.isDefined("x_{21}")) && (ggbApplet.isDefined("x_{22}"))) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada7,1,0,0.2)");
                }
                if ((ggbApplet.isDefined("x_{21}")) && !(ggbApplet.isDefined("x_{22}"))) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada6,1,0,0.2)");
                }
            }
        }
        if (eF21 == 1) {
            if (ggbApplet.isDefined("x_{10}") && ggbApplet.isDefined("x_{11}")) {
                if (x21 == max2) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada6,1,0,0.2)");
                } else {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada7,1,0,0.2)");
                }
            } else {
                if (!(ggbApplet.isDefined("x_{21}")) && (ggbApplet.isDefined("x_{22}"))) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada7,1,0,0.2)");
                }
                if ((ggbApplet.isDefined("x_{21}")) && !(ggbApplet.isDefined("x_{22}"))) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada6,1,0,0.2)");
                }
            }
            if (ggbApplet.isDefined("x_{10}") && ggbApplet.isDefined("x_{11}")) {
                if (x10 == min1) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada4,1,0,0.2)");
                    if (eRF21 == 1) {
                        ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada5,1,0,0.2)");
                    }
                } else {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada5,1,0,0.2)");
                    if (eRF21 == 1) {
                        ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada4,1,0,0.2)");
                    }
                }
            } else {
                if (!(ggbApplet.isDefined("x_{10}")) && (ggbApplet.isDefined("x_{11}"))) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada5,1,0,0.2)");
                }
                if ((ggbApplet.isDefined("x_{10}")) && !(ggbApplet.isDefined("x_{11}"))) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada4,1,0,0.2)");
                }
            }
        }
        if (eF13 == 1) {
            if (ggbApplet.isDefined("x_{10}") && ggbApplet.isDefined("x_{11}")) {
                if (x10 == max1) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada4,1,0,0.2)");
                } else {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada5,1,0,0.2)");
                }
            } else {
                if (!(ggbApplet.isDefined("x_{10}")) && (ggbApplet.isDefined("x_{11}"))) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada5,1,0,0.2)");
                }
                if ((ggbApplet.isDefined("x_{10}")) && !(ggbApplet.isDefined("x_{11}"))) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada4,1,0,0.2)");
                }
            }
            if (ggbApplet.isDefined("x_{32}") && ggbApplet.isDefined("x_{33}")) {
                if (x32 == min3) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada8,1,0,0.2)");
                    if (eRF13 == 1) {
                        ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada9,1,0,0.2)");
                    }
                } else {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada9,1,0,0.2)");
                    if (eRF13 == 1) {
                        ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada8,1,0,0.2)");
                    }
                }
            } else {
                if (!(ggbApplet.isDefined("x_{32}")) && (ggbApplet.isDefined("x_{33}"))) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada9,1,0,0.2)");
                }
                if ((ggbApplet.isDefined("x_{32}")) && !(ggbApplet.isDefined("x_{33}"))) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada8,1,0,0.2)");
                }
            }
        }
        if (eF31 == 1) {
            if (ggbApplet.isDefined("x_{32}") && ggbApplet.isDefined("x_{33}")) {
                if (x32 == max3) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada8,1,0,0.2)");
                } else {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada9,1,0,0.2)");
                }
            } else {
                if (!(ggbApplet.isDefined("x_{32}")) && (ggbApplet.isDefined("x_{33}"))) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada9,1,0,0.2)");
                }
                if ((ggbApplet.isDefined("x_{32}")) && !(ggbApplet.isDefined("x_{33}"))) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada8,1,0,0.2)");
                }
            }
            if (ggbApplet.isDefined("x_{10}") && ggbApplet.isDefined("x_{11}")) {
                if (x10 == min1) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada4,1,0,0.2)");
                    if (eRF31 == 1) {
                        ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada5,1,0,0.2)");
                    }
                } else {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada5,1,0,0.2)");
                    if (eRF31 == 1) {
                        ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada4,1,0,0.2)");
                    }
                }
            } else {
                if (!(ggbApplet.isDefined("x_{10}")) && (ggbApplet.isDefined("x_{11}"))) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada5,1,0,0.2)");
                }
                if ((ggbApplet.isDefined("x_{10}")) && !(ggbApplet.isDefined("x_{11}"))) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada4,1,0,0.2)");
                }
            }
        }
        if (eF23 == 1) {
            if (ggbApplet.isDefined("x_{21}") && ggbApplet.isDefined("x_{22}")) {
                if (x21 == max2) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada6,1,0,0.2)");
                } else {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada7,1,0,0.2)");
                }
            } else {
                if (!(ggbApplet.isDefined("x_{21}")) && (ggbApplet.isDefined("x_{22}"))) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada7,1,0,0.2)");
                }
                if ((ggbApplet.isDefined("x_{21}")) && !(ggbApplet.isDefined("x_{22}"))) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada6,1,0,0.2)");
                }
            }
            if (ggbApplet.isDefined("x_{32}") && ggbApplet.isDefined("x_{33}")) {
                if (x32 == min3) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada8,1,0,0.2)");
                    if (eRF23 == 1) {
                        ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada9,1,0,0.2)");
                    }
                } else {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada9,1,0,0.2)");
                    if (eRF23 == 1) {
                        ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada8,1,0,0.2)");
                    }
                }
            } else {
                if (!(ggbApplet.isDefined("x_{32}")) && (ggbApplet.isDefined("x_{33}"))) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada9,1,0,0.2)");
                }
                if ((ggbApplet.isDefined("x_{32}")) && !(ggbApplet.isDefined("x_{33}"))) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada8,1,0,0.2)");
                }
            }
        }
        if (eF32 == 1) {
            if (ggbApplet.isDefined("x_{32}") && ggbApplet.isDefined("x_{33}")) {
                if (x32 == max3) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada8,1,0,0.2)");
                } else {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada9,1,0,0.2)");
                }
            } else {
                if (!(ggbApplet.isDefined("x_{32}")) && (ggbApplet.isDefined("x_{33}"))) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada9,1,0,0.2)");
                }
                if ((ggbApplet.isDefined("x_{32}")) && !(ggbApplet.isDefined("x_{33}"))) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada8,1,0,0.2)");
                }
            }
            if (ggbApplet.isDefined("x_{21}") && ggbApplet.isDefined("x_{22}")) {
                if (x21 == min2) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada6,1,0,0.2)");
                    if (eRF32 == 1) {
                        ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada7,1,0,0.2)");
                    }
                } else {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada7,1,0,0.2)");
                    if (eRF32 == 1) {
                        ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada6,1,0,0.2)");
                    }
                }
            } else {
                if (!(ggbApplet.isDefined("x_{21}")) && (ggbApplet.isDefined("x_{22}"))) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada7,1,0,0.2)");
                }
                if ((ggbApplet.isDefined("x_{21}")) && !(ggbApplet.isDefined("x_{22}"))) {
                    ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada6,1,0,0.2)");
                }
            }
        }
    }
    excepcionPtoAislado();
    //blanqueado CEs....añadir lógica para tener en cuenta eDFi y eRFij (errorDominioFuncioni) 
    if ((eF12 == 0) && (eF13 == 0) && (eRF21 == 0) && (eRF31 == 0) && (eDF1 == 0)) {
        if (x10 == max1) {
            ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada4,1,1,1)");
        } else {
            ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada5,1,1,1)");
        }
    }
    if ((eF21 == 0) && (eF31 == 0) && (eDF1 == 0)) {
        if (x10 == min1) {
            ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada4,1,1,1)");
        } else {
            ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada5,1,1,1)");
        }
    }
    if ((eF21 == 0) && (eF23 == 0) && (eRF12 == 0) && (eRF32 == 0) && (eDF2 == 0)) {
        if (x21 == max2) {
            ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada6,1,1,1)");
        } else {
            ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada7,1,1,1)");
        }
    }
    if ((eF12 == 0) && (eF32 == 0) && (eDF2 == 0)) {
        if (x21 == min2) {
            ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada6,1,1,1)");
        } else {
            ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada7,1,1,1)");
        }
    }
    if ((eF31 == 0) && (eF32 == 0) && (eRF13 == 0) && (eRF23 == 0) && (eDF3 == 0)) {
        if (x32 == max3) {
            ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada8,1,1,1)");
        } else {
            ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada9,1,1,1)");
        }
    }
    if ((eF13 == 0) && (eF23 == 0) && (eDF3 == 0)) {
        if (x32 == min3) {
            ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada8,1,1,1)");
        } else {
            ggbApplet.evalCommand("SetBackgroundColor(CasillaDeEntrada9,1,1,1)");
        }
    }
}

   window.discriminaErroresDominio = discriminaErroresDominio;

function generaCodigosAbscisasValidadas(n) {
    //version basica, sin calculo de discontinuidades de salto finito
    var nASVF = 0;
    var nADEVF = 0;
    var elementoASVF = -100;
    var elementoADEV = -100;
    var cSD = ggbApplet.getValue("codigoSimbolo" + (2 * n));
    var asintotas = [];
    var numA = 0;
    var numAsintotas = ggbApplet.getValue("numeroAsintotasVF" + n);
    var discontEvit = [];
    var discontEvitV = [];
    var numDE = ggbApplet.getValue("numeroDiscontinuidadesEvitablesF" + n);
    var numDEV = 0;
    var discontSaltoF = [];
    var discontSaltoFV = [];
    var numDiscontSaltoF = ggbApplet.getValue("numeroADSFF" + n);
    var numDSFV = 0;
    var str = "{";
    var pto = {
        x: 0,
        y: 0
    };
    var index = 0;
    //análisis de las listas validadas de DEs, AVs para generar la lista de códigos de las abscisas validadas
    ggbApplet.evalCommand("listaValidadaADEF" + n + "={}");
    ggbApplet.evalCommand("abscisasValidadasDSFF" + n + "={}");
    ggbApplet.evalCommand("listaCodigosASF" + n + "={}");
    if (numAsintotas != 0) {
        for (var i = 0; i <= numAsintotas - 1; i++) {
            asintotas[i] = ggbApplet.getListValue("abscisasAsintotasF" + n, i + 1);
        }
    }
    if (numDE != 0) {
        for (var j = 0; j <= numDE - 1; j++) {
            discontEvit[j] = ggbApplet.getListValue("listaAbscisasDiscontinuidadesEvitablesF" + n, j + 1);
        }
    }
    if (numDiscontSaltoF != 0) {
        for (var k = 0; k <= numDiscontSaltoF - 1; k++) {
            discontSaltoF[k] = ggbApplet.getListValue("abscisasDSFF" + n, k + 1);
        }
    }
    nASVF = ggbApplet.getValue("numeroASVF" + n);
    alert("numDEV=" + numDEV + "   AbsValDE=" + str + "   nASVF=" + nASVF);
    for (var k = 1; k <= nASVF; k++) {
        elementoASVF = ggbApplet.getListValue("listaValidadaASF" + n, k);
        if (asintotas.includes(elementoASVF)) {
            ggbApplet.setListValue("listaCodigosASF" + n, k, 1);
            numA++;
            //alert("numero asintotas validadas= "+numA+"");
            //no necesito graficar los puntos de AVs validadas, pero he de saber si hay AVs en el intervalo de definición de fpi
            //comprobacionAsintotasV = true;
        } else if (discontEvit.includes(elementoASVF)) {
            ggbApplet.setListValue("listaCodigosASF" + n, k, 2);
            numDEV = discontEvitV.push(elementoASVF);
            //comprobacionDiscEvitable = true;
            //salvar las DEs validadas para graficar los puntos
        } else if ((nASVF == 1) && (cSD == 2)) {
            //punto aislado
            ggbApplet.setListValue("listaCodigosASF" + n, k, 4);
            //comprobacionPtoAislado = true;
        } else if (discontSaltoF.includes(elementoASVF)) {
            ggbApplet.setListValue("listaCodigosASF" + n, k, 3);
            numDSFV = discontSaltoFV.push(elementoASVF);
            //comprobacionDiscSaltoFinito = true;
        } else {
            //extremo del intervalo sin ser AVs,DEs....
            ggbApplet.setListValue("listaCodigosASF" + n, k, 0);
        }
    }
    ggbApplet.setValue("numeroAAVF" + n, numA);
    //alert("numero DSFs validadas= " + numDSFV + "");
    //creación de las listas globales de abscisas validadas de DEs para graficar ptos DEs
    if (numDEV != 0) {
        for (var k = 1; k <= numDEV; k++) {
            if (k == numDEV) {
                str += discontEvitV[k - 1] + "}";
            } else {
                str += discontEvitV[k - 1] + ",";
            }
        }
        ggbApplet.evalCommand("listaValidadaADEF" + n + "=" + str);
        //alert("numDEV=" + numDEV + "   AbsValDE=" + str + "   nASVF=" + nASVF);
        //arrayJS2listGGB(discontEvitV,"listaValidadaADEF"+n);
    } else {
        ggbApplet.evalCommand("listaValidadaADEF" + n + "={}");
    }
    //código generador de los puntos las DEs a graficar
    ggbApplet.evalCommand("listaValidadaDiscontinuidadesEvitablesF" + n + "={}");
    str = "{";
    nADEVF = discontEvitV.length;
    if (nADEVF != 0) {
        for (var k = 0; k <= nADEVF - 1; k++) {
            elementoADEV = discontEvitV[k];
            index = discontEvit.indexOf(elementoADEV);
            ggbApplet.evalCommand("PtoAuxiliar" + n + "=Element(listaDiscontinuidadesEvitablesF" + n + "," + (index + 1) + ")");
            pto.x = ggbApplet.getXcoord("PtoAuxiliar" + n);
            pto.y = ggbApplet.getYcoord("PtoAuxiliar" + n);
            //alert("" + pto.x + "");
            if (k == nADEVF - 1) {
                str += "(" + pto.x + "," + pto.y + ")}";
            } else {
                str += "(" + pto.x + "," + pto.y + "),"
            }
        }
        ggbApplet.evalCommand("listaValidadaDiscontinuidadesEvitablesF" + n + "=" + str);
    } else {
        ggbApplet.evalCommand("listaValidadaDiscontinuidadesEvitablesF" + n + "={}");
    }
    return;
}

   window.generaCodigosAbscisasValidadas = generaCodigosAbscisasValidadas;

function computoImpresionDominio(n) {
    /*codigo de cómputo e impresion del dominio*/
    var elementoLVASF = -100;
    var codigoASF = 5;
    var str1 = "";
    var sInf = ggbApplet.getValueString("simboloInfinito", false) + "";
    var sUnion = ggbApplet.getValueString("simboloUnion", false) + "";
    var sVacio = ggbApplet.getValueString("simboloVacio", false) + "";
    var cSi = ggbApplet.getValue("codigoSimbolo" + (2 * n - 1));
    var cSd = ggbApplet.getValue("codigoSimbolo" + (2 * n));
    ggbApplet.evalCommand("errorDEpuntoAisladoF" + n + "=false");
    nASVF = ggbApplet.getValue("numeroASVF" + n);
    if (nASVF == 1) {
        elementoLVASF = ggbApplet.getListValue("listaValidadaASF" + n, 1);
        codigoASF = ggbApplet.getListValue("listaCodigosASF" + n, 1);
        if (((codigoASF == 1) || (codigoASF == 2))) {
            if ((cSi == 3) || (cSd == 6)) {
                str1 = str1 + "(" + elementoLVASF + "," + sInf + ")";
            }
            if ((cSi == 4) || (cSd == 5)) {
                str1 = str1 + "(" + elementoLVASF + "," + sInf + ")";
            }
            if ((cSi == 5) || (cSd == 4)) {
                str1 = str1 + "(-" + sInf + "," + elementoLVASF + ")";
            }
            if ((cSi == 6) || (cSd == 3)) {
                str1 = str1 + "(-" + sInf + "," + elementoLVASF + ")";
            }
            //v3
            if (cSd == 2) {
                str1 = str1 + sVacio;
                ggbApplet.evalCommand("errorDEpuntoAisladoF" + n + "=true");
            }
        } else {
            if ((cSi == 3) || (cSd == 6)) {
                str1 = str1 + "(" + elementoLVASF + "," + sInf + ")";
            }
            if ((cSi == 4) || (cSd == 5)) {
                str1 = str1 + "[" + elementoLVASF + "," + sInf + ")";
            }
            if ((cSi == 5) || (cSd == 4)) {
                str1 = str1 + "(-" + sInf + "," + elementoLVASF + "]";
            }
            if ((cSi == 6) || (cSd == 3)) {
                str1 = str1 + "(-" + sInf + "," + elementoLVASF + ")";
            }
            if (cSd == 2) {
                str1 = str1 + "{" + elementoLVASF + "}";
            }
        }
    } else {
        for (var i = 1; i <= nASVF; i++) {
            elementoLVASF = ggbApplet.getListValue("listaValidadaASF" + n, i);
            codigoASF = ggbApplet.getListValue("listaCodigosASF" + n, i);
            if (((codigoASF == 1) || (codigoASF == 2)) && ((i != 1) && (i != nASVF))) {
                str1 = str1 + "," + elementoLVASF + ")" + sUnion + "(" + elementoLVASF;
                continue;
            } else if (((codigoASF == 1) || (codigoASF == 2)) && (i == 1) && ((cSi == 1) || (cSd == 1))) {
                if ((cSi == 5) || (cSd == 4)) {
                    str1 = str1 + "(-" + sInf + "," + elementoLVASF + ")" + sUnion + "(" + elementoLVASF;
                    continue;
                }
                if ((cSi == 6) || (cSd == 3)) {
                    str1 = str1 + "(-" + sInf + "," + elementoLVASF + ")" + sUnion + "(" + elementoLVASF;
                    continue;
                }
                //v2
                if ((cSi == 4) || (cSd == 5)) {
                    str1 = str1 + "(" + elementoLVASF;
                    continue;
                }
                if ((cSi == 3) || (cSd == 6)) {
                    str1 = str1 + "(" + elementoLVASF;
                    continue;
                }
            } else if (((codigoASF == 1) || (codigoASF == 2)) && (i == 1) && ((cSi != 1) && (cSd != 1))) {
                if ((cSi == 6) || (cSd == 3)) {
                    str1 = str1 + "(" + elementoLVASF;
                    continue;
                }
                if ((cSi == 5) || (cSd == 4)) {
                    str1 = str1 + "(" + elementoLVASF;
                    continue;
                }
            } else if (((codigoASF == 1) || (codigoASF == 2)) && (i == nASVF) && ((cSi == 1) || (cSd == 1))) {
                if ((cSi == 3) || (cSd == 6)) {
                    str1 = str1 + "," + elementoLVASF + ")" + sUnion + "(" + elementoLVASF + "," + sInf + ")"
                    continue;
                }
                if ((cSi == 4) || (cSd == 5)) {
                    str1 = str1 + "," + elementoLVASF + ")" + sUnion + "(" + elementoLVASF + "," + sInf + ")"
                    continue;
                }
                //v2
                if ((cSi == 6) || (cSd == 3)) {
                    str1 = str1 + "," + elementoLVASF + ")";
                    continue;
                }
                if ((cSi == 5) || (cSd == 4)) {
                    str1 = str1 + "," + elementoLVASF + ")";
                    continue;
                }
            } else if (((codigoASF == 1) || (codigoASF == 2)) && (i == nASVF) && ((cSi != 1) && (cSd != 1))) {
                if ((cSi == 6) || (cSd == 3)) {
                    str1 = str1 + "," + elementoLVASF + ")";
                    continue;
                }
                if ((cSi == 5) || (cSd == 4)) {
                    str1 = str1 + "," + elementoLVASF + ")";
                    continue;
                }
            } else if ((codigoASF == 0) && (i == 1)) {
                if ((cSi == 3) || (cSd == 6)) {
                    str1 = str1 + "(" + elementoLVASF;
                    continue;
                }
                if ((cSi == 4) || (cSd == 5)) {
                    str1 = str1 + "[" + elementoLVASF;
                    continue;
                }
            } else if ((codigoASF == 0) && (i == nASVF)) {
                if ((cSi == 5) || (cSd == 4)) {
                    str1 = str1 + "," + elementoLVASF + "]";
                    continue;
                }
                if ((cSi == 6) || (cSd == 3)) {
                    str1 = str1 + "," + elementoLVASF + ")";
                    continue;
                }
            }
        }
    }
    ggbApplet.setTextValue("texto2F" + n, str1);
    return;
}

   window.computoImpresionDominio = computoImpresionDominio;

function computoDominioDefinicion(n) {
    var str = ggbApplet.getValueString("cadenaFiltradaDesigualdades" + n, false) + "";
    var str1 = "";
    var str2 = str;
    var str3 = "";
    var dominioPorDefecto = ggbApplet.getValueString("cadenaDominioPorDefecto", false) + "";
    var index = 0;
    var cSi = ggbApplet.getValue("codigoSimbolo" + (2 * n - 1));
    var cSd = ggbApplet.getValue("codigoSimbolo" + (2 * n));
    var Xi = ggbApplet.getValue("x_{" + n + "" + (n - 1) + "}");
    var Xd = ggbApplet.getValue("x_{" + n + "" + n + "}");
    alert("cS" + (2 * n - 1) + "=" + cSi + "\n cS" + (2 * n) + "=" + cSd + "\n x_{" + n + "" + (n - 1) + "}=" + Xi + "\n x_{" + n + "" + n + "}=" + Xd);
    if ((cSd == 2) && (ggbApplet.isDefined("x_{" + n + "" + n + "}") == true)) {
        str1 = Xd + ">=x>=" + Xd;
        ggbApplet.setValue("muestraF" + n + "entera", 0);
        str2 = str1;
        ggbApplet.setValue("muestraFP" + n, 1);
        ggbApplet.setValue("leyendaAdvertenciaIntervaloF" + n, 0);
        ggbApplet.setValue("muestraDominioF" + n, 1);
        //alert("cS6 =");
    } else if ((cSi == 2) && (ggbApplet.isDefined("x_{" + n + "" + (n - 1) + "}") == true)) {
        str1 = Xi + ">=x>=" + Xi;
        ggbApplet.setValue("muestraF" + n + "entera", 0);
        str2 = str1;
        ggbApplet.setValue("muestraFP" + n, 1);
        ggbApplet.setValue("leyendaAdvertenciaIntervaloF" + n, 0);
        ggbApplet.setValue("muestraDominioF" + n, 1);
        //alert("cS5 =");
    } else if ((ggbApplet.isDefined("x_{" + n + "" + (n - 1) + "}") == false) && (ggbApplet.isDefined("x_{" + n + "" + n + "}") == false)) {
        str1 = dominioPorDefecto;
        ggbApplet.setValue("muestraF" + n + "entera", 1);
        str2 = str1;
        ggbApplet.setValue("muestraFP" + n, 0);
        ggbApplet.setValue("leyendaAdvertenciaIntervaloF" + n, 1);
        ggbApplet.setValue("muestraDominioF" + n, 0);
        //alert("no data 3");
    } else if ((cSi == 1) && (cSd == 1)) {
        str1 = dominioPorDefecto;
        ggbApplet.setValue("muestraF" + n + "entera", 1);
        str2 = str1;
        ggbApplet.setValue("muestraFP" + n, 0);
        ggbApplet.setValue("leyendaAdvertenciaIntervaloF" + n, 1);
        ggbApplet.setValue("muestraDominioF" + n, 0);
        //alert("no simbolos 3");
    } else if (((cSi == 1) && (ggbApplet.isDefined("x_{" + n + "" + n + "}") == false)) || ((cSd == 1) && (ggbApplet.isDefined("x_{" + n + "" + (n - 1) + "}") == false))) {
        str1 = dominioPorDefecto;
        ggbApplet.setValue("muestraF" + n + "entera", 1);
        str2 = str1;
        ggbApplet.setValue("muestraFP" + n, 0);
        ggbApplet.setValue("leyendaAdvertenciaIntervaloF" + n, 1);
        ggbApplet.setValue("muestraDominioF" + n, 0);
        //alert("dato-simbolo no asociados 3");
    } else if ((cSi == 1) && (ggbApplet.isDefined("x_{" + n + "" + (n - 1) + "}") == true)) {
        ggbApplet.setValue("muestraF" + n + "entera", 0);
        index = str.indexOf("x");
        str1 = str.slice(index);
        str2 = str1;
        ggbApplet.setValue("muestraFP" + n, 1);
        ggbApplet.setValue("leyendaAdvertenciaIntervaloF" + n, 1);
        ggbApplet.setValue("muestraDominioF" + n, 0);
        //alert("sin simbolo izqdo. 3");
    } else if ((cSi != 1) && (ggbApplet.isDefined("x_{" + n + "" + (n - 1) + "}") == false)) {
        ggbApplet.setValue("muestraF" + n + "entera", 0);
        index = str.indexOf("x");
        str1 = str.slice(index);
        str2 = str1;
        ggbApplet.setValue("muestraFP" + n, 1);
        ggbApplet.setValue("leyendaAdvertenciaIntervaloF" + n, 1);
        ggbApplet.setValue("muestraDominioF" + n, 0);
        //alert("sin dato izqdo. 3");
    } else if ((cSd == 1) && (ggbApplet.isDefined("x_{" + n + "" + n + "}") == true)) {
        ggbApplet.setValue("muestraF" + n + "entera", 0);
        index = str.indexOf("x");
        str1 = str.slice(0, index + 1);
        str2 = str1;
        ggbApplet.setValue("muestraFP" + n, 1);
        ggbApplet.setValue("leyendaAdvertenciaIntervaloF" + n, 1);
        ggbApplet.setValue("muestraDominioF" + n, 0);
        //alert("sin simbolo dcho. 3");
    } else if ((cSd != 1) && (ggbApplet.isDefined("x_{" + n + "" + n + "}") == false)) {
        ggbApplet.setValue("muestraF" + n + "entera", 0);
        index = str.indexOf("x");
        str1 = str.slice(0, index + 1);
        str2 = str1;
        ggbApplet.setValue("muestraFP" + n, 1);
        ggbApplet.setValue("leyendaAdvertenciaIntervaloF" + n, 1);
        ggbApplet.setValue("muestraDominioF" + n, 0);
        //alert("sin dato-simbolo dcho. 3");	
    } else {
        str1 = ggbApplet.evalCommandCAS("domDef" + n + ":=cadenaFiltradaDesigualdades" + n, "");
        ggbApplet.setValue("muestraF" + n + "entera", 0);
        ggbApplet.setValue("muestraFP" + n, 1);
        ggbApplet.setValue("leyendaAdvertenciaIntervaloF" + n, 0);
        ggbApplet.setValue("muestraDominioF" + n, 1);
        //alert("default 3");
    }
    ggbApplet.setTextValue("cadenaFiltrada2Desigualdades" + n, str2);
    ggbApplet.evalCommand("dominioDefinicionF" + n + ":=" + str1);
    str3 = ggbApplet.evalCommandCAS("domExtF" + n + ":=cadenaFiltrada3DesigualdadesF" + n, "");
    ggbApplet.evalCommand("dExtF" + n + ":=" + str3);
    str1 = ggbApplet.evalCommandCAS("dominioF:=dominioDefinicionF1(x) ∨ dominioDefinicionF2(x) ∨ dominioDefinicionF3(x)", "");
    ggbApplet.evalCommand("dominioDefinicionF:=" + str1);
    alert("str1--" + str1 + "  str2--" + str2 + "  str3--" + str3);
    return;
}

  window.computoDominioDefinicion = computoDominioDefinicion;
