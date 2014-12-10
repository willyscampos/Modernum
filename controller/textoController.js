app.controller('textoController', function ($rootScope, $scope, $http) {

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

    $http.post('' + $rootScope.servidor + '/GetAllTexto', $scope.Objeto).success(confirmaCallback);
    
    //// funcoes e procedimentos
    //$scope.Registro = function () {

    //    if ($rootScope.usuario == 0) {            
    //        $scope.lControle = false;
    //    }
                
    //    if (($scope.Registro.usu_nome != "")) {
    //        $('#lMessage').empty();
    //        $http.post('' + $rootScope.servidor + '/GetAllTexto', $scope.Objeto).success(confirmaCallback);
    //    } else {
    //        $('#lMessage').append('<p class="alert alert-warning">Atenção ! Dados obrigatórios.</p>');
    //    }
    //}

    // callbacks
    function confirmaCallback(data, status) {
        
        //if (jQuery.isEmptyObject(data)) {
        //    $('#lMessage').append('<p class="alert alert-success"> Sem acesso a internet ! </p>');
        //}
        //else {
        //    $scope.infotext = response[0].inf_text;

        //    $("#player").empty();
        //    var ifr = $('<div id="player">' + $scope.infotext + '</div>');
        //    console.log(ifr)
        //    //var src = $scope.infotext;
        //    //ifr.attr('src', src);
        //    $("#player").append(ifr);
        //}

        $scope.lista = data;
    }


});