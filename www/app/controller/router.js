function onDeviceReady() {
  "use strict";
  console.log("onDeviceReady");
  try {
    sap.ui.localResources("app");
    console.log("loaded local resources");
    
    var loginView = sap.ui.view({
      id: "loginView",
      viewName: "app.view.login",
      type: sap.ui.core.mvc.ViewType.XML,
    });
    console.log('login declared in router');
    var router = new sap.m.App({ initialPage: "loginView" });
    console.log('login initialized in router');
    router.addPage(loginView);
    console.log('login page added in router');
    router.placeAt("content");
    console.log('placed in content');
  } catch (ex) {
    alert(ex);
  }
}

document.addEventListener("deviceready", this.onDeviceReady, false);
