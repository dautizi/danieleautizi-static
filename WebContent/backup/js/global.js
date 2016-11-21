

function validate(form, funzione) {
	var valida = true;

	$(form).find("input, select").each(
			function() {
				
				if ($(this).hasClass("obbligatorio") && $(this).is(".obbligatorio:visible")) {
					var valore = $(this).val();
					if (valore == '') {
						valida = false;
						setViewElementNoIcon($(this), valida, 'Campo Obbligatorio');
						return null;
					} else {
						setViewElementNoIcon($(this), true);
					}
				}

				if ($(this).hasClass("required_no_icon")) {
					var valore = $(this).val();
					if (valore == '') {
						valida = false;
						setViewElementNoIcon($(this), valida, 'Campo Obbligatorio');
						return null;
					} else {
						setViewElementNoIcon($(this), true);
					}
				}

				if ($(this).hasClass("hiddenImport")) {
					var valore = $(this).val();
					if (valore == '') {
						valida = false;
						hideShowById($(this), false);
						return null;
					} else {
						hideShowById($(this), true);
					}
				}
									
				if ($(this).hasClass("alphanum")) {
					var regex = new RegExp("^[a-zA-Z0-9]+$");
					var valore = $(this).val();
					var ctrl = regex.test(valore);
					if (!ctrl) {
						valida = false;
						setViewElement($(this), valida, 'Sono ammessi solo valori AlphaNumerici');
						return null;
					} else {
						setViewElement($(this), true);
					}
				}
				
			});
	
	// alert(valida);
	
	if (valida) {
		eval(funzione);
	}
}


function setViewElement(elemento, stato, testo) {
	if (stato == false) {
		$(elemento).css("background", "#ffcccb");
		$(elemento).parent().find(".pos_img").show();
		$(elemento).parent().find(".pos_img").html(htmlError);
		$(elemento).parent().find(".pos_img").attr("title", testo);
	} else {
		$(elemento).css("background", "white");
		$(elemento).parent().find(".pos_img").hide();
	}
}

function setViewElementNoIcon(elemento, stato, testo) {
	if (stato == false) {
		$(elemento).css("background", "#ffcccb");
		// $(elemento).parent().find(".pos_img").show();
		// $(elemento).parent().find(".pos_img").html(htmlError);
		// $(elemento).parent().find(".pos_img").attr("title", testo);
	} else {
		$(elemento).css("background", "white");
		// $(elemento).parent().find(".pos_img").hide();
	}
}


function isInt(value) {
	var regex = new RegExp("^[0-9]+$");
	var ok = regex.test(value);
	return ok;
}


function rimuovi(elemento){
	$(elemento).remove();
} 


// Example
function submitFormAjax(idForm, targetId) {
	
	var targetFinal = '#'+targetId;
	
	var options = {
		target:     targetFinal, 
		url:        '${pageContext.request.contextPath}/loadRegistrazioneStudente.action' 
	}; 
		// pass options to ajaxForm
		   
	$('#'+idForm).ajaxForm(options);
	$('#'+idForm).ajaxSubmit(options);
		
}

// Appello classe per i studenti
function submitFormAppelloStudenti(idForm, targetId) {
	var targetFinal = '#'+targetId;
	var options = {
		target:     targetFinal, 
		url:        '${pageContext.request.contextPath}/execSalvaPresenzaStudenti.action' 
	};   
	$('#'+idForm).ajaxForm(options);
	$('#'+idForm).ajaxSubmit(options);
		
}

// Ricerca classe
function submitFormAppello(idForm, targetId) {
	var targetFinal = '#'+targetId;
	var options = {
		target:     targetFinal, 
		url:        '${pageContext.request.contextPath}/execRicercaStudente.action' 
	};   
	$('#'+idForm).ajaxForm(options);
	$('#'+idForm).ajaxSubmit(options);
		
}

function ajaxLoad(myUrl, element, params, callBack) {
	// 'inputName=' + inputName + '&livello=' + livello +"&idFormCaller="+formId
	if(params == null) {
		params = "";
	}
	
	$.ajax({
		url : myUrl,
		cache : false,
		async : true,
		type : "POST",
		data : params,
		success : function(data) {
			$(element).html(data);
			// alert(data);
			if(callBack != null) {
				eval(callBack);
			}
		}
	});
	
}


//Aggiornamento degli anni in base al corso
function aggiornaSelectAnni(selectIdDaAggiornare, selectName) {
	var nomeCorso = $("select[name="+selectName+"]").val();
	var params = 'nomeCorso='+nomeCorso;
	
	try{
		ajaxLoad("loadAnniByCorso.action", $('#'+selectIdDaAggiornare), params);	
	} catch (e) {
	}
}

//Aggiornamento delle classi in base al corso
function aggiornaSelectClassi(selectIdDaAggiornare, selectName) {
	var idCorso = $("select[name="+selectName+"]").val();
	var params = 'idCorso='+idCorso;
	
	try{
		ajaxLoad("loadClassiByCorso.action", $('#'+selectIdDaAggiornare), params);	
	} catch (e) {
	}
}

function aggiornaSelectClassiRicerca(selectIdDaAggiornare, selectName) {
	var idCorso = $("select[name="+selectName+"]").val();
	var params = 'idCorso='+idCorso;
	
	try{
		ajaxLoad("loadClassiByCorsoRicerca.action", $('#'+selectIdDaAggiornare), params);	
	} catch (e) {
	}
}



//Aggiornamento dei comuni in base alla provincia
function aggiornaSelectComuni(selectIdDaAggiornare, selectName) {
	
	var idProvincia = $("select[name="+selectName+"]").val();
	
	var params = 'idProvincia='+idProvincia+"&tipoSelect="+selectIdDaAggiornare;
	
	try{
		ajaxLoad("loadComuniByProvincia.action", $('#'+selectIdDaAggiornare), params, null);	
	} catch (e) {
	}
	
}


//Aggiornamento dei campi comune e provincia in funzione dello stato estero
function aggiornaNazioniNascita(selectName) {
	
	var nomeNazione = $("#"+selectName+"  option:selected").val();
	
	if(nomeNazione != "9999") {
		try{
			var params = '';
			ajaxLoad("loadEsteroNascita.action", $('#containerNascita'), params, null);	
		} catch (e) {}
	} else {
		try{
			var params = '';
			ajaxLoad("loadItaliaNascita.action", $('#containerNascita'), params, 'refreshContainerNascitaDefault()');	
		} catch (e) {}
	}
	
}

function refreshContainerNascitaDefault() {
	selezionaSelectDefault("provinciaNascita", "RI");
	selezionaSelectDefault("comuneNascita", "H282");
}
function refreshContainerResidenzaDefault() {
	selezionaSelectDefault("provinciaResidenza", "RI");
	selezionaSelectDefault("comuneResidenza", "H282");
}

function aggiornaNazioniResidenza(selectName) {
	
	var nomeNazione = $("#"+selectName+"  option:selected").val();
	
	if(nomeNazione != "9999") {
		try{
			var params = '';
			ajaxLoad("loadEsteroResidenza.action", $('#containerResidenza'), params, null);	
		} catch (e) {}
		// $("select[name="+provincia+"]").attr("disabled","disabled");
		// $("select[name="+comune+"]").attr("disabled","disabled");
	} else {
		try{
			var params = '';
			ajaxLoad("loadItaliaResidenza.action", $('#containerResidenza'), params, 'refreshContainerResidenzaDefault()');	
		} catch (e) {}
		// Controllare able/disable
		// $("select[name="+provincia+"]").removeAttr('disabled');
		// $("select[name="+comune+"]").removeAttr('disabled');
	}
	
}

function selezionaSelectDefault(nomeSelect, valoreDefault) {
	$("select[name="+nomeSelect+"]").val(valoreDefault);
}


//Aggiornamento dei campi comune e provincia in funzione dello stato estero
function aggiornaNazioni(selectName) {
	var nomeNazione = $("#"+selectName+" option:selected").val();
	
	if(nomeNazione != "9999") {
		try{
			var params = '';
			ajaxLoad("loadEstero.action", $('#containerSede'), params, null);	
		} catch (e) {}
	} else {
		try{
			var params = '';
			ajaxLoad("loadItalia.action", $('#containerSede'), params, 'refreshContainerGenericDefault()');	
		} catch (e) {}
	}
}

function refreshContainerGenericDefault() {
	selezionaSelectDefault("provincia", "RI");
	selezionaSelectDefault("comune", "H282");
}

function aggiornaSelectComuniGenerico(selectIdDaAggiornare, selectName) {
	var idProvincia = $("select[name="+selectName+"]").val();
	var params = 'idProvincia='+idProvincia+"&tipoSelect="+selectIdDaAggiornare;
	try{
		ajaxLoad("loadComuniByProvinciaGenerico.action", $('#'+selectIdDaAggiornare), params, null);	
	} catch (e) {
	}
}

function codiceFiscale(element, params) {
	if(params == null) {
		params = "";
	}
	
	$.ajax({
		url : "execCodiceFiscale.action",
		cache : false,
		async : true,
		type : "POST",
		data : params,
		success : function(data) {
			$(element).val(data.codiceFiscaleCalcolato);
		}
	});
	
}

function validateCodiceFiscale(formRiferimento, element) {
	var validationResult = true;
	// var params = "nome=DANIELE&cognome=autizi&dataNascita=06/10/1982&luogoNascita=H282&nazioneNascita=9999&sesso=M";
	var params = "";
	
	$(formRiferimento).find(".codiceFiscale").each(
			function() {
				// prendo il valore del campo n-esimo
				var valore = $(this).val();
				if (valore == '' || valore == null) {
					valida = false;
					setViewElement($(this), validationResult, 'Campo Obbligatorio');
					return null;
				} else {
					setViewElement($(this), true);
				}
			}
	);
	
	if(validationResult) {
		var nome = $("#nome").val();
		var cognome = $("#cognome").val();
		var dataNascita = $("#dataNascita").val();
		var nazioneNascita = $("#nazioneNascita option:selected").val();
		var provinciaNascita = $("#provinciaNascita option:selected").val();
		var comuneNascita = $("#comuneNascita option:selected").val();
		var sesso = $("#sesso option:selected").text();
		
		params += "nome=" +nome+
				"&cognome=" +cognome+
				"&dataNascita=" +dataNascita+
				"&luogoNascita=" +comuneNascita+
				"&nazioneNascita=" +nazioneNascita+
				"&sesso="+sesso; 
		
		codiceFiscale(element, params);
	}
		
	return validationResult;
}

function characterLimiter(maxNumChar, countBox, textArea) {
	
	$(textArea).keyup(function() {
		var len = $(textArea).val().length;
		$(countBox).text(maxNumChar - len);
		if (maxNumChar - len < 0){
			var stringValue = $(textArea).val();
			stringValue = stringValue.substring(0,maxNumChar);
			$(textArea).val(stringValue);
			$(countBox).text(0);
		}
	});
	
}

function dettaglioCorso(anniTotali, descrizione, nomeCorso, idCorso) {
	var corso = $("select[name="+idCorso+"]").val();
	var params = 'idCorso='+corso;
	
	$.ajax({
		url : "execDettaglioCorso.action",
		cache : false,
		async : true,
		type : "POST",
		data : params,
		success : function(data) {
			// Campi da inserire nel form del corso
			$('#'+anniTotali).val(data.anniTotaliCorso);
			$('#'+descrizione).val(data.descrizione);
			$('#'+nomeCorso).val(data.nomeCorso);
		}
	});
	
}

function checkUsername() {
	var username = $("#username").val();
	var params = 'username='+username;

	if('' != username) {
		$.ajax({
			url : "execControlloUsername.action",
			cache : false,
			async : true,
			type : "POST",
			data : params,
			success : function(data) {
				// Controllo e visualizzazione result
				var risultatoControllo = data.result;
				$("#usernameCheck").val(risultatoControllo);
				showRightIcon('ok_username', 'err_username', risultatoControllo);
			}
		});
	} else {
		showRightIcon('ok_username', 'err_username', false);
	}
	
}


function showRightIcon(idElementOK, idElementKO, result) {
	if(result == "false" || result == false) {
		$("#"+idElementOK).hide();
		$("#"+idElementKO).show();
	} else {
		$("#"+idElementKO).hide();
		$("#"+idElementOK).show();
	}	
}

function checkPassword(pwd1, pwd2) {
	var result = false;
	
	// alert('checkPassword -- '+pwd1+" "+pwd2);
	
	if(pwd1 == pwd2 && pwd1 != '') {
		result = true;
	}
	showRightIcon('ok_password', 'err_password', result);
	
	return result;
}

function validaUtente() {
	var valida = true;
	
	var username = $("#username").val();
	var usernameCheck = $("#usernameCheck").val();
	var password = $("#password").val();
	var ripetiPassword = $("#ripetiPassword").val();
	
	valida = validaUsername(username, usernameCheck);
	if(false != valida) {
		valida = checkPassword(password, ripetiPassword);
	}
	
	return valida;
}				
				
function validaUsername(username, usernameCheck) {
	var result = true;
	// Controllo se la username Ë null o vuota
	if(null == username || '' == username) {
		result = false;
	}
	// Controllo se lo usernameCheck Ë false
	if(!result || null == usernameCheck || '' == usernameCheck || 'false' == usernameCheck) {
		result = false;
	}
	showRightIcon('ok_username', 'err_username', result);
	
	return result;
}


var giorno;
var ora;
function openEventoCalendario(cella, getFormAction, tipo, valore,classe, idOraCalendario, testoDialog){
	
	var colonna = $(cella).parent().children().index($(cella));
	var riga = $(cella).parent().parent().children().index($(cella).parent());
	//alert('Riga: ' + riga + ', Colonna: ' + colonna); 
	
	giorno = colonna;
	ora = riga;
	//la classe la devo passare sempre mentre valore puÚ essere classe o docente 
	var params = 'tipo='+tipo+'&valore='+valore+'&giorno='+giorno+'&ora='+ora+'&classe='+classe+'&idOraCalendario='+idOraCalendario;
	//alert(params);
	
	if(testoDialog == null){
		testoDialog = "Inserisci Evento";
	}
	
	$.ajax({
		url : getFormAction,
		cache : false,
		async : false,
		type : "POST",
		data : params,
		success : function(form) {
			
			//alert(form);
			showBox( true, 
					  240,   
					  320,
					  false, //escButton 
					  false, //resizable,
					  true, //draggable, 
					  true, //chiudibile, 
					  testoDialog, //header,
					  form, //contenuto,
					  false, //useFrame, 
					  "", //urlFrame,
					  false, //scrollable,
					  false, //aggiornaElemento,
					  null, //elementoDaAggiornare, 
					  null, //pathPerAggiornamento,
					  null, //error,
					  null //jsButton 
					  );
			
		}
	});
	
	
	
	
}

//cerca un elemento con id esito e scrive il messaggio dell'esito
function setOperazioneEsito(valore){
	$("#esito").html(valore);
}
var callBackRicerca = false;
function setCallBackRicerca(){
	callBackRicerca = true;
}

// Rende i campi readonly in funzione della checkbox 
function disabilitaFieldByCheckbox(idCheckbox, idInput){
	if ($('#'+idCheckbox).is(':checked')) {
		// Setta il campo nome corso editabile
		$('#'+idInput).attr('readonly', false);
	} else {
		// Setta il campo nome corso a readonly
		$('#'+idInput).attr('readonly', true);
	}	
}

// Rende i campi disabled in funzione della checkbox
function checkboxControl(checkboxID, campoAssociato){
	if ($('#'+checkboxID).is(':checked')) {
		// Setta il campo selezionabile
		$('#'+campoAssociato).attr('disabled', false);
	} else {
		// Setta il campo disabilitata
		$('#'+campoAssociato).attr('disabled', true);
	}
}

// Abilitazione/Disabilitazione select
function aggiornaSelectData(selectIdDaDisabilitare, selectName) {
	var selectVal = $("select[name="+selectName+"]").val();
	if (selectVal != 'materia' && selectVal != 'classe') {
		
		
	}
	
	
}

function controlloRicercaClasse(idCorso, idClasse) {
	var idCorsoRicerca = $('#'+idCorso).val();
	var idClasseRicercaSentinella = $('#'+idClasse).val();
	if ((idClasseRicercaSentinella != null && idClasseRicercaSentinella != '') 
		&& (idCorsoRicerca != null && idCorsoRicerca != '')) {
		// Forza l'aggiornamento delle combo per corso/classe
		try {
			aggiornaSelectClassiRicerca('anniCorsoRicercaDiv', 'idCorsoRicerca');
		} catch(e) {}
	}
}

function controlloClasse(idCorso, idClasse) {
	var idCorsoRicerca = $('#'+idCorso).val();
	var idClasseRicercaSentinella = $('#'+idClasse).val();
	if ((idClasseRicercaSentinella != null && idClasseRicercaSentinella != '') 
		&& (idCorsoRicerca != null && idCorsoRicerca != '')) {
		// Forza l'aggiornamento delle combo per corso/classe
		try {
			aggiornaSelectClassiRicerca('anniCorsoDiv', 'idCorso');
		} catch(e) {}
	}
}

function openEventoForm(getFormAction, start, end, tipo, valore, idEvento, testoDialog){
	
	var params = 'tipo='+tipo+'&start='+start+'&end='+end+'&valore='+valore +'&idEvento='+idEvento;
	//alert(params);
	
	if(testoDialog == null){
		testoDialog = "Inserisci Evento";
	}
	
	$.ajax({
		url : getFormAction,
		cache : false,
		async : false,
		type : "POST",
		data : params,
		success : function(form) {
			
			//alert(form);
			showBox( true, 
					  240,   
					  320,
					  false, //escButton 
					  false, //resizable,
					  true, //draggable, 
					  true, //chiudibile, 
					  testoDialog, //header,
					  form, //contenuto,
					  false, //useFrame, 
					  "", //urlFrame,
					  false, //scrollable,
					  false, //aggiornaElemento,
					  null, //elementoDaAggiornare, 
					  null, //pathPerAggiornamento,
					  null, //error,
					  null //jsButton 
					  );
			
		}
	});
	
	
	
	
}



function messaggio(msg){
	//alert(form);
	showBox( true, 
			  240,   
			  320,
			  false, //escButton 
			  false, //resizable,
			  true, //draggable, 
			  true, //chiudibile, 
			  'Messaggio', //header,
			  '<span class="msgClass">'+msg+'</span>', //contenuto,
			  false, //useFrame, 
			  "", //urlFrame,
			  false, //scrollable,
			  false, //aggiornaElemento,
			  null, //elementoDaAggiornare, 
			  null, //pathPerAggiornamento,
			  null, //error,
			  null //jsButton 
			  );
}




function openSostituzioneForm(getFormAction, start, end, tipo, valore, idEvento, testoDialog){
	
	var params = 'tipo='+tipo+'&start='+start+'&end='+end+'&valore='+valore +'&idEvento='+idEvento;
	//alert(params);
	
	
	$.ajax({
		url : getFormAction,
		cache : false,
		async : false,
		type : "POST",
		data : params,
		success : function(form) {
			
			//alert(form);
			showBox( true, 
					  240,   
					  320,
					  false, //escButton 
					  false, //resizable,
					  true, //draggable, 
					  true, //chiudibile, 
					  testoDialog, //header,
					  form, //contenuto,
					  false, //useFrame, 
					  "", //urlFrame,
					  false, //scrollable,
					  false, //aggiornaElemento,
					  null, //elementoDaAggiornare, 
					  null, //pathPerAggiornamento,
					  null, //error,
					  null //jsButton 
					  );
			
		}
	});
}

function appendPrintFunction(){
	$("#caltoolbar").append("<button class='stampa' onclick='javascript:stampaPagina();' id='stampa'> STAMPA </button> ");
}

function stampaPagina(){
	window.print();
}

function formatCalendarDate(date) {
	var result = '';
	if(null != date && '' != date) {
		result = $.format.date(date, "yyyy-MM-dd HH:mm:ss");
	}
	return result;
}

/*
 * A partire dall'id della tabella e dalla stringa
 * dei parametri generata da jmesa identifica 
 * se l'export è di tipo pdf
 */
function isPDFexport(parameterString, tableID) {
	var result = false;
	var suffix = "_e_=pdf";
	if (parameterString != null && tableID != null) {
		var check = tableID + suffix;
		if (parameterString.indexOf(check) != -1) {
			result = true;
		}
	}
	return result;
}

function makeParameterStringByForm(formID) {
	var parameterString = "";
	
	var form = $('#'+formID);
	if (form != null) {
		$(form).find("input").each(
			function() {
				
				if (this) {
					// var valore = $(this).val();
					if (!isEmpty($(this))) {
						var name = $(this).attr('name');
						parameterString += name + "=" + $(this).val() + "&";
					}
				}				
		});
		
		$(form).find("select").each(
			function() {
					
				if (this) {
					var name = $(this).attr('name');
					var val = $("select[name="+name+"]").val();
					if (val != null && val != "") {
						parameterString += name + "=" + val + "&";
					}
				}				
		});
	}
	return parameterString;
}

function isEmpty(obj) {
	var val = true;
	if (obj != null) {
		if (obj.val() != null && obj.val() != "") {
			val = false;
		}
	}
	return val;
}




