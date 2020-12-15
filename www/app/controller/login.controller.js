sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageBox"],
  function (Controller, MessageBox) {
    "use strict";
    return Controller.extend("app.controller.login", {
      onAfterRendering: function () {
        console.log("login..onAfterRendering..");



        $("#login--username-inner")
          .attr("autocomplete", "off")
          .attr("autocapitalize", "off")
          .attr("autocorrect", "off")
          .attr("spellcheck", "false");
      },

      onInit: function (evt) {
        console.log('oninit');
        this.getView().addEventDelegate({});
      },

      onAfterShow: function (evt) {
          console.log('onaftershow');

      },

      /**
       * Login will validate entered username and password
       * @function onLogin
       * @memberof app.components.login.login
       */
      onLogin: function () {
        console.log('onlogin');
        var view = this.getView();
        var username = view.byId("username").getValue();
        var password = view.byId("password").getValue();
        var self = this;
        var clearForm = function () {
          view.byId("username").setValue("");
          view.byId("password").setValue("");
        };

        // Catch pointless call if no username || password has been entered
        if (username.length < 3 || password.length < 3) {
          alert("please enter password correctly");
          /* MessageBox.show(
            MaterialMgt.global.errorMessages.NO_USERNAME_PASSWORD.message,
            MessageBox.Icon.WARNING,
            MaterialMgt.global.errorMessages.NO_USERNAME_PASSWORD.title,
            [MessageBox.Action.OK],
            function () {}
          );
          */
        } else {
          this.authenticates(username, password)
            .then(function () {
              alert("passed");
              self
                .saveToKeyChain(username, password)
                .then(function () {
                  console.log("saved. Now navigating to the dataEntryPage");
                  Testapp.routeManager.router.to("dataEntryView");
                })
                .catch(function () {
                  alert("failed to save");
                });
            })
            .catch(function () {
              //auth fails
              alert("fails");
            });
        }
      },

      /**
       * Makes password readable in UI
       * @function showPassword
       * @memberof app.components.login.login
       */
      showPassword: function (evt) {
        console.log('aa');
        var opt = evt.getSource().getSelected();
        console.log(opt);
        if (opt == true) {
            console.log('kk');
          $("#loginView--password-inner").attr("type", "text");
        } else {
            console.log('nkk');
          $("#loginView--password-inner").attr("type", "password");
        }
      },

      /**
       * Displays Login Information Modal Popup
       * @function onInfo
       * @memberof app.components.login.login
       */
      onInfo: function () {
        MaterialMgt.global.loginInfo();
      },

      authenticates: function (username, password) {
        return new Promise(function (resolve, reject) {
          resolve("auth resolves");
        });
      },

      saveToKeyChain: function (username, password) {
        return new Promise(function (resolve, reject) {
          //read from keychain

          //write to keychain
          var saveOk = function () {
            console.log("values saved ok");
            resolve("ok");
          };
          var saveFailed = function (err) {
            console.log("error saving");
            reject(err);
          };

          var saveStr = username + "--" + password;
          var kc = smapi_keychain;
          kc.setKeyValue(saveOk, saveFailed, saveStr);
        });
      },

    onToDataEntryPage: function () {
      this.byId("app").to(this.byId("dataEntry"))
    }      
    });
  }
);
