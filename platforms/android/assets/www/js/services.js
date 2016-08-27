angular.module('starter.services', [])

.factory("Imagenes", ['$cordovaToast', '$rootScope', '$q', function($cordovaToast, $rootScope, $q){
	var dispositivos = [
	{desc:'Television',cod:'TV', urlImagen:'./img/dispositivos/television.png'},
	{desc:'Aire',cod:'Aire', urlImagen:'./img/dispositivos/aire.png'},
	{desc:"Dimmer",cod:'Dimmer', urlImagen:'./img/dispositivos/luz.png'}]; 
		
	var espacios = [
	{desc:'Bano',cod:'Bano', urlImagen:'./img/espacios/bano.png'},
	{desc:'Cocina',cod:'Cocina', urlImagen:'./img/espacios/cocina.png'},
	{desc:"Garage",cod:'Garage', urlImagen:'./img/espacios/garage.png'},
	{desc:'Habitacion',cod:'Habitacion', urlImagen:'./img/espacios/habitacion.png'},
	{desc:'Living',cod:'Living', urlImagen:'./img/espacios/living.png'},
	{desc:"Piscina",cod:'Piscina', urlImagen:'./img/espacios/piscina.png'}]; 
	
	var interfaz = {
		
		dispositivos: function(){
			return dispositivos;
		},
		
		espacios: function(){
			return espacios;
		}
	}
	return interfaz;
}])


.factory("Ambientes", ['$cordovaSQLite', '$cordovaToast', '$rootScope', '$q', function($cordovaSQLite, $cordovaToast, $rootScope, $q){
	
	var db = null;
	
	var lista = [
					{ title: 'Habitacion', id: 1, img: 'habitacion.png' },
					{ title: 'Cocina', id: 2, img: 'cocina.png' },
					{ title: 'Comedor', id: 3, img: 'living.png' },
					{ title: 'Piscina', id: 4, img: 'piscina.png' }
				];
	
	var interfaz = {
		getAmbientes: function(){
			return lista;
		},
		getAmbiente: function(id){
			return lista[id-1];
		},
		nuevoAmbiente: function(ambiente){
			lista.push(ambiente);
		}
	}
	
	return interfaz;
}])


.factory("Espacios", ['$cordovaSQLite', '$cordovaToast', '$rootScope', '$q', 'FactoryDB', function($cordovaSQLite, $cordovaToast, $rootScope, $q, FactoryDB){
	var lista;
	var db = null;
	
	db=FactoryDB.punteroDb();
	

function actualizarLista () {
		var q = $q.defer();
		var respuesta = [];
				var query = "SELECT * FROM espacios";
				
				$cordovaSQLite.execute(db, query)
				.then(
						function(res) {
							//alert(res);
							if(res.rows.length > 0) {
								
								for(var i=0; i<res.rows.length; i++)
								{
										respuesta[i] = res.rows.item(i);
								}
								
								//$cordovaToast.show("SELECTED -> " + res.rows.item(0).clave + " " + res.rows.item(0).descripcion, 'long', 'center');
							} else {
								$cordovaToast.show("No results found", 'long', 'center');
							}
						//	alert(respuesta[0].clave);
							lista=respuesta;
							q.resolve(respuesta);
						},
						function (err) {
						//	alert('entre a error');
							$cordovaToast.show("ERROR SELECT", 'long', 'center');
							q.reject(err);
						}
					)
					
					return q.promise;
		
		
	};

	var interfaz = {
		
		insertar: function(descripcion, urlImagen){
				var q = $q.defer();
				var query = "INSERT INTO espacios (descripcion, urlImagen) VALUES (?,?)";
				//alert(descripcion + " - " + urlImagen);
				$cordovaSQLite.execute(db, query, [descripcion, urlImagen])
				.then(
						function(res) {
								actualizarLista().then(function(res){
									
								var lista=res;	
								q.resolve(res);	
									
								},function(err){
									
									q.reject(err);		
								})	
							},
						function (err) {
							$cordovaToast.show("ERROR INSERT", 'long', 'center');
							q.reject(err);
							}
					)
				return q.promise;
			},

	actualizar: function(id, descripcion, urlImagen){
			//alert(id);
			var q = $q.defer();
			var query = "UPDATE espacios SET descripcion = ?, urlImagen = ? WHERE id = ?";
			$cordovaSQLite.execute(db, query, [descripcion, urlImagen, id])
			.then(
					function(res) {
							
							actualizarLista().then(function(res){
									
								var lista=res;	
								q.resolve(res);	
									
								},function(err){
									
									q.reject(err);		
								})		
							
						},
					function (err) {
						$cordovaToast.show(err, 'long', 'center');
						q.reject(err);
						}
				)
			return q.promise;
		},
			
	lista: function(){
				
			var q = $q.defer();
			if(lista) {
				q.resolve(lista)
			} else {
				
			actualizarLista().then(function(){
				
				q.resolve(lista)
				
			},function(err){
				
				q.reject(err)
				
			});	
			}
				
				
				return q.promise;
			},
			
	seleccionarId: function(id){
				var q = $q.defer();
				var respuesta = [];
				var query = "SELECT * FROM espacios WHERE id = ?";
				$cordovaSQLite.execute(db, query, [id])
				.then(
						function(res) {
							if(res.rows.length > 0) {
								
								for(var i=0; i<res.rows.length; i++)
								{
										respuesta[i] = res.rows.item(i);
								}
								
								//$cordovaToast.show("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname, 'long', 'center');
							} else {
								$cordovaToast.show("No results found", 'long', 'center');
							}
							q.resolve(respuesta);
						},
						function (err) {
							$cordovaToast.show("ERROR SELECT", 'long', 'center');
							q.reject(err);
						}
					)
				return q.promise;
			}

	}
	
	return interfaz;
}])


.factory("Modulos", ['$cordovaSQLite', '$cordovaToast', '$rootScope', '$q','FactoryDB', function($cordovaSQLite, $cordovaToast, $rootScope, $q, FactoryDB){
	var lista;
	var db = null;
		
	db=FactoryDB.punteroDb();
	
	var listaTipoModulos = [
	{desc:'Dimmer',cod:'DIMM', urlImagen:'img/ionic.png'},
	{desc:"Zapatilla",cod:'ZAP', urlImagen:'img/ionic.png'},
	{desc:"Rele",cod:'REL', urlImagen:'img/ionic.png'}];
	
	
	function dameTipoModulo (cod) {
			
	var arrayFind = listaTipoModulos.filter(function(elem){
		
		return (elem.cod == cod)
		
	})	
		
	return arrayFind[0];
		
	};
		
		function actualizarLista () {
	//alert("LISTA");
				var q = $q.defer();
				var respuesta = [];
				var query = "SELECT * FROM modulos";
				
				$cordovaSQLite.execute(db, query)
					.then(
						function(res) {
							//alert(res);
							if(res.rows.length > 0) {
								
								for(var i=0; i<res.rows.length; i++)
								{
										respuesta[i] = res.rows.item(i);
										respuesta[i].join=dameTipoModulo(respuesta[i].idModuloTipo);
								
										
								}
								
								//$cordovaToast.show("SELECTED -> " + res.rows.item(0).clave + " " + res.rows.item(0).descripcion, 'long', 'center');
							} else {
								$cordovaToast.show("No results found", 'long', 'center');
							}
						//	alert(respuesta[0].clave);
						lista=respuesta;
							q.resolve(respuesta);
						},
						function (err) {
						//	alert('entre a error');
							$cordovaToast.show("ERROR SELECT", 'long', 'center');
							q.reject(err);
						}
					);
					
					
				return q.promise;	
		};
	
	var interfaz = {
			insertar: function(uuid, clave, descripcion, idModuloTipo, urlImagen){
				var q = $q.defer();
				var query = "INSERT INTO modulos (uuid, clave, descripcion, idModuloTipo, urlImagen) VALUES (?,?,?,?,?)";
				$cordovaSQLite.execute(db, query, [uuid, clave, descripcion, idModuloTipo, urlImagen])
				.then(
						function(res) {
								actualizarLista().then(function(res){
									
								var lista=res;	
								q.resolve(res);	
									
								},function(err){
									
									q.reject(err);		
								})	
								
							},
						function (err) {
							$cordovaToast.show("ERROR INSERT", 'long', 'center');
							q.reject(err);
							}
					)
				return q.promise;
			},
			
			lista: function(){
				
				var q = $q.defer();
			if(lista) {
				q.resolve(lista)
			} else {
				
			actualizarLista().then(function(){
				
				q.resolve(lista)
				
			},function(err){
				
				q.reject(err)
				
			});
			}	
				
				
				return q.promise;
				
			},
			
			seleccionarId: function(id){
				var q = $q.defer();
				var respuesta = [];
				var query = "SELECT * FROM modulos WHERE id = ?";
				$cordovaSQLite.execute(db, query, [id])
				.then(
						function(res) {
							if(res.rows.length > 0) {
								
								for(var i=0; i<res.rows.length; i++)
								{
										respuesta[i] = res.rows.item(i);
								}
								
								//$cordovaToast.show("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname, 'long', 'center');
							} else {
								$cordovaToast.show("No results found", 'long', 'center');
							}
							q.resolve(respuesta);
						},
						function (err) {
							$cordovaToast.show("ERROR SELECT", 'long', 'center');
							q.reject(err);
						}
					)
				return q.promise;
			},
			
			
			tipoModulos: function () {
				
				return listaTipoModulos;
				
			},
			
			
			
			tipoLista: function(){
				var q = $q.defer();
				var respuesta = [];
				var query = "SELECT * FROM moduloTipo";
				$cordovaSQLite.execute(db, query)
				.then(
						function(res) {
							if(res.rows.length > 0) {
								
								for(var i=0; i<res.rows.length; i++)
								{
										respuesta[i] = res.rows.item(i);
								}
								
								//$cordovaToast.show("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname, 'long', 'center');
							} else {
								$cordovaToast.show("No results found", 'long', 'center');
							}
							q.resolve(respuesta);
						},
						function (err) {
							$cordovaToast.show("ERROR SELECT", 'long', 'center');
							q.reject(err);
						}
					)
				return q.promise;
			}
	}
	
	return interfaz;
}])



.factory("Dispositivos", ['$cordovaSQLite', '$cordovaToast', '$rootScope', '$q','FactoryDB', 'Espacios', function($cordovaSQLite, $cordovaToast, $rootScope, $q, FactoryDB, Espacios){
	var lista;
	var db = null;
	
	db=FactoryDB.punteroDb();

	
	
	function actualizarLista () {
	//alert("LISTA");

			var q = $q.defer();
			var respuesta = [];
		//	var query = "SELECT d.id, d.nombre, d.descripcion, d.idEspacio, d.urlImagen, d.idModulo, d.entradaModulo, m.descripcion as moduloDescripcion FROM dispositivos d INNER JOIN modulos m ON d.idModulo = m.id";
		//	var query = "SELECT d.id, d.nombre, d.descripcion, d.idEspacio, d.urlImagen, d.idModulo, d.entradaModulo FROM dispositivos d";
			var query = "SELECT d.id, d.nombre, d.descripcion, d.idEspacio, d.urlImagen, d.idModulo, d.entradaModulo FROM dispositivos d";
		
			$cordovaSQLite.execute(db, query)
			.then(
					function(res) {
						//alert(res);
						if(res.rows.length > 0) {
							
							for(var i=0; i<res.rows.length; i++)
							{
									respuesta[i] = res.rows.item(i);
							}
							
							//$cordovaToast.show("SELECTED -> " + res.rows.item(0).clave + " " + res.rows.item(0).descripcion, 'long', 'center');
						} else {
							$cordovaToast.show("No results found", 'long', 'center');
						}
					//	alert(respuesta[0].clave);
					lista=respuesta;
						q.resolve(respuesta);
					},
					function (err) {
					//	alert('entre a error');
						$cordovaToast.show("ERROR SELECT", 'long', 'center');
						q.reject(err);
					}
				)
			return q.promise;
			
			};

	var interfaz = {
		
		insertar: function(nombre, descripcion, idEspacio, urlImagen,idModulo, entradaModulo){
			var q = $q.defer();
			var query = "INSERT INTO dispositivos (nombre, descripcion, idEspacio, urlImagen,idModulo, entradaModulo) VALUES (?,?,?,?,?,?)";
			$cordovaSQLite.execute(db, query, [nombre, descripcion, idEspacio, urlImagen, idModulo, entradaModulo])
			.then(
					function(res) {
							
							actualizarLista().then(function(res){
									
								var lista=res;	
								q.resolve(res);	
									
								},function(err){
									
									q.reject(err);		
								})		
							
						},
					function (err) {
						$cordovaToast.show("ERROR INSERT", 'long', 'center');
						q.reject(err);
						}
				)
			return q.promise;
		},

		actualizar: function(id, nombre, descripcion, idEspacio, urlImagen,idModulo, entradaModulo){
			alert(id);
			var q = $q.defer();
			var query = "UPDATE dispositivos SET nombre = ?, descripcion = ?, idEspacio = ?, urlImagen = ?,idModulo = ?, entradaModulo = ? WHERE id = ?";
			$cordovaSQLite.execute(db, query, [nombre, descripcion, idEspacio, urlImagen, idModulo, entradaModulo, id])
			.then(
					function(res) {
							
							actualizarLista().then(function(res){
									
								var lista=res;	
								q.resolve(res);	
									
								},function(err){
									
									q.reject(err);		
								})		
							
						},
					function (err) {
						$cordovaToast.show(err, 'long', 'center');
						q.reject(err);
						}
				)
			return q.promise;
		},
		
		lista: function(){
			
			var q = $q.defer();
			if(lista) {
				q.resolve(lista)
			} else {
				
			actualizarLista().then(function(){
				
				q.resolve(lista)
				
			},function(err){
				
				q.reject(err)
				
			});	
			}
				
				
				return q.promise;
				
			
			
		},
		
		seleccionarId: function(id){
			var q = $q.defer();
			var respuesta = [];
			var query = "SELECT * FROM dispositivos WHERE id = ?";
			$cordovaSQLite.execute(db, query, [id])
			.then(
					function(res) {
						if(res.rows.length > 0) {
							
							for(var i=0; i<res.rows.length; i++)
							{
									respuesta[i] = res.rows.item(i);
							}
							
							//$cordovaToast.show("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname, 'long', 'center');
						} else {
							$cordovaToast.show("No results found", 'long', 'center');
						}
						q.resolve(respuesta);
					},
					function (err) {
						$cordovaToast.show("ERROR SELECT", 'long', 'center');
						q.reject(err);
					}
				)
			return q.promise;
		}		
	}
		
	return interfaz;
		
}])


.factory("FactoryDB", ['$cordovaSQLite', '$cordovaToast', '$rootScope', '$q','$state', function($cordovaSQLite, $cordovaToast, $rootScope, $q,$state){
	
		var db = null;
			
			
					
		var interfaz = {
			
			
			punteroDb: function() {
				return db;
				
			},
			
			
			inicializarDB: function(){
				
				var q = $q.defer();
				try{
					db = $cordovaSQLite.openDB({name: 'my.db', location: 'default'});
					} 
					catch (e) {
					  alert(e);
					  q.reject(e);
					  //throw e; // rethrow to not marked as handled
					}


				$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS modulos (id integer primary key AUTOINCREMENT, uuid text, clave text, descripcion text, idModuloTipo text, urlImagen text)").then(
			
		function(res) {
			
			$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS espacios (id integer primary key AUTOINCREMENT, descripcion text, urlImagen text)").then(
		
	function(res) {
		
		
		$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS dispositivos (id integer primary key AUTOINCREMENT, nombre text, descripcion text, idEspacio int, urlImagen text, idModulo int, entradaModulo int)").then(
	function(res) {
		
		q.resolve();
		
		
	}, function (err) {alert("ERROR TABLA dispositivos");q.reject(err)});
		
		
	}, function (err) {alert("ERROR TABLA espacios");q.reject(err)});
			
			
		}, function (err) {alert("ERROR TABLA modulos");q.reject(err)});
				
				return q.promise;
					
				
					
						
				

			}
		
		}
		
		return interfaz;
	}])
;