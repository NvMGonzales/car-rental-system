$(document).ready(function(){
    // autoscroll Jquery
    $('#list').animate({scrollTop:1000},80);
    var socket = io();
    // connect client to server
    socket.on('connect', function(socket){
        console.log('Connected to Server');
    });
    // emit user ID
    var ObjectID = $('#ObjectID').val();
    var carID = $('#carID').val();
    socket.emit('ObjectID',{
        carID: carID,
        userID: ObjectID 
    });
    // listen to car event
    socket.on('car',function(car) {
        console.log(car);
        // make a request gamit AJAX
        $.ajax({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${car.location}&key=AIzaSyB8ItxwzKXrxgHM5cjW0wgAEIltzkpZ-Pc`,
            type: 'POST',
            data: JSON,
            processData: true,
            success: function(data){
                console.log(data);
                // send lat and lng to server
                socket.emit('LatLng',{
                    data: data,
                    car:car
                });
            }
        });
    });
   
    // disconnect from client server
    socket.on('disconnect', function(socket){
        console.log('Disconnected from server');
    });
});