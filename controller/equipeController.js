app.controller('equipeController', function ($rootScope, $scope, $http) {

    // inicio do comportamento
    $scope.objresponse = [];
    $scope.objTipoNotificacao = [];
    $scope.teste = "off";
    $scope.alerta = false;
    $scope.t2 = true;
    $scope.texto = "xico";
    $scope.emp_document = "";
    $scope.emp_password = "";
    $scope.emp_email = "";
    $scope.lControle = true;

    $scope.Objeto = {
    };


    //// funcoes e procedimentos
    $http.post('' + $rootScope.servidor + '/GetAllEquipe', $scope.Objeto).success(confirmaCallback);

    // callbacks
    function confirmaCallback(data, status) {

        $scope.lista = data;
    }


});