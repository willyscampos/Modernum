app.controller('fotosController', function ($rootScope, $scope, $http, $cordovaCapture, $cordovaBarcodeScanner) {

    $scope.lControle = true;
    $scope.myimage = null;
    $scope.par_code = "";
    $scope.par_nome = "";

    //    alert($rootScope.usuario);
    if (($rootScope.usuario == 0)) {
        $scope.lControle = false;
    }

    $scope.captureAudio = function () {
        var options = { limit: 3, duration: 10 };

        $cordovaCapture.captureAudio(options).then(function (audioData) {
            // Success! Audio data is here

        }, function (err) {
            // An error occured. Show a message to the user
        });
    }


    //$cordovaBarcodeScanner
    //   .scan()
    //   .then(function (barcodeData) {
    //       // Success! Barcode data is here
    //   }, function (error) {
    //       // An error occurred
    //   });


    //// NOTE: encoding not functioning yet
    //$cordovaBarcodeScanner
    //  .encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com")
    //  .then(function (success) {
    //      // Success!
    //  }, function (error) {
    //      // An error occurred
    //  });

    $scope.captureImage = function () {
        //var options = { limit: 3 };

        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA
        };

        $cordovaCapture.captureImage(options).then(function (imageData) {
            // Success! Image data is here
            console.log(imageData);
            //$scope.cameraimage = "data:image/jpeg;base64," + imageData;
            //$scope.cameraimage = imageData[0];
            //$scope.lastPhoto = dataURItoBlob("data:image/jpeg;base64," + imageData);
            var name = imageData[0].name;
            var path = imageData[0].fullPath;
            alert(imageData.fullPath);
            alert(path);
            $("#img01").attr("src", path);
            first_run = true;
            //window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

        }, function (err) {
            // An error occured. Show a message to the user
        });
    }

    //$scope.captureVideo = function () {
    //    var options = { limit: 3, duration: 15 };

    //    $cordovaCapture.captureVideo(options).then(function (videoData) {
    //        // Success! Video data is here
    //    }, function (err) {
    //        // An error occured. Show a message to the user
    //    });
    //}

    $scope.xico = function () {

        $cordovaBarcodeScanner.scan().then(function (barcodeData) {
            // Success! Barcode data is here
            $scope.par_code = barcodeData.text;

            $scope.Usuario = {
                par_code1: $scope.par_code,
                par_code2: $scope.par_code
            };

            ////alert($scope.par_code);
            //console.log($scope.Usuario);

            if (1 == 1) {
                $('#lMessage').empty();
                $http.post('' + $rootScope.servidor + '/AddRegistro', $scope.Usuario).success(confirmaCallback);
            } else {
                $('#lMessage').append('<p class="alert alert-warning">Atenção ! No....</p>');
            }

        }, function (error) {
            // An error occurred
        });
    }

    //$cordovaCapture.captureVideo(options).then(function (videoData) {
    //    // Success! Video data is here
    //}, function (err) {
    //    // An error occured. Show a message to the user
    //});


    /*
    app.controller('fotosController', function ($rootScope, $scope, $http) {
    
        // codigo inicial
        $scope.alerta = false;
        $scope.t2 = true;
        $scope.emp_name = "";
        $scope.emp_document = "";
        $scope.emp_password = "";
        $scope.emp_email = "";
        $scope.lControle = true;
        $scope.myimage = null;
    
    
        if (($rootScope.usuario == 0)) {
            $scope.lControle = false;
        }
    
        // funcoes e procedimentos
        $scope.getFoto = function () {
    
            captureImage();
    
            //$scope.Evidencia = {
            //    evi_descricao: $scope.evi_descricao,
            //    evi_data: $scope.evi_data,
            //    usu_id: $rootScope.usuario
            //};
    
            //if (($scope.Evidencia.evi_descricao != "")) {
            //    $('#lMessage').empty();
            //    $http.post('' + $rootScope.servidor + '/AddEvidencia', $scope.Evidencia).success(confirmaCallback);
            //} else {
            //    $('#lMessage').append('<p class="alert alert-warning">Atenção ! Dados obrigatórios.</p>');
            //}
        }
    
        $scope.$watch('myimage', function () {
            if ($root.myimage != null) {
                alert('xico');
            }
        }, true);
    
        // callbacks
        function confirmaCallback(data, status) {
            if (data.error) {
                $('#lMessage').append('<p class="alert alert-danger">Erro ! Server error, tente novamente</p>');
    
            } else {
                $('#lMessage').append('<p class="alert alert-success"> Registro realizado com sucesso !</p>');
            }
        }
    
    });
    */

    function readImage(file) {
        var reader = new FileReader();
        var image = new Image();
        reader.readAsDataURL(file);
        reader.onload = function (_file) {
            image.src = _file.target.result;              // url.createObjectURL(file);
            alert(image.src);
            image.onload = function () {
                var w = this.width,
                    h = this.height,
                    t = file.type,                           // ext only: // file.type.split('/')[1],
                    n = file.name,
                    s = ~~(file.size / 1024) + 'KB';
                $('#uploadPreview').append('<img src="' + this.src + '"> ' + w + 'x' + h + ' ' + s + ' ' + t + ' ' + n + '<br>');
            };
            image.onerror = function () {
                alert('Invalid file type: ' + file.type);
            };
        };
    }


    function dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        var bb = new Blob([ab], { "type": mimeString });

        return bb;
    }

    function gotFS(fileSystem) {
        fileSystem.root.getFile("save.txt", {
            create: true,
            exclusive: false
        }, gotFileEntry, fail);
    }


    function fail(error) {
        console.log(error.code);
    }

    function confirmaCallback(data, status) {
        $scope.par_nome = data[0].par_nome || '----';

        //alert(data[0].par_nome);
        if (data.error) {
            $('#lMessage').append('<p class="alert alert-danger">Erro ! Server error, tente novamente</p>');

        }

        //alert($scope.par_nome);
    }



});