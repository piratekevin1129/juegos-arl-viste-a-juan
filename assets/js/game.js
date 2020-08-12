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
var game_rect = game.getBoundingClientRect()

function getJob(){
	var job = getRand(0,(oficios.length-1))
	var job_exists = jobs_completed.includes(job)
	while(job_exists){
		job = getRand(0,(oficios.length-1))
		job_exists = jobs_completed.includes(job)
	}
	actual_job = job
	actual_job = 0
}

function setGame(){
	getJob()
	console.log(actual_job)
	setElementos()
	loadElementos(0)
	//putElementos()
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

function setElementos(){
	var elementos_obligatorios = oficios[actual_job].elementos
	for(i = 0;i<elementos_obligatorios.length;i++){
		var indice = elementos_obligatorios[i]//esto es un array
		for(j = 0;j<indice.length;j++){
			lista_elementos.push(indice[j])
		}
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
		setTooltip({
			content:'<p><span>¡Viste a Juan para un trabajo de Alcantarilla!</span><br />Haz clic en las puertas de los casilleros y arrastra  la prenda hacia Juan.</p>',
			delay:4000
		})
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
		div_elemento_img.setAttribute('onmousedown','downElemento(event,this,'+i+')')

		div_elemento.appendChild(div_elemento_img)
		
		var div_puerta = document.createElement('div')
		div_puerta.className = 'locker-door'
		div_puerta.setAttribute("onclick","clickPuerta(this,"+(i+1)+")")

		var div_label = document.createElement('div')
		div_label.className = 'elemento-label'
		div_label.innerHTML = elementos[indx].name

		casillero_parent.appendChild(div_label)
		casillero_parent.appendChild(div_elemento)
		casillero_parent.appendChild(div_puerta)
	}
}

var actual_puerta = null
var actual_casillero = null
var frente_actual = 20

function clickPuerta(door,idlocker){
	if(actual_casillero!=null){
		//cerrar la que haya
		actual_puerta.classList.remove('locked-door-open')
		actual_puerta.classList.add('locked-door-close')
		
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
		}
	}else{
		//es primera vez, abramosla
		actual_puerta = door
		actual_casillero = getE('casillero'+idlocker)
		actual_puerta.classList.remove('locked-door-close')
		actual_puerta.classList.add('locked-door-open')
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

function comprarVestida(){
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

		if(incorrectos.length==0){
			//todo excelentisimo
			alert("bien toro")
		}else{
			//hay elementos malos
			var html = ''
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
			setModal({
				close:true,
				title:'¡ALERTA!',
				content:html,
				button:false
			})
		}
	}else{
		setAlerta({
			top:'50%',
			left:[55,'%',2],
			direction:'right',
			content:'<p>Al personaje le hacen falta Elementos de protección personal.</p>',
			delay:3000
		})
	}

}

function getE(idname){
	return document.getElementById(idname)
}