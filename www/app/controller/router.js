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
    var router = new sap.m.App({ initialPage: "loginView" });
    router.addPage(loginView);
    router.placeAt("content");
  } catch (ex) {
    alert(ex);
  }
}

document.addEventListener("deviceready", this.onDeviceReady, false);
