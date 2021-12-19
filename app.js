/* 
	This is an example useage of the State Machine feature in limonte/sweetalert2 added as of 2.4.2 
*/
var result = [],
  stepGen = function (obj){
	switch (obj.current){
  	case '0': 
    	return {
      	title: "Wprowadź desc onta",
        input: "text",
        inputValidator: function(t){
        	return new Promise(function(e, n){
          		result[obj.current] = t;
          		t.length < 6 ? n("Musisz wprowadzic conajmniej 6 znaki.") : e();
            });
          }
        };
    case '1' :
    	return {
      	title: "Wybierz typ dodania",
        input: "select",
        inputOptions: {
        		Debacom: "Debacom",
            Orange: "Orange",
            Wavenet: "Wavenet",
            },
        inputValue: "Debacom",
        showCancelButton: !0,
        inputValidator: function(t){
        	return new Promise(function(e, n){
          		result[obj.current] = t;
          		"" === t ? n("Musisz wybrac typ!") : e();

              if (t != "Orange"){
              	obj.fork(['3','4']);
                result[2] = '';
              }
           });
        }
      };
    case '2': 
    	return {
      	title: "Wprowadź NEOID",
      	input: "text",
        inputValidator: function(t){
        	return new Promise(function(e, n){
          	  result[obj.current] = t;
              t.length < 15 ? n("Musisz wprowadzic conajmniej 15 znaki.") : e();
            });
        }
			};
      case '3': 
    	return {
      	title: "Wprowadź współrzędną X",
      	text: '<input class="swal2-input latitude" >',
        preConfirm: function () {
        		return new Promise(function (resolve, reject) {
        		              // Validate input
        		              if ($('.latitude').val() == '' || $('.latitude').val().length < 8 ) {
        		                        reject("Wymagane minimum 8 znaków szerokości geograficznej");
        		                    } else {
                                	  result[obj.current] = $('.latitude').val()
        		                        resolve();
        		                    }
        		                })
            },
             onOpen: function () {
                new Cleave('.latitude', {
   								numericOnly: true,
    							delimiters: ['.'],
    							blocks: [2, 14]
								});
                setTimeout(function() {$('.swal2-input').focus();}, 50);
            },
			};
      case '4': 
    	return {
      	title: "Wprowadź współrzędną Y",
        text: '<input class="swal2-input longitude" >',
        preConfirm: function () {
        		return new Promise(function (resolve, reject) {
        		              // Validate input
        		              if ($('.longitude').val() == '' || $('.longitude').val().length < 8 ) {
        		                        reject("Wymagane minimum 8 znaków wysokości geograficznej");
        		                    } else {
                                	  result[obj.current] = $('.longitude').val()
        		                        resolve();
        		                    }
        		                })
            },
             onOpen: function () {
                new Cleave('.longitude', {
   								numericOnly: true,
    							delimiters: ['.'],
    							blocks: [2, 14]
								});
                setTimeout(function() {$('.swal2-input').focus();}, 50);
            },
			};
  }
};
swal.setDefaults({
    confirmButtonText: 'Next >',
    showCancelButton: !0,
  });
swal.queue(stepGen,['0','1','2','3','4']).then(function(){ 
	e = result;
	swal.resetDefaults(), swal({
  		title: "Dodac onta?",
      html: "Nowe profile: <pre>desc: " + e[0] + "<br>neoID: " + e[2] + "<br>sn: " +  "<br>olt: "  + "<br>fsp: "  + "<br>model: " +  "<br>typ: " + e[1] + "<br>Szerogość X: " + e[3] + "<br>Wysokość Y: " + e[4] + "</pre>",
      confirmButtonText: "Tak",
      cancelButtonText: "Nie",
      showCancelButton: !0
      }).then(function() {
                              
                              console.log(e);
      
                            })

});
