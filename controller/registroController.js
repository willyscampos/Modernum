app.controller('registroController', function ($rootScope, $scope, $http) {

    // codigo inicial


    $scope.alerta = false;
    $scope.t2 = true;
    $scope.emp_name = "";
    $scope.emp_document = "";
    $scope.emp_password = "";
    $scope.emp_email = "";
    $scope.lControle = true;


    if (($rootScope.usuario == 0)) {
        $scope.lControle = false;
    }

    // funcoes e procedimentos
    $scope.Registro = function () {
        console.log($scope.objetoGeneric);
        $scope.Evidencia = {
            evi_descricao: $scope.evi_descricao,
            evi_data: $scope.evi_data,
            usu_id: $rootScope.usuario
        };

        if (($scope.Evidencia.evi_descricao != "")) {
            $('#lMessage').empty();
            $http.post('' + $rootScope.servidor + '/AddEvidencia', $scope.Evidencia).success(confirmaCallback);
        } else {
            $('#lMessage').append('<p class="alert alert-warning">Atenção ! Dados obrigatórios.</p>');
        }
    }

    function confirmaCallback(data, status) {
        if (data.error) {
            $('#lMessage').append('<p class="alert alert-danger">Erro ! Server error, tente novamente</p>');

        } else {
            $('#lMessage').append('<p class="alert alert-success"> Registro realizado com sucesso !</p>');
        }
    }

});