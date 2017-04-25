"use strict";

export default function(
  $timeout
) {
  return {
    restrict: 'E',
    template: `
      <div>
        <div class="titleBoard" ng-if="!view.showInput" ng-click="edit()">{{inTitle}}</div>
        <form ng-submit="save()" ng-if="view.showInput">
          <div class="form-group">
            <input type="text" class="form-control" ng-model="view.titleToSave">
          </div>
        </form>
      </div>
    `,
    scope: {
      onSave: '=',
      inTitle: '=',
      context: '<',
      idMy: '<',
    },
    link: function(scope, elem, attr) {

      scope.view = {
        showInput: false,
        titleToSave: ''
      };

      scope.edit = function() {
        scope.view.showInput = true;
        scope.view.titleToSave = scope.inTitle;

        $timeout(() => {
          let el = elem[0].getElementsByClassName("form-control");
          el[0].focus();
        });


        elem.bind('keydown keypress', function (e) {
          if(e.which === 27) { // 27 = esc key
            console.log("Key");
            $timeout(() => {
              scope.view.showInput = false;
            });
            e.preventDefault(); // prevents the default function of the event
          }
        });

      };

      scope.save = function() {
        scope.view.showInput = false;
        scope.onSave(scope.view.titleToSave, scope.context, scope.idMy);
      }
    }
  }
}