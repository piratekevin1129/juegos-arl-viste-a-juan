var i = 0
var j = 0
var k = 0

function getRand(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

var jobs_completed = []
var actual_job = -1
var lista_elementos = []

function getJob(){
	var job = getRand(0,(oficios.length-1))
	var job_exists = jobs_completed.includes(job)
	while(job_exists){
		job = getRand(0,(oficios.length-1))
		job_exists = jobs_completed.includes(job)
	}
	actual_job = job
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
		putElementos()
	}else{
		loadElemento(e)
	}
}

function loadElemento(e){
	var img = new Image()
	img.onload = function(){
		elementos[findElementIndex(lista_elementos[e])].width = this.width
		elementos[findElementIndex(lista_elementos[e])].height = this.height
		
		img.onload = null
		img.onerror = null
		img = null
		loadElementos((e+1))
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

function putElementos(){
	for(i = 0;i<lista_elementos.length;i++){
		var casillero_parent = getE('casillero'+(i+1))
		var div_elemento = document.createElement('div')
		div_elemento.className = 'elemento'
		var indx = findElementIndex(lista_elementos[i])
		
		var div_elemento_img = document.createElement('div')
		div_elemento_img.style.width = elementos[indx].width+'px'
		div_elemento_img.style.height = elementos[indx].height+'px'
		div_elemento_img.style.backgroundImage = 'url(assets/images/elementos/'+lista_elementos[i]+'.png)'

		div_elemento.appendChild(div_elemento_img)
		

		var div_puerta = document.createElement('div')
		div_puerta.className = 'locker-door locked-door-close'
		div_puerta.setAttribute("onclick","clickPuerta(this,"+(i+1)+")")

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
			actual_casillero.style.zIndex = 100
		}
	}else{
		//es primera vez, abramosla
		actual_puerta = door
		actual_casillero = getE('casillero'+idlocker)
		actual_puerta.classList.remove('locked-door-close')
		actual_puerta.classList.add('locked-door-open')
		actual_casillero.style.zIndex = 1
	}
}

function getE(idname){
	return document.getElementById(idname)
}