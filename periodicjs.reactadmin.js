'use strict';

module.exports = {
	"periodicjs.ext.reactadmin": {
    "manifests":[
      "node_modules/periodicjs.ext.reactadmin/adminclient/src/content/config/manifest.json",
      "node_modules/periodicjs.ext.reactadmin/views/home/",
      "node_modules/periodicjs.ext.reactadmin/views/account/",
      "node_modules/periodicjs.ext.reactadmin/views/test/"
    ],
    "unauthenticated_manifests":[
    ],
    "navigation":"node_modules/periodicjs.ext.reactadmin/adminclient/src/content/config/navigation.json",
    "components":{
      "login":"/content/themes/periodicjs.theme.default/views/auth/loginDISABLED.manifest.json",
      "main":{
        "header":"/content/themes/periodicjs.theme.default/views/shared/header.manifest.json",
        "footer":"/content/themes/periodicjs.theme.default/views/shared/footer.manifest.json"
      },
      "error":{
        "404":"node_modules/periodicjs.ext.reactadmin/adminclient/src/content/config/manifests/dynamic404.json",
        "400":"node_modules/periodicjs.ext.reactadmin/adminclient/src/content/config/manifests/dynamic400.json"
      }
    }
	}
}
