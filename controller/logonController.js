app.controller('logonController', function ($rootScope, $scope, $http, $location) {

    $scope.Registro = function () {

        $scope.Usuario = {
            usu_loginemail: $scope.usu_loginemail,
            usu_senha: $scope.usu_senha
        };

        if (($scope.Registro.usu_loginemail != "") && ($scope.Registro.usu_senha != "") ) {
            $('#lMessage').empty();
            $http.post('' + $rootScope.servidor + '/GetUsuario', $scope.Usuario).success(confirmaCallback);
        } else {
            $('#lMessage').append('<p class="alert alert-warning">Atenção ! Dados obrigatórios.</p>');
        }
    }

    function confirmaCallback(data, status) {
        $rootScope.usuario = data[0].usu_id;
        $rootScope.nome = data[0].usu_nome;
        if (data.error) {
            $('#lMessage').append('<p class="alert alert-danger">Erro ! Server error, tente novamente</p>');

        } else {           
            $location.path("/evidencias");
        }
    }

});