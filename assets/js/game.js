var i = 0
var j = 0
var k = 0

function getRand(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

var jobs_completed = []
var actual_job = -1
var lista_elementos = []

var game = getE('game')
var game_scene = getE('game-scene')
game_scene.style.visibility = 'hidden'
var game_rect = game.getBoundingClientRect()

function getJob(){
	var job = getRand(0,(oficios.length-1))
	var job_exists = jobs_completed.includes(job)
	while(job_exists){
		job = getRand(0,(oficios.length-1))
		job_exists = jobs_completed.includes(job)
	}
	actual_job = job
	//actual_job = 0
}

function setInstrucciones(start){
	var html = ''
	html+='<div class="modal-instrucciones-gif"></div>'
    html+='<p>Juan necesita tu ayuda para realizar un <br /><span id="oficio-txt">'+oficios[actual_job].name+'</span></p>'
    html+='<p>Para ayudarlo busca en los casilleros el equipo de protección personal correcto, teniendo en cuenta el tipo de trabajo que le sea asignado.</p>'
    if(ismobile){
    	html+='<p>Toca un elemento y luego toca una zona del cuerpo para colocarlo, una luz blanca te guiará.</p>'
    }else{
    	html+='<p>Arrastra los elementos hasta la zona del cuerpo donde correspondan, una luz blanca te guiará.</p>'	
    }
    
    html+='<p>Luego haz clic en el botón comprobar para verificar si Juan esta vestido correctamente para realizar la actividad.</p>'

    if(start){
    	setModal({
	    	close:false,
			title:'Instrucciones',
			content:html,
			button:true,
			value:'jugar',
			final:false,
			action:'empezarJuego'
	    })
    }else{
    	setModal({
	    	close:false,
			title:'Instrucciones',
			content:html,
			button:true,
			value:'aceptar',
			final:false,
			action:'seguirJuego'
	    })
    }
    
}

var animacion_swipe = null
function empezarJuego(){
	getE('cargador').className = 'cargador-on'
	unsetModal(function(){
		game_scene.style.visibility = 'visible'
		getE('home-scene').style.display = 'none'

		setTooltip({
			content:'<p><span>¡Viste a Juan para '+oficios[actual_job].name+'!</span><br />Haz clic en las puertas de los casilleros y arrastra  la prenda hacia Juan.</p>',
			delay:4000
		})
		
		getE('cargador').className = 'cargador-off'

		if(ismobile){
			getE('cursor-swipe').classList.add('cursor-swipe-animation-1')
			getE('fondo-casilleros').classList.add('cursor-swipe-animation-2')
			getE('casilleros').classList.add('cursor-swipe-animation-2')
			getE('personaje').classList.add('cursor-swipe-animation-3')
			
			animacion_swipe = setTimeout(function(){
				getE('cursor-swipe').classList.remove('cursor-swipe-animation-1')
				getE('fondo-casilleros').classList.remove('cursor-swipe-animation-2')
				getE('casilleros').classList.remove('cursor-swipe-animation-2')
				getE('personaje').classList.remove('cursor-swipe-animation-3')
				getE('cursor-swipe').style.display = 'none'

				clearTimeout(animacion_swipe)
				animacion_swipe = null

				iniciarReloj()
			},6000)
		}else{
			iniciarReloj()
		}
		
	})
}

function setGame(){
	getJob()
	getE('oficio-title-txt').innerHTML = oficios[actual_job].name
	getE('personaje-main').className = 'personaje-'+oficios[actual_job].personaje
	getE('personaje-home').className = 'personaje-'+oficios[actual_job].personaje
	getE('personaje-main-2').className = 'personaje-'+oficios[actual_job].personaje

	setElementos()
	loadElementos(0)
}

function setElementos(){
	var elementos_obligatorios = oficios[actual_job].elementos
	for(i = 0;i<elementos_obligatorios.length;i++){
		lista_elementos.push(elementos_obligatorios[i])
	}

	while(lista_elementos.length<20){
		var elemento_random = getRand(0,(elementos.length-1))
		var elemento_random_exists = lista_elementos.includes(elementos[elemento_random].id)
		
		while(elemento_random_exists){
			elemento_random = getRand(0,(elementos.length-1))
			elemento_random_exists = lista_elementos.includes(elementos[elemento_random].id)
		}
		lista_elementos.push(elementos[elemento_random].id)
	}

	
	//desorganizar lista de elementos
	unorderArrayElementos(lista_elementos.length)
	console.log(lista_elementos)
}

function unorderArrayElementos(long){
	var desorden = []
	while(desorden.length<long){
		var a = getRand(0,(long-1))
		var a_exists = desorden.includes(a)
		while(a_exists){
			a = getRand(0,(long-1))
			a_exists = desorden.includes(a)
		}
		desorden.push(a)
	}

	var nuevo = []
	for(i = 0;i<long;i++){
		nuevo.push(lista_elementos[desorden[i]])
	}
	lista_elementos = nuevo
}

function findElementIndex(id){
	var ind = -1
	for(var ii = 0;ii<elementos.length;ii++){
		if(elementos[ii].id==id){
			ind = ii
		}
	}
	return ind
}

function loadElementos(e){
	if(e==lista_elementos.length){
		prepareElementos()
		putElementos()

		////////AQUI EMPIEZA TODOO///////
		
		animation_start = setTimeout(function(){
			clearTimeout(animation_start)
			animation_start = null

			getE('cargador').className = 'cargador-off'	
			setInstrucciones(true)
		},1000)
		
	}else{
		loadElemento(e)
	}
}

function loadElemento(e){
	var img = new Image()
	var img2 = new Image()
	img.onload = function(){
		elementos[findElementIndex(lista_elementos[e])].width = this.width
		elementos[findElementIndex(lista_elementos[e])].height = this.height
		
		img.onload = null
		img.onerror = null
		img = null

		img2.onload = function(){
			elementos[findElementIndex(lista_elementos[e])].width2 = this.width
			elementos[findElementIndex(lista_elementos[e])].height2 = this.height
			
			img2.onload = null
			img2.onerror = null
			img2 = null
			loadElementos((e+1))
		}
		img2.onerror = function(){
			console.log("Error loading element 2 "+img2.scr)
			img2.onload = null
			img2.onerror = null
			img2 = null
			loadElementos((e+1))
		}
		img2.src = 'assets/images/elementos/'+lista_elementos[e]+'-p.png'
	}
	img.onerror = function(){
		console.log("Error loading element "+img.src)
		img.onload = null
		img.onerror = null
		img = null
		loadElementos((e+1))
	}
	img.src = 'assets/images/elementos/'+lista_elementos[e]+'.png'
}

function prepareElementos(){
	for(i = 0;i<elementos.length;i++){
		var ropa = document.createElement('div')
		ropa.id = 'ropa'+elementos[i].id
		ropa.className = 'ropa ropa-off'
		ropa.setAttribute('prenda','0')
		ropa.style.transform = 'translateX(-'+(elementos[i].width2/2)+'px) translateY(-'+(elementos[i].height2/2)+'px)'
		ropa.style.webkitTransform = 'translateX(-'+(elementos[i].width2/2)+'px) translateY(-'+(elementos[i].height2/2)+'px)'
		ropa.style.oTransform = 'translateX(-'+(elementos[i].width2/2)+'px) translateY(-'+(elementos[i].height2/2)+'px)'

		ropa.style.width = elementos[i].width2+'px'
		ropa.style.height = elementos[i].height2+'px'
		ropa.style.left = elementos[i].x+'%'
		ropa.style.top = elementos[i].y+'%'
		ropa.style.backgroundImage = 'url(assets/images/elementos/'+elementos[i].id+'-p.png)'
		ropa.setAttribute('onclick','clickRopa(this)')

		getE('personaje-ropas').appendChild(ropa)
	}
}

function clickRopa(ropa){
	//poner en el casillero la img
	var prenda = ropa.getAttribute('prenda')
	if(prenda!='0'){
		var elemento_img = getE('elemento'+prenda)
		elemento_img.classList.remove('elemento-off')
		ropa.setAttribute('prenda','0')
		ropa.classList.remove('ropa-on')
		ropa.classList.add('ropa-off')

		//poner areas responsables en occuped no
		var element_data = elementos[findElementIndex(Number(prenda))]
		if(element_data!=-1){
			for(i = 0;i<element_data.parte.length;i++){
				var a = getE('area'+element_data.parte[i])
				a.setAttribute('occuped','no')
				a.setAttribute('ropa','0')
			}
		}
	}
}

function putElementos(){
	for(i = 0;i<lista_elementos.length;i++){
		var casillero_parent = getE('casillero'+(i+1))
		var div_elemento = document.createElement('div')
		div_elemento.className = 'elemento'
		var indx = findElementIndex(lista_elementos[i])
		
		var div_elemento_img = document.createElement('div')
		div_elemento_img.id = 'elemento'+elementos[indx].id
		div_elemento_img.style.width = elementos[indx].width+'px'
		div_elemento_img.style.height = elementos[indx].height+'px'
		div_elemento_img.style.backgroundImage = 'url(assets/images/elementos/'+lista_elementos[i]+'.png)'
		if(!ismobile){
			div_elemento_img.setAttribute('onmousedown','downElemento(event,this,'+i+')')
		}else{
			div_elemento_img.setAttribute('onclick','clickElemento(this,'+i+')')
		}
		
		div_elemento.appendChild(div_elemento_img)
		
		var div_puerta = document.createElement('div')
		div_puerta.className = 'locker-door'
		div_puerta.setAttribute("onclick","clickPuerta(this,"+(i+1)+")")

		var div_label = document.createElement('div')
		div_label.className = 'elemento-label'
		div_label.innerHTML = elementos[indx].name

		casillero_parent.appendChild(div_elemento)
		casillero_parent.appendChild(div_label)
		casillero_parent.appendChild(div_puerta)
	}
}

var actual_puerta = null
var actual_casillero = null

function clickPuerta(door,idlocker){
	if(actual_casillero!=null){
		//cerrar la que haya
		actual_puerta.classList.remove('locked-door-open')
		actual_puerta.classList.add('locked-door-close')

		//si es en celular, quitar actual_img active
		if(ismobile){
			if(actual_img!=null){
				actual_img.classList.remove('elemento-selected')
				actual_img = null
				actual_elemento_ind = -1
				actual_elemento = null
				hideParts()
			}
		}
		
		//mirar si es el mismo
		if(actual_casillero.id==String('casillero'+idlocker)){
			//la misma. dejar asi
			actual_puerta = null
			actual_casillero = null
		}else{
			//es otra, abramos la nueva
			actual_puerta = door
			actual_casillero = getE('casillero'+idlocker)
			actual_puerta.classList.remove('locked-door-close')
			actual_puerta.classList.add('locked-door-open')
			abrir_mp3.currentTime = 0
			abrir_mp3.play()
		}
	}else{
		//es primera vez, abramosla
		actual_puerta = door
		actual_casillero = getE('casillero'+idlocker)
		actual_puerta.classList.remove('locked-door-close')
		actual_puerta.classList.add('locked-door-open')
		abrir_mp3.currentTime = 0
		abrir_mp3.play()
	}
}

///////////FUNCIONES ELEMENTO////////////////
var dragging = false
var actual_elemento = null
var actual_elemento_ind = -1
var actual_img = null

function downElemento(e,img,ind){
	actual_img = img
	actual_elemento_ind = ind
	actual_elemento = elementos[findElementIndex(lista_elementos[ind])]
	getE('elemento-drag').style.backgroundImage = 'url(assets/images/elementos/'+lista_elementos[ind]+'.png)'
	getE('elemento-drag').style.width = actual_elemento.width+'px'
	getE('elemento-drag').style.height = actual_elemento.height+'px'
	getE('elemento-drag').classList.remove('elemento-drag-off')
	getE('elemento-drag').classList.add('elemento-drag-on')
	actual_img.classList.add('elemento-off')

	//iluminar parte
	showParts()

	var posx = e.pageX-(actual_elemento.width/2)
	var posy = e.pageY-(actual_elemento.height/2)

	getE('elemento-drag').style.left = (posx)+'px'
	getE('elemento-drag').style.top = (posy-game_rect.top)+'px'

	document.addEventListener('mousemove',moveElemento,false)
	document.addEventListener('mouseup',upElemento,false)
	//console.log(actual_elemento)
	coger_mp3.play()
}

function showParts(){
	for(i = 0;i<actual_elemento.parte.length;i++){
		var parte = getE('area'+actual_elemento.parte[i])
		var occuped = parte.getAttribute('occuped')
		if(occuped=='no'){
			parte.classList.remove('area-off')
			parte.classList.add('area-on')
		}
	}
}

function hideParts(){
	var areas = getE('personaje-areas').getElementsByClassName('area')
	for(i = 0;i<areas.length;i++){
		areas[i].className = 'area area-off'
	}
}

function moveElemento(e){
	var posx = e.pageX-(actual_elemento.width/2)
	var posy = e.pageY-(actual_elemento.height/2)

	getE('elemento-drag').style.left = (posx)+'px'
	getE('elemento-drag').style.top = (posy-game_rect.top)+'px'
}

function upElemento(e){
	var posx = e.pageX
	var posy = e.pageY

	getE('elemento-drag').classList.remove('elemento-drag-on')
	getE('elemento-drag').classList.add('elemento-drag-off')

	var areas = getE('personaje-areas').getElementsByClassName('area-on')
	var area_tocada = null
	for(i = 0;i<areas.length;i++){
		var rect_area = areas[i].getBoundingClientRect()
		//console.log(posx,rect_area.left,areas[i].offsetWidth)
		//console.log(posy,rect_area.top,areas[i].offsetHeight)
		if(areas[i].getAttribute('occuped')=='no'){
			if(
				posx>rect_area.left&&
				posx<(rect_area.left+areas[i].offsetWidth)&&
				posy>rect_area.top&&
				posy<(rect_area.top+areas[i].offsetHeight)
			){
				area_tocada = areas[i].id
			}
		}
	}

	if(area_tocada!=null){
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
	}else{
		//no tocó nada, devolvamos todo
		actual_img.classList.remove('elemento-off')
	}

	actual_img = null
	actual_elemento_ind = -1
	actual_elemento = null
	hideParts()

	document.removeEventListener('mousemove',moveElemento,false)
	document.removeEventListener('mouseup',upElemento,false)
}


/////////////////COMPROBAR////////////////

var animacion_personaje_final = null
function compararVestida(){
	pararReloj()

	var elementos_reales = oficios[actual_job].elementos
	var areas_reales = []

	//checkear partes ocupadas
	for(i = 0;i<elementos_reales.length;i++){
		var element_data = elementos[findElementIndex(elementos_reales[i])]
		areas_reales.push(element_data.parte[0])
	}

	var correctos = 0
	for(i = 0;i<areas_reales.length;i++){
		var a = getE('area'+areas_reales[i])
		if(a.getAttribute('occuped')=='yes'){
			correctos++
		}
	}

	if(correctos==areas_reales.length){
		//se llenaron las areas obligatorias
		//mirar cuales estám bien y cuales mal
		var incorrectos = []
		var ropas = getE('personaje-ropas').getElementsByClassName('ropa')
		for(i = 0;i<ropas.length;i++){
			var prenda = ropas[i].getAttribute('prenda')
			if(prenda!='0'){
				if(elementos_reales.includes(Number(prenda))){

				}else{
					incorrectos.push(prenda)//->id del elemento puesto
				}
			}
		}

		var html = ''
		if(incorrectos.length==0){
			//todo excelentisimo
			getE('fondo-casilleros').classList.add('to-left')
			getE('casilleros').classList.add('to-left')
			getE('personaje').classList.add('to-left-2')

			//clonar personaje-ropas
			var element_info_default = []
			for(i = 0;i<ropas.length;i++){
				var prenda = ropas[i].getAttribute('prenda')
				if(prenda!='0'){
					var original = ropas[i]
					var nueva_ropa = document.createElement('div')
					nueva_ropa.className = original.className
					nueva_ropa.setAttribute('style',original.getAttribute('style'))
					nueva_ropa.setAttribute('onclick','clickNuevaRopa('+prenda+')')

					getE('personaje-ropas-2').appendChild(nueva_ropa)
					var info = elementos[findElementIndex(prenda)]
					element_info_default.push(info)
				}
				
			}


			if(!ismobile){
				animacion_personaje_final = setTimeout(function(){
					clearTimeout(animacion_personaje_final)
					animacion_personaje_final = null

					getE('personaje-2').className = 'personaje-on'
					getE('personaje').classList.add('personaje-off')
				},1000)
				

				html = ''
				html+='<p>Has vestido a Juan correctamente y ahora está listo para trabajar</p>'
				html+='<p>Haz clic en cada uno de los equipos de protección para ver su información</p>'
				html+='<div class="epp-info">'
					html+='<h2 id="epp-info-title">'+element_info_default[0].name+'</h2>'
					html+='<img id="epp-info-image" src="assets/images/elementos/'+element_info_default[0].id+'-p.png" />'
					html+='<p id="epp-info-description">'+element_info_default[0].description+'</p>'
				html+='</div>'
				setModal({
					close:false,
					title:'¡Muy Bien!',
					content:html,
					button:true,
					value:'jugar de nuevo',
					final:true,
					action:'repeatGame'
				})
			}else{
				//otro final, donde estén todos los epp correctos
				html = ''
				html+='<p>Has vestido a Juan correctamente y ahora está listo para trabajar</p>'
				html+='<br />'
				for(var ee = 0;ee<element_info_default.length;ee++){
					html+='<div class="epp-info">'
						html+='<h2 id="epp-info-title">'+element_info_default[ee].name+'</h2>'
						html+='<img id="epp-info-image" src="assets/images/elementos/'+element_info_default[ee].id+'-p.png" />'
						html+='<p id="epp-info-description">'+element_info_default[ee].description+'</p>'
					html+='</div>'	
				}
				setModal({
					close:false,
					title:'¡Muy Bien!',
					content:html,
					button:true,
					value:'jugar de nuevo',
					final:true,
					action:'repeatGame'
				})
			}
			
			ganar_mp3.play()
		}else{
			//hay elementos malos
			html = ''
			html+='<p>Estos <span>NO</span> son los equipos de protección correctos</p>'
			html+='<div class="elementos-incorrectos">'
			for(i = 0;i<incorrectos.length;i++){
				var element_data = elementos[findElementIndex(incorrectos[i])]
				html+='<div class="elemento-incorrecto">'
					html+='<img class="elemento-incorrecto-img" src="assets/images/elementos/'+element_data.id+'.png">'
					html+='<p class="elemento-incorrecto-p">'+element_data.name+'</p>'
				html+='</div>'
			}
			html+='</div>'
			html+='<h6>Sigue Intentándolo</h6>'

			//quitar los malos
			for(i = 0;i<incorrectos.length;i++){
				var element_data = elementos[findElementIndex(incorrectos[i])]
				var epp = getE('elemento'+element_data.id)
				epp.classList.remove('elemento-off')//ponerlo visible en el casillero

				//quitar la ropa
				var ropa = getE('ropa'+element_data.id)
				ropa.className = 'ropa ropa-off'
				ropa.setAttribute('prenda','0')

				//poner area desocupada
				var area = getE('area'+element_data.parte[0])
				area.setAttribute('occuped','no')
				area.setAttribute('ropa','0')
			}

			setModal({
				close:true,
				title:'¡ALERTA!',
				content:html,
				button:false,
				action:'seguirJuego',
				final:false
			})
		}
	}else{
		if(ismobile){
			setAlerta({
				top:'50%',
				left:[5,'%',2],
				direction:'right',
				content:'<p>Al personaje le hacen falta más <span>Elementos de protección personal</span>.</p>',
				delay:3000,
				callback:continuarJuego
			})	
		}else{
			setAlerta({
				top:'50%',
				left:[55,'%',2],
				direction:'right',
				content:'<p>Al personaje le hacen falta más <span>Elementos de protección personal</span>.</p>',
				delay:3000,
				callback:continuarJuego
			})	
		}
	}
}

function clickNuevaRopa(id){
	var element_data = elementos[findElementIndex(id)]

	getE('epp-info-title').innerHTML = element_data.name
	getE('epp-info-image').src = 'assets/images/elementos/'+element_data.id+'-p.png'
	getE('epp-info-description').innerHTML = element_data.description
}

function endGame(){
	//remove functions
	document.removeEventListener('mousemove',moveElemento,false)
	document.removeEventListener('mouseup',upElemento,false)

	alarma_mp3.play()
	setAlerta({
		top:'92%',
		left:[10,'%',2],
		direction:'left',
		content:'<p>El tiempo se ha acabado <span>¡Vuelve a intentarlo!</span>.</p>',
		delay:3000,
		callback:reiniciarJuego
	})
}

function repeatGame(){//repetir por ganar el juego
	location.reload()
	//unsetModal(function(){
		
	//})
}

function reiniciarJuego(){//reiniciar, por acabarse el tiempo
	//cerrar todos los casilleros
	var puertas = getE('casilleros').getElementsByClassName('locker')
	for(i = 0;i<puertas.length;i++){
		var door = puertas[i].getElementsByClassName('locker-door')[0]
		var epp = puertas[i].getElementsByTagName('div')[0]
		var e = epp.getElementsByTagName('div')[0]
		//console.log((i+1))
		e.classList.remove('elemento-off')
		door.className = 'locker-door'
	}
	actual_puerta = null
	actual_casillero = null

	//resetear todas las areas
	var areas = getE('personaje-areas').getElementsByClassName('area')
	for(i = 0;i<areas.length;i++){
		areas[i].setAttribute('occuped','no')
		areas[i].setAttribute('ropa','0')
		areas[i].className = 'area area-off'
	}

	//resetear ropas
	var ropas = getE('personaje-ropas').getElementsByClassName('ropa')
	for(i = 0;i<ropas.length;i++){
		ropas[i].setAttribute('prenda','0')
		ropas[i].className = 'ropa ropa-off'
	}

	getE("elemento-drag").className = "elemento-drag-off"

	setTooltip({
		content:'<p><span>¡Viste a Juan para '+oficios[actual_job].name+'!</span><br />Haz clic en las puertas de los casilleros y arrastra  la prenda hacia Juan.</p>',
		delay:4000
	})
	iniciarReloj()
}

function continuarJuego(){
	reanudarReloj()
}
function seguirJuego(){//funcion para el modal
	unsetModal(function(){
		continuarJuego()
	})
}

function verAyuda(){
	pararReloj()
	setInstrucciones(false)
}

function getE(idname){
	return document.getElementById(idname)
}