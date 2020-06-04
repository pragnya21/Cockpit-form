var filesystem=null;
var gdata =null;
var fileName="ap.conf";
window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
window.webkitStorageInfo.requestQuota(PERSISTENT, 1024*1024, function(grantedBytes) {
  window.requestFileSystem(window.PERSISTENT, 0, successCallback, errorCallback);
}, 
function(e) {
  console.log('Error', e);
});
function validate(id){
  let data = "";
   data+="AP_ENABLE="+$('#ap_enable').is(":checked")+"\n";
   data+="AP_SSID="+$('#ssid').val()+"\n";
   data+="AP_PASS="+$('#passphrase').val()+"\n";
   data+="AP_IP="+$('#ip').val()+"\n";
   data+="AP_IP="+$('#net_connect').is(":checked")+"\n";
  gdata=data;
  saveFile(fileName,gdata);
  let a = document.createElement('a');
   a.href = "data:application/octet-stream,"+encodeURIComponent(data);
   a.download = 'ap.conf';
   a.click();
}
function saveFile(filename, content) {
  filesystem.root.getFile(filename, {create: true}, function(fileEntry) {
    var contentBlob = new Blob([content], {type: 'text/plain'});
      fileEntry.createWriter(function(fileWriter) {
        fileWriter.onerror = function(e) {
          console.log('Write error: ' + e.toString());
          alert('An error occurred and your file could not be saved!');
        };
    var contentBlob = new Blob([content], {type: 'text/plain'});
      fileWriter.write(contentBlob);
      loadFile(fileName);
    }, errorCallback);
 })};
function loadFile(filename) {
  filesystem.root.getFile(filename, {}, function(fileEntry) {
    fileEntry.file(function(file) {
      var reader = new FileReader();
       reader.onload = function(e) {
        console.log(this.result);
        console.log(this);
        $('#old_data').html(this.result);
       };
       reader.readAsText(file);
       }, errorCallback);
   }, errorCallback);
}
function successCallback(fs){
  console.log("SUCCESS: FILESYSTEM API  AVAILABLE");
    filesystem=fs;
      loadFile(fileName);
}
function errorCallback(e){
  console.log("ERROR: FILESYSTEM API  NOT AVAILABLE");
  console.log(e);
  console.log(e.name);
  console.log(e.message);
  var msg = '';
  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
     break;
     case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
     break;
     case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
     break;
     case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
     break;
     case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
     break;
     default:
      msg = 'Unknown Error';
     break;
  };
  document.querySelector('#error').innerHTML = 'Error: ' + msg;        
}
