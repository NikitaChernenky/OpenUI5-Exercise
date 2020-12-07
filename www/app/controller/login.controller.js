sap.ui.controller("app.controller.login", {
      
    onAfterRendering: function() {
      
    },

     onInit: function(evt) {
        console.log('login page initiated');
        alert("Hello World"); //test
     },
     
     onBeforeRendering: function() {
        console.log('login page initiated2');
     },
     onExit: function() {
     
     }
                
});
