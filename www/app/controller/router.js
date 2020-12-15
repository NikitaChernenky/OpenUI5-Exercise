sap.ui.localResources("app");

var Testapp = {};
Testapp.routeManager = {

currentPage: "",
router: null,

loadPages: function() {
    var loginView = sap.ui.view({
        id: "loginView",
        viewName: "app.view.login",
        type: sap.ui.core.mvc.ViewType.XML,
      });
  
      var dataEntryView = sap.ui.view({
        id: "dataEntryView",
        viewName: "app.view.dataEntry",
        type: sap.ui.core.mvc.ViewType.XML,
      })
    this.router = new sap.m.App();  // ({ initialPage: "loginView" }); //initialize app instance
    this.router.addPage(loginView);
    this.router.addPage(dataEntryView);
},



};