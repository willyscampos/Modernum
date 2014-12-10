// only functions
function onError(error) {
    console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}


function newID() {
    var g = "";
    for (var i = 0; i < 32; i++)
        g += Math.floor(Math.random() * 0xF).toString(0xF) +
        (i == 7 || i == 11 || i == 15 || i == 19 ? "-" : "");
    return g;
}

function pausecomp(millis) {
    var date = new Date();
    var curDate = null;

    do { curDate = new Date(); }
    while (curDate - date < millis);
}

function check_in_bounds($sw_lat, $sw_lng, $ne_lat, $ne_lng, $lat, $lng) {
    $inLng = false;
    $inLat = false;

    if ($sw_lat > $ne_lat) {
        $inLat = $lat > $ne_lat && $lat < $sw_lat;
    } else {
        $inLat = $lat < $ne_lat && $lat > $sw_lat;
    }

    $inLng = $lng < $ne_lng && $lng > $sw_lng;

    return $inLat && $inLng;
}

function ShowMe(pLat, pLong, pWho, pId) {

    console.log(pWho);
    //    { latLng: [lat3, lon3], data: "<a href='chat/1'>cat</a>", options: { icon: "img/pgirl1.png" }, id: "2" },

    var pData;
    pData = "<a href='chat/" + pId + "'>" + pWho + "</a>";

    console.log(pData);
 
    $("#test1").gmap3({
        map: {
            options: {
                center: [pLat, pLong],
                zoom: 16
            }
        }, 
        marker: {
            values: [
                { latLng: [pLat, pLong], data: pData, options: { icon: "img/gman1.png" }, id: pId }
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


function addMarkerToCluster($this, latLng) {
    $this.gmap3({
        marker: {
            latLng: latLng,
            cluster: globalCluster
        }
    });
}

