const address = document.getElementById("address");
const output = document.getElementById("output");
const result = document.getElementById("result");
const button = document.getElementById("ping");

function ping_run() {
    cockpit.spawn(["ping", "-c", "4", address.value])
        .stream(ping_output)
        .then(ping_success)
        .catch(ping_fail);

    result.innerHTML = "";
    output.innerHTML = "";
}

function ping_output(data) {
    output.append(document.createTextNode(data));
}
button.addEventListener("click", ping_run);
cockpit.transport.wait(function() { });

var app = angular.module('wifi-config', []);
app.controller('wifi-controller', function($scope) {
  $scope.networks = [
    {ssid:'AKOBOX'}
  ];
});
function accesspointforclients() {
  document.getElementById("accesspoint").enable = true;
}
function allowinternetaccess() {
  document.getElementById("internetaccess").enable = true;
}
