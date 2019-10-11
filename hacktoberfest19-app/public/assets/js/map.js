const myMap = L.map('map', {fullscreenControl: true}).setView([-6.20042,106.78543], 19);
const marker = L.marker([-6.20042,106.78543]).addTo(myMap);

const mapData = {
  name: "BINUS UNIVERSITY, Syahdan Campus",
  address: "Jalan Kyai Haji Syahdan No. 9, RT.6/RW.12, Kemanggisan, Palmerah, Jakarta Barat",
  lat: -6.20042,
  long: 106.78543,
  zoom: 19,
  data: {
    bing: {
      id: "8cafe98a-1508-4903-8f7b-7be98e372a8c"
    },
    osm: {
      type: "relation",
      id: "10134110"
    }
  },
  maps: [
    {
      name: "Windows Maps",
      icon: "assets/images/maps/win10maps.jpg",
      mask: false,
      background: "#0078d7",
      color: "#ffffff",
      exclusives: ["Windows"],
      url: "bingmaps:?collection=point.%lat_%long_%name&lvl=%zoom"
    },
    {
      name: "Apple Maps",
      icon: "assets/images/maps/applemaps.png",
      mask: true,
      background: "#313131",
      color: "#ffffff",
      exclusives: ["MacOS", "iOS"],
      url: "https://maps.apple.com/?address=Jalan%20Kyai%20Haji%20Syahdan%20No.%209,%20Kebon%20Jeruk,%20DKI%20Jakarta%2011480,%20Indonesia&auid=1745048718322071795&ll=-6.200251,106.785382&lsp=9902&q=Binus%20University%20-%20Syahdan%20Campus&_ext=ChgKBAgEEEUKBAgFEAMKBAgGEBkKBAgKEAASJClJmDQM+s0YwDFY6gXlNLJaQDnndV4SI8wYwEGoFfqAUrJaQA==&t=m"
    },
    {
      name: "GNOME Maps",
      icon: "assets/images/maps/gnomemaps.png",
      mask: true,
      background: "#8ff0a4",
      color: "#000000",
      exclusives: ["Linux"],
      url: "geo:%lat,%long"
    },
    {
      name: "Google Maps",
      icon: "assets/images/maps/googlemaps.png",
      mask: true,
      background: "#f1f1f1",
      color: "#000000",
      url: "https://goo.gl/maps/xGM6bk5ZF1xuoQjx8"
    },
    {
      name: "Waze",
      icon: "assets/images/maps/waze.png",
      mask: false,
      background: "#62d2eb",
      color: "#486067",
      url: "https://waze.com/ul?q=%name&ll=%lat,%long"
    },
    {
      name: "MAPS.ME",
      icon: "assets/images/maps/mapsme.jpg",
      mask: false,
      background: "#4cd94f",
      color: "#000000",
      exclusives: ["Android"],
      url: "http://ge0.me/4em9c_cWiY/BINUS_%28Bina_Nusantara%29_University_Syahdan_Campus"
    },
    {
      name: "MAPS.ME",
      icon: "assets/images/maps/mapsme.jpg",
      mask: false,
      background: "#4cd94f",
      color: "#000000",
      exclusives: ["iOS"],
      url: "ge0://4em9c_cWiY/BINUS_%28Bina_Nusantara%29_University_Syahdan_Campus"
    },
    {
      name: "Gojek",
      icon: "assets/images/maps/gojek.png",
      mask: true,
      background: "#ffffff",
      color: "#000000",
      exclusives: ["Android", "iOS"],
      url: "geo:%lat,%long?q=%lat,%long(%name)"
    },
    {
      name: "Grab",
      icon: "assets/images/maps/grab.png",
      mask: true,
      background: "#ffffff",
      color: "#000000",
      exclusives: ["Android", "iOS"],
      url: "geo:%lat,%long?q=%lat,%long(%name)"
    },
    {
      name: "OpenStreetMap",
      icon: "assets/images/maps/openstreetmap.png",
      mask: true,
      background: "#7092ff",
      color: "#000000",
      osmType: "way",
      osmId: "153306200",
      url: "https://www.openstreetmap.org/%osmtype/%osmid"
    },
    {
      name: "Bing Maps",
      icon: "assets/images/maps/bing.png",
      mask: true,
      background: "#ffffff",
      color: "#00809d",
      exclusives: ["Linux", "MacOS", "Windows"],
      url: "https://www.bing.com/maps?osid=%bingid&cp=%lat~%long&lvl=%zoom"
    },
    {
      name: "HERE WeGo",
      icon: "assets/images/maps/herewego.jpg",
      mask: false,
      background: "#292d38",
      color: "#ffffff",
      url: "https://her.is/2OvrbDE"
    },
    {
      name: "More...",
      icon: "assets/images/maps/more.png",
      mask: true,
      background: "#ffff00",
      color: "#ffffff",
      url: "geo:%lat,%long?q=%lat,%long(%name)"
    }
  ]
};


marker.bindPopup(extractMapData(mapData), {"className": "custom-popup"}).openPopup();
//geo:-6.20042,106.78543?z=19

function extractMapData(obj){
  let initstring = "<h3>" + obj.name + "</h3><p>" + obj.address + "</p>";
  initstring += "<h4>Open With:</h4><div class='menutilecontainer'>";

  let i;
  for (i = 0; i < obj.maps.length; i++){
    let map = obj.maps[i];
    let url = map.url.replace("%zoom", obj.zoom)
    .replace("%bingid", obj.data.bing.id)
    .replace("%osmtype", obj.data.osm.type)
    .replace("%osmid", obj.data.osm.id)
    .replace("%lat", obj.lat)
    .replace("%long", obj.long)
    .replace("%lat", obj.lat) //allow duplicate latlong parameters
    .replace("%long", obj.long)
    .replace("%name", encodeURIComponent(obj.name))
    .replace("%address", encodeURIComponent(obj.address));

    if(map.exclusives && map.exclusives.length > 0){
      let j;
      for (j = 0; j < map.exclusives.length; j++){
        if (testUA(map.exclusives[j]) === true){
          initstring += appendList(map.name, url, map.icon, map.mask, map.color, map.background);
        }
      }
    } else {
      initstring += appendList(map.name, url, map.icon, map.mask, map.color, map.background);
    }
  }
  initstring += "</div><p>Some apps may need to be installed separately.</p>";
  return initstring;
}

function appendList(string, url, icon, masked, foreground, background){
  let mask = "";
  if (masked === true){mask = "masked"};
  return "<div class='menutile' style='color:" + foreground + ";background-color:" + background + "'><a href='" + url + "' target='_blank' style='color:" + foreground + "'><img src='" + icon + "' alt='" + string + "' class='" + mask + "'><br><p>" + string + "</p></a></div>";
}

function testUA(string){
  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  const macOSStrings = ['Macintosh', 'MacOS'];
  const iOSStrings = ['iPhone', 'iPad', 'iPod'];
  const WindowsStrings = ['Win32', 'Win64', 'Windows'];
  let os;
  if (macOSStrings.indexOf(platform) !== -1) {
    os = 'MacOS';
  } else if (iOSStrings.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (WindowsStrings.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }
  return os === string ? true : false;
}

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
