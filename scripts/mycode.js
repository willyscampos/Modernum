var app = angular.module('AdWorkersMobile', [
  "ngRoute",
  "mobile-angular-ui",
  "mobile-angular-ui.touch",
  "mobile-angular-ui.scrollable",
  "ngCordova",
  "ngSanitize"
]);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', { templateUrl: "home.html" });
    $routeProvider.when('/home', { templateUrl: "home.html" });
    $routeProvider.when('/sair', { templateUrl: "home.html" });    
    $routeProvider.when('/texto', { templateUrl: "texto.html" });
    $routeProvider.when('/video', { templateUrl: "video.html" });
    $routeProvider.when('/audio', { templateUrl: "audio.html" });
    $routeProvider.when('/referencias', { templateUrl: "referencias.html" });
    $routeProvider.when('/equipe', { templateUrl: "equipe.html" });
    $routeProvider.when('/evidencias', { templateUrl: "evidencias.html" });
    $routeProvider.when('/fotos', { templateUrl: "fotos.html" });
});

app.service('analytics', [
   '$window', '$location', function ( $window, $location) {
      var send = function (evt, data) {
          ga('send', evt, data);
      }
  }
]);

app.factory('jsonService', function ($http) {
    return {

        getjson: function () {
            // $http returns a promise, which has a then function, which also returns a promise


            var promise = $http.get('http://gdata.youtube.com/feeds/api/videos?author=Intercomnorte2014&alt=json&max-results=50&start-index=1').then(function (response) {
                // The then function here is an opportunity to modify the response
                console.log("biggger--->" + response);
                // The return value gets picked up by the then in the controller.
                //
                // je ne sais pas ou il pioche le terme data
                // peut etre une expression de Angular
                //
                return response.data;
            });
            // Return the promise to the controller
            return promise;
        }
    }
});


app.controller('MainController', function ($rootScope,$scope, analytics, $timeout, $anchorScroll, $location) {
        $scope.lwidth = window.innerWidth;$scope.lheight = window.innerHeight;$scope.tsplash = true;$scope.tsplash2 = false;
        $scope.tvivo = false;

        $rootScope.servidor = 'http://hackingcode.com.br:8010';
        //$rootScope.servidor = 'http://localhost:907';
        $rootScope.usuario = 0;
        $rootScope.nome = "";
        $rootScope.uuid = 'idxpt0';
        $scope.tsplash = false;
        $scope.tsplash2 = false;            
        $scope.tvivo = true;
        $location.hash('startup');
        $anchorScroll();
        $location = "#/home";

        
        $scope.Sair = function () {
            $rootScope.usuario = 0;
            $rootScope.nome = "";
        }


        $scope.Menuout = function () {
            
            $('#box').hide();
        }
});

app.controller('MapCtrl', function ($scope, $http, $location, $timeout) {
    $scope.mapa = "sim gmaps3";
    $scope.hello = "02 campos";
    $scope.position = "";
    $scope.map = null;
    var lLatitude;
    var lLongitude;
    var lat2;
    var lon2;
    var lat3;
    var lon3;
    var lat4;
    var lon4;
    var myMap;
    var contador = 0;
    console.log('bingo');

    var CloserUp = function () {
        AtualizaMapa3();
        $timeout(CloserUp, 10000);
    }

    var CloserIdle = function () {
        //console.log("again...");
    }


    //$timeout(CloserUp, 10000);

    $scope.CallGPS = function () {
        console.log("yesss....");
        $scope.latitude = 10123;
        console.log("yesss....2");
        myoption = { maximumAge: 1000, timeout: 10000, enableHighAccuracy: false };
        console.log("yesss....3");
        $scope.hello = "click";
        console.log("yesss...4.");
        navigator.geolocation.getCurrentPosition(onSuccess, onError, myoption);
        console.log("yesss....5");
    }


    function onSuccess(position) {
        var element = "";
        lLatitude = position.coords.latitude;
        lLongitude = position.coords.longitude;


        element = 'Latitude: ' + position.coords.latitude + '<br />' +
                            'Longitude: ' + position.coords.longitude + '<br />' +
                            'Altitude: ' + position.coords.altitude + '<br />';

        console.log(lLatitude);
        console.log(lLongitude);

        AtualizaMapa();

        var pointA = new LatLon(lLatitude, lLongitude);
        var radiusInKm = 0.350;

        //console.log(pointA);
        var pointB = pointA.destinationPoint(90, radiusInKm);
        lat2 = pointB.lat();
        //console.log(lat2);
        lon2 = pointB.lon();

        var pointC = pointA.destinationPoint(180, radiusInKm);
        lat3 = pointC.lat();
        lon3 = pointC.lon();

        var pointD = pointA.destinationPoint(230, 0.1);
        lat4 = pointD.lat();
        lon4 = pointD.lon();

        AtualizaMapa2();

        $('#test1').gmap3();

        $scope.position = element;
        console.log('vai...');
        // adicionando o evento        
        //gmap3 remove event listener
        var events = {
            mouseover: function (map) {
                // crazy stuff here :- )
                console.log(map);
                console.log('evento');
                console.log('Map is now idle');
            }
        };

        // funcionou        
        google.maps.event.addListener(
            $('#test1').gmap3('get'),
                'idle',
              function (e) {
                  //your code
                  if (contador > 5) {
                      console.log('xico');
                      AdicionaM();
                      $('#test1').gmap3();
                  }
                  else {
                      contador = contador + 1;
                  }
              });

        $('#test1').gmap3({
            map: {
                events: {
                    bounds_changed: function (map) {
                        var bounds = map.getBounds();
                        var ne = bounds.getNorthEast();
                        var sw = bounds.getSouthWest();
                        console.log('Boundary');
                        console.log(ne.lat());
                        console.log(ne.lng());
                        console.log(sw.lat());
                        console.log(sw.lng());
                    }
                }
            }
        });
    }

    function AdicionaM() {
        markersJSON = '[{"lat":48.8620722, "lng":2.352047, "data":"Paris !"},{"lat":46.59433,"lng":0.342236, "data":"Poitiers : great city !"},{"lat":42.704931, "lng":2.894697, "data":"Perpignan ! <br> GO USAP !"}]';

        console.log(lat4);
        pausecomp(5000);
        $('#test1').gmap3({
            marker: {
                values: [
                  { latLng: [lat4, lon4], data: "<a href='chat/4'>cat</a>", options: { icon: "img/pgirl1.png" }, id: "3" }
                ],
                events: {
                    mouseover: function (marker, event, context) {
                        var map = $(this).gmap3("get"),
                          infowindow = $(this).gmap3({ get: { name: "infowindow" } });

                        if (infowindow) {
                            infowindow.open(map, marker);
                            infowindow.setContent(context.data);
                        } else {
                            $(this).gmap3({
                                infowindow: {
                                    anchor: marker,
                                    options: { content: context.data }
                                }
                            });
                        }
                    },
                    mouseout: function () {
                        var infowindow = $(this).gmap3({ get: { name: "infowindow" } });
                        if (infowindow) {
                            //infowindow.close();
                            var limbo = 8;
                        }
                    },
                    click: function (marker, event, context) {
                        BuildConnection(context.id);
                    }
                }
            }
        });
    }

    function AtualizaMapa2() {

        console.log("mapa02");

        $("#test1").gmap3({
            map: {
                options: {
                    center: [lLatitude, lLongitude],
                    zoom: 16
                }
            },
            marker: {
                values: [
                  { latLng: [lat2, lon2], data: "Man", options: { icon: "img/gman1.png" }, id: "1" },
                  { latLng: [lat3, lon3], data: "<a href='chat/1'>cat</a>", options: { icon: "img/pgirl1.png" }, id: "2" }
                ],
                options: {
                    draggable: false
                },
                events: {
                    mouseover: function (marker, event, context) {
                        var map = $(this).gmap3("get"),
                          infowindow = $(this).gmap3({ get: { name: "infowindow" } });

                        if (infowindow) {
                            infowindow.open(map, marker);
                            infowindow.setContent(context.data);
                        } else {
                            $(this).gmap3({
                                infowindow: {
                                    anchor: marker,
                                    options: { content: context.data }
                                }
                            });
                        }
                    },
                    mouseout: function () {
                        var infowindow = $(this).gmap3({ get: { name: "infowindow" } });
                        if (infowindow) {
                            //infowindow.close();
                            var limbo = 8;
                        }
                    },
                    click: function (marker, event, context) {
                        BuildConnection(context.id);
                    }
                }
            }
        });
    }

    function AtualizaMapa3() {

        $("#test1").gmap3({
            map: {
                options: {
                    center: [lLatitude, lLongitude],
                    zoom: 16
                }
            },
            marker: {
                values: [
                  { latLng: [lat2, lon2], data: "Man", options: { icon: "img/gman1.png" }, id: "1" },
                  { latLng: [lat3, lon3], data: "<a href='chat/1'>cat</a>", options: { icon: "img/pgirl1.png" }, id: "2" },
                  { latLng: [lat4, lon4], data: "<a href='chat/4'>cat</a>", options: { icon: "img/pgirl1.png" }, id: "3" }
                ],
                options: {
                    draggable: false
                },
                events: {
                    mouseover: function (marker, event, context) {
                        var map = $(this).gmap3("get"),
                          infowindow = $(this).gmap3({ get: { name: "infowindow" } });

                        if (infowindow) {
                            infowindow.open(map, marker);
                            infowindow.setContent(context.data);
                        } else {
                            $(this).gmap3({
                                infowindow: {
                                    anchor: marker,
                                    options: { content: context.data }
                                }
                            });
                        }
                    },
                    mouseout: function () {
                        var infowindow = $(this).gmap3({ get: { name: "infowindow" } });
                        if (infowindow) {
                            //infowindow.close();
                            var limbo = 8;
                        }
                    },
                    click: function (marker, event, context) {
                        BuildConnection(context.id);
                    }
                }
            }
        });
    }

    function BuildConnection(code) {
        alert(code);
        //document.location = "#/chat/1";
        //window.location.href = '#/chat/1';
        var url = "";
        url = '#/chat/' + code;
        //console.log(url);
        //window.location.href = url;
    }

    function AtualizaMapa() {
        $('#test1').gmap3({
            marker: {
                values: [
                    { latLng: [lLatitude, lLongitude], data: "Paris !" },
                    { latLng: [lat2, lon2], data: "Paris !" },
                ],
                options: {
                    draggable: false
                }
            },
            map: {
                options: {
                    center: [lLatitude, lLongitude],
                    zoom: 15
                }
            },
            events:
                {
                    mousemove: function (map, event) {
                        alert('normal click');
                    }
                }
        });

        $('#test1').gmap3();
    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }

});


