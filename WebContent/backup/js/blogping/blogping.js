/* ------ Class FormUtil ----- */
FormUtil = {
	postSubmit: function(idForm, action) {
		var form = $("#"+idForm);
		
		$.ajax({
            url: action,
            type: "POST",
            data: $(form).serialize()
		});
    },	
    
    getSubmit: function(idForm, action, paramSelector) {
    	var queryString = "";
    	var form = $("#"+idForm);
    	var params = $(form).find(paramSelector);
    	if (params != null) {
    		for (var i=0; i<params.length; i++) {
    			var name = $(params[i]).attr("name");
    			var value = $(params[i]).val();
    			queryString += name + "="
    			if (name == "url") {
    				queryString += encodeURIComponent(value);
    			} else {
    				queryString += value;
    			}
    			if (i < params.length-1) queryString += "&";
    		}
    	}
    	
		$.ajax({
            url: action,
            type: "GET",
            data: queryString
		});
    },
    
    changesSubmit: function(action) {
		$.ajax({
            url: action,
            type: "GET",
            data: ""
		});
    },
    
    getParams: function(idForm, paramSelector) {
    	var queryString = "";
    	var form = $("#"+idForm);
    	var params = $(form).find(paramSelector);
    	if (params != null) {
    		for (var i=0; i<params.length; i++) {
    			var name = $(params[i]).attr("name");
    			var value = $(params[i]).val();
    			queryString += name + "=" + value;
    			if (i < params.length-1) queryString += "&";
    		}
    	}
    	return queryString;
    }
}