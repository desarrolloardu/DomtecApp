



angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal,$state, $timeout,FactoryDB) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  
  
  
})

.controller('ModulosCtrl', function($rootScope, $scope, $state, Modulos, $cordovaToast, $ionicPopover) {

	var vm = this;
	
	vm.back=back;
	
	function back () {
		$state.go('app.inicio.espacios')
		}

	vm.tipoModulos=Modulos.tipoModulos();

	vm.openPopoverModulos = function(event, moduloId){
		//alert("openPopoverModulos");
		$scope.moduloIdSeleccionado = moduloId;
		$scope.popover.show(event);
	}

	$scope.editarModulo = function(){
		$scope.popover.hide();

		var listaFiltrada = vm.lista.filter(function(elem){
			return (elem.id == $scope.moduloIdSeleccionado);
		}) 

		//alert('listaFiltrada id: ' + listaFiltrada[0].id);
		var parametrosActuales = {id:listaFiltrada[0].id, descripcion:listaFiltrada[0].descripcion, uuid:listaFiltrada[0].uuid, clave:listaFiltrada[0].clave, idModuloTipo:listaFiltrada[0].idModuloTipo, urlImagen:listaFiltrada[0].urlImagen};	
		
		//alert('parametrosActuales id: ' + parametrosActuales.id);
		$state.go("app.moduloAlta", {parametros:parametrosActuales});

	}

	$scope.eliminarModulo= function(){
		//alert("eliminar");
		$scope.popover.hide();
		Modulos.eliminar($scope.moduloIdSeleccionado).then( 
				function(res){
								//alert("lista");
								vm.lista = res;
							});
	}

	$ionicPopover.fromTemplateUrl('templates/popoverModulos.html', {
		scope: $scope,
	}).then(function(popover) {
		$scope.popover = popover;
	});
 
	$scope.$on('$ionicView.enter', function(e) {
		Modulos.lista().then( 
					function(res){
									//alert("lista");
									vm.lista = res;
								});
	});
	
		
})


.controller('ModuloAltaCtrl', function($scope, $stateParams, $state, $ionicPlatform, $ionicHistory, Modulos) {
//alert("ModuloAltaCtrl");
	var vm = this;
	vm.lista=Modulos.tipoModulos();
	
	vm.back=back;
	
	function back () {
		$ionicHistory.goBack();
		};
	
	
	vm.alta = function(){
		
		if($stateParams.parametros == null)
		{
			//alert("insertar");
			Modulos.insertar(vm.uuid,vm.clave,vm.descripcion,vm.selectTipo).then(function(res){
		//	Espacios.insertar(vm.descripcion,vm.urlImagen).then(function(res){
		
			$state.go('app.modulos');
			
			},function(err){});
		}
		else
		{
			//alert("actualizar");
			Modulos.actualizar(vm.id, vm.uuid, vm.clave, vm.descripcion, vm.selectTipo).then(function(res){
			
			$state.go('app.modulos');
			
			},function(err){});
		}
	};

	$scope.$on('$ionicView.enter', function(e) {
		//alert("enter");
		if($stateParams.parametros == null)
		{
			//alert("ALTA");
			vm.descripcion = undefined;
			vm.uuid = undefined;
			vm.clave = undefined;
			vm.selectTipo = undefined;
		}
		else
		{
			//alert("MODIF");
			vm.descripcion = $stateParams.parametros.descripcion;
			vm.uuid = $stateParams.parametros.uuid;
			vm.clave = $stateParams.parametros.clave;
			vm.selectTipo = $stateParams.parametros.idModuloTipo.toString();
			vm.id = $stateParams.parametros.id;
		}
	});
	
})


.controller('EspacioCtrl', function($scope, $stateParams, Espacios) {
	
	/*var vm = this;
	$ionicPlatform.ready(function() {
		Espacios.lista().then( 
				function(res){
								//alert("lista");
								vm.lista = res;
							});
	})*/
})


//$scope,$ionicModal,$ionicPlatform,Dispositivos, Espacios, Modulos,Imagenes, $state, $stateParams,$ionicHistory
.controller('EspacioAltaCtrl', function($scope, Espacios,Imagenes, $stateParams, $state, $ionicPlatform, $ionicHistory,$ionicModal) {

//alert("EspacioAltaCtrl");
	var vm = this;
	
	vm.urlImagen = "./img/ionic.png";
	
	
	
	vm.back = function  () {
		$ionicHistory.goBack();
		};
		
		
	$ionicModal.fromTemplateUrl('templates/my_modal_imagenes.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalImagenes = modal;
  });
  
  
	
	$scope.imagenes=Imagenes.espacios();
	
	$scope.seleccionarImagen = function(imagen){
		
		vm.urlImagen=imagen.urlImagen;
		vm.descImagen=imagen.desc;
		vm.codImagen=imagen.cod;
	$scope.modalImagenes.hide();	
		
		
	}
	
	/*
	if($stateParams.parametros != null)
	{
		vm.descripcion = $stateParams.parametros.descripcion;
		vm.urlImagen = $stateParams.parametros.urlImagen;
		vm.descImagen= $stateParams.parametros.descImagen;
		vm.codImagen= $stateParams.parametros.codImagen;
	}
	*/
	
	vm.seleccionarImagen = function(){
		
		$scope.modalImagenes.show();
		//alert("seleccionarImagen");
		//var parametrosActuales = {descripcion:vm.descripcion, urlImagen:vm.urlImagen, codigoGaleria:'espacios'}	
		//$state.go("app.imagenes", {parametros:parametrosActuales});
	}


	vm.alta = function(){
		
		if(!$stateParams.id)
		{
			//alert("insertar");
			Espacios.insertar(vm.descripcion,vm.urlImagen).then(function(res){
		
			$state.go('app.inicio.espacios');
			
			},function(err){});
		}
		else
		{
			//alert("actualizar");
			Espacios.actualizar(vm.id, vm.descripcion, vm.urlImagen).then(function(res){
			
			$state.go('app.inicio.espacios');
			
			},function(err){});
		}
	};

	$scope.$on('$ionicView.enter', function(e) {
		//alert("enter");
		
		if(!$stateParams.id)
		{
			//alert("ALTA");
			vm.descripcion = undefined;
			vm.urlImagen = './img/ionic.png';
			vm.descImagen= undefined;
			vm.codImagen= undefined;
		}
		else
		{
			
			var ObjetoTemp = Espacios.seleccionarId($stateParams.id)
			//alert("MODIF");
			vm.descripcion = ObjetoTemp.descripcion;
			vm.urlImagen = ObjetoTemp.urlImagen;
			vm.descImagen= ObjetoTemp.descImagen;
			vm.codImagen= ObjetoTemp.codImagen;
			vm.id = ObjetoTemp.id;
		}
	});
})


.controller('DispositivosCtrl', function($rootScope,$state, $scope, Dispositivos, $ionicPopover) {
	
var vm = this;
//var onholdPresionado = false;

vm.openPopover = function(event, dispositivoId){
	$scope.dispositivoIdSeleccionado = dispositivoId;
	$scope.popover.show(event);
}

$scope.editarDispositivo = function(){
	$scope.popover.hide();
	//var listaFiltrada = vm.lista.filter(function(elem){
	//	return (elem.id == $scope.dispositivoIdSeleccionado);
	//}) 
	//var parametrosActuales = {id:listaFiltrada[0].id, nombre:listaFiltrada[0].nombre, descripcion:listaFiltrada[0].descripcion, idEspacio:listaFiltrada[0].idEspacio, urlImagen:listaFiltrada[0].urlImagen, idModulo:listaFiltrada[0].idModulo,	entradaModulo:listaFiltrada[0].entradaModulo};	
	$state.go("app.dispositivoAlta", {id:$scope.dispositivoIdSeleccionado});
	
	
}

$scope.eliminarDispositivo= function(){
	//alert("eliminar");
	$scope.popover.hide();
	Dispositivos.eliminar($scope.dispositivoIdSeleccionado).then( 
			function(res){
							//alert("lista");
							vm.lista = res;
						});
}

vm.mostrarDispositivo = function(idDispositivo){
		var parametrosActuales = {id:idDispositivo}	
		$state.go("app.dispositivo", {parametros:parametrosActuales});
}

$ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });
 
 $scope.$on('$ionicView.enter', function(e) {
  
Dispositivos.lista().then( 
				function(res){
								//alert("lista");
								vm.lista = res;
							});


});
	
	
		

	
})

.controller('DispositivoCtrl', function($scope, $stateParams, Dispositivos, $ionicPlatform, $cordovaBluetoothSerial, $cordovaToast) {
	var vm =this;
	
	
	vm.listar = function(){
		
		$cordovaBluetoothSerial.list().then(exito, error);
		
	}
	
	vm.conectar = function(){
		
		$cordovaBluetoothSerial.connect("98:D3:31:70:30:80").then(conectExito, error);
		
	}

	vm.conectar2 = function(){
		
		$cordovaBluetoothSerial.connect("98:D3:31:90:2C:00").then(conectExito, error);
		
	}
	
	vm.conectar3 = function(){
		
		$cordovaBluetoothSerial.connect("98:D3:31:60:0E:AA").then(conectExito, error);
		
	}
	
	vm.conectar4 = function(){
		
		$cordovaBluetoothSerial.connect("98:D3:31:80:3B:1A").then(conectExito, error);
		
	}
	
	vm.enviar = function(){
		
		$cordovaToast.show(vm.intensidad, 'long', 'center');
		$cordovaBluetoothSerial.write(vm.intensidad+";", enviarExito, error);
		
	}
	
	function exito (response)
	{
		vm.lista=response;
		
		$cordovaToast.show(vm.lista[2].name, 'long', 'center');
	};
	
	function conectExito (response)
	{
		$cordovaToast.show('Conecto!', 'long', 'center');
	};
	
	function enviarExito (response)
	{
		$cordovaToast.show('Envio!', 'long', 'center');
	};
	
	function enableExito (response)
	{
		$cordovaToast.show("Bluetooth is enabled", 'long', 'center');
	};
	
	
	function error (response)
	{
		$cordovaToast.show(response, 'long', 'center');
	};

})

.controller('DispositivoAltaCtrl', function($scope,$ionicModal,$ionicPlatform,Dispositivos, Espacios, Modulos,Imagenes, $state, $stateParams,$ionicHistory) {

	var vm = this;
	
	
	
	vm.back= function () {
		$ionicHistory.goBack();
		};
	
	$ionicModal.fromTemplateUrl('templates/my_modal_imagenes.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalImagenes = modal;
  });
  
  
	
	$scope.imagenes=Imagenes.dispositivos();
	
	$scope.seleccionarImagen = function(imagen){
		
		vm.urlImagen=imagen.urlImagen;
		vm.descImagen=imagen.desc;
		vm.codImagen=imagen.cod;
	$scope.modalImagenes.hide();	
		
		
	}
	
	
	vm.urlImagen = "./img/ionic.png";
	
	Espacios.lista().then(function(res){
		vm.lista = res;
		
	});

	Modulos.lista().then(function(res){
		vm.listaModulos = res;
		/*setTimeout(function(){

vm.entradaModulo=1;

		},2000)*/
	});

	vm.alta = function(){
		
			if(!$stateParams.id)
			{
				Dispositivos.insertar(vm.nombre, vm.descripcion, vm.idEspacio, vm.urlImagen, vm.idModulo,vm.entradaModulo).then(function(res){
				
				$state.go('app.inicio.dispositivos');
				
				},function(err){});
			}
			else
			{
				Dispositivos.actualizar(vm.id, vm.nombre, vm.descripcion, vm.idEspacio, vm.urlImagen, vm.idModulo,vm.entradaModulo).then(function(res){
				
				$state.go('app.inicio.dispositivos');
				
				},function(err){});
			}
	};

	vm.seleccionarImagen = function(){
		$scope.modalImagenes.show();
	}


	$scope.$on('$ionicView.enter', function(e) {
		
		if(!$stateParams.id)
		{
			vm.nombre = undefined;
			vm.descripcion = undefined;
			vm.urlImagen = './img/ionic.png';
			vm.idEspacio = undefined;
			vm.idModulo = undefined;
			vm.entradaModulo = undefined;
			vm.descImagen= undefined;
			vm.codImagen= undefined;
		}
		else
		{
			
			var ObjetoId =Dispositivos.seleccionarId($stateParams.id)
			
			
					
			vm.nombre = ObjetoId.nombre;
			vm.descripcion = ObjetoId.descripcion;
			vm.idEspacio = undefined;
			vm.urlImagen = ObjetoId.urlImagen;
			vm.descImagen= ObjetoId.descImagen;
			vm.codImagen= ObjetoId.codImagen;
			vm.idModulo= undefined;
			vm.entradaModulo= undefined;
			vm.id = ObjetoId.id;
			
			if(ObjetoId.idEspacio)
			vm.idEspacio= ObjetoId.idEspacio.toString();
			if(ObjetoId.idModulo)
			vm.idModulo= ObjetoId.idModulo.toString();
			if(ObjetoId.entradaModulo)	
			vm.entradaModulo= ObjetoId.entradaModulo.toString();
			
			
			//$stateParams.parametros = undefined;	
		}
	});
	
	
})

.controller('ImagenesCtrl', function(Imagenes, $state, $stateParams) {

	var vm = this;
	
	if($stateParams.parametros.codigoGaleria == 'dispositivos')
	{
		vm.lista = Imagenes.dispositivos();
	}
	else if ($stateParams.parametros.codigoGaleria == 'espacios')
	{
		vm.lista = Imagenes.espacios();
	}
		

	var param = $stateParams.parametros;
	
	vm.seleccionar = function(imagen)
	{
		param.urlImagen = imagen.urlImagen;
		param.descImagen = imagen.desc;
		param.cod = imagen.cod;
		if(param.codigoGaleria == 'dispositivos')
		{
			$state.go('app.dispositivoAlta', {parametros:param});
		}
		else if (param.codigoGaleria == 'espacios')
		{
			$state.go('app.espacioAlta', {parametros:param});
		}
	}
})


.controller('AcercaDeCtrl', function($scope,$state, $ionicPlatform, $cordovaToast, FactoryDB) {
	
	var vm = this;
	
	vm.back=back;
	
	function back () {
		$state.go('app.inicio.espacios')
		}
})

.controller('InicioCtrl', function($scope, $ionicPlatform, $cordovaToast, FactoryDB) {
	
	var vm = this;
})


.controller('EspaciosCtrl', function($rootScope, $state, $scope, Espacios, $ionicPopover) {

var vm = this;
//var onholdPresionado = false;

vm.openPopoverEspacios = function(event, espacioId){
	$scope.espacioIdSeleccionado = espacioId;
	$scope.popover.show(event);
}

$scope.editarEspacio = function(){
	$scope.popover.hide();

//	var listaFiltrada = vm.lista.filter(function(elem){
//		return (elem.id == $scope.espacioIdSeleccionado);
	//}) 

//	alert('listaFiltrada id: ' + listaFiltrada[0].id);
	//var parametrosActuales = {id:listaFiltrada[0].id, descripcion:listaFiltrada[0].descripcion, urlImagen:listaFiltrada[0].urlImagen};	
	
	//alert('parametrosActuales id: ' + parametrosActuales.id);
	alert($scope.espacioIdSeleccionado);
	$state.go("app.espacioAlta", {id:$scope.espacioIdSeleccionado});

}

$scope.eliminarEspacio= function(){
	//alert("eliminar");
	$scope.popover.hide();
	Espacios.eliminar($scope.espacioIdSeleccionado).then( 
			function(res){
							//alert("lista");
							vm.lista = res;
						});
}

$ionicPopover.fromTemplateUrl('templates/popoverEspacios.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });
 
 $scope.$on('$ionicView.enter', function(e) {
	Espacios.lista().then( 
				function(res){
								//alert("lista");
								vm.lista = res;
							});
});
	

})



;