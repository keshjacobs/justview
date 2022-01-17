var app=angular.module('justview', ['ionic','chart.js','ionic.native','lazy-scroll', 'ngCordova', 'ngStorage','ngFileUpload','ngAnimate'])
.factory('socket', function($rootScope) {
    var socket = io.connect(live);
    return {
        on: function(eventName, callback) {
            socket.once(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});






