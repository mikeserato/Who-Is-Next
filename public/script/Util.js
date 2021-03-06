var util = {
    escapeText: function (text) {
        return text
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    },

    headers: {
        'Accept': 'application/json;',
        'Content-Type': 'application/x-www-form-urlencoded'
    },

    errorHandler: function (err) {
		$.ajax({
			type: "GET",
			url: "/api/session/",
			headers: this.headers,
		}).done( function(data) {

			if(data=="NO_SESSION"){
                localStorage.clear();
                Materialize.toast("Session Expired. Please log in again !",1500, "", function(){
                	window.location.href = '/';
                });
			}else{
                return Materialize.toast(err.responseText,2500);
			}
			
		});   
    },

    dateParser : function ( input_date ){
        return input_date.substring(0,10);
    }
}
