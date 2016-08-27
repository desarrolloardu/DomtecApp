



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

.controller('ModulosCtrl', function($rootScope,$scope,$state,Modulos,$cordovaToast) {

	var vm = this;
	
	vm.back=back;
	
	function back () {
		$state.go('app.inicio.espacios')
		}
	
	
	
	
	vm.tipoModulos=Modulos.tipoModulos();
	
	
	
	 /*$rootScope.$on('$stateChangeStart', 
function(event, toState, toParams, fromState, fromParams){ 

if(toState.module=='modulos'){
	
	Modulos.lista().then( 
			function(res){
							if(!angular.equals(vm.lista,res))
			vm.lista = res;
						});

	
	}

 });*/
	
$scope.$on('$ionicView.enter', function(e) {
	
	Modulos.lista().then( 
			function(res){
							vm.lista = res;
						});
						
	
						
});				
						
		
})

.controller('ModuloAltaCtrl', function($ionicHistory,Modulos) {

	var vm = this;
	vm.lista=Modulos.tipoModulos();
	
	vm.back=back;
	
	function back () {
		$ionicHistory.goBack();
		};
	
	
	

	vm.alta = function(){
		
		Modulos.insertar(vm.uuid,vm.descripcion,vm.clave,vm.selectTipo).then(function(res){
			
			$state.go('app.modulos');
			
		},function(err){});
		
		
	}
	
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

.controller('EspacioAltaCtrl', function(Espacios, $stateParams, $state,$ionicHistory) {

	var vm = this;
	
	vm.urlImagen = "./img/ionic.png";
	
		vm.back=back;
	
	function back () {
		$ionicHistory.goBack();
		};
	
	
	
	if($stateParams.parametros != null)
	{
		vm.descripcion = $stateParams.parametros.descripcion;
		vm.urlImagen = $stateParams.parametros.urlImagen;
		vm.descImagen= $stateParams.parametros.descImagen;
		vm.codImagen= $stateParams.parametros.codImagen;
	}

	vm.alta = function(){	
		Espacios.insertar(vm.descripcion,vm.urlImagen).then(function(res){
			
			
			$state.go('app.inicio.espacios');
			
		},function(err){});
	}
	
	vm.seleccionarImagen = function(){
		//alert("seleccionarImagen");
		var parametrosActuales = {descripcion:vm.descripcion, urlImagen:vm.urlImagen, codigoGaleria:'espacios'}	
		$state.go("app.imagenes", {parametros:parametrosActuales});
	}
})


.controller('DispositivosCtrl', function($rootScope,$state, $scope, Dispositivos, $ionicPopover) {
	
var vm = this;
//var onholdPresionado = false;

vm.openPopover = function(event, dispositivoId){
	//onholdPresionado = true;
	//alert('open popover dispositivoId: ' + dispositivoId);
	$scope.dispositivoIdSeleccionado = dispositivoId;
	$scope.popover.show(event);
//	event.stopPropagation();
}

$scope.editarDispositivo = function(){
	$scope.popover.hide();
	//alert('editarDispositivo dispositivoId: ' + $scope.dispositivoIdSeleccionado);
	var listaFiltrada = vm.lista.filter(function(elem){
		return (elem.id == $scope.dispositivoIdSeleccionado);
	}) 

	//alert('listaFiltrada id: ' + listaFiltrada[0].id);
	var parametrosActuales = {id:listaFiltrada[0].id, nombre:listaFiltrada[0].nombre, descripcion:listaFiltrada[0].descripcion, idEspacio:listaFiltrada[0].idEspacio, urlImagen:listaFiltrada[0].urlImagen, idModulo:listaFiltrada[0].idModulo,	entradaModulo:listaFiltrada[0].entradaModulo};	
	
	//alert('parametrosActuales id: ' + parametrosActuales.id);
	$state.go("app.dispositivoAlta", {parametros:parametrosActuales});

}

vm.mostrarDispositivo = function(idDispositivo){
	//if(!onholdPresionado)
	//{


		
		var parametrosActuales = {id:idDispositivo}	
		$state.go("app.dispositivo", {parametros:parametrosActuales});
	//}
	//else
	//	onholdPresionado = false;
}

$ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

/*
vm.onhold = function(){
	
	alert("on hold");
	
}	
*/
			/*$rootScope.$on('$stateChangeStart', 
function(event, toState, toParams, fromState, fromParams){ 


	if(toState.module=='dispositivos'){
	
		Dispositivos.lista().then( 
			function(res){
							if(!angular.equals(vm.lista,res))
								vm.lista = res;
							
						});

					
					}

 }); */
 
 
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
	
	//$cordovaBluetoothSerial.enable().then(enableExito, error);
		
	//$cordovaBluetoothSerial.isConnected(function (){alert("conectado");}, function (){alert("NO conectado");})
	//$cordovaPlugin.someFunction().then(success, error);
	
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
	
	$ionicModal.fromTemplateUrl('templates/my_modal.html', {
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
		
			if($stateParams.parametros == null)
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
		//var parametrosActuales = {nombre:vm.nombre, descripcion:vm.descripcion, idEspacio:vm.idEspacio, urlImagen:vm.urlImagen, idModulo:vm.idModulo, entradaModulo:vm.entradaModulo, codigoGaleria:'dispositivos'}	
		//$state.go("app.imagenes", {parametros:parametrosActuales});
	}


	$scope.$on('$ionicView.enter', function(e) {
		//$state.reload();
		if($stateParams.parametros == null)
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
			//alert('alta id: ' + $stateParams.parametros.id);
			//alert('alta nombre: ' + $stateParams.parametros.nombre	);
			

			vm.nombre = $stateParams.parametros.nombre;
			vm.descripcion = $stateParams.parametros.descripcion;
			vm.idEspacio = $stateParams.parametros.idEspacio.toString();
			vm.urlImagen = $stateParams.parametros.urlImagen;
			vm.descImagen= $stateParams.parametros.descImagen;
			vm.codImagen= $stateParams.parametros.codImagen;
			vm.idModulo= $stateParams.parametros.idModulo.toString();
			vm.entradaModulo= $stateParams.parametros.entradaModulo.toString();
			vm.id = $stateParams.parametros.id;
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
	
	
	//$cordovaToast.show('DB!', 'long', 'center');
/*	
	FactoryDB.peopleInsertar("PURO", "PPPP");

	vm.select = function()
	{
		FactoryDB.peopleSeleccionar("PPPP").then( 
			function(res){
							vm.lista = res;
						});
						
	}
*/
})



.controller('EspaciosCtrl', function($rootScope,$scope, Espacios) {
	
	var vm = this;
	
	
	
/*	$rootScope.$on('$stateChangeStart', 
function(event, toState, toParams, fromState, fromParams){ 

if(toState.module=='espacios'){
	
	Espacios.lista().then( 
			function(res){
				
				if(!angular.equals(vm.lista,res))
			vm.lista = res;
						});

	
	}

 }); */
 
 
 $scope.$on('$ionicView.enter', function(e) {
	
	
	Espacios.lista().then( 
			function(res){
							//alert("lista");
							vm.lista = res;
						});
						
 })			
						
})



;