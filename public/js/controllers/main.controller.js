angular.module('SCB').controller('mainController', mainController);

mainController.$inject = ['$scope', '$compile'];

function mainController($scope, $compile) {
    var vm = this;
    vm.total_popups = 0;
    vm.popups = [];
    vm.chat_atual = null;
    vm.friends = [{
            id: '152545665',
            nome: "Marcos henrique",
            status: 'online'
        },
        {
            id: '152666665',
            nome: "Jose alves dork",
            status: 'offline'
        },
        {
            id: '654545665',
            nome: "Juandir alves bueno",
            status: 'offline'
        },
        {
            id: '165455665',
            nome: "Sandy manola",
            status: 'offline'
        },
        {
            id: '242545665',
            nome: "Vinicis marques",
            status: 'online'
        }
    ];
    //this function can remove a array element.
    Array.remove = function (array, from, to) {
        var rest = array.slice((to || from) + 1 || array.length);
        array.length = from < 0 ? array.length + from : from;
        return array.push.apply(array, rest);
    };

    vm.display_popups = function () {
        var width = window.innerWidth;
        var right = 10;
        var iii = 0;
        for (iii; iii < vm.total_popups; iii++) {
            if (vm.popups[iii] != undefined) {
                var element = document.getElementById(vm.popups[iii]);
                element.style.right = right + "px";
                    right = right + 320;
                element.style.display = "block";
            }
        }
        for (var jjj = iii; jjj < vm.popups.length; jjj++) {
            var element = document.getElementById(vm.popups[jjj]);
            element.style.display = "none";
        }
    }
    vm.register_popup = function (id, name) {
        for (var iii = 0; iii < vm.popups.length; iii++) {
            //already registered. Bring it to front.
            if (id == vm.popups[iii]) {
                Array.remove(vm.popups, iii);
                vm.popups.unshift(id);
                vm.calculate_popups();
                return;
            }
        }
        var element = `<div ng-click="vm.select_chat('` + id + `')" class="popup-box chat-popup" id="` + id + `">
        <div class="popup-head">
        <div class="popup-head-left">` + name + `</div>
        <div class="popup-head-right"><span ng-click="vm.close_popup('` + id + `')"><i class="fas fa-times-circle"></i></span></div>
        <div style="clear: both"></div></div>
        <div class="popup-messages">
            <div class="popup-body">
                <div class="body-menssage" id="messages-me-to-` + id + `">

                </div>
                <div class="form-chat">
                    <form>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Escreva uma mensagem..." aria-label="Recipient's username" aria-describedby="button-addon2">
                            <div class="input-group-append">
                                <button class="btn btn-outline-primary" type="button" id="button-addon2"><i class="fas fa-paper-plane"></i></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="footer_chat">
        </div></div>`;
        var html = $compile(element)($scope);
        angular.element(document.getElementById("chats")).append(html);
        //document.getElementById("chats").innerHTML = document.getElementById("chats").innerHTML + html;        
        vm.popups.unshift(id);
        vm.calculate_popups();
    }
    //calculate the total number of popups suitable and then populate the toatal_popups variable.
    vm.calculate_popups = function () {
        var width = window.innerWidth;
        if (width < 280) {
            vm.total_popups = 0;
        } else {
            width = width;
            //320 is width of a single popup box 
            vm.total_popups = parseInt(width / 280);
        }
        vm.display_popups();
    }
    vm.close_popup = function (id) {
        for (var iii = 0; iii < vm.popups.length; iii++) {
            if (id == vm.popups[iii]) {
                Array.remove(vm.popups, iii);
                //document.getElementById(id).style.display = "none";
                var el = document.getElementById(id);
                el.parentNode.removeChild(el);
                vm.calculate_popups();
                return;
            }
        }
    }
    vm.select_chat = function (id) {
        vm.chat_atual = id;
        console.log("você esta conversando com " + id);
    }
    vm.open_friend_list = function () {
        console.log("abrindo amigos");
        var list = '<div><span id="icon-back-friend-list" ng-click="vm.init()"><i class="fas fa-arrow-left"></i></span><friend-list friends="vm.friends" registerpopup="vm.register_popup"></friend-list><div>';
        var html = $compile(list)($scope);
        angular.element($(".feed")).empty();
        angular.element($(".feed")).append(html);
        //$("#back-to-feed").append(func_back);
        $("#fiend-icon-left").css("z-index", 999999);


    }
    vm.init = function () {
        console.log("init ...");
        $(".feed").load("/vendor/pages/feed.html");
    }
    //recalculate when window is loaded and also when window is resized.
    window.addEventListener("resize", vm.calculate_popups);
    window.addEventListener("load", vm.calculate_popups);

};