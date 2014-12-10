app.controller('evidenciasController', function ($rootScope, $scope, $http) {

    // Inicio do Controller
    $scope.objresponse = [];
    $scope.objTipoNotificacao = [];
    $scope.InfoEvidencias = {};
    $scope.teste = "off";
    $scope.alerta = false;
    $scope.t2 = true;
    $scope.emp_name = "";
    $scope.emp_document = "";
    $scope.emp_password = "";
    $scope.emp_email = "";
    $scope.lControle = true;
     

    $scope.InformacaoUsuario = {
        usu_id: $rootScope.usuario
    };

    $http.post('' + $rootScope.servidor + '/GetEvidencias', $scope.InformacaoUsuario).success(consultaCallback);

    // Funçoes e Procedimento
    function consultaCallback(data, status) {
        $scope.InfoEvidencias = data;
        if (data.error) {
            $('#lMessage').append('<p class="alert alert-danger">Erro ! Server error, tente novamente</p>');

        } else {
            $('#lMessage').append('<p class="alert alert-success">Usuário realizado com sucesso !</p>');
        }
    }

});