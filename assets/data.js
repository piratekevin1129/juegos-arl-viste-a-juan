var elementos = [
	{
		id:4,
		name:'Orejeras',
		description:'Son los EPP adecuados para la protección auditiva. Los EPP están hechos de hule, plástico, esponja, contienen mezclas de cera, agua, aceite y grasa, como reductores de sonido.',
		parte:[2],
		x:47.3,
		y:8.9
	},
	{
		id:1,
		name:'Delantal de carnaza',
		description:'Permiten la protección de partes vitales del soldador también protege su cuerpo y ropa contra salpique y esquirlas. Para proteger al soldador de las chispas y el calor que genera el acto de soldar.',
		parte:[1],
		x:48.7,
		y:44.4,
	},
	{
		id:2,
		name:'Bata',
		description:'Una bata, es una pieza de ropa larga que sirve en un laboratorio para protegerse de cualquier daño que puedan hacer las sustancias químicas a la ropa o a las personas.',
		parte:[1],
		x:47.5,
		y:45.7
	},
	{
		id:3,
		name:'Arnés',
		description:'El propósito principal de utilizar arnés es que en caso de que el trabajador quede suspendido en el aire no se caiga al piso.',
		parte:[1],
		x:48.5,
		y:41.6
	},
	{
		id:21,
		name:'Tapabocas quirúrjico',
		description:'Los tapabocas son protectores faciales de material impermeable a salpicaduras o aerosoles. Se puede utilizar durante el tiempo que se mantenga limpio y sin deformaciones. Si se humedece o salpica, se desechará.',
		parte:[13],
		x:46,
		y:17
	},
	{
		id:22,
		name:'Tapabocas tipo concha',
		description:'Los tapabocas de tipo concha, son tapabocas especiales para trabajos donde influya mucho el polvo, y tierra.',
		parte:[13],
		x:47.2,
		y:16.5
	},
	{
		id:8,
		name:'Capucha',
		description:'Las monjitas o pasamontañas protectores están diseñados para proteger las orejas, el cuello y la cara de la persona de la exposición al calor extremo.',
		parte:[6],
		x:48.7,
		y:14.1
	},	
	{
		id:16,
		name:'Gafas de seguridad',
		description:'Son gafas diseñadas especialmente para trabajos de químico, ya que son anticorrosivas y resistentes al impacto, para proteger los ojos de cualquier sustancia química que resulte peligrosa.',
		parte:[12],
		x:46.5,
		y:10.9
	},
	{
		id:14,
		name:'Máscara de buceo',
		description:'Máscara de buceo',
		parte:[12],
		x:48.9,
		y:9.1
	},
	{
		id:11,
		name:'Casco de seguridad',
		description:'Se utiliza para evitar  lesiones en la cabeza o disminuir la gravedad de las lesiones en caso de un accidente fuerte. Este debe colocarse bien amarrado a la barbilla, para que no se caiga.',
		parte:[8],
		x:46.9,
		y:3
	},
	{
		id:12,
		name:'Casco con linterna',
		description:'El casco con linerna sirve para ver mejor en lugares o sitios confinados.',
		parte:[8],
		x:46.9,
		y:3.1
	},
	{
		id:15,
		name:'Gorra',
		description:'Gorra',
		parte:[8],
		x:46.6,
		y:3.4
	},
	{
		id:5,
		name:'Botas de caucho',
		description:'Las botas de caucho, ó goma, son un tipo de botas impermeables y sin cordones, que protegen a quien las usa del agua y el barro. Son utilizadas principalmente en ciertas actividades de trabajo que requieren protección en sitios confinados.',
		parte:[4],
		x:50.3,
		y:86.5
	},
	{
		id:6,
		name:'Botas',
		description:'Las botas, estan destinadas para disipar la electricidad, para evitar que se produzcan chispas estáticas. Se emplean en trabajos de alturas, ya que son muy cómodas y contrarrestar el impacto de las caídas.',
		parte:[4],
		x:50.6,
		y:89.2
	},
	{
		id:7,
		name:'Botas cuero blanco',
		description:'Estos tipos de botas estan diseñadas para los químicos, están fabricadas en plástico de tal manera que sean impermeables para evitar el contácto de productos químicos',
		parte:[4],
		x:50,
		y:86.4
	},
	{
		id:13,
		name:'Cuerda',
		description:'Las cuerdas se utilizan para asegurarse desde un cinturón o arnés de seguridad a un punto de anclaje fijo, a una cuerda de anclaje horizontal o de un anclaje vertical.',
		parte:[9],
		x:17.2,
		y:62.6
	},
	{
		id:17,
		name:'Guantes de tela',
		description:'Sirven para proteger las manos de aceleraciones y otras lesiones, además de dar un mejor agarre.',
		parte:[10],
		x:48.8,
		y:54.6
	},
	{
		id:18,
		name:'Guantes de latex',
		description:'Protegen contra soluciones líquidas y choques eléctricos, sin embargo para productos químicos o derivados del petróleo que tienen un efecto deteriorante sobre el hule.',
		parte:[10],
		x:48.4,
		y:51.3
	},
	{
		id:19,
		name:'Guantes de nitrilo',
		description:'Son látex sintético con propiedades químicas mecánicas, que gracias a los elementos que conforma refuerza la resistencia química. Son los más recomendados en el área de hidrocarburos.',
		parte:[10],
		x:48.5,
		y:54.5
	},
	{
		id:20,
		name:'Guantes de carnaza',
		description:'Son aquellos que se usan en trabajos como soldadura en grandes cantidades y en trabajos de manejo de metales en estado de fundición.',
		parte:[10],
		x:49,
		y:51.2
	},
	{
		id:9,
		name:'Careta para esmerilar',
		description:'Careta con Cabezal graduable y visor en acrílico. Permite cubrir la cara y el cuello de materiales particulados. Se utiliza para trabajos como: Esmerilar, manejo de químicos corrosivos.',
		parte:[7],
		x:46.6,
		y:11.2
	},
	{
		id:10,
		name:'Careta de soldador',
		description:'La pantalla de soldar ha sido diseñada para dar la máxima protección frente a la soldadura eléctrica, y evitar daños mayores en los ojos de el soldador.',
		parte:[7],
		x:46.8,
		y:11.5
	}

]

var oficios = [
	{
		id:1,
		name:'Trabajo de Químico',
		description:'',
		elementos:[2,7,16,19,21],
		personaje:1
	},
	{
		id:2,
		name:'Trabajo en Alturas',
		description:'',
		elementos:[3,6,11,13,17],
		personaje:2
	},
	{
		id:3,
		name:'Trabajo en espacios confinados (alcantarillas)',
		description:'',
		elementos:[3,5,12,18],
		personaje:2
	},
	{
		id:4,
		name:'Trabajo de Soldador',
		description:'',
		elementos:[1,8,10,20],
		personaje:3
	},
	{
		id:5,
		name:'Trabajo con taladro',
		description:'',
		elementos:[11,22,4,6,17],
		personaje:2
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