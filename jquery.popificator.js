

///////////////////////////////////////////
// los tag <a> con clase "popup_on_click", se abren en popup, con parametro popup=1, y opcionalmente pueden definirse otros parametros para abrir

$(document)
	.undelegate("a.popup_on_click","click.popup_on_click")
	.delegate("a.popup_on_click","click.popup_on_click",function(event)
	{
	// Serialize an array of form elements or a set of
	// key/values into a query string
		function recursive_param ( s, a , name) {
			if (typeof(a)=="number" || typeof(a)=="string" || typeof(a)=="boolean")
			{
				if(name!="")
				{
					s.push( encodeURIComponent(name) + "=" + encodeURIComponent( a ) );
				}
			}
//			else if ( a.constructor == Array || a.jquery )
//			{
//				alert(dump(a));
//				// If an array was passed in, assume that it is an array
//				// of form elements
//				// Serialize the form elements
//				jQuery.each( a, function(){
//					s.push( encodeURIComponent(this.name) + "=" + encodeURIComponent( this.value ) );
//				});
//			}
			else if(typeof(a)=="object") // es un objeto (como un hash de php)
			{
				// Serialize the key/values
				for ( var j in a )
				{
					// si el elemento es un objeto de dos elementos, los cuales sean name y value, y ambos son string... asumo "form element"
					if(typeof(a[j])=="object"  && typeof(a[j].name)=="string" && typeof(a[j].value)!="object")
					{
						//alert(a[j].name+" = "+a[j].value); // DEBUG

						var varname = (name!=""?name+"["+a[j].name+"]":a[j].name);
						// If the value is an array then the key names need to be repeated
						recursive_param(s,a[j].value,varname);
					}
					else
					{
						var varname = (name!=""?name+"["+j+"]":j);
						// If the value is an array then the key names need to be repeated
						recursive_param(s,a[j],varname);
					}
				}
			}
		}

		var a_extras = {};

		// cuando no se quieran los defaults, settear el attributo "data-popup-no-defaults"
		if(typeof($(this).attr("data-popup-no-defaults"))=="undefined")
		{
			a_extras["location"] 	= 1;
			a_extras["directories"]	= 0;
			a_extras["status"] 		= 0;
			a_extras["menubar"] 	= 0;
			a_extras["toolbar"] 	= 0;
			a_extras["scrollbars"] 	= 1;
			a_extras["resizable"] 	= 1;
			a_extras["width"] 		= 600;
			a_extras["height"] 		= 600;
			a_extras["left"] 		= 50;
			a_extras["top"] 		= 40;
		}

		if(typeof($(this).attr("data-popup-width"))!="undefined")
		{
			a_extras["width"] = $(this).attr("data-popup-width");
		}
		if(typeof($(this).attr("data-popup-height"))!="undefined")
		{
			a_extras["height"] = $(this).attr("data-popup-height");
		}
		if(typeof($(this).attr("data-popup-top"))!="undefined")
		{
			a_extras["top"] = $(this).attr("data-popup-top");
		}
		if(typeof($(this).attr("data-popup-left"))!="undefined")
		{
			a_extras["left"] = $(this).attr("data-popup-left");
		}
		if(typeof($(this).attr("data-popup-scrollbars"))!="undefined")
		{
			a_extras["scrollbars"] = $(this).attr("data-popup-scrollbars");
		}
		if(typeof($(this).attr("data-popup-menubar"))!="undefined")
		{
			a_extras["menubar"] = $(this).attr("data-popup-menubar");
		}
		if(typeof($(this).attr("data-popup-toolbar"))!="undefined")
		{
			a_extras["toolbar"] = $(this).attr("data-popup-toolbar");
		}
		//... need to put the rest here...


		var a_pairs = [];
		recursive_param(a_pairs,a_extras,"");
		var s_args_joined = a_pairs.join(', ');

		var s_href = $(this).attr("href");
		if(typeof($(this).attr("data-popup-href"))!="undefined")
		{
			s_href = $(this).attr("data-popup-href");
		}

		//console.log([$(this).attr("href"),$(this).attr("data-popup-name"),a_extras,a_pairs,s_args_joined]);

		var tmp_ventana = window.open(s_href,$(this).attr("data-popup-name"),s_args_joined);
		setTimeout(function()
		{
			tmp_ventana.focus();
		},1000);

		
		event.preventDefault();
		return false;
	} );
