



angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

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

.controller('ModulosCtrl', function($rootScope,Modulos,$cordovaToast) {

	var vm = this;
	
	
	
	vm.tipoModulos=Modulos.tipoModulos();
	
	
	
	$rootScope.$on('$stateChangeStart', 
function(event, toState, toParams, fromState, fromParams){ 

if(toState.module=='modulos'){
	
	Modulos.lista().then( 
			function(res){
							if(!angular.equals(vm.lista,res))
			vm.lista = res;
						});

	
	}

 });
	

	
	Modulos.lista().then( 
			function(res){
							vm.lista = res;
						});
						
	
						
						
						
	vm.urlImagen = function (tipo) {
		var respuesta = vm.tipoModulos.filter(function(elemento) {
					
					
					
					
					return (elemento.cod == tipo);
					
				})
				
		return respuesta[0].urlImagen;
					
	}					
})

.controller('ModuloAltaCtrl', function(Modulos) {

	var vm = this;
	
	
	
	vm.lista=Modulos.tipoModulos();

	vm.alta = function(){
		
		Modulos.insertar(vm.uuid,vm.descripcion,vm.clave,vm.selectTipo);
		
		
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

.controller('EspacioAltaCtrl', function(Espacios, $stateParams, $state) {

	var vm = this;
	
	vm.urlImagen = "./img/ionic.png";
	
	if($stateParams.parametros != null)
	{
		vm.descripcion = $stateParams.parametros.descripcion;
		vm.urlImagen = $stateParams.parametros.urlImagen;
		vm.descImagen= $stateParams.parametros.descImagen;
		vm.codImagen= $stateParams.parametros.codImagen;
	}

	vm.alta = function(){	
		Espacios.insertar(vm.descripcion,vm.urlImagen);
	}
	
	vm.seleccionarImagen = function(){
		//alert("seleccionarImagen");
		var parametrosActuales = {descripcion:vm.descripcion, urlImagen:vm.urlImagen, codigoGaleria:'espacios'}	
		$state.go("app.imagenes", {parametros:parametrosActuales});
	}
})


.controller('DispositivosCtrl', function($rootScope,$scope, Dispositivos) {
	
		var vm = this;
		
		
		$rootScope.$on('$stateChangeStart', 
function(event, toState, toParams, fromState, fromParams){ 

if(toState.module=='dispositivos'){
	
	Dispositivos.lista().then( 
			function(res){
							
							
							if(!angular.equals(vm.lista,res))
			vm.lista = res;
							
						});

	
	}

 });
	
	
		Dispositivos.lista().then( 
				function(res){
								//alert("lista");
								vm.lista = res;
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

.controller('DispositivoAltaCtrl', function($scope,$ionicModal,Dispositivos, Espacios, $state, $stateParams) {

	var vm = this;
	
	$ionicModal.fromTemplateUrl('js/my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
	
	
	vm.urlImagen = "./img/ionic.png";
	
	if($stateParams.parametros != null)
	{
		vm.nombre = $stateParams.parametros.nombre;
		vm.descripcion = $stateParams.parametros.descripcion;
		vm.idEspacio = $stateParams.parametros.idEspacio;
		vm.urlImagen = $stateParams.parametros.urlImagen;
		vm.descImagen= $stateParams.parametros.descImagen;
		vm.codImagen= $stateParams.parametros.codImagen;
	}
	
	Espacios.lista().then(function(res){
		vm.lista = res;
		
	});

	vm.alta = function(){
		
		Dispositivos.insertar(vm.nombre, vm.descripcion, vm.idEspacio, vm.urlImagen);
		$state.go("app.inicio.dispositivos");
		//alert("ALTA");
		
	};

	vm.seleccionarImagen = function(){
		//$scope.modal.show();
		//alert("seleccionarImagen");
		var parametrosActuales = {nombre:vm.nombre, descripcion:vm.descripcion, idEspacio:vm.idEspacio, urlImagen:vm.urlImagen, codigoGaleria:'dispositivos'}	
		$state.go("app.imagenes", {parametros:parametrosActuales});
	}
	
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


.controller('AcercaDeCtrl', function($scope, $ionicPlatform, $cordovaToast, FactoryDB) {
	
	var vm = this;
	
	$cordovaToast.show('DB!', 'long', 'center');
	FactoryDB.peopleInsertar("PURO", "PPPP");

	vm.select = function()
	{
		FactoryDB.peopleSeleccionar("PPPP").then( 
			function(res){
							vm.lista = res;
						});
						
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
	
	
	
	$rootScope.$on('$stateChangeStart', 
function(event, toState, toParams, fromState, fromParams){ 

if(toState.module=='espacios'){
	
	Espacios.lista().then( 
			function(res){
				
				if(!angular.equals(vm.lista,res))
			vm.lista = res;
						});

	
	}

 });
	
	
	Espacios.lista().then( 
			function(res){
							//alert("lista");
							vm.lista = res;
						});
						
						
						
})



;