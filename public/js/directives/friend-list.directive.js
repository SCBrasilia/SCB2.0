angular.module("SCB").directive('friendList', function() {
    return {
        restrict: 'AE',
        scope:{
            friends: "=",
            registerpopup: "&"
        },
        template: `
        <div id="panel-friends">
            <div class="input-group w-100">
                <input type="text" class="form-control" id="friendSerachIpt" ng-model="friendSearch" placeholder="Digite um nome"
                    aria-label="Recipient's username" aria-describedby="button-addon2">
                <div class="input-group-append">
                    <button class="btn btn-secondary" type="button" id="button-addon2"><i class="fas fa-search"></i></button>
                </div>
            </div>
            <ul id="friend-list">
                <li ng-repeat="friend in friends | filter:friendSearch as result track by friend.id" ng-click="register(friend.id, friend.nome)">
                    <div>
                        {{friend.nome}} {{friend.status}}
                    </div>
                </li>
            </ul>
        </div>
        `,
        link: function($scope){
            $scope.register = function(id, nome){
                console.log(id + nome);
                $scope.registerpopup()(id, nome);
            }
        }
    };
  });