var SET_HUE_SID = "urn:ggfiplupro-com:serviceId:DreamColorRGBW1";
var SET_COLOR_SID = "urn:micasaverde-com:serviceId:Color1";
var SET_BRI_SID = "urn:upnp-org:serviceId:Dimming1";
var DreamColorRGBWDevice;
var localip;
var Hue = "0";
var	green = "0,255,0";
var	orange = "255,145,0";
var	yellow = "153,153,0";
var	lightblue = "115,253,255";
var	blue = "0,34,255";
var	cyan = "153,255,255";
var	red = "255,0,0";
var	pink = "255,0,225";
var	purple = "157,0,255";
var white = "255,255,255";

function DreamColorRGBWControls(deviceID) {
   DreamColorRGBWDevice = deviceID;
   var ip = api.getDeviceState(deviceID, SET_HUE_SID, "VeraLocalIp");
   localip = "http://" + ip + "/port_3480";
   
   var html = '<style type="text/css">canvas { cursor: crosshair } slidecontainer { width: 600px } </style>';
   html += '<h3 style="position:relative; top: 0px; left: 0px;">Color</h3>';
   html += '<input type="color" id="rgbcolor" onchange="DreamColorRGBWCallAction(this.value)" value="#ff0000" ></input>';
   html += '<h3 style="position:relative; top: 0px; left: 0px;">Brightness</h3>';
   html += '<input type="range" min="1" max="100" value="50" width="600px" height="50px" class="slidecontainer" id="Brightness" onchange="setbrightness(this.value)"></input>';
   html += '<h3 style="position:relative; top: 0px; left: 0px;">Speed</h3>';
   html += '<div class="slider"><input type="range" min="1" max="100" value="50" id="Speed" onchange="setspeed(this.value)"></input></div>';
   html += '<h3 style="position:relative; top: 0px; left: 0px;">File Select</h3>';
   html += '<input id="fileselect" type="number" value="" style="position:relative; top: -10px; left: 0px;" size="3">';
   html += '<button type="button" onclick="fileselect()" style="position:relative; top: -10px; left: 30px;" > Choose File</button>';
   html += '<h3 style="position:relative; top: 0px; left: 0px;">Modus</h3>';
   html += '<input type="radio" name="toggle" checked onchange="singlefile()" > Single  </input>';
   html += '<input type="radio" name="toggle" onchange="loopfile()" > Loop</>';
   html += '<h3 style="position:relative; top: 0px; left: 0px;">Pre-Defined Colors</h3>';
   html += '<button type="button" onclick="colorselect(red)" style="position:relative; top: 0px; left: 10px;" >  Red   </button>';
   html += '<button type="button" onclick="colorselect(orange)" style="position:relative; top: 0px; left: 20px;" > Orange </button>';
   html += '<button type="button" onclick="colorselect(yellow)" style="position:relative; top: 0px; left: 30px;" > Yellow </button>';
   html += '<button type="button" onclick="colorselect(lightblue)" style="position:relative; top: 0px; left: 40px;" >Li-Blue</button>';
   html += '<button type="button" onclick="colorselect(green)" style="position:relative; top: 0px; left: 50px;" > Green  </button>';
   html += '<button type="button" onclick="colorselect(cyan)" style="position:relative; top: 0px; left: 60px;" >  Cyan  </button>';
   html += '<button type="button" onclick="colorselect(blue)" style="position:relative; top: 0px; left: 70px;" >  Blue  </button>';
   html += '<button type="button" onclick="colorselect(purple)" style="position:relative; top: 0px; left: 80px;" > Purple </button>';
   html += '<button type="button" onclick="colorselect(pink)" style="position:relative; top: 0px; left: 90px;" >  Pink  </button>';
   html += '<button type="button" onclick="colorselect(white)" style="position:relative; top: 0px; left: 100px;" >  White  </button>';
   set_panel_html(html);
}

function DreamColorRGBWCallAction(newhue) {
   
   var r = hexToRgb(newhue).r
   var g = hexToRgb(newhue).g
   var b = hexToRgb(newhue).b
   var newhue1 = r + "," + g + "," + b
   var result = '';
   var q = {
      'id': 'lu_action',
      'output_format': 'xml',
      'DeviceNum': DreamColorRGBWDevice,
      'serviceId': SET_COLOR_SID,
      'action': 'SetColorRGB',
	  'newColorRGBTarget': newhue1,
	  'timestamp': new Date().getTime()   //we need this to avoid IE caching of the AJAX get
   };
   new Ajax.Request (localip + '/data_request', {
      method: 'get',
      parameters: q,
      onSuccess: function (response) {
      },
      onFailure: function (response) {
      },
      onComplete: function (response) {
         result = response.responseText;
      }
   });
   return result;
}

function setbrightness(newbri) {
   var result = '';
   var q = {
      'id': 'lu_action',
      'output_format': 'xml',
      'DeviceNum': DreamColorRGBWDevice,
      'serviceId': SET_BRI_SID,
      'action': 'SetLoadLevelTarget',
	  'newLoadlevelTarget': newbri,
	  'timestamp': new Date().getTime()   //we need this to avoid IE caching of the AJAX get
   };
   new Ajax.Request (localip + '/data_request', {
      method: 'get',
      parameters: q,
      onSuccess: function (response) {
      },
      onFailure: function (response) {
      },
      onComplete: function (response) {
         result = response.responseText;
      }
   });
   return result;
}

function setspeed(newspeed) {
   var result = '';
   var q = {
      'id': 'lu_action',
      'output_format': 'xml',
      'DeviceNum': DreamColorRGBWDevice,
      'serviceId': SET_HUE_SID,
      'action': 'SetSpeedTarget',
	  'newSpeedTarget': newspeed,
	  'timestamp': new Date().getTime()   //we need this to avoid IE caching of the AJAX get
   };
   new Ajax.Request (localip + '/data_request', {
      method: 'get',
      parameters: q,
      onSuccess: function (response) {
      },
      onFailure: function (response) {
      },
      onComplete: function (response) {
         result = response.responseText;
      }
   });
   return result;
}

function fileselect() {
   var newfile = document.getElementById("fileselect").value;
   var result = '';
   var q = {
      'id': 'lu_action',
      'output_format': 'xml',
      'DeviceNum': DreamColorRGBWDevice,
      'serviceId': SET_HUE_SID,
      'action': 'SetFileSelect',
	  'newFileSelect': newfile,
	  'timestamp': new Date().getTime()   //we need this to avoid IE caching of the AJAX get
   };
   new Ajax.Request (localip + '/data_request', {
      method: 'get',
      parameters: q,
      onSuccess: function (response) {
      },
      onFailure: function (response) {
      },
      onComplete: function (response) {
         result = response.responseText;
      }
   });
   return result;
}

function singlefile() {
   var result = '';
   var q = {
      'id': 'lu_action',
      'output_format': 'xml',
      'DeviceNum': DreamColorRGBWDevice,
      'serviceId': SET_HUE_SID,
      'action': 'SetSingleFile',
	  'newSingleFile': "01",
	  'timestamp': new Date().getTime()   //we need this to avoid IE caching of the AJAX get
   };
   new Ajax.Request (localip + '/data_request', {
      method: 'get',
      parameters: q,
      onSuccess: function (response) {
      },
      onFailure: function (response) {
      },
      onComplete: function (response) {
         result = response.responseText;
      }
   });
   return result;
}

function loopfile() {
   var result = '';
   var q = {
      'id': 'lu_action',
      'output_format': 'xml',
      'DeviceNum': DreamColorRGBWDevice,
      'serviceId': SET_HUE_SID,
      'action': 'SetLoopFile',
	  'newSingleFile': "00",
	  'timestamp': new Date().getTime()   //we need this to avoid IE caching of the AJAX get
   };
   new Ajax.Request (localip + '/data_request', {
      method: 'get',
      parameters: q,
      onSuccess: function (response) {
      },
      onFailure: function (response) {
      },
      onComplete: function (response) {
         result = response.responseText;
      }
   });
   return result;
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function colorselect(color) {
	var newhue1 = color
	var result = '';

	
   var q = {
      'id': 'lu_action',
      'output_format': 'xml',
      'DeviceNum': DreamColorRGBWDevice,
      'serviceId': SET_COLOR_SID,
      'action': 'SetColorRGB',
	  'newColorRGBTarget': newhue1,
	  'timestamp': new Date().getTime()   //we need this to avoid IE caching of the AJAX get
   };
   new Ajax.Request (localip + '/data_request', {
      method: 'get',
      parameters: q,
      onSuccess: function (response) {
      },
      onFailure: function (response) {
      },
      onComplete: function (response) {
         result = response.responseText;
      }
   });
   return result;
}
   

