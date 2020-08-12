var elementos = [
	{
		id:15,
		name:'Gorra',
		description:'Lorem ipsu dolor e tore adamo que nuestra e la cosi napoleta a bimar uj hastilape saldona abiamo',
		parte:[8],
		x:46.6,
		y:3.4
	},
	{
		id:1,
		name:'Delantal',
		description:'Lorem ipsu dolor e tore adamo que nuestra e la cosi napoleta a bimar uj hastilape saldona abiamo',
		parte:[1],
		x:48.7,
		y:44.4,
	},
	{
		id:2,
		name:'Bata química',
		description:'Lorem ipsu dolor e tore adamo que nuestra e la cosi napoleta a bimar uj hastilape saldona abiamo',
		parte:[1],
		x:47.5,
		y:45.7
	},
	{
		id:3,
		name:'Arnés',
		description:'Lorem ipsu dolor e tore adamo que nuestra e la cosi napoleta a bimar uj hastilape saldona abiamo',
		parte:[1],
		x:48.5,
		y:41.6
	},
	{
		id:21,
		name:'Tapabocas',
		description:'Lorem ipsu dolor e tore adamo que nuestra e la cosi napoleta a bimar uj hastilape saldona abiamo',
		parte:[13],
		x:47.1,
		y:17
	},
	{
		id:22,
		name:'Tapabocas tipo concha',
		description:'Lorem ipsu dolor e tore adamo que nuestra e la cosi napoleta a bimar uj hastilape saldona abiamo',
		parte:[13],
		x:47.2,
		y:16.5
	},
	{
		id:8,
		name:'Capucha',
		description:'Lorem ipsu dolor e tore adamo que nuestra e la cosi napoleta a bimar uj hastilape saldona abiamo',
		parte:[6],
		x:48.7,
		y:14.1
	},
	{
		id:4,
		name:'Audífonos',
		description:'Lorem ipsu dolor e tore adamo que nuestra e la cosi napoleta a bimar uj hastilape saldona abiamo',
		parte:[2],
		x:47.3,
		y:8.9
	},
	{
		id:16,
		name:'Gafas',
		description:'Lorem ipsu dolor e tore adamo que nuestra e la cosi napoleta a bimar uj hastilape saldona abiamo',
		parte:[12],
		x:46.5,
		y:10.9
	},
	{
		id:14,
		name:'Máscara de buceo',
		description:'Lorem ipsu dolor e tore adamo que nuestra e la cosi napoleta a bimar uj hastilape saldona abiamo',
		parte:[12],
		x:48.9,
		y:9.1
	},
	{
		id:11,
		name:'Casco',
		description:'Lorem ipsu dolor e tore adamo que nuestra e la cosi napoleta a bimar uj hastilape saldona abiamo',
		parte:[8],
		x:46.9,
		y:3
	},
	{
		id:12,
		name:'Casco con linterna',
		description:'Lorem ipsu dolor e tore adamo que nuestra e la cosi napoleta a bimar uj hastilape saldona abiamo',
		parte:[8],
		x:46.9,
		y:3.1
	},
	{
		id:5,
		name:'Botas pantaneras',
		description:'Lorem ipsu dolor e tore adamo que nuestra e la cosi napoleta a bimar uj hastilape saldona abiamo',
		parte:[4],
		x:50.3,
		y:86.5
	},
	{
		id:6,
		name:'Botas de combate',
		description:'Lorem ipsu dolor e tore adamo que nuestra e la cosi napoleta a bimar uj hastilape saldona abiamo',
		parte:[4],
		x:50.6,
		y:89.2
	},
	{
		id:7,
		name:'Botas de laboratorio',
		description:'Lorem ipsu dolor e tore adamo que nuestra e la cosi napoleta a bimar uj hastilape saldona abiamo',
		parte:[4],
		x:50,
		y:86.4
	},
	{
		id:13,
		name:'Cuerda',
		description:'Lorem ipsu dolor e tore adamo que nuestra e la cosi napoleta a bimar uj hastilape saldona abiamo',
		parte:[9],
		x:17.2,
		y:62.6
	},
	{
		id:17,
		name:'Guantes de combate',
		description:'Lorem ipsu dolor e tore adamo que nuestra e la cosi napoleta a bimar uj hastilape saldona abiamo',
		parte:[10],
		x:48.8,
		y:54.6
	},
	{
		id:18,
		name:'Guantes de latex',
		description:'Lorem ipsu dolor e tore adamo que nuestra e la cosi napoleta a bimar uj hastilape saldona abiamo',
		parte:[10],
		x:48.4,
		y:51.3
	},
	{
		id:19,
		name:'Guantes de nitrilo',
		description:'Lorem ipsu dolor e tore adamo que nuestra e la cosi napoleta a bimar uj hastilape saldona abiamo',
		parte:[10],
		x:48.5,
		y:54.5
	},
	{
		id:20,
		name:'Guantes de tela',
		description:'Lorem ipsu dolor e tore adamo que nuestra e la cosi napoleta a bimar uj hastilape saldona abiamo',
		parte:[10],
		x:49,
		y:51.2
	},
	{
		id:9,
		name:'Mascarilla',
		description:'Lorem ipsu dolor e tore adamo que nuestra e la cosi napoleta a bimar uj hastilape saldona abiamo',
		parte:[7],
		x:46.6,
		y:11.2
	},
	{
		id:10,
		name:'Mascara de hierro',
		description:'Lorem ipsu dolor e tore adamo que nuestra e la cosi napoleta a bimar uj hastilape saldona abiamo',
		parte:[7],
		x:46.8,
		y:11.5
	}

]

var oficios = [
	{
		id:1,
		name:'Quimico',
		description:'Este trabajo es de químico',
		elementos:[2,7,16,19,21]
	},
	{
		id:2,
		name:'Alturas',
		description:'Este trabajo es de alturas',
		elementos:[3,6,11,13,17]
	},
	{
		id:3,
		name:'Alcantarilla',
		description:'Este trabajo es de alcantarilla',
		elementos:[3,5,12,13,18]
	},
	{
		id:4,
		name:'Soldador',
		description:'Este trabajo es de soldador',
		elementos:[1,6,8,10,20]
	}
]

///KEYS FOR PARTES
/*torzo  1
oreja1 	 2
oreja2 	 3
pie1   	 4
pie2	 5
cabeza	 6
alfrente 7
pelo	 8
mano1 	 9
mano2	 10
cara 	 11
ojos 	 12
boca	 13*/