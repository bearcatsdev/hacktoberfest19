var mymap = L.map('map').setView([-6.20042,106.78543], 19);
var marker = L.marker([-6.20042,106.78543]).addTo(mymap);

var mapdata = {
  name: "BINUS UNIVERSITY, Syahdan Campus",
  address: "Jalan K.H. Syahdan No. 9, RT.6/RW.12, Kemanggisan, Palmerah, Jakarta Barat",
  lat: -6.20042,
  long: 106.78543,
  maps: [
    {
      name: "Apple Maps (App)",
      exclusives: ["MacOS", "iOS"],
      url: "https://maps.apple.com/?address=Jalan%20Kyai%20Haji%20Syahdan%20No.%209,%20Kebon%20Jeruk,%20DKI%20Jakarta%2011480,%20Indonesia&auid=1745048718322071795&ll=-6.200251,106.785382&lsp=9902&q=Binus%20University%20-%20Syahdan%20Campus&_ext=ChgKBAgEEEUKBAgFEAMKBAgGEBkKBAgKEAASJClJmDQM+s0YwDFY6gXlNLJaQDnndV4SI8wYwEGoFfqAUrJaQA==&t=m"
    },
    {
      name: "Windows 10 Maps (App)",
      exclusives: ["Windows"],
      url: "bingmaps:?collection=point.-6.20042_106.78543_BINUS%20UNIVERSITY%2C%20Syahdan%20Campus&lvl=19"
    },
    {
      name: "GNOME Maps (App)",
      exclusives: ["Linux"],
      url: "geo"
    },
    {
      name: "Google Maps (App/Web)",
      url: "https://goo.gl/maps/xGM6bk5ZF1xuoQjx8"
    },
    {
      name: "OpenStreetMap (Web)",
      osmType: "way",
      osmId: "153306200"
    },
    {
      name: "Bing / Microsoft Maps (Web)",
      url: "https://www.bing.com/maps?osid=8cafe98a-1508-4903-8f7b-7be98e372a8c&cp=-6.199679~106.781877&lvl=16&imgid=44c7dd00-6637-47fd-b5f7-d4d95fd205f6&v=2&sV=2&form=S00027"
    },
    {
      name: "HERE WeGo (App/Web)",
      url: "https://her.is/2OvrbDE"
    },
    {
      name: "Gojek (App)",
      exclusives: ["Android", "iOS"],
      url: "geo"
    },
    {
      name: "Grab (App)",
      exclusives: ["Android", "iOS"],
      url: "geo"
    },
    {
      name: "More...",
      url: "geo"
    }
  ]
}


marker.bindPopup(extractMapData(mapdata), {"className": "custom-popup"}).openPopup();
//geo:-6.20042,106.78543?z=19

function extractMapData(obj){
  var initstring = "<h3>" + obj.name + "</h3><p>" + obj.address + "</p>";
  initstring += "<h4>Open With:</h4><ul>";

  var i;
  for (i = 0; i < obj.maps.length; i++){
    var url;
    if (obj.maps[i].name === "OpenStreetMap (Web)"){
      url = "https://www.openstreetmap.org/" + obj.maps[i].osmType + "/" + obj.maps[i].osmId;
    } else if (obj.maps[i].url === "geo"){
      url = "geo:" + obj.lat + "," + obj.long + "?z=19&q=" + obj.lat + "," + obj.long + "(" + encodeURIComponent(obj.name) + ")";
    } else {
      url = obj.maps[i].url;
    };
    if(obj.maps[i].exclusives && obj.maps[i].exclusives.length > 0){
      var j;
      for (j = 0; j < obj.maps[i].exclusives.length; j++){
        if (testUA(obj.maps[i].exclusives[j]) === true){
          initstring += appendList(obj.maps[i].name, url);
        }
      }
    } else {
      initstring += appendList(obj.maps[i].name, url);
    }
  }
  initstring += "</ul><p>Some apps may need to be installed separately.</p>";
  return initstring;
}

function appendList(string, url){
  var result = "<li><a href='" + url + "' target='_blank'>" + string + "</a></li>";
  return result;
}

function testUA(string){
  var userAgent = window.navigator.userAgent;
  var platform = window.navigator.platform;
  var macosstrings = ['Macintosh', 'MacOS'];
  var iosstrings = ['iPhone', 'iPad', 'iPod'];
  var windowsstrings = ['Win32', 'Win64', 'Windows'];
  var os;
  if (macosstrings.indexOf(platform) !== -1) {
    os = 'MacOS';
  } else if (iosstrings.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsstrings.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }
  if (os === string){
    return true;
  } else {
    return false;
  }
}

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);
