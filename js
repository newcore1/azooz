var isopend = false
var phub = false
var messagenumber = 0
var playerid
var pagename = 'actionspage'
var playerselected
var now = 270
var imboss = false
var autoclear = false
var showradio = true
var showcallsign = true
var showgender = false
var hideoffdutyofficers = false
var hidebreakofficers = false
var hidebusyofficers = false
var mousestreet = false
const center_x = 117.6;
const center_y = 172.6;
const scale_x = 0.02072;
const scale_y = 0.0205;
const test = {};
const test2 = {};
const stations = {};
const hospitls = {};
const fixers = {};
const publics = {};
const blipswassendit = {};
const cams = {};
const f9alerts = {};
var roninNumber
var assingTimeOutID = 0;
var createCalls;
var createCall2;
var createCall3;
var createCall4;
var coords;
var c2value;
var c3value;
var c4value;
var c5value;
var c6value;
var c7value;
var dblClick;

CUSTOM_CRS = L.extend({}, L.CRS.Simple, {
    projection: L.Projection.LonLat,
    scale: function(zoom) {

        return Math.pow(2, zoom);
    },
    zoom: function(sc) {

        return Math.log(sc) / 0.6931471805599453;
    },
	distance: function(pos1, pos2) {
        var x_difference = pos2.lng - pos1.lng;
        var y_difference = pos2.lat - pos1.lat;
        return Math.sqrt(x_difference * x_difference + y_difference * y_difference);
    },
	transformation: new L.Transformation(scale_x, center_x, -scale_y, center_y),
    infinite: true
});
var CustomTMSTileLayer = L.TileLayer.extend({
    getTileUrl: function (coords) {
      coords.y = -coords.y -1;
      return L.TileLayer.prototype.getTileUrl.call(this, coords);
    }
});
var map = L.map('map', {
    crs: CUSTOM_CRS,
    minZoom: 2.25,
    maxZoom: 9,
    noWrap: false,
    continuousWorld: true,
    preferCanvas: true,
    rotate: true,
    touchRotate: true,
    rotateControl: {
        closeOnZeroBearing: false
    },
    zoomSnap: 0.15,
    zoomDelta: 0.15,
    wheelPxPerZoomLevel: 125,
    zoom: 2.4,
});
var w = 1024;
var h = 1024;
var southWest = map.unproject([0, h], 3 - 1);
var northEast = map.unproject([w, 0], 3 - 1);
var bounds = new L.LatLngBounds(southWest, northEast);
var southWest2 = map.unproject([0, h], 3 - 1);
var northEast2 = map.unproject([w, 0], 3 - 1);
var boundsx2 = new L.LatLngBounds(southWest2, northEast2);
document.getElementById("map").style.background = "#222838";
var atlas = L.imageOverlay('https://media.discordapp.net/attachments/897626175634034698/1025233214513610912/gtav.jpg', bounds)
// below loads the satelite key toggle.
var satellite = L.imageOverlay('https://cdn.discordapp.com/attachments/897626175634034698/1025233213653782528/GTAV_SATELLITE_8192x8192.jpg', bounds) 
var road = L.imageOverlay('https://cdn.discordapp.com/attachments/897626175634034698/1025233213087563826/GTAV_ROADMAP_8192x8192.jpg', bounds)
var contrast = L.imageOverlay('https://cdn.discordapp.com/attachments/897626175634034698/1026510383013429278/GTAVContrast_8192x8192_1.png', bounds)
var orignal = L.imageOverlay('https://cdn.discordapp.com/attachments/729643536877748315/1035812540652986438/orginalf9map.jpg', bounds).addTo(map);
map.fitBounds(bounds);
map.setView([9800, 6100], 2);
var overlay = {};
var baseLayers = {
    "Orginal": orignal,
    "Atlas": atlas,
    "Road": road,
    "Satellite": satellite,
    "Contrast": contrast
}

$('#map').css('top', '0%');
$('#map').css('height', '100%');
$('#map').css('width', 'inherit');
map.setBearing(270);
map.setView([8400, 4700], 2);


imagehtml = `<div id="faisalgridremvoble" class="leaflet-layer " style="z-index: 10000000;opacity: 0.28;"><div id="gridc" style="
position: absolute;
background-image: url(https://cdn.discordapp.com/attachments/729643536877748315/1032357775713509396/1.png); left: -1500vh;top: -5000vh; width: 128000vh; height: 128000vh; z-index: 100000000;
" class=""></div></div>`
$('.leaflet-pane .leaflet-tile-pane').html(imagehtml);
showgrid = false;
$('#showguid').css('background', '#00f8b9');


var directionshtml = `
<div class="directionshtml" style="color: #c9c9c9c9;">
    <div class="directionsdiv1">NW</div>
    <div class="directionsdiv2">N</div>
    <div class="directionsdiv3">NE</div>
    <div class="directionsdiv4">E</div>
    <div class="directionsdiv5">SE</div>
    <div class="directionsdiv6">S</div>
    <div class="directionsdiv7">SW</div>
    <div class="directionsdiv8">W</div>
</div>`
$('#map').append(directionshtml);
f9resetmapdirections(270);
function f9resetmapdirections(route){
    if(route == 0 || route == 360){
        $('.directionsdiv1').html('NW');
        $('.directionsdiv2').html('N');
        $('.directionsdiv3').html('NE');
        $('.directionsdiv4').html('E');
        $('.directionsdiv5').html('SE');
        $('.directionsdiv6').html('S');
        $('.directionsdiv7').html('SW');
        $('.directionsdiv8').html('W');
    }else{
        $('.directionsdiv1').html('NE'); // old nw
        $('.directionsdiv2').html('E'); // old n
        $('.directionsdiv3').html('SE'); // old ne
        $('.directionsdiv4').html('S'); // old e
        $('.directionsdiv5').html('SW'); // old se
        $('.directionsdiv6').html('W'); // old s
        $('.directionsdiv7').html('NW'); // old sw
        $('.directionsdiv8').html('N'); // old w
    }
}

map.on('contextmenu', function(e){
    var coord = e.latlng;
    var y = coord.lat;
    var x = coord.lng;
    $('.addnewblibp').data('xx', x);
    $('.addnewblibp').data('yy', y);
    $('.addnewblibp').fadeIn(300);
    clicking.clickedsound();
});

var newzoom = 15+'px';
map.on('zoomend', function() {
    newzoom = '' + (3*(map.getZoom()+1.9)) +'px';
    $('.allfaisalblip').css({'font-size':newzoom,'width':newzoom,'height':newzoom,'background-size':newzoom + ' ' + newzoom}); 
    $('#selecteduser').css({'font-size':newzoom,'width':newzoom,'height':newzoom,'background-size':newzoom + ' ' + newzoom}); 
    $('#map .allfaisalblip').css({'font-size':newzoom,'width':newzoom,'height':newzoom,'background-size':newzoom + ' ' + newzoom}); 
    $('#map #selecteduser').css({'font-size':newzoom,'width':newzoom,'height':newzoom,'background-size':newzoom + ' ' + newzoom}); 
});

$('body').mousemove(function (data) { 
    var addnewblibp = $('.addnewblibp').css("display")
    if(addnewblibp == 'none'){
        var widting = $('.addnewblibp').width()/2
        var hieigh = $('.addnewblibp').height()/2
        $('.addnewblibp').css('left', (data.clientX-widting)+'px').css('top', (data.clientY-hieigh)+'px')
    }
});


map.on('mousemove', function(e){
    if(mousestreet){ 
            var coord = e.latlng;
            var yyy = coord.lat;
            var xxx = coord.lng;
            $.post("https://qb-dispatchsystem/GetStreetName" , JSON.stringify({ x: xxx, y: yyy  }), function (streetname) {
                $('#mapstreet').text(streetname);
            });
    }
});




/////////////////////////////////

$("#plistaquick").mouseenter(function() {
    $('#quickaccess').animate({ 'width': '100%' }, 98);
    $('#quickaccess > p').animate({ 'opacity': '1' }, 98);
});

$("#plistaquick").mouseleave(function() {
    $('#quickaccess').animate({ 'width': '0%' }, 98);
    $('#quickaccess > p').animate({ 'opacity': '0' }, 50);
});


$("#plistsetting").mouseenter(function() {
    $('#listettings').animate({ 'width': '100%' }, 98);
    $('#listettings > p').animate({ 'opacity': '1' }, 98);
});

$("#plistsetting").mouseleave(function() {
    $('#listettings').animate({ 'width': '0%' }, 98);
    $('#listettings > p').animate({ 'opacity': '0' }, 50);
});

$("#changemysign").mouseenter(function() {
    $('#callsignx').animate({ 'width': '100%' }, 98);
    $('#callsignx > p').animate({ 'opacity': '1' }, 98);
});

$("#changemysign").mouseleave(function() {
    $('#callsignx').animate({ 'width': '0%' }, 98);
    $('#callsignx > p').animate({ 'opacity': '0' }, 50);
});

$("#plistmap").mouseenter(function() {
    $('#openamap').animate({ 'width': '100%' }, 98);
    $('#openamap > p').animate({ 'opacity': '1' }, 98);
});

$("#plistmap").mouseleave(function() {
    $('#openamap').animate({ 'width': '0%' }, 98);
    $('#openamap > p').animate({ 'opacity': '0' }, 50);
});

/////////////////////////////////



$(document).on("click", ".allactionsbuttonlist2", function(e) {
    $('.allactionsmenubuttons').css('filter', 'brightness(1.25)');
    setTimeout(() => {
        $('.allactionsmenubuttons').css('filter', 'brightness(1)');
    }, 150);
    clicking.clickedsound();

    if($('#plistmenu').css('height') == '260.047px'){
        $('#plistmenu').animate({ 'height': '0%' }, 400);
    }else{
        $('#plistmenu').animate({ 'height': '56%' }, 400);
    }

});


var lasttop = 0
var lastleft = 0
$(document).on("click", "#fullscreen", function(e) {
    $('.dashborad').css('filter', 'brightness(1.25)');
    setTimeout(() => {
        $('.dashborad').css('filter', 'brightness(1)');
    }, 150);
    clicking.clickedsound();
    if(lastleft == 0){
        lasttop = $('.dashborad').css('top');
        lastleft = $('.dashborad').css('left');
        // $('#map').animate({ 'width': '81.45%', 'height': '100%' }, 1);
        $('.dashborad').css('top', '0vh');
        $('.dashborad').css('left', '0vh');
        $('.dashborad').css('width', '100%');
        $('.dashborad').css('height', '100%');
        $('#fullscreen').css('background', '#00f8b9');
        $('.allactionspagesline').css('height', '42vh');
    }else{
        // $('#map').animate({ 'width': 'inherit', 'height': '100%' }, 1);
        $('.dashborad').css('top', lasttop);
        $('.dashborad').css('left', lastleft);
        $('.dashborad').css('width', '150vh');
        $('.dashborad').css('height', '81vh');
        $('#fullscreen').css('background', '#141922');
        $('.allactionspagesline').css('height', '25vh');
        lasttop = 0;
        lastleft = 0;
    }

    

});


$(document).on('click', ".f9onemapimage", function() {
    var mapname = $(this).data('mapname');
    $('.f9onemapimage').css("border-left", 'unset');
    $(this).css('border-left', '5px solid #efefef');
    clicking.clickedsound();
    if(mapname == 'Atlas'){
        $('.leaflet-overlay-pane > img').attr('src', 'https://media.discordapp.net/attachments/897626175634034698/1025233214513610912/gtav.jpg');
        document.getElementById("map").style.background = "#0fa8d2";
        $('.f9mapbuttoninfos').css('color', 'black');
        $('.f9maptext').css('color', 'black');
        $('.directionshtml').css('color', 'rgba(0,0,0,0.4)');
    }else if(mapname == 'Contrast'){
        $('.leaflet-overlay-pane > img').attr('src', 'https://cdn.discordapp.com/attachments/729643536877748315/1026702938405601381/GTAVContrast_8192x8192_1.jpg');
        document.getElementById("map").style.background = "#262626";
        $('.f9mapbuttoninfos').css('color', '#727272');
        $('.f9maptext').css('color', '#727272');
        $('.directionshtml').css('color', '#727272');
    }else if(mapname == 'Orginal'){
        $('.leaflet-overlay-pane > img').attr('src', 'https://cdn.discordapp.com/attachments/729643536877748315/1035812540652986438/orginalf9map.jpg');
        document.getElementById("map").style.background = "#222838";
        $('.f9mapbuttoninfos').css('color', '#d7d7d7');
        $('.f9maptext').css('color', '#f1f1f1');
        $('.directionshtml').css('color', '#d7d7d7');
    }else if(mapname == 'Satellite'){
        $('.leaflet-overlay-pane > img').attr('src', 'https://cdn.discordapp.com/attachments/897626175634034698/1025233213653782528/GTAV_SATELLITE_8192x8192.jpg');
        document.getElementById("map").style.background = "#143d6b";
        $('.f9mapbuttoninfos').css('color', '#bfbfbf');
        $('.f9maptext').css('color', 'white');
        $('.directionshtml').css('color', 'white');
    }else if(mapname == 'Road'){
        $('.leaflet-overlay-pane > img').attr('src', 'https://cdn.discordapp.com/attachments/729643536877748315/1026703412206768188/GTAV_ROADMAP_8192x8192_1.jpg');
        document.getElementById("map").style.background = "#1862ad";
        $('.f9mapbuttoninfos').css('color', 'black');
        $('.f9maptext').css('color', 'black');
        $('.directionshtml').css('color', 'rgba(0,0,0,0.4)');
    }

    $('#mapname').text('Map Name: '+mapname);
});



function GTAVConverter(x,y)
{
    var x = x - 19.726446;
    var y = y - 19.726446;

    return map.containerPointToLatLng(new L.Point(x+1440.45,y+127.45));
}

const myself = L.divIcon({
    html: '<i class="fas fa-location-arrow"></i>',
    iconSize: [30, 30],
    className: 'map-icon map-icon-ping',
    offset: [-10, 0]
});
const DispatchPing = L.divIcon({
    html: '<i  class="fa fa-map-pin"></i>',
    iconSize: [20, 20],
    className: 'map-icon map-icon-ping',
    offset: [-10, 0]
});
const DispatchCall = L.divIcon({
    html: '<i class="fa fa-car"></i>',
    iconSize: [20, 20],
    className: 'map-icon map-icon-car',
    offset: [-10, 0]
});
const DispatchCallHeli = L.divIcon({
    html: '<i class="fa fa-helicopter"></i>',
    iconSize: [20, 20],
    className: 'map-icon map-icon-car',
    offset: [-10, 0]
});
const DispatchCallMotor = L.divIcon({
    html: '<i class="fa fa-motorcycle"></i>',
    iconSize: [20, 20],
    className: 'map-icon map-icon-car',
    offset: [-10, 0]
});
const DispatchCallBicycle = L.divIcon({
    html: '<i class="fa fa-bicycle"></i>',
    iconSize: [20, 20],
    className: 'map-icon map-icon-car',
    offset: [-10, 0]
});
const DispatchCallUser = L.divIcon({
    html: '<i class="fa fa-user"></i>',
    iconSize: [20, 20],
    className: 'map-icon map-icon-car',
    offset: [-10, 0]
});

function discpatchMap(code, x,y){
    test[code] = L.marker([y,x], { icon: DispatchPing })
    test[code].bindTooltip(code,
        {
            direction: 'top',
            permanent: false,
            sticky: false,
            offset: [10, 0],
            opacity: 0.9,
            className: 'map-tooltip'
        });
    test[code].addTo(map)
}



function discpatchMaps(xtype, code, x,y, icon2, color){
    const DispatchPoliceStations = L.divIcon({
        html: '<i class="allfaisalblip fas fa-'+icon2+'" style="color: '+color+';"></i>',
        iconSize: [22, 22],
        className: 'map-icon map-icon-car',
        offset: [-10, 0]
    });

    if(xtype == 'station'){
        stations[code] = L.marker([y,x], { icon: DispatchPoliceStations })
        stations[code].bindTooltip(code,
            {
                direction: 'top',
                permanent: false,
                sticky: false,
                offset: [10, 0],
                opacity: 0.9,
                className: 'map-tooltip'
            });
        stations[code].addTo(map)
    }else if(xtype == 'hospitl'){
        hospitls[code] = L.marker([y,x], { icon: DispatchPoliceStations })
        hospitls[code].bindTooltip(code,
            {
                direction: 'top',
                permanent: false,
                sticky: false,
                offset: [10, 0],
                opacity: 0.9,
                className: 'map-tooltip'
            });
            hospitls[code].addTo(map)
    }else if(xtype == 'fixer'){
        fixers[code] = L.marker([y,x], { icon: DispatchPoliceStations })
        fixers[code].bindTooltip(code,
            {
                direction: 'top',
                permanent: false,
                sticky: false,
                offset: [10, 0],
                opacity: 0.9,
                className: 'map-tooltip'
            });
            fixers[code].addTo(map)
    }else if(xtype == 'public'){
        publics[code] = L.marker([y,x], { icon: DispatchPoliceStations })
        publics[code].bindTooltip(code,
            {
                direction: 'top',
                permanent: false,
                sticky: false,
                offset: [10, 0],
                opacity: 0.9,
                className: 'map-tooltip'
            });
        publics[code].addTo(map)
    }

    $('.allfaisalblip').css({'font-size':newzoom,'width':newzoom,'height':newzoom,'background-size':newzoom + ' ' + newzoom}); 
    $('#selecteduser').css({'font-size':newzoom,'width':newzoom,'height':newzoom,'background-size':newzoom + ' ' + newzoom}); 

}



$('.policelistdiv').fadeOut();
window.addEventListener('message', function(event) {
    item = event.data;
	switch (event.data.action) {

		case 'openhub':
            SetMyinfo(event.data);
            $('.policelistdiv').fadeIn();
            phub = true
            break;


        case 'opendashboard':
            $('.welcomescreen').fadeIn();
            SetMyinfo(event.data);
            $('.dashborad').fadeIn(1000);
            $('.dashborad').css('z-index', '1000');
            $.post("https://qb-dispatchsystem/selectedofficer" , JSON.stringify({userid: playerid}), function (playerdata) {

                $('.officerxinfos').data('officerid', 0);
    
                $('.officerxinfos').data('radiochannel', playerdata.radioChannel);
    
                if(playerdata.image){
                    $('.pageselectedofficerimgdiv > img').attr('src', playerdata.image);
                }else{
                    if(playerdata.gender == 0){
                        $('.pageselectedofficerimgdiv > img').attr('src', 'https://cdn.discordapp.com/attachments/897626175634034698/1025192720978944020/male.png');
                    }else{
                        $('.pageselectedofficerimgdiv > img').attr('src', 'https://cdn.discordapp.com/attachments/897626175634034698/1025192915049394286/female.png');
                    }
                }
                $('.pageselectedofficertitle').html('<i class="fa-solid fa-person-military-pointing"></i> '+playerdata.callsign +' '+playerdata.name+'');
                $('#playerrank').html('Rank: '+playerdata.rank);
                $('#playerduty').html('Duty: '+playerdata.duty);
                $('#playerdirs').html('Direction: '+playerdata.dirction);
                $('#playerassigmen').html('Assignment: '+playerdata.Assignment);
                $('.officerallactionslist').fadeOut(1);
            });
            setTimeout(() => {
                $('.welcomescreen').animate({ 'border-radius': '50%', 'width': '1vh', 'height': '1vh', 'opacity': '0.5' }, 600);
                $('.welcomescreentext').fadeOut(100);
                $('.welcomescrenencirlcebutton').fadeOut(100);
                setTimeout(() => {
                    $('.welcomescreen').fadeOut(100);
                }, 75);
            }, 2500);
            dashborad = true
            break;


        case 'refreshmyinfo':
            SetMyinfo(event.data);
            break;


        case 'refreshhub':
            RefreshHub(event.data)
            break;


        case 'closedashboard':
            $('.dashborad').fadeOut(500);
            $('.addnewblibp').fadeOut(350);
            $('.dashborad').css('z-index', 'unset');
            dashborad = false
            break;


        case 'closehub':
            $('.policelistdiv').fadeOut();
            phub = false
            break;


        case 'newalert':
            policealert(event.data);
            break;

        case 'newmessage':
            showmessage(event.data);
            break;
            
        case 'newradarregister':
            newradarregister(event.data);
            break;
            
        case 'newnotify':
            NewNotify(event.data.icon, event.data.message, event.data.time);
            break;

        case 'addnewblip':
            NewNBlip(event.data.id, event.data.icon, event.data.name, event.data.time, event.data.x, event.data.y);
            break;

        case 'addlog':
            AddNewlog(event.data.icon, event.data.text);
            break;

       case 'showcamss':
            showallcamss(event.data.cams, event.data.typing);
            break;

        case 'update-coord':
            if (test2[event.data.source] == null ) {
                discpatchPersonMap(event.data.code, event.data.x,event.data.y, event.data.h, event.data.vehicle, event.data.source, event.data.color);
            } else {
                //test2[event.data.source].remove(map);
                ChangePlayerCoords(event.data.code, event.data.x,event.data.y, event.data.h, event.data.vehicle, event.data.source, event.data.color);
            }
            break;
        case 'updateheading':
            updateheading(event.data.heading);

            break;
        case 'removebodycam':
            RemoveBodycam(event.data.heading);

            break;
        case 'enablebodycam':
            EnableBodycam2();
            break;
        case 'disablebodycam':
            DisableBodycam2();

            break;

        case 'remove-coord':
            if (test2[event.data.source] == null ) {

            } else {
                test2[event.data.source].remove(map);
            }
            break;

    }
});




var showgrid = true
$(document).on('click', "#showguid", function() {
    if(showgrid == false){
        imagehtml = `<div id="faisalgridremvoble" class="leaflet-layer " style="z-index: 10000000;opacity: 0.28;"><div id="gridc" style="
        position: absolute;
        background-image: url(https://cdn.discordapp.com/attachments/729643536877748315/1032357775713509396/1.png); left: -1500vh;top: -5000vh; width: 128000vh; height: 128000vh; z-index: 100000000;
        " class=""></div></div>`
        $('.leaflet-pane .leaflet-tile-pane').html(imagehtml);
        showgrid = true;
        $('#showguid').css('background', '#00f8b9');
    }else{
        $('#faisalgridremvoble').remove();
        $('#showguid').css('background', '#12141c');
        showgrid = false;
    }
});



// add log

function AddNewlog(icon, text) {
    var currentTime = new Date()
    var datetime = currentTime.getDate() + "/"
                + (currentTime.getMonth()+1)  + "/" 
                + currentTime.getFullYear() + " - "  
                + currentTime.getHours() + ":"  
                + currentTime.getMinutes() + "";
    htmllog = `<div class="f9dashlog">
    <div class="f9dashlogicon"><i class="fas fa-`+icon+`" aria-hidden="true"></i></div>
    <div class="f9dashlogtext">`+text+`</div>
    <div class="f9dashlogtimeing">`+datetime+`</div>
    </div>`
    
    $('#logshere').append(htmllog);

}

$(document).on('click', "#deletealllogs", function() {
    $('#logshere').html('');
});

$(document).on('click', "#delallradarlogs", function() {
    $('#radarlogs').html('');
});

// add new blip

var selectedicon = '0'
$(document).on('click', ".addnewbliboneicon", function() {
    $('.addnewbliboneicon').css("color", "#adadad");
    if(selectedicon == $(this).data('iconn')){
        selectedicon = '0'
    }else{
        selectedicon = $(this).data('iconn');
        $(this).css("color", "#00f8b9");
    }
});

$(document).on('click', ".sendblibpconfirm", function() {
    var xx = $('.addnewblibp').data('xx');
    var yy = $('.addnewblibp').data('yy');
    var blipname = $('#newblipname').val();
    var timeing = $('#whatbliptimee').val();
    if(blipname.length < 21 && blipname.length > 0){
        if(selectedicon !== '0'){
            $.post("https://qb-dispatchsystem/SetBlips" , JSON.stringify({ text: blipname, icon: selectedicon, x: xx, y: yy, ms: timeing, }));
            NewNotify('check-circle', 'The blip has been created in the map for all officers', 6000)
            $('.addnewblibp').fadeOut(200);
            $('.addnewbliboneicon').css("color", "#adadad");
            selectedicon = '0'
            $("#whatbliptimee").val("60000");
            $('#newblipname').val("");
        }else{
            NewNotify('exclamation-triangle', 'you should choose icon for you blip', 6000)
        }
    }else{
        NewNotify('exclamation-triangle', 'Your blip name must be less than 20 characters.', 6000)
    }
});


$(document).on('click', ".addnewblibpclose", function() {
    $('.addnewblibp').fadeOut(200);
});

$(document).on('click', ".sendblibpdecline", function() {
    $('.addnewblibp').fadeOut(200);
});


function NewNBlip(id, icon, name, time, x, y) {

    var iconsforblip = L.divIcon({
        html: '<i class="allfaisalblip fas fa-'+icon+' fa-xl" style="color: red;  font-size: '+newzoom+'; width: '+newzoom+'; height: '+newzoom+'; background-size: '+newzoom+';"></i>',
        iconSize: [25, 25],
        className: 'map-icon map-icon-car',
        offset: [-10, 0]
    });

    blipswassendit[id] = L.marker([y,x], { icon: iconsforblip })
    blipswassendit[id].bindTooltip(name,
        {
            direction: 'top',
            permanent: false,
            sticky: false,
            offset: [-5, -11],
            opacity: 0.9,
            className: 'map-tooltip'
        });
    blipswassendit[id].addTo(map)
    setTimeout(() => {
        blipswassendit[id].remove(map);
    }, time);

}



// Map Options


$(document).on('click', "#sizeingmap", function() {
    map.setBearing(now);
    f9resetmapdirections(now);
    clicking.clickedsound();
    if(now == 270){
        map.setView([8400, 4700], 2);
    }else if(now == 360 || now == 0){
        map.setView([4724, -6824], 1);
    }
});

$(document).on('click', "#rotatemap", function() {
    // now = now + 90
    if(now == 0){
        now = 270
    }else if(now == 270){
        now = 0
    }
    map.setBearing(now);
    f9resetmapdirections(now);
    clicking.clickedsound();
    if(now == 270){
        map.setView([9800, 6100], 2);
    }else if(now == 360 || now == 0){
        map.setView([4724, -6824], 1);
    }

});



$(document).on('click', ".hubnotifying", function() {
    $(this).css('-webkit-animation', 'fssadingnotifyhide 200ms');
    $(this).bind('webkitAnimationEnd',function(){
        $(this).remove();
    });
});

// Notify
var notifynumber = 0
function NewNotify(icon, message, time, qbcore) {
    if(qbcore){
        $.post('https://qb-dispatchsystem/QBNotify', JSON.stringify({ message:  message, typeing: 'info' }));
    }else{
        notifynumber = notifynumber + 1
        if(dashborad == true){
            divstyle = 'f9dynmicnotifypalce'
        }else{
            divstyle = 'f9dynmicnotifypalce2'
        }
        notifyhtml = `
        <div class="`+divstyle+`" id="notify`+notifynumber+`">
            <div class="f9dynmicnotifyicon"><i class="fas fa-`+icon+`" aria-hidden="true"></i></div>
            <div class="f9dynmicnotifytext">`+message+`</div>
        </div>
        `
        if(dashborad == true){
            $('.f9dynmicnotifydivver').append(notifyhtml);
        }else{
            AddNewlog(icon, message)
            $('#messageshere').append('<div class="officerdutytime"> <div class="dutyofficername"><i class="fas fa-'+icon+'"></i> '+message+'</div> </div>');
            $('.hubheader').append('<div class="hubnotifying"><i class="fas fa-envelope"></i> NEW MESSAGE</div>');
            $('.hubnotifying').css('display', 'block');
            setTimeout(() => {
                $('.hubnotifying').css('-webkit-animation', 'fssadingnotifyhide 600ms');
                $('.hubnotifying').bind('webkitAnimationEnd',function(){
                    $('.hubnotifying').css('display', 'none');
                    $('.hubnotifying').remove();
                });
            }, 3500);
            // $('.f9dynmicnotifydivver2').append(notifyhtml);
        }
        clicking.notifyhtmls();
        // setTimeout(() => {
        //     $('#notify'+notifynumber+' > .f9dynmicnotifyicon').animate({ opacity: '1' }, 390);
        //     $('#notify'+notifynumber+' > .f9dynmicnotifytext').animate({ opacity: '1' }, 390);
        // }, 950);
        $('#notify'+notifynumber).delay(time).queue(function() {
            $(this).css('-webkit-animation', 'showfaisalislandOut 200ms');
    
            $(this).bind('webkitAnimationEnd',function(){
                $(this).remove();
            });
        });
    }
}





// new radar register
var randomid = 100
var selectedcam = 0
function newradarregister(data){
    
    var currentTime = new Date()
    var datetime = currentTime.getDate() + "/"
                + (currentTime.getMonth()+1)  + "/" 
                + currentTime.getFullYear() + " - "  
                + currentTime.getHours() + ":"  
                + currentTime.getMinutes() + "";
    randomid = randomid + 1
    rrcamnumber = parseInt(camnumberx)
    sdfsdfd = (rrcamnumber + 1).toString();
    flaggedhtml = `
    <div class="radarregister" id="rdg`+randomid+`" data-coordx="`+data.x+`" data-coordy="`+data.y+`" data-plate="`+data.plate+`">
        <div class="radarimage">
            <img src="https://cdn.discordapp.com/attachments/897626175634034698/1032306899435147355/red.png">
        </div>
        <div class="radarbuttons">
            <div class="radaronebutton" id="playcamwithid" data-emid="rdg`+randomid+`" data-camid="`+(data.camnumber - 1)+`">PLAY CAM</div>
            <div class="radaronebutton" id="selectflaglocation" data-emid="rdg`+randomid+`" data-coordx="`+data.x+`" data-coordy="`+data.y+`" data-plate="`+data.plate+`">LOCATION</div>
            <div class="radaronebutton" id="copyplateflagged" data-emid="rdg`+randomid+`" data-plate="`+data.plate+`">COPY PLATE</div>
        </div>
        <div class="radarinfo">
            <div class="radarsubject"><i class="fa-solid fa-gauge"></i> Flagged Car Register</div>
            <div class="radarplate"><i class="fa-solid fa-car"></i> CAR PLATE : `+data.plate+` </div>
            <div class="radarlocatetime">Location: `+data.locate+` <br> `+datetime+`</div>
        </div>
    </div>
    `

    if(sdfsdfd == data.camnumber){
        clicking.radarplate();
        $(flaggedhtml).appendTo('.newflaggednotify').delay(5500).queue(function() {
            $(this).css('-webkit-animation', 'fadeIrsigth 500ms');
            $(this).bind('webkitAnimationEnd',function(){
                $(this).remove();
            });
        });
    }
    $('#radarlogs').append(flaggedhtml);
    
}

$(document).on('click', "#copyplateflagged", function() {
    elementplate = $(this).data('plate');
    idtoclose = $(this).data('emid');
    copyToClipboard(elementplate);
    $('#'+selectedcam+' > .radarbuttons').css('opacity', '0');
    selectedcam = 0
});

$(document).on('click', "#playcamwithid", function() {
    thiscamid = $(this).data('camid');
    idtoclose = $(this).data('emid');
    $('#'+selectedcam+' > .radarbuttons').css('opacity', '0');
    selectedcam = 0
    clicking.opencam();
    $.post("https://qb-dispatchsystem/Gettablecams" , JSON.stringify({ cam: thiscamid }), function (f9olecams) {

        $('.f9tringlelocationstext').html(f9olecams.name);
        $('.f9tringlecamnumbetext').html('CAM: 1');
        camnumberx = thiscamid
        $('#camshere').html('<div class="f9uicam2" id="nocam"></div> <div class="f9uicam" id="closecam"><p><i class="fas fa-times"></i></p></div>');
        
        $('.enableradar').fadeIn(25);
        for (let i = 0; i < f9olecams.cams.length; i++) {
            $('#camshere').append('<div class="f9uicam" id="cam'+i+'"><p><img src="https://cdn.discordapp.com/attachments/729643536877748315/1044992464815132692/ccwhite.png" style="padding-bottom: 1.75px;width: 1.2vh;">  '+(i + 1)+'</p></div>');
            $(document).on('click', '#cam'+i+'', function() {
                Resetcambuttons();
                // $(this).css('border-top', '2px solid #ffffff9c');
                $(this).css('background-color', '#00f8b9');
                // $('.f9camerasui').css('animation', 'turn-off 0.1s ease 0s 1, turned-off 1s ease 0.1s infinite, white-dot 0.1s ease 0.1s 1');
                clicking.opencam();
                setTimeout(() => {
                    camnumber = i
                    $('.f9tringlecamnumbetext').html('CAM: '+(i + 1)+'');
                    $.post('https://qb-dispatchsystem/OpenCam', JSON.stringify({
                        locate: thiscamid,
                        camnumber: i,
                    }));
                    // $('.f9camerasui').css('animation', 'turn-on 0.1s ease 0s 1, turned-on 1s ease 0.1s infinite');
                }, 100);
            });
        }
        // $('#cam0').css('border-top', '2px solid #ffffff9c');
        $('#cam0').css('background-color', '#00f8b9');
        $('.f9camerasui').css('animation', 'turn-on 0.1s ease 0s 1, turned-on 1s ease 0.1s infinite');
        $('.dashborad').fadeOut(500);
        $.post('https://qb-dispatchsystem/OpenCam', JSON.stringify({
            locate: thiscamid,
            camnumber: 0,
        }));
        $('.f9camerasui').fadeIn(400);
        $('.f9camerasui').css('z-index', '1000');
        $('.dashborad').css('z-index', 'unset');
        dashborad = false
        $.post('https://qb-dispatchsystem/dashboardstate', JSON.stringify({ state: false, }));

    });
});


$('.radarregister').mousedown(function(event) {
    switch (event.which) {
        case 3:
            elementid = $(this).attr('id');
            if(selectedcam == elementid){
                $('#'+selectedcam+' > .radarbuttons').css('opacity', '0');
                selectedcam = 0
            }else if(selectedcam){
                $('#'+selectedcam+' > .radarbuttons').css('opacity', '0');
                selectedcam = 0
        
                $('#'+elementid+' > .radarbuttons').css('opacity', '1');
                selectedcam = elementid
            }else{
                $('#'+elementid+' > .radarbuttons').css('opacity', '1');
                selectedcam = elementid
            }
            break;
    }
});


$(document).on('click', ".radarregister", function() {
    elementid = $(this).attr('id');
    if(selectedcam == elementid){
        $('#'+selectedcam+' > .radarbuttons').css('opacity', '0');
        selectedcam = 0
    }else if(selectedcam){
        $('#'+selectedcam+' > .radarbuttons').css('opacity', '0');
        selectedcam = 0

        $('#'+elementid+' > .radarbuttons').css('opacity', '1');
        selectedcam = elementid
    }else{
        $('#'+elementid+' > .radarbuttons').css('opacity', '1');
        selectedcam = elementid
    }
});


$(document).on('click', ".removeingthisblib", function() {
    var thisid = $(this).attr('id');
    f9alerts[thisid].remove(map);
    f9alerts[thisid] = null
    clicking.clickedsound();
});

var iconmasd = 0
$(document).on('click', "#selectflaglocation", function() {

        idtoclose = $(this).data('emid');
        $('#'+selectedcam+' > .radarbuttons').css('opacity', '0');
        selectedcam = 0

        var coordx = $(this).data('coordx');
        var coordy = $(this).data('coordy');
        var plate = $(this).data('plate');
        
       
        if(f9alerts[plate]){
            f9alerts[plate].remove(map);
            f9alerts[plate] = null
        }else{
            const alerticon = L.divIcon({
                html: '<i id="'+plate+'" class="removeingthisblib allfaisalblip fa-solid fa-car-on ccblink_flaged" style="color: blue; font-size: '+newzoom+'; width: '+newzoom+'; height: '+newzoom+'; background-size: '+newzoom+';"></i>',
                iconSize: [20, 20],
                className: 'map-icon map-icon-car',
                offset: [-10, 0]
            });
    
            f9alerts[plate] = L.marker([coordy,coordx], { icon: alerticon })
            f9alerts[plate].bindTooltip("<div class='reportinfo' style='padding: 1vh; padding-right: 13.0vh; color: white !important;'> <div class='f9policealertheaderbutton' style='transform: skewX(0deg); position: initial; margin: 5px;'><div class='f9policeheadercode' style='transform: skewX(0deg);'>"+plate+"</div> <div style='position: relative;padding: 4px;left: 7vh;top: -2vh;'>FLAGGED CAR HERE</div></div></div>",
            {
                direction: 'top',
                permanent: false,
                sticky: false,
                offset: [8, 0],
                opacity: 0.99,
                className: 'map-tooltip'
            });
            f9alerts[plate].addTo(map)
            setTimeout(function(){
                f9alerts[plate].remove(map);
            },40000);
        }

        $.post('https://qb-dispatchsystem/MapWayPoint', JSON.stringify({
            x: coordx,
            y: coordy,
            alertid: 'CAR FLAGGED',
        }));

});

// Send Message To Officers

function showmessage(data){
    if(phub == true){
        $('.hubnotify').html("<marquee>"+data.message+"</marquee>");
        $('.hubnotify').fadeIn(1);
        $('.hubnotify').animate({ width: '270px' }, 850);
        setTimeout(() => {
            $('.hubnotify').animate({ width: '0px' }, 850);
            setTimeout(() => {
                $('.hubnotify').fadeOut(100);
            }, 850);
        }, 40000);
    }else if(dashborad == true){

    }else{

    }
}

$(document).on('click', ".hubnotify", function() {
    $('.hubnotify').animate({ width: '0px' }, 850);
    setTimeout(() => {
        $('.hubnotify').fadeOut(100);
    }, 850);
});


//

function updateheading(heading) {
    $('.f9tringleway').html(heading);
}

//

function ChangePlayerCoords(code, x,y,h,car, soruce, color){
    var lat = (y);
    var lng = (x);
    var newLatLng = new L.LatLng(lat, lng);
    test2[soruce].setLatLng(newLatLng); 
    if(playerid == soruce){

        if($('.f9maptext').css('color') == '#f1f1f1' || $('.f9maptext').css('color') == 'rgb(241, 241, 241)'){
            playericon = 'https://cdn.discordapp.com/attachments/729643536877748315/1032637907409829928/f9you.png'
        }else{
            playericon = 'https://cdn.discordapp.com/attachments/729643536877748315/1031990753750175804/121.png'
        }
        playerinmapicon = L.divIcon({
            html: '<img id="selecteduser" data-color="'+color+'" data-idx="'+soruce+'" class="'+madeclass+'" src="'+playericon+'" style="font-size: '+newzoom+'; width: '+newzoom+'; height: '+newzoom+'; background-size: '+newzoom+'; color: '+playercolorinmap+'; ;transform: rotate('+now+'deg) rotate3d(-100, 10, -561, '+h+'deg);"/>',
            iconSize: [10, 10],
            className: 'map-icon map-icon-ping',
            offset: [-10, 0]
        });

        test2[soruce].setIcon(playerinmapicon);
    }else{
        if(color == '#26a333'){
            playericonimage = 'https://cdn.discordapp.com/attachments/729643536877748315/1032638931818266735/f9onduty.png'
        }else if(color == '#ff1706'){
            playericonimage = 'https://cdn.discordapp.com/attachments/729643536877748315/1032639020137713715/f9outduty.png'
        }else if(color == '#A808D0'){
            playericonimage = 'https://cdn.discordapp.com/attachments/729643536877748315/1032639117147770921/f9break.png'
        }else if(color == '#f5a101'){
            playericonimage = 'https://cdn.discordapp.com/attachments/729643536877748315/1032639240879747092/f9breaks.png'
        }else{
            playericonimage = 'https://cdn.discordapp.com/attachments/729643536877748315/1032638931818266735/f9onduty.png'
        }
        playerinmapicon = L.divIcon({
            html: '<img id="selecteduser" data-color="'+color+'" data-idx="'+soruce+'" class="'+madeclass+'" src="'+playericonimage+'" style="font-size: '+newzoom+'; width: '+newzoom+'; height: '+newzoom+'; background-size: '+newzoom+'; color: '+playercolorinmap+'; ;transform: rotate('+now+'deg) rotate3d(-100, 10, -561, '+h+'deg); border-radius: 50%;"/>',
            iconSize: [20, 20],
            className: 'map-icon map-icon-car',
            offset: [-10, 0]
        });

        test2[soruce].setIcon(playerinmapicon);
    }
}

function discpatchPersonMap(code, x,y,h,car, soruce, color){
    var dicpatchcallsal;
    if(playerid == soruce || hideoffdutyofficers == true && color !== '#ff1706' || hideoffdutyofficers == false){
        if(playerid == soruce || hidebreakofficers == true && color !== '#f5a101' || hidebreakofficers == false){
            if(playerid == soruce || hidebusyofficers == true && color !== '#A808D0' || hidebusyofficers == false){

                $('.allfaisalblip').css({'font-size':newzoom,'width':newzoom,'height':newzoom,'background-size':newzoom + ' ' + newzoom}); 
                $('#selecteduser').css({'font-size':newzoom,'width':newzoom,'height':newzoom,'background-size':newzoom + ' ' + newzoom}); 
            
                if(playerselected == soruce){
                    playercolorinmap = '#095E9E'
                    madeclass = "f9selectdblib"
                }else{
                    playercolorinmap = color
                    madeclass = "playerinmap"
                }
                if(playerid == soruce){

                    if($('.f9maptext').css('color') == '#232742' || $('.f9maptext').css('color') == 'rgb(241, 241, 241)'){
                        playericon = 'https://cdn.discordapp.com/attachments/729643536877748315/1032637907409829928/f9you.png'
                    }else{
                        playericon = 'https://cdn.discordapp.com/attachments/729643536877748315/1031990753750175804/121.png'
                    }
                    dicpatchcallsal = L.divIcon({
                        html: '<img id="selecteduser" data-color="'+color+'" data-idx="'+soruce+'" class="'+madeclass+'" src="'+playericon+'" style="font-size: '+newzoom+'; width: '+newzoom+'; height: '+newzoom+'; background-size: '+newzoom+'; color: '+playercolorinmap+'; ;transform: rotate('+now+'deg) rotate3d(-100, 10, -561, '+h+'deg);"/>',
                        iconSize: [10, 10],
                        className: 'map-icon map-icon-ping',
                        offset: [-10, 0]
                    });
                }else{
                    if(color == '#26a333'){
                        playericonimage = 'https://cdn.discordapp.com/attachments/729643536877748315/1032638931818266735/f9onduty.png'
                    }else if(color == '#ff1706'){
                        playericonimage = 'https://cdn.discordapp.com/attachments/729643536877748315/1032639020137713715/f9outduty.png'
                    }else if(color == '#A808D0'){
                        playericonimage = 'https://cdn.discordapp.com/attachments/729643536877748315/1032639117147770921/f9break.png'
                    }else if(color == '#f5a101'){
                        playericonimage = 'https://cdn.discordapp.com/attachments/729643536877748315/1032639240879747092/f9breaks.png'
                    }else{
                        playericonimage = 'https://cdn.discordapp.com/attachments/729643536877748315/1032638931818266735/f9onduty.png'
                    }
                    dicpatchcallsal = L.divIcon({
                        html: '<img id="selecteduser" data-color="'+color+'" data-idx="'+soruce+'" class="'+madeclass+'" src="'+playericonimage+'" style="font-size: '+newzoom+'; width: '+newzoom+'; height: '+newzoom+'; background-size: '+newzoom+'; color: '+playercolorinmap+'; ;transform: rotate('+now+'deg) rotate3d(-100, 10, -561, '+h+'deg); border-radius: 50%;"/>',
                        iconSize: [20, 20],
                        className: 'map-icon map-icon-car',
                        offset: [-10, 0]
                    });
                }
            
                test2[soruce] = L.marker([y,x], { icon: dicpatchcallsal })
                test2[soruce].bindTooltip(code,
                    {
                        direction: 'top',
                        permanent: false,
                        sticky: false,
                        offset: [2, 0],
                        opacity: 0.9,
                        className: 'map-tooltip playernumber'+soruce+''
                    });
                test2[soruce].addTo(map)

            }
        }
    }
}

$(document).on('click', "#unselected", function() {
    if (playerselected !== 0){
        $('#r'+playerselected).removeClass('blink_me22');
        $('#selecteduser').removeClass('f9selectdblib');
        $('#selecteduser').css('color', $('#selecteduser').data('color'));
        $('#selecteduserheing').fadeOut(400);
        $('#selectedactionshere').fadeOut(400);
        $('.sendmessage').fadeOut(400);
        $('.wingsaddrem').fadeOut(400);
        $('.moreinfo').fadeOut(400);
        $('.wingsbliboneicon').fadeOut(300);
        $('.officerallactionslist').fadeOut(100);
        $.post("https://qb-dispatchsystem/selectedofficer" , JSON.stringify({userid: playerid}), function (playerdata) {

            $('.officerxinfos').data('officerid', 0);

            $('.officerxinfos').data('radiochannel', playerdata.radioChannel);

            if(playerdata.image){
                $('.pageselectedofficerimgdiv > img').attr('src', playerdata.image);
            }else{
                if(playerdata.gender == 0){
                    $('.pageselectedofficerimgdiv > img').attr('src', 'https://cdn.discordapp.com/attachments/897626175634034698/1025192720978944020/male.png');
                }else{
                    $('.pageselectedofficerimgdiv > img').attr('src', 'https://cdn.discordapp.com/attachments/897626175634034698/1025192915049394286/female.png');
                }
            }
            $('.pageselectedofficertitle').html('<i class="fa-solid fa-person-military-pointing"></i> '+playerdata.callsign +' '+playerdata.name+'');
            $('#playerrank').html('Rank: '+playerdata.rank);
            $('#playerduty').html('Duty: '+playerdata.duty);
            $('#playerdirs').html('Direction: '+playerdata.dirction);
            $('#playerassigmen').html('Assignment: '+playerdata.Assignment);
        });
        playerselected = 0
    }
});


$(document).on('click', ".officer-name2", function() {
    var userid = $(this).attr('id');
    if (playerselected == userid){
        $('#r'+playerselected).removeClass('blink_me22');
        $('#selecteduser').remove20Class('f9selectdblib');
        $('#selecteduser').css('color', $('#selecteduser').data('color'));
        // $(".allactionsnoselected").fadeIn(75);
        // $(".officerxinfos").fadeIn(75);
        //$('.allactionspages').animate({ 'width': '3.36%', 'min-width': '3.36%' }, 200);
        $('.officerallactionslist').fadeOut(100);
        $('#selecteduserheing').fadeOut(400);
        $('#selectedactionshere').fadeOut(400);
        $('.sendmessage').fadeOut(400);
        $('.moreinfo').fadeOut(400);
        $('.wingsaddrem').fadeOut(400);
        $('.wingsbliboneicon').fadeOut(300);
        $.post("https://qb-dispatchsystem/selectedofficer" , JSON.stringify({userid: playerid}), function (playerdata) {

            $('.officerxinfos').data('officerid', 0);

            $('.officerxinfos').data('radiochannel', playerdata.radioChannel);

            if(playerdata.image){
                $('.pageselectedofficerimgdiv > img').attr('src', playerdata.image);
            }else{
                if(playerdata.gender == 0){
                    $('.pageselectedofficerimgdiv > img').attr('src', 'https://cdn.discordapp.com/attachments/897626175634034698/1025192720978944020/male.png');
                }else{
                    $('.pageselectedofficerimgdiv > img').attr('src', 'https://cdn.discordapp.com/attachments/897626175634034698/1025192915049394286/female.png');
                }
            }
            $('.pageselectedofficertitle').html('<i class="fa-solid fa-person-military-pointing"></i> '+playerdata.callsign +' '+playerdata.name+'');
            $('#playerrank').html('Rank: '+playerdata.rank);
            $('#playerduty').html('Duty: '+playerdata.duty);
            $('#playerdirs').html('Direction: '+playerdata.dirction);
            $('#playerassigmen').html('Assignment: '+playerdata.Assignment);
        });
        playerselected = 0
    }else{
        if(playerselected){
            $('#r'+playerselected).removeClass('blink_me22');
        }
        clicking.clickblip();
        $('.sendmessage').fadeOut(100);
        $('.wingsaddrem').fadeOut(100);
        $('.moreinfo').fadeOut(100);
        $('.wingsbliboneicon').fadeOut(100);
        // $(".allactionsnoselected").fadeOut(20);
        $('.officerxinfos').fadeIn(50);
        //$('.allactionspages').animate({ 'width': '22.5%', 'min-width': '21.5%' }, 200);
        $(".officerxinfos").fadeIn(75);
        $('#selecteduserheing').fadeIn(400);
        $('#selectedactionshere').fadeIn(400);
        $('#selectedactionshere').css('display', 'flex');
        // $(this).css('color', '#095E9E');
        // $(this).addClass('f9selectdblib');
        $.post("https://qb-dispatchsystem/selectedofficer" , JSON.stringify({userid: userid}), function (playerdata) {
            playerselected = userid
            $('#r'+userid).addClass('blink_me22');

            $('.officerxinfos').data('officerid', userid);

            $('.officerxinfos').data('radiochannel', playerdata.radioChannel);

            if(playerdata.image){
                $('.pageselectedofficerimgdiv > img').attr('src', playerdata.image);
            }else{
                if(playerdata.gender == 0){
                    $('.pageselectedofficerimgdiv > img').attr('src', 'https://cdn.discordapp.com/attachments/897626175634034698/1025192720978944020/male.png');
                }else{
                    $('.pageselectedofficerimgdiv > img').attr('src', 'https://cdn.discordapp.com/attachments/897626175634034698/1025192915049394286/female.png');
                }
            }
            $('.pageselectedofficertitle').html('<i class="fa-solid fa-person-military-pointing"></i> '+playerdata.callsign +' '+playerdata.name+'');
            $('#playerrank').html('Rank: '+playerdata.rank);
            $('#playerduty').html('Duty: '+playerdata.duty);
            $('#playerdirs').html('Direction: '+playerdata.dirction);
            $('#playerassigmen').html('Assignment: '+playerdata.Assignment);
            $('.officerallactionslist').fadeIn(100);
        });
    }
});


$(document).on('click', "#selecteduser", function() {
    var userid = $(this).data('idx');
    if (playerselected == userid){
        $('#r'+playerselected).removeClass('blink_me22');
        $('#selecteduser').removeClass('f9selectdblib');
        $('#selecteduser').css('color', $('#selecteduser').data('color'));
        // $(".allactionsnoselected").fadeIn(20);
        //$('.allactionspages').animate({ 'width': '3.36%', 'min-width': '3.36%' }, 250);
        $('.officerxinfos').fadeOut(75);
        $('#selecteduserheing').fadeOut(400);
        $('#selectedactionshere').fadeOut(400);
        $('.sendmessage').fadeOut(400);
        $('.moreinfo').fadeOut(400);
        $('.wingsaddrem').fadeOut(400);
        $('.wingsbliboneicon').fadeOut(300);
        $('.officerallactionslist').fadeOut(100);
        $.post("https://qb-dispatchsystem/selectedofficer" , JSON.stringify({userid: playerid}), function (playerdata) {

            $('.officerxinfos').data('officerid', userid);

            $('.officerxinfos').data('radiochannel', playerdata.radioChannel);

            if(playerdata.image){
                $('.pageselectedofficerimgdiv > img').attr('src', playerdata.image);
            }else{
                if(playerdata.gender == 0){
                    $('.pageselectedofficerimgdiv > img').attr('src', 'https://cdn.discordapp.com/attachments/897626175634034698/1025192720978944020/male.png');
                }else{
                    $('.pageselectedofficerimgdiv > img').attr('src', 'https://cdn.discordapp.com/attachments/897626175634034698/1025192915049394286/female.png');
                }
            }
            $('.pageselectedofficertitle').html('<i class="fa-solid fa-person-military-pointing"></i> '+playerdata.callsign +' '+playerdata.name+'');
            $('#playerrank').html('Rank: '+playerdata.rank);
            $('#playerduty').html('Duty: '+playerdata.duty);
            $('#playerdirs').html('Direction: '+playerdata.dirction);
            $('#playerassigmen').html('Assignment: '+playerdata.Assignment);
        });
        playerselected = 0
    }else{
        if(playerselected){
            $('#r'+playerselected).removeClass('blink_me22');
            $('#selecteduser').removeClass('f9selectdblib');
            $('#selecteduser').css('color', $('#selecteduser').data('color'));
        }
        clicking.clickblip();
        $('.sendmessage').fadeOut(100);
        $('.wingsaddrem').fadeOut(100);
        $('.moreinfo').fadeOut(100);
        $('.wingsbliboneicon').fadeOut(100);
        // $(".allactionsnoselected").fadeOut(20);
        $('.officerxinfos').fadeIn(50);
        //$('.allactionspages').animate({ 'width': '22.5%', 'min-width': '21.5%' }, 200);
        $(".officerxinfos").fadeIn(75);
        $('#selecteduserheing').fadeIn(400);
        $('#selectedactionshere').fadeIn(400);
        $('#selectedactionshere').css('display', 'flex');
        if(playerid !== userid){
            $(this).css('color', '#095E9E');
            $(this).addClass('f9selectdblib');
        }
        $.post("https://qb-dispatchsystem/selectedofficer" , JSON.stringify({userid: userid}), function (playerdata) {
            playerselected = userid
            $('#r'+userid).addClass('blink_me22');

            $('.officerxinfos').data('officerid', userid);

            $('.officerxinfos').data('radiochannel', playerdata.radioChannel);

            if(playerdata.image){
                $('.pageselectedofficerimgdiv > img').attr('src', playerdata.image);
            }else{
                if(playerdata.gender == 0){
                    $('.pageselectedofficerimgdiv > img').attr('src', 'https://cdn.discordapp.com/attachments/897626175634034698/1025192720978944020/male.png');
                }else{
                    $('.pageselectedofficerimgdiv > img').attr('src', 'https://cdn.discordapp.com/attachments/897626175634034698/1025192915049394286/female.png');
                }
            }
            $('.pageselectedofficertitle').html('<i class="fa-solid fa-person-military-pointing"></i> '+playerdata.callsign +' '+playerdata.name+'');
            $('#playerrank').html('Rank: '+playerdata.rank);
            $('#playerduty').html('Duty: '+playerdata.duty);
            $('#playerdirs').html('Direction: '+playerdata.dirction);
            $('#playerassigmen').html('Assignment: '+playerdata.Assignment);
            $('.officerallactionslist').fadeIn(100);
        });
    }
});



// Global Acions

$(document).on('click', "#autoclear", function() {
    if(autoclear == false){
        $('#autoclear').css('background-color', '#3c3c3c');
        NewNotify('broom', 'The removal of alerts has been enabled.', 5000)
        autoclear = true
    }else{
        $('#autoclear').css('background-color', '#2a2a2a');
        NewNotify('broom', 'The removal of alerts has been disabled.', 5000)
        autoclear = false
    }
});

$(document).on('click', "#newalerts", function() {
    if ($("#riwtingnewalert")[0]){
        NewNotify('exclamation-triangle', 'You have a previous alert you did not complete.', 5000)
    }else{
        var newalerting = `<div class="f9policealert" id="riwtingnewalert" data-icon="non">
        <div class="f9policealertbeforetrs">
            <div class="f9policealertheader">
                <div class="f9policealertheaderbutton">
                    <div class="f9policeheadercode">Dispatch</div>
                </div>
                <div class="f9policealertheaderbuttonline1"></div>
                <div class="f9policealertheaderbuttonline2"></div>
                <div class="f9policealerttitle">To All Officers</div>
            </div>
        </div>
        <div class="f9policealertinfos" style="border-bottom: unset;">
                <textarea id="newalertingtext" placeholder="Your message here" style="background: #121212; height: 110px;"></textarea>
        </div>
        <div class="f9policealertbottombuttons" style="background: rgb(18, 18, 18); padding-bottom: 2.7vh;">
            <div class="confirmmessagealert">Are you sure to send to all officers?</div>
            <div class="confirmalertbuttons">
                <div class="confirmalertbutton1" id="sendnewalert">YES</div>
                <div class="confirmalertbutton2" id="cancelalert">NO</div>
            </div>
        </div>
        </div>`
        $('#alertshere').append(newalerting);
        $("#alertshere").scrollTop(1000);
    }
});


$(document).on('click', "#cancelalert", function() {
    $('#riwtingnewalert').remove();
}); 

$(document).on('click', "#sendnewalert", function() {
    alertmessage = $('#newalertingtext').val();
    if(alertmessage.length > 0){
        if(alertmessage.length < 81){
            $.post("https://qb-dispatchsystem/SendNewAlert" , JSON.stringify({ text: alertmessage, }));
            $('#riwtingnewalert').remove();
        }else{
            NewNotify('exclamation-triangle', 'Your alert must be less than 80 characters.', 6000)
        }
    }else{
        NewNotify('exclamation-triangle', 'Your alert must be more than 0 characters.', 6000)
    }
}); 

var timeingoutglobalactions = 0
$(document).on('click', ".allactionsbutton", function() {
    admessage = $(this).data('info')
    adicon = $(this).data('icon')


    if(admessage == 'avtivep'){
        $.post('https://qb-dispatchsystem/ActivePriority', JSON.stringify({}));
    }else if(admessage == 'unavtivep'){
        $.post('https://qb-dispatchsystem/UnActivePriority', JSON.stringify({}));
    }else{

        if(timeingoutglobalactions == 0){
            timeingoutglobalactions = 1
            $.post("https://qb-dispatchsystem/SendGlobalActions" , JSON.stringify({ message: admessage, icon: adicon })); // send to all officers
            NewNotify('check-circle', 'The alert was sent to all officers successfully.', 6000)
            setTimeout(() => {
                timeingoutglobalactions = 0
            }, 20000);
        }else{
            NewNotify('exclamation-triangle', 'You must wait between attempts send (wait 20sec).', 5000)
        }

    }
    
});



// Officer ACTIONS


$(document).on('click', "#officerwing", function() { // wings
    var playeridnumber = $('.officerxinfos').data('officerid');
    $('.wingsiconslist').html('');
    $.post("https://qb-dispatchsystem/GetPlayerWings" , JSON.stringify({userid: playeridnumber}), function (data) {
        for (let i = 0; i < data.length; i++) {

            if(data[i].ifhave){
                typer = 'haveit'
            }else{
                typer = 'dnthaveot'
            }
            $('.wingsiconslist').append('<div data-number="'+i+'" data-wingname="'+data[i].name+'" data-haveit="'+typer+'" class="wingsbliboneicon '+typer+'"><img src="'+data[i].image+'"></div>');
        }
        
    });
    $('.wingsaddrem').fadeIn(400);
    //$('.dashcontent').css('pointer-events', 'none');
});


$(document).on('click', ".wingsbliboneicon", function() {
    if(imboss){
        var playeridnumber = $('.officerxinfos').data('officerid');
        var wingnumber = $(this).data('number');
        var winghaveit = $(this).data('haveit');
        var wingname = $(this).data('wingname');
        $('.wingconfirm').data('typing', winghaveit);
        $('.wingconfirm').data('number', wingnumber);
        $('.wingconfirm').data('haveit', winghaveit);
        if(winghaveit == 'dnthaveot'){ // add wing
            $('.wingconfirm').fadeIn(120);
            $('#wingstexts').html('Are you sure to add ('+wingname+') <br> To Officer ID '+playeridnumber+'');
        }else{ // remove wing
            $('.wingconfirm').fadeIn(120);
            $('#wingstexts').html('Are you sure to remove ('+wingname+') <br> From Officer ID '+playeridnumber+'');
        }
    }
});


$(document).on('click', ".wingsaddremconfirm", function() {
    $('.wingconfirm').fadeOut(200);
    var playeridnumber = $('.officerxinfos').data('officerid');
    var wingnumber = $('.wingconfirm').data('number');
    var winghaveit = $('.wingconfirm').data('haveit');
    var irtype = $('.wingconfirm').data('typing');
    if(irtype == 'haveit'){
        state = false
    }else[
        state = true
    ]
    $.post("https://qb-dispatchsystem/UpdateWing" , JSON.stringify({ playeridnumber: playeridnumber, wing: wingnumber, state: state, }));
    setTimeout(() => {
        $('.wingsiconslist').html('');
        $.post("https://qb-dispatchsystem/GetPlayerWings" , JSON.stringify({userid: playeridnumber}), function (data) {
            for (let i = 0; i < data.length; i++) {
    
                if(data[i].ifhave){
                    typer = 'haveit'
                }else{
                    typer = 'dnthaveot'
                }
                $('.wingsiconslist').append('<div data-number="'+i+'" data-wingname="'+data[i].name+'" data-haveit="'+typer+'" class="wingsbliboneicon '+typer+'"><img src="'+data[i].image+'"></div>');
            }
            
        });
    }, 100);
    $('.wingconfirm').fadeOut(190);
});


$(document).on('click', ".wingsaddremdecline", function() {
    $('.wingconfirm').fadeOut(200);
    //$('.dashcontent').css('pointer-events', 'all');
});

$(document).on('click', "#gotostations", function() { // dir
    var playeridnumber = $('.officerxinfos').data('officerid');
    $.post("https://qb-dispatchsystem/GoStation" , JSON.stringify({ playeridnumber: playeridnumber })); // send dir
    NewNotify('check-circle', 'The alert was sent to the officer successfully.', 6000)
});



$(document).on('click', ".sendmessageconfirm", function() {
    var blocktypeing = $('.sendmessage').data('typeing'); /// type of block //
    if(blocktypeing == 'message'){
        var playeridnumber = $('.officerxinfos').data('officerid');
        var message = $('#sendmessagearea').val();
        if(message.length < 230){
            NewNotify('check-circle', 'The message has been sent successfully.', 6000)
            $.post("https://qb-dispatchsystem/SendMessage" , JSON.stringify({ playeridnumber: playeridnumber, message: message, }));
            $('.sendmessage').fadeOut(400);
            //$('.dashcontent').css('pointer-events', 'auto');
        }else{
            NewNotify('exclamation-triangle', 'Your message must be less than 230 characters.', 6000)
        }
    }else if(blocktypeing == 'dirir'){
        var playeridnumber = $('.officerxinfos').data('officerid');
        var message = $('#sendmessagearea').val();
        if(message.length < 51){
            NewNotify('check-circle', 'the direction has been sent to the officer successfully.', 6000)
            $.post("https://qb-dispatchsystem/ChangeDir" , JSON.stringify({ playeridnumber: playeridnumber, dir: message, })); // send dir
            $('.sendmessage').fadeOut(400);
            //$('.dashcontent').css('pointer-events', 'auto');
        }else{
            NewNotify('exclamation-triangle', 'the direction of the officer must be less than 50 characters.', 6000)
        }
    }else if(blocktypeing == 'assigment'){
        var playeridnumber = $('.officerxinfos').data('officerid');
        var message = $('#sendmessagearea').val();
        if(message.length < 121){
            NewNotify('check-circle', 'the Assignment has been sent to the officer successfully.', 6000)
            $.post("https://qb-dispatchsystem/SendJobAssigment" , JSON.stringify({ playeridnumber: playeridnumber, Assignment: message, })); // send dir
            $('.sendmessage').fadeOut(400);
            //$('.dashcontent').css('pointer-events', 'auto');
        }else{
            NewNotify('exclamation-triangle', 'the Assignment of the officer must be less than 120 characters.', 6000)
        }
    }
});

$(document).on('click', "#jobassignment", function() { // Assignment
    var playeridnumber = $('.officerxinfos').data('officerid');
    $('.sendmessage').data('typeing', 'assigment');
    $('.sendmessagelocktitle').html('Send Job Assignment');
    $('.sendmessage').fadeIn(400);
    //$('.dashcontent').css('pointer-events', 'none');
});


$(document).on('click', "#senddirection", function() { // dir
    var playeridnumber = $('.officerxinfos').data('officerid');
    $('.sendmessage').data('typeing', 'dirir');
    $('.sendmessagelocktitle').html('Change Direction');
    $('.sendmessage').fadeIn(400);
    //$('.dashcontent').css('pointer-events', 'none');
});

$(document).on('click', "#osendmessage", function() {
    var playeridnumber = $('.officerxinfos').data('officerid');
    $('.sendmessage').data('typeing', 'message');
    $('.sendmessagelocktitle').html('Send Message');
    $('.sendmessage').fadeIn(400);
    //$('.dashcontent').css('pointer-events', 'none');
});


$(document).on('click', "#officerinfo", function() { // more info
    var playerridnumber = $('.officerxinfos').data('officerid');
    $.post("https://qb-dispatchsystem/selectedofficer" , JSON.stringify({userid: playerridnumber}), function (playerdata) {
        if(playerdata.gender == 0){
            playerdatasgender = 'Male'
        }else{
            playerdatasgender = 'Female'
        }
        if(playerdata.hasbodycam){
            ishasbodycam = 'YES'
        }else{
            ishasbodycam = 'NO'
        }
        if(playerdata.callsign.length > 3){
            fontingsize = 'font-size: xxx-large;'
        }else{
            fontingsize = 'font-size: 5.85vh;'
        }
        officerinfo = `<div class="officercallsign" style+"`+fontingsize+`">`+playerdata.callsign+`</div>
        <div class="oneinfo">Officer Birthday: `+playerdata.birthday+`</div>
        <div class="oneinfo">Officer Gender: `+playerdatasgender+`</div>
        <div class="oneinfo">Officer Phone: `+playerdata.phone+`</div>
        <div class="oneinfo">Officer Salary: `+playerdata.payment+`$</div>
        <div class="oneinfo">Officer Points: `+playerdata.points+`</div>
        <div class="oneinfo">Officer Duty Time: `+(playerdata['time']  / 60).toFixed(2)+` Hours</div>
        <div class="oneinfo">Officer Bodycam: `+ishasbodycam+`</div>
        <div class="oneinfo">Officer Rank Number: `+playerdata.gradenumber+`</div>`
        $('.moreinfotextarea').html(officerinfo);
    });
    $('.moreinfo').fadeIn(400);
});

$(document).on('click', ".moreinfoblockicon", function() {
    $('.moreinfo').fadeOut(300);
});

$(document).on('click', ".sendmessageblockicon", function() {
    $('.sendmessage').fadeOut(300);
    //$('.dashcontent').css('pointer-events', 'auto');
});


$(document).on('click', ".wingsaddremblockicon", function() {
    $('.wingsaddrem').fadeOut(300);
    $('.wingsbliboneicon').fadeOut(300);
    
    //$('.dashcontent').css('pointer-events', 'auto');
});

$(document).on('click', ".sendmessagedecline", function() {
    $('.sendmessage').fadeOut(300);
    //$('.dashcontent').css('pointer-events', 'auto');
});

// 

$(document).on('click', "#joinradio", function() {
    var radiochannel = $('.officerxinfos').data('radiochannel');
    $.post('https://qb-dispatchsystem/JoinRadio', JSON.stringify({ radiochannel: radiochannel, }));
});


var dashbodycam = false

$(document).on('click', "#bodycam", function() {
    var playeridnumber = $('.officerxinfos').data('officerid');
    $.post("https://qb-dispatchsystem/BodyCam" , JSON.stringify({playeridnumber: playeridnumber}), function (playerdata) {
        if(playerdata){
            clicking.changecam();
            dashbodycam = true
            $('.f9tringleway2').html(playerdata.callsign);
            $('.f9tringlelocationstext2').html(playerdata.name);
            $('.f9bodycam').css('animation', 'turn-off 0.15s ease 0s 1, turned-off 1s ease 0.15s infinite, white-dot 0.35s ease 0.15s 1');
            $('.f9bodycam').fadeIn(500);
            $('.dashborad').fadeOut(500);
            $('.f9bodycam').css('z-index', '1000');
            $('.dashborad').css('z-index', 'unset');
            setTimeout(() => {
                $('.f9tringlecamnumbetext2').html('BODY CAM');
                $('.f9bodycam').css('animation', 'turn-on 0.15s ease 0s 1, turned-on 1s ease 0.15s infinite');
            }, 1500);
            dashborad = false
            $.post('https://qb-dispatchsystem/dashboardstate', JSON.stringify({ state: false, }));
        }
    });

});

$(document).on('click', "#closebodycam", function() {
    $('.f9bodycam').css('animation', 'turn-off 0.15s ease 0s 1, turned-off 1s ease 0.15s infinite, white-dot 0.35s ease 0.15s 1');
    clicking.changecam();
    setTimeout(() => {
        $('.f9bodycam').fadeOut(500);
        $('.f9bodycam').css('z-index', 'unset');
        if(dashbodycam == true){
            dashbodycam = false
            $('.dashborad').fadeIn(1000);
            $('.dashborad').css('z-index', '1000');
            dashborad = true
            $.post('https://qb-dispatchsystem/dashboardstate', JSON.stringify({ state: true, }));
        }
        $.post('https://qb-dispatchsystem/DisableBodyCam', JSON.stringify({}));
    }, 1500);
});

function RemoveBodycam(elmnt) {
    $('.f9bodycam').css('animation', 'turn-off 0.15s ease 0s 1, turned-off 1s ease 0.15s infinite, white-dot 0.35s ease 0.15s 1');
    // $.post('https://qb-dispatchsystem/DisableBodyCam', JSON.stringify({}));
    clicking.changecam();
    setTimeout(() => {
        $('.f9bodycam').fadeOut(500);
        $('.f9bodycam').css('z-index', 'unset');
        $('.dashborad').fadeIn(1000);
        $('.dashborad').css('z-index', '1000');
        dashborad = true
        $.post('https://qb-dispatchsystem/dashboardstate', JSON.stringify({ state: true, }));
    }, 1500);
};




///////

var showcams = false
$(document).on('click', ".showcams", function() {
    var camtayp = $(this).data('type');
    if(showcams == false){
        $.post("https://qb-dispatchsystem/showcams" , JSON.stringify({ camtayp: camtayp, }));
    }else{
        $.post("https://qb-dispatchsystem/GetAllCameras" , JSON.stringify({}), function (allcameras) {
            for (let i = 0; i < allcameras.length; i++) {
                if (cams[i] == null ) {
                } else {
                    cams[i].remove(map);
                }
            }
            showcams = false
        });
    }
});


///////


// closes all pages
$(document).on('click', ".allmorepagesclose", function() {
    ///
    $('.flaggedmenu').fadeOut(200);
    $('.flaggedmenu').css('z-index', 'unset');
    sflaggedmenu = false
    ///
    $('.dutytimemenu').fadeOut(200);
    $('.dutytimemenu').css('z-index', 'unset');
    sdutytimemenu = false
    ///
    $('.editcallsign').fadeOut(200);
    $('.editcallsign').css('z-index', 'unset');
    callsigner = false
    ///
    $('.messagemenu').fadeOut(200);
    $('.messagemenu').css('z-index', 'unset');
    callsigner = false
    ///
    $('#dashallsettings').fadeOut(200);
    $('#dashallsettings').css('z-index', 'unset');
    optionopend = false
    ///
    $('#dashcallsign').fadeOut(200);
    $('#dashcallsign').css('z-index', 'unset');
    callsigner = false
    ///
    $('#quickactions').fadeOut(200);
    $('#quickactions').css('z-index', 'unset');
    quickactions = false
});


// open messages list
var smessagesmenu = false
$(document).on('click', ".f9options6", function() {
    if(sdutytimemenu == false){
        
        $('.messagemenu').fadeIn(200);
        $('.messagemenu').css('z-index', '10000');
        smessagesmenu = true

        ///CLOSING TITLE
        $('#dashallsettings').css('display', 'none');
        $('#dashallsettings').css('z-index', 'unset');
        $('.moreoptions').css('color', '');
        optionopend = false
    }else{
        $('.messagemenu').fadeOut(200);
        $('.messagemenu').css('z-index', 'unset');
        smessagesmenu = false
    }
});

// open duty time
var sdutytimemenu = false
$(document).on('click', ".f9options4", function() {
    if(sdutytimemenu == false){
        
        $.post("https://qb-dispatchsystem/GetOfficersTime" , JSON.stringify({}), function (allofficers) {
            $('.dutylisttimeing').html('');
            for (let i = 0; i < allofficers.length; i++) {
                $('.dutylisttimeing').append('<div class="officerdutytime"> <div class="dutyofficername">Name: '+allofficers[i].name+'</div> <div class="dutyofficertime">Time: '+ (allofficers[i].time  / 60).toFixed(2) +' Hours</div> </div>');
            }
            $('.dutytimemenu').fadeIn(200);
            $('.dutytimemenu').css('z-index', '10000');
            sdutytimemenu = true
        });

        ///CLOSING TITLE
        $('#dashallsettings').css('display', 'none');
        $('#dashallsettings').css('z-index', 'unset');
        $('.moreoptions').css('color', '');
        optionopend = false
        smessagesmenu = false
    }else{
        $('.dutytimemenu').fadeOut(200);
        $('.dutytimemenu').css('z-index', 'unset');
        sdutytimemenu = false
    }
});


// open flagged menu
var sflaggedmenu = false
$(document).on('click', ".f9options5", function() {
    if(sflaggedmenu == false){

        $('.flaggedmenu').fadeIn(200);
        $('.flaggedmenu').css('z-index', '10000');
        sflaggedmenu = true

        ///CLOSING TITLE
        $('#dashallsettings').css('display', 'none');
        $('#dashallsettings').css('z-index', 'unset');
        $('.moreoptions').css('color', '');
        optionopend = false
    }else{
        $('.flaggedmenu').fadeOut(200);
        $('.flaggedmenu').css('z-index', 'unset');
        sflaggedmenu = false
    }
});

$(document).on('click', "#checkflagmenu", function() {//Check
    ResetAllflaggedpages();
    setTimeout(() => {
        $('#checkflagmenu').addClass('flaggedbuttonactive');
        $('#checkplatepage').fadeIn(200);
    }, 50);
});

$(document).on('click', "#newflagmenu", function() {//Check
    ResetAllflaggedpages();
    setTimeout(() => {
        $('#newflagmenu').addClass('flaggedbuttonactive');
        $('#addnewflagpage').fadeIn(200);
    }, 50);
});


$(document).on('click', "#removeflagmenu", function() {//Check
    ResetAllflaggedpages();
    setTimeout(() => {
        $('#removeflagmenu').addClass('flaggedbuttonactive');
        $('#removeflagpage').fadeIn(200);
    }, 50);
    $.post('https://qb-dispatchsystem/GetAllFlagedVeh', JSON.stringify({ }), function (f9allflagedcars) {
        $("#removeflaggedval").empty();
        arr = $.parseJSON(f9allflagedcars); //convert to javascript array
        $.each(arr,function(key,value){
            $('#removeflaggedval').append(`<option value="${key}">${key}</option>`);
        });
    });
});


function ResetAllflaggedpages(){
    $('#checkflagmenu').removeClass('flaggedbuttonactive');
    $('#newflagmenu').removeClass('flaggedbuttonactive');
    $('#removeflagmenu').removeClass('flaggedbuttonactive');
    $('#checkplatepage').fadeOut(50);
    $('#addnewflagpage').fadeOut(50);
    $('#removeflagpage').fadeOut(50);
}



$(document).on('click', "#checkplateflag", function() {// check flag
    theplatex = $('#checkplatetext').val();
    if(theplatex.length > 0){
        $.post('https://qb-dispatchsystem/CheckFlag', JSON.stringify({ plate:  theplatex, }), function (f9carinfo) {
            $('.flaagedlist').html('<div class="flaagedreturn" style="border-left: 2px solid '+f9carinfo.color+';">'+f9carinfo.text+'</div>');
            setTimeout(() => {
                $('.flaagedreturn').remove();
            }, 25000);
        });
    }else{
        $.post('https://qb-dispatchsystem/QBNotify', JSON.stringify({ message:  'You must enter the plate.', typeing: 'error' }));
    }
});

$(document).on('click', ".f9platebutton22", function() {// check flag
    theplater = $('#addnewplatetext').val();
    thereasons = $('#addnewreasontet').val();
    if(theplater.length > 0){
        if(thereasons.length > 0 && thereasons.length < 205){
            $.post('https://qb-dispatchsystem/AddNewFlage', JSON.stringify({ plate: theplater, reason: thereasons,}));
        }else{
            $.post('https://qb-dispatchsystem/QBNotify', JSON.stringify({ message:  'The reason must be more than one character and less than 200 characters.', typeing: 'error' }));
        }
    }else{
        $.post('https://qb-dispatchsystem/QBNotify', JSON.stringify({ message:  'You must enter the plate.', typeing: 'error' }));
    }
});


$(document).on('click', "#remoevflagbutton", function() {// check flag
    theplateg = $('#removeflaggedval').val();
    if(theplateg.length > 0){
        $.post('https://qb-dispatchsystem/RemovePlateFlag', JSON.stringify({ plate:  theplateg, }), function (isok) {
            $.post('https://qb-dispatchsystem/GetAllFlagedVeh', JSON.stringify({ }), function (f9allflagedcars) {
                $("#removeflaggedval").empty();
                arr = $.parseJSON(f9allflagedcars); //convert to javascript array
                $.each(arr,function(key,value){
                    $('#removeflaggedval').append(`<option value="${key}">${key}</option>`);
                });
            });
            $('#removeflaggedval').val("");
        });
    }else{
        $.post('https://qb-dispatchsystem/QBNotify', JSON.stringify({ message:  'You must enter the plate.', typeing: 'error' }));
    }
});


//////

$(document).on('click', "#joinradiofreq", function() {
    var number = $(this).data('number');
    $.post('https://qb-dispatchsystem/joinradiofreq', JSON.stringify({ number: number, }));
    $(".f9settingmenu2").fadeOut(150);
    showradiolist = false
});

///////

$(document).on('click', "#openmdt", function() {

    $.post('https://qb-dispatchsystem/openmdt', JSON.stringify({}));
    $.post('https://qb-dispatchsystem/closenui');
    $('.dashborad').fadeOut(500);
    $('.addnewblibp').fadeOut(350);
    $('.dashborad').css('z-index', 'unset');
    $('.policelistdiv').fadeIn();
    dashborad = false
    phub = true
    $.post('https://qb-dispatchsystem/dashboardstate', JSON.stringify({ state: false, }));

});

var optionopend4 = false
$(document).on('click', "#websitepage", function() {
    if(optionopend4 == false){
        $.post('https://qb-dispatchsystem/Getpolicesite', JSON.stringify({}), function (linkurl) {
            $('#websiteframe').attr('src', linkurl);
            $('#websitepage').html('Dashboard');
            $('.dashcontent').fadeOut(150);
            $('.websitecontent').css('display', 'block');
            $('.websitecontent').css('z-index', '10000');
            optionopend4 = true
        });
    }else{
        $('#websitepage').html('Websites');
        $('.dashcontent').fadeIn(150);
        $('.websitecontent').css('display', 'none');
        $('.websitecontent').css('z-index', 'unset');
        $('#websiteframe').attr('src', '');
        optionopend4 = false
    }
});

// var optionopend3 = false
// $(document).on('click', "#switchradio", function() {
//     if(optionopend3 == false){
//         $('.f9settingmenu2').css('display', 'block');
//         $('.f9settingmenu2').css('z-index', '100000');
//         optionopend3 = true
//     }else{
//         $('.f9settingmenu2').css('display', 'none');
//         $('.f9settingmenu2').css('z-index', 'unset');
//         optionopend3 = false
//     }
// });

// var optionopend2 = false
// $(document).on('click', "#ssettingmenu", function() {
//     if(optionopend2 == false){
//         $('.f9settingmenu').css('display', 'block');
//         $('.f9settingmenu').css('z-index', '100000');
//         optionopend2 = true
//     }else{
//         $('.f9settingmenu').css('display', 'none');
//         $('.f9settingmenu').css('z-index', 'unset');
//         optionopend2 = false
//     }
// });

var dashborad = false
$(document).on('click', "#plistmap", function() {
    // $('.policelistdiv').fadeOut(30);
    // phub = false
    $('.dashborad').fadeIn(1000);
    $('#map').css('height', '100%');
    $('.dashborad').css('z-index', '1000');
    dashborad = true
    $.post('https://qb-dispatchsystem/dashboardstate', JSON.stringify({ state: true, }));
    setTimeout(() => {
        $('.welcomescreen').animate({ 'border-radius': '50%', 'width': '1vh', 'height': '1vh', 'opacity': '0.5' }, 600);
        $('.welcomescreentext').fadeOut(100);
        $('.welcomescrenencirlcebutton').fadeOut(100);
        setTimeout(() => {
            $('.welcomescreen').fadeOut(100);
        }, 75);
    }, 2500);
});

$(document).on('click', "#closedash", function() {
    $('.dashborad').fadeOut(500);
    $('.addnewblibp').fadeOut(350);
    $('.dashborad').css('z-index', 'unset');
    dashborad = false
    $.post('https://qb-dispatchsystem/dashboardstate', JSON.stringify({ state: false, }));
});


var quickactions = false
$(document).on('click', "#plistaquick", function() {
    if(callsigner == false){

        $('#quickactions').fadeIn(200);
        $('#quickactions').css('z-index', '10000');
        quickactions = true


    }else{
        $('#quickactions').fadeOut(200);
        $('#quickactions').css('z-index', 'unset');
        quickactions = false
    }
});



var callsigner = false
$(document).on('click', "#changemysign", function() {
    if(callsigner == false){

        $('#dashcallsign').fadeIn(200);
        $('#dashcallsign').css('z-index', '10000');
        callsigner = true


    }else{
        $('#dashcallsign').fadeOut(200);
        $('#dashcallsign').css('z-index', 'unset');
        callsigner = false
    }
});



$(document).on('click', "#savemycallsign", function() {
    var newcallsign = $('#newcallsigntext').val();
    $('#dashcallsign').fadeOut(200);
    $('#dashcallsign').css('z-index', 'unset');
    $.post('https://qb-dispatchsystem/ChangeCallsign', JSON.stringify({ callsign:  newcallsign, }));
    callsigner = false
});


$(document).on('click', "#closechcallsign", function() {
    $('#dashcallsign').fadeOut(200);
    $('#dashcallsign').css('z-index', 'unset');
    callsigner = false
});

var optionopend = false
$(document).on('click', "#plistsetting", function() {
    if(optionopend == false){
        $('#dashallsettings').css('display', 'block');
        $('#dashallsettings').css('z-index', '100000');
        $('.moreoptions').css('color', 'white');
        optionopend = true
    }else{
        $('#dashallsettings').css('display', 'none');
        $('#dashallsettings').css('z-index', 'unset');
        $('.moreoptions').css('color', '');
        optionopend = false
    }
});

var if9options = false
$(document).on('click', ".f9options", function() {
    if(if9options == false){
        if(if9options2 == true || if9options3){
            $('.hideit2').animate({ height: '0%' }, 10);
            $('.f9options2 > #f9-icon').html('<i class="fas fa-caret-down" aria-hidden="true"></i>')
            $('.f9options3').animate({ top: '4.85vh' }, 10);
            $('.f9options4').animate({ top: '7.20vh' }, 10);
            $('.f9options5').animate({ top: '9.55vh' }, 10);
            $('.f9options6').animate({ top: '12.0vh' }, 10);
            setTimeout(function(){
                $('.hideit2').css('display', 'none');
            }, 1);
            if9options2 = false

            $('.hideit3').animate({ height: '0%' }, 10);
            $('.f9options2 > #f9-icon').html('<i class="fas fa-caret-down" aria-hidden="true"></i>')
            $('.f9options3 > #f9-icon').html('<i class="fas fa-caret-down" aria-hidden="true"></i>')
            $('.f9options3').animate({ top: '4.85vh' }, 10);
            $('.f9options4').animate({ top: '7.20vh' }, 10);
            $('.f9options5').animate({ top: '9.55vh' }, 10);
            $('.f9options6').animate({ top: '12.0vh' }, 10);
            setTimeout(function(){
                $('.hideit3').css('display', 'none');
            }, 1);
            if9options3 = false
        }
        $('.hideit').css('display', 'block');
        $('.hideit').animate({ height: '99%' }, 250);
        $('.f9options > #f9-icon').html('<i class="fas fa-caret-up" aria-hidden="true"></i>')
        $('.f9options2').animate({ top: '9vh' }, 250);
        $('.f9options3').animate({ top: '11.45vh' }, 250);
        $('.f9options4').animate({ top: '13.8vh' }, 250);
        $('.f9options5').animate({ top: '15.6vh' }, 250);
        $('.f9options6').animate({ top: '17.9vh' }, 250);
        $('.hideit2').animate({ top: '11.152vh' }, 250);
        if9options = true
    }else{
        $('.hideit').animate({ height: '0%' }, 250);
        $('.f9options > #f9-icon').html('<i class="fas fa-caret-down" aria-hidden="true"></i>')
        $('.f9options2').animate({ top: '2.45vh' }, 250);
        $('.f9options3').animate({ top: '4.85vh' }, 250);
        $('.f9options4').animate({ top: '7.2vh' }, 250);
        $('.f9options5').animate({ top: '9.55vh' }, 250);
        $('.f9options6').animate({ top: '12.0vh' }, 250);
        $('.hideit2').animate({ top: '4.6vh' }, 250);
        setTimeout(function(){
            $('.hideit').css('display', 'none');
        }, 220);
        if9options = false
    }
});

var if9options2 = false
$(document).on('click', ".f9options2", function() {
    if(if9options2 == false){
        if(if9options == true || if9options3 == true){
            $('.hideit').animate({ height: '0%' }, 10);
            $('.f9options > #f9-icon').html('<i class="fas fa-caret-down" aria-hidden="true"></i>')
            $('.f9options2').animate({ top: '2.45vh' }, 10);
            $('.f9options3').animate({ top: '4.85vh' }, 10);
            $('.f9options4').animate({ top: '7.2vh' }, 10);
            $('.f9options5').animate({ top: '9.55vh' }, 10);
            $('.f9options6').animate({ top: '12.0vh' }, 10);
            $('.hideit2').animate({ top: '4.6vh' }, 10);
            setTimeout(function(){
                $('.hideit').css('display', 'none');
            }, 1);
            if9options = false

            

            $('.hideit3').animate({ height: '0%' }, 10);
            $('.f9options3 > #f9-icon').html('<i class="fas fa-caret-down" aria-hidden="true"></i>')
            setTimeout(function(){
                $('.hideit3').css('display', 'none');
            }, 1);
            if9options3 = false
        }
        $('.hideit2').css('display', 'block');
        $('.hideit2').animate({ height: '99%' }, 250);
        $('.f9options2 > #f9-icon').html('<i class="fas fa-caret-up" aria-hidden="true"></i>')
        $('.f9options3').animate({ top: '11.2vh' }, 250);
        $('.f9options4').animate({ top: '13.6vh' }, 250);
        $('.f9options5').animate({ top: '15.99vh' }, 250);
        $('.f9options6').animate({ top: '17.9vh' }, 250);
        if9options2 = true
    }else{
        $('.hideit2').animate({ height: '0%' }, 250);
        $('.f9options2 > #f9-icon').html('<i class="fas fa-caret-down" aria-hidden="true"></i>')
        $('.f9options3').animate({ top: '4.85vh' }, 250);
        $('.f9options4').animate({ top: '7.20vh' }, 250);
        $('.f9options5').animate({ top: '9.55vh' }, 250);
        $('.f9options6').animate({ top: '12.0vh' }, 250);
        setTimeout(function(){
            $('.hideit2').css('display', 'none');
        }, 220);
        if9options2 = false
    }
});

var if9options3 = false
$(document).on('click', ".f9options3", function() {
    if(if9options3 == false){
        if(if9options == true || if9options2 == true){
            $('.hideit').animate({ height: '0%' }, 10);
            $('.hideit2').animate({ height: '0%' }, 10);
            $('.f9options > #f9-icon').html('<i class="fas fa-caret-down" aria-hidden="true"></i>')
            $('.f9options2 > #f9-icon').html('<i class="fas fa-caret-down" aria-hidden="true"></i>')
            $('.f9options2').animate({ top: '2.45vh' }, 10);
            $('.f9options3').animate({ top: '4.85vh' }, 10);
            $('.f9options4').animate({ top: '7.2vh' }, 10);
            $('.f9options5').animate({ top: '9.55vh' }, 10);
            $('.f9options6').animate({ top: '12.0vh' }, 10);
            $('.hideit3').animate({ top: '7.0vh' }, 10);

            setTimeout(function(){
                $('.hideit').css('display', 'none');
                $('.hideit2').css('display', 'none');
            }, 1);
            if9options = false
            if9options2 = false
        }
        $('.hideit3').css('display', 'block');
        $('.hideit3').animate({ height: '99%' }, 250);
        $('.f9options3 > #f9-icon').html('<i class="fas fa-caret-up" aria-hidden="true"></i>')
        $('.f9options4').animate({ top: '11.8vh' }, 250);
        $('.f9options5').animate({ top: '14.2vh' }, 250);
        $('.f9options6').animate({ top: '15.9vh' }, 250);
        if9options3 = true
    }else{
        $('.hideit3').animate({ height: '0%' }, 250);
        $('.f9options3 > #f9-icon').html('<i class="fas fa-caret-down" aria-hidden="true"></i>')
        $('.f9options4').animate({ top: '7.20vh' }, 250);
        $('.f9options5').animate({ top: '9.55vh' }, 250);
        $('.f9options6').animate({ top: '12.0vh' }, 250);
        setTimeout(function(){
            $('.hideit3').css('display', 'none');
        }, 220);
        if9options3 = false
    }
});



$(document).ready(function() {
	document.onkeyup = function(data) {
		if (data.which == 27) {
			$.post('https://qb-dispatchsystem/closenui');
		}


		if (data.which == 87) { // w
            $.post('https://qb-dispatchsystem/ControlCamera', JSON.stringify({
                type: 'up',
            }));
		}
		if (data.which == 83) { // s
            $.post('https://qb-dispatchsystem/ControlCamera', JSON.stringify({
                type: 'down',
            }));
		}
		if (data.which == 68) { // d
            $.post('https://qb-dispatchsystem/ControlCamera', JSON.stringify({
                type: 'right',
            }));
		}
		if (data.which == 65) { // a
            $.post('https://qb-dispatchsystem/ControlCamera', JSON.stringify({
                type: 'left',
            }));
		}

		if (data.which == 38) { // arrow up
            $.post('https://qb-dispatchsystem/ControlCamera', JSON.stringify({
                type: 'zoomin',
            }));
		}
		if (data.which == 40) { // arrow down
            $.post('https://qb-dispatchsystem/ControlCamera', JSON.stringify({
                type: 'zoomout',
            }));
		}

	};
});


$("#myduty").on('change', function() {
    if ($(this).is(':checked')) {
        $("#dutytext").html("On Duty");
        $.post('https://qb-dispatchsystem/ChangeDuty', JSON.stringify({
            status: $(this).is(':checked'),
        }));
    }else {
        $("#dutytext").html("Off Duty");
        $.post('https://qb-dispatchsystem/ChangeDuty', JSON.stringify({
            status: $(this).is(':checked'),
        }));
    }
});

$("#mybreak").on('change', function() {
    if ($(this).is(':checked')) {
        $.post('https://qb-dispatchsystem/TakeBreak', JSON.stringify({
            status: $(this).is(':checked'),
        }));
    }else {
        $.post('https://qb-dispatchsystem/TakeBreak', JSON.stringify({
            status: $(this).is(':checked'),
        }));
    }
});

$("#mybusy").on('change', function() {
    if ($(this).is(':checked')) {
        $.post('https://qb-dispatchsystem/TakeBusy', JSON.stringify({
            status: $(this).is(':checked'),
        }));
    }else {
        $.post('https://qb-dispatchsystem/TakeBusy', JSON.stringify({
            status: $(this).is(':checked'),
        }));
    }
});



// Map Kapama Açma
function mapAc(erere){
    if(erere !== true){
        $('#dispatch-map-container').hide();
    } else {
        $('#dispatch-map-container').show();
    }
}

function SetMyinfo(data) {

    if(data){
        if(data.mousestreet == true){
            mousestreet = true
            $('#mapstreet').fadeIn(10);
        }else{
            mousestreet = false
            $('#mapstreet').fadeOut(10);
        }
        if(data.boss){
            imboss = data.boss
        }
        if(data.serverid){
            playerid = data.serverid
        }
        if(data.myduty == true){
            $("#myduty").attr('checked', true);
            $("#dutytext").html("On Duty");
        }else{
            $("#myduty").attr('checked', false);
            $("#dutytext").html("Off Duty");
        }

        if(data.mybreak == true){
            $("#mybreak").attr('checked', true);
            $("#breaktext").html("Break");
        }else{
            $("#mybreak").attr('checked', false);
            $("#breaktext").html("Break");
        }

        if(data.mybusy == true){
            $("#mybusy").attr('checked', true);
            $("#busytext").html("Busy");
        }else{
            $("#mybusy").attr('checked', false);
            $("#busytext").html("Busy");
        }

        if(data.enablealerts == true){
            $("#enablealerts").attr('checked', true);
        }else{
            $("#enablealerts").attr('checked', false);
        }

        if(data.alertssound == true){
            $("#alertssound").attr('checked', true);
        }else{
            $("#alertssound").attr('checked', false);
        }
        


    }


}


var isuseropends = false
var whatisprofiel = 0
var states = 0
var caricon = 0
function RefreshHub(data) {
    // $('#officerscount').html(officers.length);
    $('#mapofficers').html('Officers Count: '+data.officers.length);
    $('.policelistheadertext').html(data.MenuText + ' ['+data.officers.length+']');


        if(isuseropends == false){
            $('.policelistofficerslist').html('');
            $('.hubofficers2').html('');
            for (let i = 0; i < data.officers.length; i++) {
                if(data.officers[i].isdaed || data.officers[i].inlaststand){
                    isdead = 'bleeding';
                }else{
                    isdead = 'xxxx';
                }

                if(data.officers[i].whatisveh == 'swim'){
                    caricon = '<i class="fas fa-swimmer"></i>';
                    states = 'Swimming'
                }else if(data.officers[i].whatisveh == 'non'){
                    if(data.officers[i].pedruning == 1){
                        caricon = '<i class="animruning fas fa-running"></i>'
                        states = 'Running'
                    }else{
                        caricon = '<i class="fas fa-walking"></i>'
                        states = 'On Foot'
                    }
        
        
        
                }else if(data.officers[i].whatisveh == 0 || data.officers[i].whatisveh == 1 || data.officers[i].whatisveh == 2){
        
        
                }else if(data.officers[i].whatisveh == 2){
                    caricon = '<i class="fas fa-truck"></i>';
                    states = 'On Truck'
                }else if(data.officers[i].whatisveh == 18){
        
                    if(data.officers[i].isirn) {
                        caricon = '<i class="isirn fas fa-taxi"></i>'
                        states = 'On Car'
                    }else{
                        caricon = '<i class="fas fa-taxi"></i>';
                        states = 'On Car'
                    }
        
                }else if(data.officers[i].whatisveh == 10 || data.officers[i].whatisveh == 19 || data.officers[i].whatisveh == 11){
                    caricon = '<i class="fas fa-truck-pickup"></i>';
                    states = 'On Truck'
                }else if(data.officers[i].whatisveh == 9 || data.officers[i].whatisveh == 12){
                    caricon = '<i class="fas fa-car-side"></i>';
                    states = 'On Car'
                }else if(data.officers[i].whatisveh == 21 || data.officers[i].whatisveh == 12){
                    caricon = '<i class="fas fa-trailer"></i>';
                    states = 'On Car'
                }else if(data.officers[i].whatisveh == 13){
                    caricon = '<i class="fas fa-bicycle"></i>';
                    states = 'On Bicycle'
                }else if(data.officers[i].whatisveh == 8){
                    caricon = '<i class="fas fa-motorcycle"></i>';
                    states = 'On Motorcycle'
                }else if(data.officers[i].whatisveh == 16){
                    caricon = '<i class="fas fa-plane"></i>';
                    states = 'On Plane'
                }else if(data.officers[i].whatisveh == 15){
                    caricon = '<i class="fas fa-helicopter"></i>';
                    states = 'On Helicopter'
                }else if(data.officers[i].whatisveh == 14){
                    caricon = '<i class="fas fa-ship"></i>';
                    states = 'On Ship'
                }else{
                    caricon = '<i class="fas fa-car"></i>'
                    states = 'On Car'
                }
                
        
                if(data.officers[i].radio == '0'){
                    rcolor = 'red';
                    data.officers[i].radio = '0';
                }else{
                    rcolor = 'green';
        
                }

                if(states == 'On Foot' || states == 'Running'){
                    theboxicon = '<i class="fas fa-shoe-prints"></i>'
                }else{
                    theboxicon = caricon
                }

                if(showradio == true){
                    radioing = data.officers[i].radio
                }else{
                    radioing = ''
                }

                if(showcallsign == true){
                    thcallsign = data.officers[i].callSign
                }else{
                    thcallsign = ''
                }

                if(showgender == true){
                    if(data.officers[i].gender == 0){
                        offsgender = '<i class="fas fa-mars" style="padding-left: 3px; font-size: font-size: 9px;"></i>'
                    }else{
                        offsgender = '<i class="fas fa-venus" style="padding-left: 3px; font-size: font-size: 9px;"></i>'
                    }
                }else{
                    offsgender = ''
                }

                // `+caricon+`
                if(playerid == data.officers[i].source || hideoffdutyofficers == true && data.officers[i].dutyColor !== '#ff1706' || hideoffdutyofficers == false){
                    if(playerid == data.officers[i].source || hidebreakofficers == true && data.officers[i].dutyColor !== '#f5a101' || hidebreakofficers == false){
                        if(playerid == data.officers[i].source || hidebusyofficers == true && data.officers[i].dutyColor !== '#A808D0' || hidebusyofficers == false){
                        if(playerselected == data.officers[i].source){
                            sdfsd = 'blink_me22'
                        }else{
                            sdfsd = ''
                        }
                        // console.log(radioing)
                        $('.policelistofficerslist').append(`<div class="policelistofficersover" id="ofx`+data.officers[i].source+`">
                        <div class="policelistcallsign" style="background: `+data.officers[i].dutyColor+`;">`+thcallsign+`</div>
                        <div class="policelistofficername">`+data.officers[i].name+` `+offsgender+`</div>
                        <div class="policelistactionslist">
                            <div class="policelistactionsradio">
                                <svg class="svg-inline--fa fa-tower-cell" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="tower-cell" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M62.6 2.3C46.2-4.3 27.6 3.6 20.9 20C7.4 53.4 0 89.9 0 128s7.4 74.6 20.9 108c6.6 16.4 25.3 24.3 41.7 17.7S86.9 228.4 80.3 212C69.8 186.1 64 157.8 64 128s5.8-58.1 16.3-84C86.9 27.6 79 9 62.6 2.3zm450.8 0C497 9 489.1 27.6 495.7 44C506.2 69.9 512 98.2 512 128s-5.8 58.1-16.3 84c-6.6 16.4 1.3 35 17.7 41.7s35-1.3 41.7-17.7c13.5-33.4 20.9-69.9 20.9-108s-7.4-74.6-20.9-108C548.4 3.6 529.8-4.3 513.4 2.3zM340.1 165.2c7.5-10.5 11.9-23.3 11.9-37.2c0-35.3-28.7-64-64-64s-64 28.7-64 64c0 13.9 4.4 26.7 11.9 37.2L98.9 466.8c-7.3 16.1-.2 35.1 15.9 42.4s35.1 .2 42.4-15.9L177.7 448H398.3l20.6 45.2c7.3 16.1 26.3 23.2 42.4 15.9s23.2-26.3 15.9-42.4L340.1 165.2zM369.2 384H206.8l14.5-32H354.7l14.5 32zM288 205.3L325.6 288H250.4L288 205.3zM163.3 73.6c5.3-12.1-.2-26.3-12.4-31.6s-26.3 .2-31.6 12.4C109.5 77 104 101.9 104 128s5.5 51 15.3 73.6c5.3 12.1 19.5 17.7 31.6 12.4s17.7-19.5 12.4-31.6C156 165.8 152 147.4 152 128s4-37.8 11.3-54.4zM456.7 54.4c-5.3-12.1-19.5-17.7-31.6-12.4s-17.7 19.5-12.4 31.6C420 90.2 424 108.6 424 128s-4 37.8-11.3 54.4c-5.3 12.1 .2 26.3 12.4 31.6s26.3-.2 31.6-12.4C466.5 179 472 154.1 472 128s-5.5-51-15.3-73.6z"></path></svg>
                                `+radioing+`</div>
                            </div>
                        </div>
                    </div>`);

                    //     $('.hubofficers2').append(`
                    //     <div class="officer `+sdfsd+`" id="r`+data.officers[i].source+`" style="margin-bottom: 2px;">
                    //         <div class="officer-name2" id="`+data.officers[i].source+`" > <i style="color: `+data.officers[i].dutyColor+`; padding-top: 8px;padding-left: 6px;transform: scale(0.65);" class="fa-solid fa-circle"></i> <p>`+thcallsign+` ` +data.officers[i].name+` `+offsgender+`</p></div>
                    //         <div class="officer-states" id="setwaypointplayer3" data-idx="`+data.officers[i].source+`">
                    //             <i class="fas fa-search-location"></i>
                    //         </div>
                    //         <div class="officer-statr1" id="joinplayerfreqq2" data-freq="`+data.officers[i].radio+`" data-idx="`+data.officers[i].source+`">
                    //         <i class="fas fa-walkie-talkie"></i>
                    //         </div>
                    //         <div class="officer-statr2" id="userbodycam2" data-idx="`+data.officers[i].source+`">
                    //         <i class="fa-solid fa-arrows-to-eye"></i>
                    //         </div>
                    //         <div class="officer-joinmhz2">(` +data.officers[i].radio+`)</div>
                    //     </div>
                    // `);
                        }
                    }
                }
    
            }
        }
}


$(document).on('click', "#gotostations", function() { // dir
    var playeridnumbesr = $(this).data('idx');
    $.post("https://qb-dispatchsystem/GoStation" , JSON.stringify({ playeridnumber: playeridnumbesr })); // send dir
    NewNotify('check-circle', 'The message was sent to the officer successfully.', 6000, true)
});

$(document).on('click', "#userbodycam2", function() {
    var playeriders = $(this).data('idx');
    $.post("https://qb-dispatchsystem/BodyCamHub" , JSON.stringify({playeridnumber: playeriders}), function (playerdata) {
        if (playerdata) {
            clicking.changecam();
            dashbodycam = true
            $('.f9tringleway2').html(playerdata.callsign);
            $('.f9tringlelocationstext2').html(playerdata.name);
            $('.f9bodycam').css('animation', 'turn-off 0.15s ease 0s 1, turned-off 1s ease 0.15s infinite, white-dot 0.35s ease 0.15s 1');
            $('.f9bodycam').fadeIn(500);
            $('.dashborad').fadeOut(500);
            $('.f9bodycam').css('z-index', '1000');
            $('.dashborad').css('z-index', 'unset');
            setTimeout(() => {
                $('.f9tringlecamnumbetext2').html('BODY CAM');
                $('.f9bodycam').css('animation', 'turn-on 0.15s ease 0s 1, turned-on 1s ease 0.15s infinite');
            }, 1500);
            dashborad = false
            $.post('https://qb-dispatchsystem/dashboardstate', JSON.stringify({ state: false, }));
        }
    });
});


$(document).on('click', "#userbodycam", function() {
    var playeriders = $(this).data('idx');
    $.post("https://qb-dispatchsystem/BodyCamHub" , JSON.stringify({playeridnumber: playeriders}), function (playerdata) {
        if (playerdata) {
            clicking.changecam();
            $('.f9tringleway2').html(playerdata.callsign);
            $('.f9tringlelocationstext2').html(playerdata.name);
            $('.f9bodycam').css('animation', 'turn-off 0.15s ease 0s 1, turned-off 1s ease 0.15s infinite, white-dot 0.35s ease 0.15s 1');
            $('.f9bodycam').fadeIn(500);
            $('.dashborad').fadeOut(500);
            $('.f9bodycam').css('z-index', '1000');
            $('.dashborad').css('z-index', 'unset');
            setTimeout(() => {
                $('.f9tringlecamnumbetext2').html('BODY CAM');
                $('.f9bodycam').css('animation', 'turn-on 0.15s ease 0s 1, turned-on 1s ease 0.15s infinite');
            }, 1500);
            dashborad = false
            $.post('https://qb-dispatchsystem/dashboardstate', JSON.stringify({ state: false, }));
        }
    });
});

$(document).on('click', "#setwaypointplayer3", function() {
    var playeriders = $(this).data('idx');
    $.post('https://qb-dispatchsystem/SetPlayerPoint', JSON.stringify({playerid:  playeriders}), function (data) {
        if(data.x && data.y){
            const alerticon = L.divIcon({
                html: '<i id="'+playeriders+'" class="removeingthisblib allfaisalblip fas fa-map-marker-alt ccblink_flaged2" style="color: blue; font-size: '+newzoom+'; width: '+newzoom+'; height: '+newzoom+'; background-size: '+newzoom+';"></i>',
                iconSize: [20, 20],
                className: 'map-icon map-icon-car',
                offset: [-10, 0]
            });
    
            f9alerts[playeriders] = L.marker([data.y,data.x], { icon: alerticon })
            f9alerts[playeriders].bindTooltip("<div class='reportinfo' style='padding: 1vh; padding-right: 13.5vh; color: white !important;'> OFFICER HERE! </div>",
            {
                direction: 'top',
                permanent: false,
                sticky: false,
                offset: [8, 0],
                opacity: 0.99,
                className: 'map-tooltip'
            });
            f9alerts[playeriders].addTo(map)
            setTimeout(function(){
                f9alerts[playeriders].remove(map);
            },10000);
        }

    });
});

$(document).on('click', "#setwaypointplayer2", function() {
    var playeriders = $(this).data('idx');
    $.post('https://qb-dispatchsystem/SetPlayerPoint', JSON.stringify({ playerid:  playeriders }));
});

$(document).on('click', "#joinplayerfreqq2", function() {
    var playeriders = $(this).data('idx');
    var plqyerfreqq = $(this).data('freq');
    //if(plqyerfreqq > 0){
        $.post('https://qb-dispatchsystem/joinradiofreq', JSON.stringify({ playerid:  playeriders, number: plqyerfreqq }));
    //}
});

$(document).on('click', "#setwaypointplayer", function() {
    var playeriders = $(this).data('idx');
    $.post('https://qb-dispatchsystem/SetPlayerPoint', JSON.stringify({ playerid:  playeriders }));
});

$(document).on('click', "#joinplayerfreqq", function() {
    var playeriders = $(this).data('idx');
    var plqyerfreqq = $(this).data('freq');
    //if(plqyerfreqq > 0){
        $.post('https://qb-dispatchsystem/joinradiofreq', JSON.stringify({ playerid:  playeriders, number: plqyerfreqq }));
    //}
});


$(document).on('click', "#sendtherequest", function() {
    var playerider = $(this).data('id');
    var msgorlink = $('#morein'+playerider+ '> #sendrequest > .playerreqtext1').val();
    if(msgorlink.length > 2){
        $.post('https://qb-dispatchsystem/SendRequest', JSON.stringify({ playerid:  playerider, text:  msgorlink, }));
        $('#morein'+playerider+' > .typeingreq').fadeOut(200);
        $('.playerreqtext1').val("");
    }else{
        NewNotify('exclamation-triangle', 'There must be a message to send it.', 5000, true)
    }

});

$(document).on('click', "#backtohubing", function() {
    playerider = $(this).data('id');
    $('#morein'+playerider+' > #sendrequest').fadeOut(200);
    $('.playerreqtext1').val("");
    $('.playerreqtext2').val("");
});

$(document).on('click', ".player-buttons", function() {
    var getid = $(this).data('idx');
    var gettypeing = $(this).data('typeing');
    $('.playerreqtext1').val("");
    $('.playerreqtext2').val("");
    $('#morein'+getid+' > #sendrequest').css('display', 'block');
});






$(document).on('click', ".officer-name", function() {
    getidofclass = $(this).attr('id');
    $('#morein'+whatisprofiel+' > .player-offwing > .player-wings').html('');

    if (whatisprofiel == getidofclass){
        whatisprofiel = 0
        $('#morein'+getidofclass).animate({ 'height': '0', 'opacity': '0' }, 245);
        $('#morein'+whatisprofiel).css('z-index', '0');
        isuseropends = false
    }else{
        if(whatisprofiel && whatisprofiel !== 0){
            $('#morein'+whatisprofiel).animate({ 'height': '0', 'opacity': '0' }, 245);
            $('#morein'+whatisprofiel).css('z-index', '0');
            isuseropends = false
            whatisprofiel = 0
        }
        wingsamount = 0
        $.post("https://qb-dispatchsystem/GetPlayerWings" , JSON.stringify({userid: getidofclass}), function (data) {
            for (let i = 0; i < data.length; i++) {
                if(data[i].ifhave){
                    styling = 'opacity: 1; background: #00a0d2;'
                }else{
                    styling = 'opacity: 0.8; background: #585858;'
                }
                wingsamount = wingsamount + 1
                $('#morein'+whatisprofiel+' > .player-offwing > .player-wings').append('<div class="ffofficerwing" style="'+styling+'">'+data[i].shortname+'</div>');
            }
            // if(wingsamount == 0){
            //     $('#morein'+whatisprofiel+' > .player-wings').append('<div class="nowings">The officer does not have any wings</div>');
            // }
        });
        whatisprofiel = getidofclass
        $('#morein'+getidofclass).animate({ 'height': '9.35vh', 'opacity': '1' }, 245);
        $('#morein'+whatisprofiel).css('z-index', '100000');
        isuseropends = true
    }
});



function policealert(data){ // Add Police Alerts

    var currentTime = new Date()
    var datetime = currentTime.getDate() + "/"
                + (currentTime.getMonth()+1)  + "/" 
                + currentTime.getFullYear() + " - "  
                + currentTime.getHours() + ":"  
                + currentTime.getMinutes() + "";


    if(data.time){
        timing = data.time
    }else{
        timing = 6000
    }

    var infos = ' '
    for (let i = 0; i < data.infos.length; i++) {
        infos = infos + '<div class="if9newalertoneinfo"><i class="fas fa-'+ data.infos[i].icon +'"></i> '+ data.infos[i].text +'</div>'
    }

    if(data.coords){
        coordx = data.coords.x
        coordy = data.coords.y
    }else{
        coordx = 0
        coordy = 0
    }

    prio1 = '';
    prio2 = '';
    prio3 = '';
    prio4 = '';
    if(data.proirty){
        if(data.proirty == 1){
            prio1 = 'alertinsideanim'
        }else if(data.proirty == 2){
            prio2 = ''
        }else if(data.proirty == 3){
            prio3 = ''
        }else if(data.proirty == 4){
            prio4 = ''
        }
    }else{
        prio1 = '';
        prio2 = '';
        prio3 = '';
        prio4 = '';
    }

    if(data.icon){
        alerticon = data.icon
    }else{
        alerticon = 'map-marker'
    }


    if(data.code == 'Shoot Fire'){
        data.code = '<i class="fas fa-gun"></i>';
        data.title = 'There is a shoot fire in last '+data.title
        colorcode = '#c50000';
    }else{
        colorcode = '#0085c5';
    } 


    if(data.trs){
        if(data.police){
            emstrasfer = `<div class="if9newalertonebutton" data-ishave="yes" data-id="`+data.alertnumber+`" style="opacity 0.7"><p><i class="fa-solid fa-star-of-life"></i></p></div>`
        }else if(data.ambulance){
            emstrasfer = `<div class="if9newalertonebutton" data-ishave="yes" data-id="`+data.alertnumber+`" style="opacity 0.7"><p><i class="fa-solid fa-star-of-life"></i></p></div>`
        }
    }else{
        if(data.police){
            emstrasfer = `<div class="if9newalertonebutton" id="getemergcenycar" data-ishave="yes" data-id="`+data.alertnumber+`" style="opacity 1"><p><i class="fa-solid fa-star-of-life"></i></p></div>`
        }else if(data.ambulance){
            emstrasfer = `<div class="if9newalertonebutton" id="getpoliceman" data-ishave="yes" data-id="`+data.alertnumber+`" style="opacity 1"><p><i class="fa-solid fa-star-of-life"></i></p></div>`
        }
    }


    messagenumber = messagenumber + 1
    console.log(prio1)
    alerthtml = `
    <div class="if9newalert `+prio1+`" id="alert`+data.alertnumber+`" data-id="`+data.alertnumber+`" data-coordx="`+coordx+`" data-coordy="`+coordy+`" data-icon="`+alerticon+`">
        <div class="onedivforanim `+prio1+`"></div>
        <div class="if9newalerthoverbutton">
            <div class="if9newalertonebutton" id="getlocation" data-id="`+data.alertnumber+`"><p><i class="fas fa-map-marker-alt"></i></p></div>
            <div class="if9newalertonebutton" id="areahaveshotfire" data-ishaver="no" data-id="`+data.alertnumber+`"><p><i class="fa-solid fa-gun"></i></p></div>
            `+emstrasfer+`
            <div class="if9newalertonebutton" id="deletethisalert" data-id="`+data.alertnumber+`"><p><i class="fa-solid fa-trash"></i></p></div>
        </div>
        <div class="if9newalertcallcode" style="background: `+colorcode+`;">`+ data.code +`</div>
        <div class="if9newalertcalltitle">`+ data.title +`</div>
        <div class="if9newalertline"></div>
        <div class="if9newalertallinfoslist">
            `+infos+`
        </div>
    </div>

    `

    if($("#alertssound").is(':checked') == false){
        if(data.sound){
            if(data.sound == 1){
                policelaertssound.alert1();
            }else if(data.sound == 2){
                policelaertssound.alert2();
            }else if(data.sound == 3){
                policelaertssound.alert3();
            }
        }else{
            policelaertssound.alert1();
        }
    }
    if(autoclear == false){
        $(alerthtml).appendTo('#alertshere');
        $("#alertshere").scrollTop(1000);
    }
    $(alerthtml).appendTo('.f9allalerts').delay(timing + 1200).queue(function() {
        $(this).css('-webkit-animation', 'fadeInLeft 500ms');
        $(this).bind('webkitAnimationEnd',function(){
            $(this).remove();
        });
    });

    
}


$(document).on('click', "#clearalerts", function() {
    $('#alertshere').html('');
});




$(document).on('click', "#deletethisalert", function() {
    var alertidx = $(this).data('id');
    $('#alert'+alertidx).css('-webkit-animation', 'fadeInLeft 300ms');
    $('#alert'+alertidx).bind('webkitAnimationEnd',function(){
        $('#alert'+alertidx).remove();
    });
});



// $(document).on('click', ".if9newalert", function() {
//     var alertidx = $(this).data('id');
    
//     console.log($('#alert'+alertidx + ' > .if9newalertallinfoslist').css('height'));

//     if($('#alert'+alertidx + ' > .if9newalertallinfoslist').css('height') == '16.7188px'){
//         console.log('123');
//         $('#alert'+alertidx + ' > .if9newalertallinfoslist').css('height', 'auto');
//     }else{
//         console.log('456');
//         $('#alert'+alertidx + ' > .if9newalertallinfoslist').css('height', '1.55vh');
//     }
// });




var spamiing2 = 0
$(document).on('click', "#areahaveshotfire", function() {
    var alertidr = $(this).data('id');
    var ishaver = $(this).data('ishaver');
    if(ishaver == 'no'){
        if(spamiing2 == 0){
            

            var coordx = $('#alert'+alertidr).data('coordx');
            var coordy = $('#alert'+alertidr).data('coordy');
            var f9icon = $('#alert'+alertidr).data('icon');
            var titlename = $('#alert'+alertidr+' > .if9newalertcalltitle').html();
            var alertcode = $('#alert'+alertidr+' > .if9newalertcallcode').html();
            var alertdata = $('#alert'+alertidr+' > .if9newalertallinfoslist').html();
            // console.log(alertcode)
            // if(alertcode == '<svg class="svg-inline--fa fa-gun" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="gun" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M528 56c0-13.3-10.7-24-24-24s-24 10.7-24 24v8H32C14.3 64 0 78.3 0 96V208c0 17.7 14.3 32 32 32H42c20.8 0 36.1 19.6 31 39.8L33 440.2c-2.4 9.6-.2 19.7 5.8 27.5S54.1 480 64 480h96c14.7 0 27.5-10 31-24.2L217 352H321.4c23.7 0 44.8-14.9 52.7-37.2L400.9 240H432c8.5 0 16.6-3.4 22.6-9.4L477.3 208H544c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32H528V56zM321.4 304H229l16-64h105l-21 58.7c-1.1 3.2-4.2 5.3-7.5 5.3zM80 128H464c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16z"></path></svg><!-- <i class="fas fa-gun" aria-hidden="true"></i> Font Awesome fontawesome.com -->'){
            if(alertcode.includes('fa-gun')){
                console.log('947')
                NewNotify('exclamation-triangle', 'The message has already been send it', 6000)
            }else{
                spamiing2 = 1
                $.post('https://qb-dispatchsystem/AreaHaveShotFire', JSON.stringify({
                    x: coordx,
                    y: coordy,
                    alertid: alertidr,
                    icon: f9icon,
                    title: titlename,
                    code: alertcode,
                    data: alertdata,
                }));

            setTimeout(() => {
                spamiing2 = 0
            }, 15000);
            }

        }else{
            NewNotify('exclamation-triangle', 'You have to wait between your attempts..', 6000)
        }
    }else{
        NewNotify('exclamation-triangle', 'The message has already been send it', 6000)
    }
});



var spamiingr = 0
$(document).on('click', "#getpoliceman", function() {
    var alertid = $(this).data('id');
    var ishavex = $(this).data('ishave');
    if(ishavex == 'no'){
        if(spamiingr == 0){
            $(this).data('ishave', 'yes');
            var coordx = $('#alert'+alertid).data('coordx');
            var coordy = $('#alert'+alertid).data('coordy');
            var f9icon = $('#alert'+alertid).data('icon');
            var titlename = $('#alert'+alertid+' > .if9newalertcalltitle').html();
            var alertcode = $('#alert'+alertid+' > .if9newalertcallcode').html();
            var alertdata = $('#alert'+alertid+' > .if9newalertallinfoslist').html();
            spamiingr = 1
            $.post('https://qb-dispatchsystem/SendToPolice', JSON.stringify({
                x: coordx,
                y: coordy,
                alertid: alertid,
                icon: f9icon,
                title: titlename,
                code: alertcode,
                data: alertdata,
            }));
            setTimeout(() => {
                spamiingr = 0
            }, 25000);
        }else{
            NewNotify('exclamation-triangle', 'You have to wait between your attempts..', 6000)
        }
    }else{
        NewNotify('exclamation-triangle', 'The message has already been transferred', 6000)
    }

});

var spamiing = 0
$(document).on('click', "#getemergcenycar", function() {
    var alertid = $(this).data('id');
    var ishavex = $(this).data('ishave');
    if(ishavex == 'no'){
        if(spamiing == 0){
            $(this).data('ishave', 'yes');
            var coordx = $('#alert'+alertid).data('coordx');
            var coordy = $('#alert'+alertid).data('coordy');
            var f9icon = $('#alert'+alertid).data('icon');
            var titlename = $('#alert'+alertid+' > .if9newalertcalltitle').html();
            var alertcode = $('#alert'+alertid+' > .if9newalertcallcode').html();
            var alertdata = $('#alert'+alertid+' > .if9newalertallinfoslist').html();
            spamiing = 1
            $.post('https://qb-dispatchsystem/SendToEms', JSON.stringify({
                x: coordx,
                y: coordy,
                alertid: alertid,
                icon: f9icon,
                title: titlename,
                code: alertcode,
                data: alertdata,
            }));
            setTimeout(() => {
                spamiing = 0
            }, 25000);
        }else{
            NewNotify('exclamation-triangle', 'You have to wait between your attempts..', 6000)
        }
    }else{
        NewNotify('exclamation-triangle', 'The message has already been transferred', 6000)
    }

});


$(document).on('click', "#getlocation", function() {
    var alertid = $(this).data('id');
    if(alertid){

        var coordx = $('#alert'+alertid).data('coordx');
        var coordy = $('#alert'+alertid).data('coordy');
        var f9icon = $('#alert'+alertid).data('icon');
        var titlename = $('#alert'+alertid+' > .if9newalertcalltitle').html();
        var alertcode = $('#alert'+alertid+' > .if9newalertcallcode').html();
        var alertdata = $('#alert'+alertid+' > .if9newalertallinfoslist').html();



        if(dashborad == true){
            $.post('https://qb-dispatchsystem/MapWayPoint', JSON.stringify({
                x: coordx,
                y: coordy,
                alertid: alertid,
            }));

            if(f9alerts[alertid]){
                f9alerts[alertid].remove(map);
                f9alerts[alertid] = null
            }else{
                const alerticon = L.divIcon({
                    html: '<i id="'+alertid+'" class="removeingthisblib allfaisalblip clickthepoint fas fa-'+f9icon+'  ccblink_me" style="color: blue; font-size: '+newzoom+'; width: '+newzoom+'; height: '+newzoom+'; background-size: '+newzoom+';"></i>',
                    iconSize: [30, 30],
                    className: 'map-icon map-icon-car',
                    offset: [-10, 0]
                });
        
                f9alerts[alertid] = L.marker([coordy,coordx], { icon: alerticon })
                f9alerts[alertid].bindTooltip("<div class='reportinfo' style='padding: 1vh; padding-right: 9.5vh; color: white !important;'> <div class='f9policealertheaderbutton' style='transform: skewX(0deg); position: initial; margin: 5px;'><div class='f9policeheadercode' style='transform: skewX(0deg);'>[#"+alertid+ "] " + alertcode+"</div> <div style='position: relative;padding: 4px;left: 7vh;top: -2vh;'>"+ titlename + "</div></div> " + alertdata + "</div>",
                    {
                        direction: 'top',
                        permanent: false,
                        sticky: false,
                        offset: [8, 0],
                        opacity: 0.99,
                        className: 'map-tooltip'
                    });
                    f9alerts[alertid].addTo(map)
                    setTimeout(function(){
                        f9alerts[alertid].remove(map);
                    },40000); 
            }

        }else{
            $.post('https://qb-dispatchsystem/MapWayPoint', JSON.stringify({
                x: coordx,
                y: coordy,
                alertid: alertid,
            }));
        }
    }
});

$(document).on('click', ".clickthepoint", function() {
    var lertid = $(this).attr('id');
    $("#alert"+lertid+" > .f9policealertbeforetrs > .f9policealertheader").css('animation', 'blinker234 1.8s linear infinite');
    $("#alert"+lertid+" > .if9newalertallinfoslist").css('animation', 'blinker234 1.8s linear infinite');
    $("#alert"+lertid+" > .f9policealertbottombuttons").css('animation', 'blinker234 1.8s linear infinite');
    setTimeout(function(){
        $("#alert"+lertid+" > .f9policealertbeforetrs > .f9policealertheader").css('animation', 'unset');
        $("#alert"+lertid+" > .if9newalertallinfoslist").css('animation', 'unset');
        $("#alert"+lertid+" > .f9policealertbottombuttons").css('animation', 'unset');
    },4100); 
});

// alerts sound
policelaertssound = {}
policelaertssound.alert1 = function () {
    var dispatchsound = document.getElementById("dispatchsound");
    dispatchsound.volume = 0.3;
    dispatchsound.play();
}
policelaertssound.alert2 = function () {
    var dispatchsos = document.getElementById("dispatchsos");
    dispatchsos.volume = 0.2;
    dispatchsos.play();
}
policelaertssound.alert3 = function () {
    var dispatchnotifyy2 = document.getElementById("dispatchnotifyy2");
    dispatchnotifyy2.volume = 0.05;
    dispatchnotifyy2.play();
}
    
// -- bank
// -- store
// -- speedcam
// -- station
var whatisshow
function showallcamss(allcams, typing){

    $($('#all')[0]).removeClass('camisactive');
    $($('#bank')[0]).removeClass('camisactive');
    $($('#store')[0]).removeClass('camisactive');
    $($('#speedcam')[0]).removeClass('camisactive');
    $($('#gunstores')[0]).removeClass('camisactive');
    $($('#station')[0]).removeClass('camisactive');
    $($('#others')[0]).removeClass('camisactive');
    
    // $('#all').css('background', '#323232');
    // $('#bank').css('background', '#323232');
    // $('#store').css('background', '#323232');
    // $('#speedcam').css('background', '#323232');
    // $('#gunstores').css('background', '#323232');
    // $('#station').css('background', '#323232');
    // $('#others').css('background', '#323232');
    for (let i = 0; i < allcams.length; i++) {
        if (cams[i] == null ) {
        } else {
            cams[i].remove(map);
        }
    }
    clicking.clickedsound();
    if(whatisshow !== typing){
        whatisshow = typing
        // $('#'+whatisshow).css('background-color', '#767675');
        $('#'+whatisshow).addClass('camisactive');
        if(typing == 'all'){
            for (let i = 0; i < allcams.length; i++) {
                    if(allcams[i].color == 'red'){
                        cameralink = 'https://cdn.discordapp.com/attachments/729643536877748315/1044990450915868693/ccredd.png';
                    }else if (allcams[i].color == 'green') {
                        cameralink = 'https://cdn.discordapp.com/attachments/729643536877748315/1044992465586892910/rrgreen.png';
                    }else if (allcams[i].color == 'orange') {
                        cameralink = 'https://cdn.discordapp.com/attachments/729643536877748315/1044992463913373826/ccorang.png';
                    }else if (allcams[i].color == 'pink') {
                        cameralink = 'https://cdn.discordapp.com/attachments/729643536877748315/1044992474264916059/ccpink.png';
                    }else if (allcams[i].color == 'purple') {
                        cameralink = 'https://cdn.discordapp.com/attachments/729643536877748315/1044992473979695206/ccprple.png';
                    }else if (allcams[i].color == 'blue') {
                        cameralink = 'https://cdn.discordapp.com/attachments/729643536877748315/1044992465930834030/2.png';
                    }else if (allcams[i].color == 'yellow') {
                        cameralink = 'https://cdn.discordapp.com/attachments/729643536877748315/1044992465213608069/ccyelow.png';
                    }else if (allcams[i].color == 'gray') {
                        cameralink = 'https://cdn.discordapp.com/attachments/729643536877748315/1044992466232815646/camgray.png';
                    }else if (allcams[i].color == 'fst8') {
                        cameralink = 'https://cdn.discordapp.com/attachments/729643536877748315/1044992466677403658/cayan.png';
                    }else if (allcams[i].color == 'aqua') {
                        cameralink = 'https://cdn.discordapp.com/attachments/729643536877748315/1044992464320213093/cct8.png';
                    }else if (allcams[i].color == 'black') {
                        cameralink = 'https://cdn.discordapp.com/attachments/729643536877748315/1044992467012964372/ccblack.png';
                    }else{
                        cameralink = allcams[i].color;
                    }
                    const DispatchCall = L.divIcon({
                        html: '<img id="'+i+'" class="allfaisalblip playcamvideo f9mapblip" data-ishaveradar="'+allcams[i].tab+'" src="'+cameralink+'" style=" font-size: '+newzoom+'; width: '+newzoom+'; height: '+newzoom+'; background-size: '+newzoom+';" />',
                        iconSize: [12, 17],
                        className: 'map-icon map-icon-car',
                        offset: [-10, 0]
                    });
            
                    cams[i] = L.marker([allcams[i].y,allcams[i].x], { icon: DispatchCall })
                    cams[i].bindTooltip(allcams[i].name,
                        {
                            direction: 'top',
                            permanent: false,
                            sticky: false,
                            offset: [0, -12],
                            opacity: 0.99,
                            className: 'map-tooltip'
                        });
                        cams[i].addTo(map)


                        $(".allfaisalblip").mouseover(function() {
                            clicking.audio1();
                        });

            }
            $('.allfaisalblip').css({'font-size':newzoom,'width':newzoom,'height':newzoom,'background-size':newzoom + ' ' + newzoom}); 
            $('#selecteduser').css({'font-size':newzoom,'width':newzoom,'height':newzoom,'background-size':newzoom + ' ' + newzoom}); 
        }else{
            for (let i = 0; i < allcams.length; i++) {
                if(allcams[i].tab == typing){
                    if(allcams[i].color == 'red'){
                        cameralink = 'https://cdn.discordapp.com/attachments/729643536877748315/1044990450915868693/ccredd.png';
                    }else if (allcams[i].color == 'green') {
                        cameralink = 'https://cdn.discordapp.com/attachments/729643536877748315/1044992465586892910/rrgreen.png';
                    }else if (allcams[i].color == 'orange') {
                        cameralink = 'https://cdn.discordapp.com/attachments/729643536877748315/1044992463913373826/ccorang.png';
                    }else if (allcams[i].color == 'pink') {
                        cameralink = 'https://cdn.discordapp.com/attachments/729643536877748315/1044992474264916059/ccpink.png';
                    }else if (allcams[i].color == 'purple') {
                        cameralink = 'https://cdn.discordapp.com/attachments/729643536877748315/1044992473979695206/ccprple.png';
                    }else if (allcams[i].color == 'blue') {
                        cameralink = 'https://cdn.discordapp.com/attachments/729643536877748315/1044992465930834030/2.png';
                    }else if (allcams[i].color == 'yellow') {
                        cameralink = 'https://cdn.discordapp.com/attachments/729643536877748315/1044992465213608069/ccyelow.png';
                    }else if (allcams[i].color == 'gray') {
                        cameralink = 'https://cdn.discordapp.com/attachments/729643536877748315/1044992466232815646/camgray.png';
                    }else if (allcams[i].color == 'fst8') {
                        cameralink = 'https://cdn.discordapp.com/attachments/729643536877748315/1044992466677403658/cayan.png';
                    }else if (allcams[i].color == 'aqua') {
                        cameralink = 'https://cdn.discordapp.com/attachments/729643536877748315/1044992464320213093/cct8.png';
                    }else if (allcams[i].color == 'black') {
                        cameralink = 'https://cdn.discordapp.com/attachments/729643536877748315/1044992467012964372/ccblack.png';
                    }else{
                        cameralink = allcams[i].color;
                    }
                    const DispatchCall = L.divIcon({
                        html: '<img id="'+i+'" class="allfaisalblip playcamvideo f9mapblip" data-ishaveradar="'+allcams[i].tab+'" src="'+cameralink+'" style=" font-size: '+newzoom+'; width: '+newzoom+'; height: '+newzoom+'; background-size: '+newzoom+';" />',
                        iconSize: [12, 17],
                        className: 'map-icon map-icon-car',
                        offset: [-10, 0]
                    });
            
                    cams[i] = L.marker([allcams[i].y,allcams[i].x], { icon: DispatchCall })
                    cams[i].bindTooltip(allcams[i].name,
                        {
                            direction: 'top',
                            permanent: false,
                            sticky: false,
                            offset: [0, -12],
                            opacity: 0.99,
                            className: 'map-tooltip'
                        });
                        cams[i].addTo(map)

                        $(".allfaisalblip").mouseover(function() {
                            clicking.audio1();
                        });

                }
            }
            $('.allfaisalblip').css({'font-size':newzoom,'width':newzoom,'height':newzoom,'background-size':newzoom + ' ' + newzoom}); 
            $('#selecteduser').css({'font-size':newzoom,'width':newzoom,'height':newzoom,'background-size':newzoom + ' ' + newzoom}); 
        }
    }else{
        $($('#all')[0]).removeClass('camisactive');
        $($('#bank')[0]).removeClass('camisactive');
        $($('#store')[0]).removeClass('camisactive');
        $($('#speedcam')[0]).removeClass('camisactive');
        $($('#gunstores')[0]).removeClass('camisactive');
        $($('#station')[0]).removeClass('camisactive');
        $($('#others')[0]).removeClass('camisactive');
        whatisshow = null
    }
}




////


$(".f9settingmenu2").fadeOut(150);
var showradiolist = false
$(".f9settingmenu2").mouseenter(function() {
    showradiolist = true
});

$(".f9settingmenu2").mouseleave(function() {
    showradiolist = false
    $(".f9settingmenu2").fadeOut(150)
});


$("#switchradio").mouseenter(function() {
    $(".f9settingmenu2").fadeIn(200);
});

$("#switchradio").mouseleave(function() {
    setTimeout(() => {
        if(showradiolist == false){
            $(".f9settingmenu2").fadeOut(150)
        }
    }, 10);
});



////


$(".f9settingmenu").fadeOut(150);
var showmainsetting = false
$(".f9settingmenu").mouseenter(function() {
    showmainsetting = true
});

$(".f9settingmenu").mouseleave(function() {
    showmainsetting = false
    $(".f9settingmenu").fadeOut(150)
});


$("#ssettingmenu").mouseenter(function() {
    $(".f9settingmenu").fadeIn(1);
});

$("#ssettingmenu").mouseleave(function() {
    setTimeout(() => {
        if(showmainsetting == false){
            $(".f9settingmenu").fadeOut(150)
        }
    }, 10);
});


/////

$(".f9camsdivlist").fadeOut(150);
var showcamslist = false
$(".f9camsdivlist").mouseenter(function() {
    showcamslist = true
    $('#showallcams').css('background-color', '#1c1d20');
});

$(".f9camsdivlist").mouseleave(function() {
    showcamslist = false
    $(".f9camsdivlist").fadeOut(150)
    $('#showallcams').css('background-color', '#161719');
});


$("#showallcams").mouseenter(function() {
    $(".f9camsdivlist").fadeIn(1);
    $('#showallcams').css('background-color', '#1c1d20');
});

$("#showallcams").mouseleave(function() {
    setTimeout(() => {
        if(showcamslist == false){
            $('#showallcams').css('background-color', '#161719');
            $(".f9camsdivlist").fadeOut(150)
        }
    }, 10);
});


/////

$(".f9layersdiv").fadeOut(150);
var mapstyle = false
$(".f9layersdiv").mouseenter(function() {
    mapstyle = true
});

$(".f9layersdiv").mouseleave(function() {
    mapstyle = false
    $(".f9layersdiv").fadeOut(150)
});


$("#showstyling").mouseenter(function() {
    $(".f9layersdiv").fadeIn(200);
});

$("#showstyling").mouseleave(function() {
    setTimeout(() => {
        if(mapstyle == false){
            $(".f9layersdiv").fadeOut(150)
        }
    }, 10);
});

$(".f9platebutton22").mouseover(function() {
    clicking.audio1();
});


$(".playcamvideo").mouseover(function() {
    clicking.audio1();
});

$(".f9platebutton").mouseover(function() {
    clicking.audio1();
});

$(".allmorepagesclose").mouseover(function() {
    clicking.audio1();
});

$(".flaggedbutton").mouseover(function() {
    clicking.audio1();
});

$(".trypingreqbutton").mouseover(function() {
    clicking.audio1();
});

$(".player-buttons").mouseover(function() {
    clicking.audio1();
});

$("#selecteduser").mouseover(function() {
    clicking.audio1();
});

$(".addnewblibpclose").mouseover(function() {
    clicking.audio1();
});


$(".wingsaddremconfirm").mouseover(function() {
    clicking.audio1();
});

$(".wingsaddremdecline").mouseover(function() {
    clicking.audio1();
});


$(".sendblibpconfirm").mouseover(function() {
    clicking.audio1();
});

$(".sendblibpdecline").mouseover(function() {
    clicking.audio1();
});

$(".divtoleftrigth").mouseover(function() {
    clicking.audio1();
});

$(".divgotoleft").mouseover(function() {
    clicking.audio1();
});

$(".sendmessageconfirm").mouseover(function() {
    clicking.audio1();
});

$(".sendmessagedecline").mouseover(function() {
    clicking.audio1();
});


$(".selectedofficerimg").mouseover(function() {
    clicking.audio1();
});

$(".logsrefresh").mouseover(function() {
    clicking.audio1();
});

$(".allactionsbutton").mouseover(function() {
    clicking.audio1();
});

$(".alertactiondiv").mouseover(function() {
    clicking.audio1();
});


$(".imgblockicon").mouseover(function() {
    clicking.audio1();
});


$(".sendmessageblockicon").mouseover(function() {
    clicking.audio1();
});

$(".wingsaddremblockicon").mouseover(function() {
    clicking.audio1();
});


$(".screenshotsbutton").mouseover(function() {
    clicking.audio1();
});

$(".screenshotsbutton2").mouseover(function() {
    clicking.audio1();
});

$(".f9headerbutton").mouseover(function() {
    clicking.audio1();
});

$(".f9policealertactionbutton").mouseover(function() {
    clicking.audio1();
});

$(".f9uicam").mouseover(function() {
    clicking.audio1();
});

$(document).on('click', "#closecam", function() {
    $('.f9camerasui').css('animation', 'turn-off 0.15s ease 0s 1, turned-off 1s ease 0.15s infinite, white-dot 0.35s ease 0.15s 1');
    clicking.changecam();
    setTimeout(() => {
        $.post('https://qb-dispatchsystem/OpenCam', JSON.stringify({
            locate: 0,
            camnumber: 0,
            close: true,
        }));
        camnumberx = 0
        Resetcambuttons();
        $('.f9camerasui').fadeOut(600);
        $('.f9camerasui').css('z-index', 'unset');
        $('.dashborad').fadeIn(600);
        $('.dashborad').css('z-index', '1000');
        dashborad = true
        $.post('https://qb-dispatchsystem/dashboardstate', JSON.stringify({ state: true, }));
        $('.f9camerasui').css('animation', 'turn-on 0.1s ease 0s 1, turned-on 1s ease 0.1s infinite');
    }, 350);
});
var camnumberx = 0
$(document).on('click', ".playcamvideo", function() {
    var cameraid = $(this).attr('id');
    var camtype = $(this).data('ishaveradar');
    clicking.opencam();
    $.post("https://qb-dispatchsystem/Gettablecams" , JSON.stringify({ cam: cameraid }), function (f9olecams) {

        $('.f9tringlelocationstext').html(f9olecams.name);
        $('.f9tringlecamnumbetext').html('CAM: 1');
        camnumberx = cameraid
        $('#camshere').html('<div class="f9uicam2" id="nocam"></div> <div class="f9uicam" id="closecam"><p><i class="fas fa-times"></i></p></div>');
        
        if(camtype == 'speedcam'){
            $('.enableradar').css('background', 'black');
            $('.enableradar').fadeIn(25);
        }else{
            $('.enableradar').fadeOut(25);
        }
        for (let i = 0; i < f9olecams.cams.length; i++) {
            $('#camshere').append('<div class="f9uicam" id="cam'+i+'"><p><img src="https://cdn.discordapp.com/attachments/729643536877748315/1044992464815132692/ccwhite.png" style="padding-bottom: 1.75px;width: 1.2vh;">  '+(i + 1)+'</p></div>');
            $(document).on('click', '#cam'+i+'', function() {
                Resetcambuttons();
                // $(this).css('border-top', '2px solid #ffffff9c');
                $(this).css('background-color', '#00f8b9');
                // $('.f9camerasui').css('animation', 'turn-off 0.1s ease 0s 1, turned-off 1s ease 0.1s infinite, white-dot 0.1s ease 0.1s 1');
                clicking.opencam();
                setTimeout(() => {
                    camnumber = i
                    $('.f9tringlecamnumbetext').html('CAM: '+(i + 1)+'');
                    $.post('https://qb-dispatchsystem/OpenCam', JSON.stringify({
                        locate: cameraid,
                        camnumber: i,
                    }));
                    // $('.f9camerasui').css('animation', 'turn-on 0.1s ease 0s 1, turned-on 1s ease 0.1s infinite');
                }, 100);
            });
        }
        // $('#cam0').css('border-top', '2px solid #ffffff9c');
        $('#cam0').css('background-color', '#00f8b9');
        $('.f9camerasui').css('animation', 'turn-on 0.1s ease 0s 1, turned-on 1s ease 0.1s infinite');
        $('.dashborad').fadeOut(500);
        $.post('https://qb-dispatchsystem/OpenCam', JSON.stringify({
            locate: cameraid,
            camnumber: 0,
        }));
        $('.f9camerasui').fadeIn(400);
        $('.f9camerasui').css('z-index', '1000');
        $('.dashborad').css('z-index', 'unset');
        dashborad = false
        $.post('https://qb-dispatchsystem/dashboardstate', JSON.stringify({ state: false, }));

    });
});
 


// Radar

$(document).on('click', ".enableradar", function() {
    $.post('https://qb-dispatchsystem/ActiveRadar', JSON.stringify({}), function (bool) {
        if(bool){
            $('.enableradar').css('background', '#00f8b9');
        }else{
            $('.enableradar').css('background', 'black');
        }
    });
});


// Take Shot


$(document).on('click', ".screenshotsbutton", function() {
    $('.f9camerasui').css('animation', 'takepictuer 0.5s ease 0s 1');
    $('.f9bodycam').css('animation', 'takepictuer 0.5s ease 0s 1');
    clicking.takeshotsound();
    $.post("https://qb-dispatchsystem/takeascreenshot" , JSON.stringify({}), function (url) {
        setTimeout(() => {
            $('.f9camerasui').css('animation', 'unset');
            $('.f9bodycam').css('animation', 'unset');
        }, 500);
        $.post("https://qb-dispatchsystem/GetTime" , JSON.stringify({}), function (time) {
            var currentTime = new Date(),
            month = currentTime.getMonth() + 1,
            day = currentTime.getDate(),
            year = currentTime.getFullYear(),
            text = (month + "/" + day + "/" + year + " " +time);
            camlabel = $('.f9tringlelocationstext').text();
            camnumber = $('.f9tringlecamnumbetext').text();
            camname = camlabel + ' - ' + camnumber
            $('#allscreenshots').append('<div class="onetakeshot" data-img='+url+' data-camname="'+camname+'" data-date="'+text+'"> <img src='+url+'> </div>');
        });
    });
});

$(document).on('click', ".screenshotsbutton2", function() {
    $('.f9camerasui').css('animation', 'takepictuer 0.5s ease 0s 1');
    $('.f9bodycam').css('animation', 'takepictuer 0.5s ease 0s 1');
    clicking.takeshotsound();
    $.post("https://qb-dispatchsystem/takeascreenshot" , JSON.stringify({}), function (url) {
        setTimeout(() => {
            $('.f9camerasui').css('animation', 'unset');
            $('.f9bodycam').css('animation', 'unset');
        }, 500);
        $.post("https://qb-dispatchsystem/GetTime" , JSON.stringify({}), function (time) {
            var currentTime = new Date(),
            month = currentTime.getMonth() + 1,
            day = currentTime.getDate(),
            year = currentTime.getFullYear(),
            text = (month + "/" + day + "/" + year + " " +time);
            camlabel = $('.f9tringlecamnumbetext2').text();
            camnumber = $('.f9tringlelocationstext2').text();
            callsign = $('.f9tringleway2').text();
            camname = camlabel + ' - ['+callsign+'] ' + camnumber
            $('#allscreenshots').append('<div class="onetakeshot" data-img='+url+' data-camname="'+camname+'" data-date="'+text+'"> <img src='+url+'> </div>');
        });
    });
});


$(document).on('click', ".onetakeshot", function() {
    var img = $(this).data('img');
    var camname = $(this).data('camname');
    var xdate = $(this).data('date');
    $('.imageblock').data('img', img);
    $('.imageblocktext').data('img', img);
    $('.imageblockcontentimg').html('<img src="'+img+'"/>');
    $('.imgblocktitle').html(camname);
    $('.imageblocktext').html(xdate+"<br>CLICK [HERE] TO COPY URL");
    $('.imageblock').fadeIn(500);
    $('.dashcontent').css('filter', 'blur(4px)');
});


$(document).on('click', ".imageblocktext", function() {
    var img = $(this).data('img');
    copyToClipboard(img);
    NewNotify('clipboard', 'Link copied successfully.', 5000)
});


$(document).on('click', ".imgblockicon", function() {
    $('.imageblock').fadeOut(400);
    $('.dashcontent').css('filter', 'blur(0px)');
});


$(document).on('click', "#deleteallscreenshot", function() {
    $('#allscreenshots').html('');
});


function copyToClipboard(text) {
    var sampleTextarea = document.createElement("textarea");
    document.body.appendChild(sampleTextarea);
    sampleTextarea.value = text; //save main text in it
    sampleTextarea.select(); //select textarea contenrs
    document.execCommand("copy");
    document.body.removeChild(sampleTextarea);
}



// Left Page


// $('.leftcontent').animate({ 'left': '-36vh' }, 450);
$('#map').animate({ 'width': 'inherit', 'height': '100%' }, 450);
$('.divtoleftrigth').animate({ 'left': '0vh' }, 500);


// Police Hub List Settings

$("#hideoffduty").attr('checked', false);
$("#hidebreak").attr('checked', false);
$("#hidebusy").attr('checked', false);

$("#hideoffduty").on('change', function() {
    if ($(this).is(':checked')) {
        hideoffdutyofficers = true
    }else {
        hideoffdutyofficers = false
    }
    $.post('https://qb-dispatchsystem/refreshpolicelist', JSON.stringify({ typing: "hideoffdutyofficers", states: hideoffdutyofficers }));
    clicking.clickedsound();
});

$("#hidebreak").on('change', function() {
    if ($(this).is(':checked')) {
        hidebreakofficers = true
    }else {
        hidebreakofficers = false
    }
    $.post('https://qb-dispatchsystem/refreshpolicelist', JSON.stringify({ typing: "hidebreakofficers", states: hidebreakofficers }));
    clicking.clickedsound();
});

$("#hidebusy").on('change', function() {
    if ($(this).is(':checked')) {
        hidebusyofficers = true
    }else {
        hidebusyofficers = false
    }
    $.post('https://qb-dispatchsystem/refreshpolicelist', JSON.stringify({ typing: "hidebusyofficers", states: hidebusyofficers }));
    clicking.clickedsound();
});


$("#showingsigns").attr('checked', true);
$("#showingradio").attr('checked', true);
$("#showinggender").attr('checked', false);

$("#showingsigns").on('change', function() {
    if ($(this).is(':checked')) {
        showcallsign = true
    }else {
        showcallsign = false
    }
    $.post('https://qb-dispatchsystem/refreshpolicelist', JSON.stringify({ typing: "showingsigns", states: showcallsign }));
    clicking.clickedsound();
});

$("#showingradio").on('change', function() {
    if ($(this).is(':checked')) {
        showradio = true
    }else {
        showradio = false
    }
    $.post('https://qb-dispatchsystem/refreshpolicelist', JSON.stringify({ typing: "showingradio", states: showradio }));
    clicking.clickedsound();
});

$("#showinggender").on('change', function() {
    if ($(this).is(':checked')) {
        showgender = true
    }else {
        showgender = false
    }
    $.post('https://qb-dispatchsystem/refreshpolicelist', JSON.stringify({ typing: "showinggender", states: showgender }));
    clicking.clickedsound();
});


$("#enablealerts").on('change', function() {
    $.post('https://qb-dispatchsystem/changealerts', JSON.stringify({ typing: "enablealerts", states: $(this).is(':checked') }));
});


$("#alertssound").on('change', function() {
    $.post('https://qb-dispatchsystem/changealerts', JSON.stringify({ typing: "alertssound", states: $(this).is(':checked') }));
});


// Pages

$(document).on('click', "#actionspage", function() {
    pagename = 'actionspage'
    ResetAllpages();
    $('#'+pagename).addClass('f9active');
    $('.'+pagename).fadeIn(200);
});

$(document).on('click', "#alertspage", function() {
    pagename = 'alertspage'
    ResetAllpages();
    $('#'+pagename).addClass('f9active');
    $('.'+pagename).fadeIn(200);
});

$(document).on('click', "#logspage", function() {
    pagename = 'logspage'
    ResetAllpages();
    $('#'+pagename).addClass('f9active');
    $('.'+pagename).fadeIn(200);
});

function ResetAllpages() {
    $('.sendmessage').fadeOut(80);
    $('.wingsaddrem').fadeOut(80);
    $('.moreinfo').fadeOut(80);
    $('.wingsbliboneicon').fadeOut(80);
    $($('#actionspage')[0]).removeClass('f9active');
    $($('#alertspage')[0]).removeClass('f9active');
    $($('#logspage')[0]).removeClass('f9active');
    $('.actionspage').fadeOut(200);
    $('.alertspage').fadeOut(200);
    $('.logspage').fadeOut(200);
}

// Reseting

function Resetcambuttons() {
    $('.f9uicam').css('border-top', 'auto');
    $('.f9uicam').css('background-color', 'rgb(10, 10, 10)');
}


// Sounds 

clicking = {}
clicking.audio1 = function () {
  var audio1s = document.getElementById("mouseer");
  audio1s.volume = 0.50;
  audio1s.play();
}

clicking.changecam = function () {
    var changecamx = document.getElementById("changecam");
    changecamx.volume = 0.60;
    changecamx.play();
}

clicking.opencam = function () {
    var opencamx = document.getElementById("opencam");
    opencamx.volume = 0.45;
    opencamx.play();
}

clicking.takeshotsound = function () {
    var takeshotsoundx = document.getElementById("takeshotsound");
    takeshotsoundx.volume = 0.45;
    takeshotsoundx.play();
}


clicking.notifyhtmls = function () {
    var dispatchnotifyw = document.getElementById("dispatchnotifyy");
    dispatchnotifyw.volume = 0.5;
    dispatchnotifyw.play();
  }

clicking.clickblip = function () {
  var dispatchclickx = document.getElementById("dispatchclick");
  dispatchclickx.volume = 0.4;
  dispatchclickx.play();
}

clicking.clickedsound = function () {
    var eclickeffect = document.getElementById("clickeffect");
    eclickeffect.pause();
    eclickeffect.currentTime = 0;
    eclickeffect.volume = 0.15;
    eclickeffect.play();
}


clicking.radarplate = function () {
    var radarregister = document.getElementById("radarplate");
    radarregister.volume = 0.4;
    radarregister.play();
  }





 var showstations = false
 var showhospital = false
 var showpublics = false
 var showfixers = false
$(document).on('click', ".showhideblip", function() {

    var camtayp = $(this).data('type');
    if(camtayp == 'station'){
        if(showstations == true){
            $('#stationsblips').css('background', '#12141c');
            stations['Mission Row PD'].remove(map);
            stations['Weazel PD'].remove(map);
            stations['Sandy PD'].remove(map);
            stations['Paleto PD'].remove(map);
            stations['Davis PD'].remove(map);
            stations['Prison'].remove(map);
            showstations = false
        }else{
            $('#stationsblips').css('background', '#00f8b9');
            discpatchMaps('station', 'Mission Row PD', 434.36, -982.23, 'building-shield', 'blue');
            discpatchMaps('station','Weazel PD', -577.71, -928.72, 'building-shield', 'blue');
            discpatchMaps('station','Sandy PD', 1834.52, 3677.23, 'building-shield', '#504804');
            discpatchMaps('station','Paleto PD', -443.02, 6009.28, 'building-shield', '#504804');
            discpatchMaps('station','Davis PD', 374.23, -1600.44, 'building-shield', 'blue');
            discpatchMaps('station','Prison', 1697.9016113281, 2589.77734375, 'handcuffs', '#A6A59C');
            showstations = true
        }
    }else if(camtayp == 'hospitl'){
        if(showhospital == true){
            $('#hospitlsblips').css('background', '#12141c');
            hospitls['Pillbox Hospital'].remove(map);
            hospitls['Eclipse Hospital'].remove(map);
            hospitls['Paleto Hospital'].remove(map);
            showhospital = false
        }else{
            $('#hospitlsblips').css('background', '#00f8b9');
            discpatchMaps('hospitl','Pillbox Hospital', 304.27038574219, -600.33001708984, 'hospital', '#DA0A64');
            discpatchMaps('hospitl','Eclipse Hospital', -672.49133300781, 315.70031738281, 'hospital', '#DA0A64');
            discpatchMaps('hospitl','Paleto Hospital', -254.94062805176, 6326.3056640625, 'hospital', '#DA0A64');
            showhospital = true
        }
    }else if(camtayp == 'public'){
        if(showpublics == true){
            $('#citysblips').css('background', '#12141c');
            publics['Weazel News'].remove(map);
            publics['Crastenburg Hotel'].remove(map);
            publics['City Hall'].remove(map);
            showpublics = false
        }else{
            $('#citysblips').css('background', '#00f8b9');
            discpatchMaps('public','Weazel News', -1048.2210693359, -236.94024658203, 'rss', 'red');
            discpatchMaps('public','Crastenburg Hotel', -1206.3458251953, -182.05863952637, 'hotel', '#DA9B0A');
            discpatchMaps('public','City Hall', -550.67175292969, -193.92849731445, 'flag-usa', 'blue');
            showpublics = true
        }
    }else if(camtayp == 'fixer'){
        if(showfixers == true){
            $('#toolsblips').css('background', '#12141c');
            fixers['Bennys Motorworks1'].remove(map);
            fixers['Bennys Motorworks2'].remove(map);
            fixers['Bennys Motorworks3'].remove(map);
            fixers['Ottos Workshop'].remove(map);
            fixers['Harmony Motorworks'].remove(map);
            fixers['Hayes Workshop'].remove(map);
            fixers['Tuner Workshop'].remove(map);
            fixers['Bennys Motorworks4'].remove(map);
            
            showfixers = false
        }else{
            $('#toolsblips').css('background', '#00f8b9');
            discpatchMaps('fixer','Bennys Motorworks1', -205.6992, -1312.7377, 'wrench', '#7C7A7A');
            discpatchMaps('fixer','Bennys Motorworks2', -41.8942, -1044.1943, 'wrench', '#7C7A7A');
            discpatchMaps('fixer','Bennys Motorworks3', 725.8828, -1088.7747, 'wrench', '#7C7A7A');
            discpatchMaps('fixer','Ottos Workshop', 832.52752685547, -812.89538574219, 'wrench', '#D9E104');
            discpatchMaps('fixer','Harmony Motorworks', 1178.3921, 2640.5449, 'wrench', '#7C7A7A');
            discpatchMaps('fixer','Hayes Workshop', -1420.1882, -441.8745, 'wrench', '#0B11BC');
            discpatchMaps('fixer','Bennys Motorworks4', 108.3242, 6624.0996, 'wrench', '#7C7A7A');
            discpatchMaps('fixer','Tuner Workshop', 140.6093, -3030.3933996, 'wrench', '#E104AD');
            showfixers = true
        }
    }
});


function EnableBodycam2() {
    $(".uibodycamself").fadeIn(150);
}

function DisableBodycam2() {
    $(".uibodycamself").fadeOut(150);
}

// DATE
function clockTicks() {
    $.post("https://qb-dispatchsystem/GetTime" , JSON.stringify({}), function (time) {
        var currentTime = new Date(),
        month = currentTime.getMonth() + 1,
        day = currentTime.getDate(),
        year = currentTime.getFullYear(),
        text = (month + "/" + day + "/" + year + " " +time);
            
        document.getElementById('gametime1').innerHTML = ' '+text;
        document.getElementById('gametime2').innerHTML = ' '+text;
        $('#mapdate').text(text);
    });
}
  // get timei every 10sec mzzzzzzzzzz
setInterval(clockTicks, 10000);


dragElement(document.getElementById("policelistdiv"));
function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById('policelistheadertext')) {
        /* if present, the header is where you move the DIV from:*/
            document.getElementById('policelistheadertext').onmousedown = dragMouseDown;
        } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
            elmnt.onmousedown = dragMouseDown;
        }
    
        function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
        }
    
        function elementDrag(e) {
            if(optionopend == false){
                e = e || window.event;
                e.preventDefault();
                // calculate the new cursor position:
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                // set the element's new position:
                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }
        }
    
        function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
        }
}



dragElements(document.getElementById("dashborad"));
function dragElements(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById('allactionspagebuttons')) {
        /* if present, the header is where you move the DIV from:*/
            document.getElementById('allactionspagebuttons').onmousedown = dragMouseDown;
        } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
            elmnt.onmousedown = dragMouseDown;
        }
    
        function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
        }
    
        function elementDrag(e) {
            if(lastleft == 0){
                e = e || window.event;
                e.preventDefault();
                // calculate the new cursor position:
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                // set the element's new position:
                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }
        }
    
        function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
        }
}



dragElements2(document.getElementById("uibodycamself"));
function dragElements2(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById('uibodycamself')) {
        /* if present, the header is where you move the DIV from:*/
            document.getElementById('uibodycamself').onmousedown = dragMouseDown;
        } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
        }
    
        function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
        }
    
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
    
    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}



function allowDrop(ev) {
    ev.preventDefault();
}

// function drag(ev) {
//     ev.dataTransfer.setData("text", ev.target.id);
// }

// function drop(ev) {
//     ev.preventDefault();
//     var data = ev.dataTransfer.getData("text");

//     thisdiv = ev.target;
//     $(document.getElementById(data)).insertBefore(thisdiv);
// }


$( function() {
    // handle the sortable

    
    // $( ".dashcontent" ).sortable({
    //     revert: false
    //   });

      


    $( "div, i" ).disableSelection();
  } );
