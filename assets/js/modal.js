function setModal(data){
	var modal = getE('modal')
	if(data.close){
		getE('modal-close-btn').style.visibility = 'visible'
	}else{
		getE('modal-close-btn').style.visibility = 'hidden'
	}

	getE('modal-title').innerHTML = data.title
	getE('modal-content').innerHTML = data.content

	if(data.button){
		getE('modal-button').style.visibility = 'visible'
		if(data.action){
			getE('modal-button').setAttribute('onclick',"unsetModal('"+data.action+"')")
		}else{
			getE('modal-button').setAttribute('onclick',"unsetModal(null)")
		}
	}else{
		getE('modal-button').style.visibility = 'hidden'
		getE('modal-button').setAttribute('onclick','')
	}

	modal.className = 'modal-on'
}

var animacion_modal = null
function unsetModal(callBack){
	var modal = getE('modal')
	modal.className = 'modal-off'
	animacion_modal = setTimeout(function(){
		clearTimeout(animacion_modal)
		animacion_modal = null

		if(callBack!=null){
			callBack()
		}
	},500)
}

////////////////////////////////////////////
var animacion_alerta = null
function setAlerta(data){
	getE('alerta-box').style.top = data.top
	if(data.direction=='right'){
		getE('alerta-box').style.left = (data.left[0]-data.left[2])+data.left[1]
	}else{
		getE('alerta-box').style.left = (data.left[0]+data.left[2])+data.left[1]
	}
	
	getE('alerta-box').className = 'alerta-'+data.direction+' alerta-'+data.direction+'-off'
	getE('alerta-box').innerHTML = data.content

	getE('alerta').className = 'alerta-on'
	animacion_alerta = setTimeout(function(){
		clearTimeout(animacion_alerta)
		animacion_alerta = null

		getE('alerta-box').style.left = data.left[0]+data.left[1]
		getE('alerta-box').className = 'alerta-'+data.direction+' alerta-'+data.direction+'-on'
		animacion_alerta = setTimeout(function(){
			clearTimeout(animacion_alerta)
			animacion_alerta = null

			getE('alerta').className = 'alerta-off'
			getE('alerta-box').className = 'alerta-'+data.direction+' alerta-'+data.direction+'-off'
		},data.delay)
	},100)
}

////////////////////////////////////////////
var animacion_tooltip = null
function setTooltip(data){
	getE('tooltip').innerHTML = data.content
	getE('tooltip').className = 'tooltip-on'

	animacion_tooltip = setTimeout(function(){
		clearTimeout(animacion_tooltip)
		animacion_tooltip = null

		getE('tooltip').className = 'tooltip-off'		
	},data.delay)
}