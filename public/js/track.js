$(function() {

  var socket = new io.Socket("localhost"); 
  var uid = null;
  socket.connect();
  socket.on('connect', function(){
    socket.send({connect: "hi"});
  }) 
  socket.on('message', function(message){   
    
    if ('session_id' in message ) {
      session_id = message.session_id; 
      console.log("session_id: " + session_id);
    }
    if (message.type == 'mousemove' ) {
      console.log(message.page_x);
      $('#cursor').css( { 
        position: 'absolute',
        zIndex: 5000,
        left: message.page_x, 
        top: message.page_y 
      });                 

      console.log("page_x: " + message.page_x);
      console.log("page_y: " + message.page_y);
    }

  });

  $("*").mousemove(function(e) {
    socket.send({ type:      "mousemove"
                , url:       window.location.href
                , at:        new Date()
                , page_x:    e.pageX 
                , page_y:    e.pageY
                , node_name: e.target.nodeName
                , node_id:   e.target.id
                , session_id: session_id
    });    
  });

  $("*").click(function(e) {
    socket.send({ type:      "click"
                , url:       window.location.href
                , at:        new Date()
                , page_x:    e.pageX 
                , page_y:    e.pageY
                , node_name: e.target.nodeName
                , node_id:   e.target.id
                , session_id: session_id
    });
  });  
});
