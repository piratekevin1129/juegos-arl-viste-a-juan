var ismobile = false
var actual_dimension = 1
var tra_contenedor = document.getElementById('tra_contenedor')
var instrucciones_label = ""

function prepareWindow(){
    ismobile = isMobileDevice()
    //ismobile = true
    console.log(ismobile)
    //document.getElementById('instrucciones_txt').innerHTML = instrucciones_label
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

function clickElemento(img,ind){
	//mirar que el área de este no esté ocupado
	var prev_img = img
	var prev_elemento_ind = ind
	var prev_elemento = elementos[findElementIndex(lista_elementos[ind])]
	var partes_habilitadas = []
	
	for(i = 0;i<prev_elemento.parte.length;i++){
		var a = getE('area'+prev_elemento.parte[i])
		if(a.getAttribute('occuped')=='yes'){
			partes_habilitadas.push(a.getAttribute('ropa'))
		}
	}
	if(partes_habilitadas.length>0){
		var ropa_ocupada = elementos[findElementIndex(partes_habilitadas[0])]
		setAlerta({
			top:'50%',
			left:[5,'%',2],
			direction:'right',
			content:'<p>Debes remover <span>'+ropa_ocupada.name+'</span> para colocar este elemento</p>',
			delay:3000
		})
	}else{
		//si ya habia uno seleccionado, ponerlo en no seleccionado
		if(actual_img!=null){
			actual_img.classList.remove('elemento-selected')
			actual_img = null
			actual_elemento_ind = -1
			actual_elemento = null

			hideParts()
		}

		actual_img = img
		actual_elemento_ind = ind
		actual_elemento = elementos[findElementIndex(lista_elementos[ind])]

		actual_img.classList.add('elemento-selected')

		//iluminar partes clickeables
		showParts()
		coger_mp3.play()
	}
}

function clickArea(area_tocada){
	if(ismobile){
		if(actual_img!=null){
			//buscar todas las areas responsables de este elemento
			for(i = 0;i<actual_elemento.parte.length;i++){
				var a = getE('area'+actual_elemento.parte[i])
				a.setAttribute('occuped','yes')
				a.setAttribute('ropa',actual_elemento.id)
			}

			var ropa_seleccionada = getE('ropa'+actual_elemento.id)
			ropa_seleccionada.classList.remove('ropa-off')
			ropa_seleccionada.classList.add('ropa-on')
			ropa_seleccionada.setAttribute('prenda',actual_elemento.id)

			actual_img.classList.remove('elemento-selected')
			actual_img.classList.add('elemento-off')

			actual_img = null
			actual_elemento_ind = -1
			actual_elemento = null
			hideParts()
		}else{
			setAlerta({
				top:'50%',
				left:[55,'%',2],
				direction:'right',
				content:'<p>Debes Seleccionar un Elemento del casillero para colocarlo aqui</p>',
				delay:3000
			})
		}
	}
}


/////////////////////////////AUDIO/////////////////////////
function loadAudio(data){
    var url = data.src

    var audio_fx = null
    audio_fx = document.createElement('audio')
    audio_fx.setAttribute('src',url)
    audio_fx.load()
    audio_fx.addEventListener('loadeddata',function(){
        //alert("cargo")
        data.callBack(audio_fx)
    })
    audio_fx.addEventListener('error',function(){
        data.callBack(null)
    })
}