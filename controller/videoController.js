app.controller('videoController', function ($rootScope, $scope, $http) {

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

    $scope.lwidth = window.innerWidth - 1;
    $scope.lheight = window.innerHeight - 2;
    $scope.loading = true;
    $scope.videoUsers = []

    var lw = window.innerWidth;
    var lh = window.innerHeight / 2;

    $scope.Objeto = {
    };

    $http.post('' + $rootScope.servidor + '/GetAllVideo', $scope.Objeto).success(confirmaCallback);

    // callbacks
    function confirmaCallback(data, status) {
        $scope.lista = data;
    }


    $scope.changevideo = function (codigo) {
        $("#player").empty();        
        var ifr = $('<iframe id="player" style="padding:0px" width="' + lw + 'px" height="' + lh + 'px"  frameborder="0" allowfullscreen>');
        var src = 'http://www.youtube.com/embed/' + codigo;
        ifr.addClass('player');
        ifr.attr('src', src);
        $("#player").append(ifr);
        //$location.hash('player');
        //$anchorScroll();
    }



});