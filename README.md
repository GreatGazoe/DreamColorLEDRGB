# DreamColorLEDRGB
Plugin Vera controller (z-wave) for controller ws2812b led strip.

This plugin is made to control the H806SB WiFi controller, this device is made to control individually addressable RGB LED-stips/grids.
Compatible protocols are :  WS-2811 / WS-2812 /  WS-2812 / DMX512 etc.

The big advantage above normal LED-strips are very nice effects, such as "waterfall" effect or the "knight Rider" effect.
The controller uses a SD-Card to store .dat effect files, with the plugin you can choose the effect-file (by number) and whether to use
single-effect modus or loop-file modus. 
Also speed adjustment (effects) is implemented and the brightness can be controlled to.
Beside this the LED-controller can be used to control like a normal RGB LED-strip, so the complete (red, blue) color can be selected. Take in mind that only 340 leds are programmed so in case of a LED-strip with 60 leds/meter you can control about 5,5 meter.

The nice thing about the controller is that software can be downloaded on the website from the manufacturer to develop your own .dat effects files. This software is for Windows. The software is very user friendly and gives a ton of possibilities to create your own effects.

With this plugin you can control your strip/grid : 
 - In the User Interface from Vera  

Turn strip/grid on and off, brightness adjustment, speed adjustment, .dat effects file select and single-file or loop-file modus

 - Http requests in your web-browser

turn strip/grid on/off
http://ip_address:3480/data_request?id=action&output_format=xml&DeviceNum=6&serviceId=urn:upnp-org:serviceId:SwitchPower1&action=SetTarget&newTargetValue=0 
http://ip_address:3480/data_request?id=action&output_format=xml&DeviceNum=6&serviceId=urn:upnp-org:serviceId:SwitchPower1&action=SetTarget&newTargetValue=1

Don't forget to change the Vera's ip-address and your plugin device number !!!
Adjust Brightness:

http://ip_address:3480/data_request?id=action&output_format=json&DeviceNum=7&serviceId=urn:upnp-org:serviceId:Dimming1&action=SetLoadLevelTarget&newLoadlevelTarget=30

Adjust Speed for the Effects

http://ip_address:3480/data_request?id=action&output_format=json&DeviceNum=7&serviceId=urn:ggfiplupro-com:serviceId:DreamColorRGBW1&action=SetSpeedTarget&newSpeedTarget=10

Select .dat Effects File

http://ip_address:3480/data_request?id=action&output_format=json&DeviceNum=7&serviceId=urn:ggfiplupro-com:serviceId:DreamColorRGBW1&action=SetFileSelect&newFileSelect=1

Select Single- or Loop-File modus

http://ip_address:3480/data_request?id=action&output_format=json&DeviceNum=7&serviceId=urn:ggfiplupro-com:serviceId:DreamColorRGBW1&action=SetSingleFile&newSingleFile=1
http://ip_address:3480/data_request?id=action&output_format=json&DeviceNum=7&serviceId=urn:ggfiplupro-com:serviceId:DreamColorRGBW1&action=SetLoopFile&newLoopFile=1

Select RGB-Color

http://ip_address:3480/data_request?id=action&output_format=json&DeviceNum=7&serviceId=urn:micasaverde-com:serviceId:Color1&action=SetColorRGB&newColorRGBTarget=30,145,235

 - By LUA-script code

Switch power on/off
luup.call_action("urn:upnp-org:serviceId:SwitchPower1", "SetTarget", {["newTargetValue"] = "0"}, 7)  <<7 is Device number>>
luup.call_action("urn:upnp-org:serviceId:SwitchPower1", "SetTarget", {["newTargetValue"] = "1"}, 7)
Adjust brightness
luup.call_action("urn:upnp-org:serviceId:Dimming1", "SetLoadLevelTarget", {["newLoadlevelTarget"] = "40"}, 7)
Adjust speed
luup.call_action("urn:ggfiplupro-com:serviceId:DreamColorRGBW1", "SetSpeedTarget", {["newSpeedTarget"] = "10"}, 7)
Select file
luup.call_action("urn:ggfiplupro-com:serviceId:DreamColorRGBW1", "SetFileSelect", {["newFileSelect"] = "3"}, 7)
Select Single- or Loop-File modus
luup.call_action("urn:ggfiplupro-com:serviceId:DreamColorRGBW1", "SetSingleFile", {["newSingleFile"] = "1"}, 7)
luup.call_action("urn:ggfiplupro-com:serviceId:DreamColorRGBW1", "SetLoopFile", {["newLoopFile"] = "1"}, 7)
Select RGB-Color
luup.call_action("urn:micasaverde-com:serviceId:Color1", "SetColorRGB", {["newColorRGBTarget"] = "30,254,145"}, 7)

 - ImperiHome app

This plugin is fully compatible with the Imperihome app, you can use the RGB-colr wheel adjust the brightness and turn the device on/off.
Take in mind that the controller uses "Triple RGB-HEX" coding so colors are limited !!

The Controller can be bought at AliExpress or at the local LED-store :
https://www.aliexpress.com/item/led-WiFi-controller-1-port-control-max-2048-pixels-support-WS2811-WS2812-DMX512-etc-Controlled-by/32507572159.html?spm=2114.search0204.3.13.397b062nAXaz0&ws_ab_test=searchweb0_0,searchweb201602_3_10152_10151_10065_10344_10068_10342_10343_10313_10059_10340_10341_10534_100031_10084_10604_10083_10103_10304_10307_10615_10301_10142,searchweb201603_36,ppcSwitch_7_ppcChannel&algo_expid=6eab6bb4-5cdf-44b4-b54c-3881fc76d51a-2&algo_pvid=6eab6bb4-5cdf-44b4-b54c-3881fc76d51a&transAbTest=ae803_5&priceBeautifyAB=2

If you want to control a RGB-Strip (instead of a grid) you can use a WS2812/B LED-strip this can be bought at AliExpress or at your local LED-Store:
https://www.aliexpress.com/item/5M-30Pixel-M-150-5050-RGB-SMD-WS2811-IC-Built-in-WS2812B-WS2812-white-PCB-Addressable/32367479484.html?spm=2114.search0204.3.180.341ad19dNFh4yi&ws_ab_test=searchweb0_0,searchweb201602_3_10152_10151_10065_10344_10068_10342_10343_10313_10059_10340_10341_10534_100031_10084_10604_10083_10103_10304_10307_10615_10301_10142,searchweb201603_36,ppcSwitch_7_ppcChannel&algo_expid=9a7e0aa4-a73d-44c3-8d1a-c14fbd591e20-20&algo_pvid=9a7e0aa4-a73d-44c3-8d1a-c14fbd591e20&transAbTest=ae803_5&priceBeautifyAB=2

You need a 12v Power Supply for the strip and for the controller, for a WS2812B LED-strip every led consumes 0,06A, so for a 5 meter strip with 60 leds/meter you need 60x5x0,06 = 18 A !!!http://forum.micasaverde.com/Smileys/default/wink.gif
The Power Supply can be bought at AliExpress or at your local LED-Store:
https://www.aliexpress.com/item/250w-12v-20a-Single-Output-switching-power-suppy/32270275630.html?spm=2114.search0204.3.2.169a4dd9mmQADh&s=p&ws_ab_test=searchweb0_0,searchweb201602_3_10152_10151_10065_10344_10068_10342_10343_10313_10059_10340_10341_10534_100031_10084_10604_10083_10103_10304_10307_10615_10301_10142,searchweb201603_36,ppcSwitch_7_ppcChannel&transAbTest=ae803_5&priceBeautifyAB=2
You still need a power plug and electricity wires to connect the power supply to the controller and to a wallplug.
The plugin files are in the "DreamColor.zip" file, just select "Apps>Develop apps>Luup files" and upload all 4 files.
Next  "Apps>Develop apps>Create Device", then type "D_DreamColorRGBW1.xml" at "Upnp Device Filename" and reload Luup.
The next thing is that the plugin asks for Ip-adress, this has to be entered at "Advanced tab" in your new created Device under "Ip".
The default port from the controller is "4626" so you have to enter "<youripadress>:4626". Next reload Luup and you can start control your strip/grid. If a red warning box is showed ("can't detect device") just reload Luup again and it will disapear.

Looks like every controller has it's own “code-end”. To determine your “code-end” use Wireshark(windows) or PacketSniffer(Android) to capture
brightness code. The “code-end” are the last 4 number pairs (like: 08 ec 41 00). Use an editor (like Notepad++) to edit I_DreamColorRGBW1.xml.
Change on top “local CommandCodeEnd” corresponding the code you discovered. 

It would be nice if we can share .dat effect files, so if you made a nice effect and you think it's worth it ............ !!
I hope many people will buy the controller and starting to use my plugin, and start to develop .dat effect files, enjoy !!
