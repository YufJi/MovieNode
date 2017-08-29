
$(document).ready(function(){

    var ac = new (window.AudioContext||window.webkitAudioContext)();
    var gainNode = ac[ac.createGain ? "createGain" : "createGainNode"]();
        gainNode.connect(ac.destination);
    var analyser = ac.createAnalyser();
    var size = 128
        analyser.fftSize = size * 2;
        analyser.connect(gainNode);


    var source = null;
    var xhr = new XMLHttpRequest();
    var count = 0;

    var height;
    var width;

    var box = document.getElementById("box");
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    box.appendChild(canvas);


    var Dots = [];
    var drawtype = "colume";

    $("#list li").on('click',function(){
      $(this).addClass('selected').siblings().removeClass('selected');
      load("/music/"+this.title);
   })

    function random(m,n){
      return Math.round(Math.random()*(n-m)+m);
    }

    function getDots(){
      Dots=[];
      for (var i = 0; i < size; i++) {
        var x = random(0,width);
        var y = random(0,height);
        var color = "rgb("+random(0,255)+","+random(0,255)+","+random(0,255)+")";
          Dots.push({
            x:x,
            y:y,
            color:color
          });
      }
    }
    var line;

    function resize(){
        height = $("#box").height();
        width = $("#box").width();
        canvas.height = height;
        canvas.width = width;
        line = ctx.createLinearGradient(0,0,0,height);
        line.addColorStop(0,"red");
        line.addColorStop(0.5,"yellow");
        line.addColorStop(1,"green");
        getDots();
    }
    resize();
    window.onresize = resize;

    function draw(arr){
      ctx.clearRect(0,0,width,height);
      ctx.fillStyle = line;
      var w = width /size;
      for (var i = 0; i <size ; i++) {
        if(drawtype == "colume"){
           var h = arr[i] / 256 *height;
           ctx.fillRect(w*i,height-h,w*0.6,h);
        }else if(drawtype =="dot"){
          ctx.beginPath();
          var o = Dots[i];
          var r = arr[i] / 256 *50;
          ctx.arc(o.x,o.y,r,0,Math.PI*2, true);
          var g = ctx.createRadialGradient(o.x,o.y,0,o.x,o.y,r);
          ctx.fillStyle =g;
          g.addColorStop(0,"#fff");
          g.addColorStop(1,o.color);
          ctx.fillStyle = g;
          ctx.fill();
        }
      }
    }

    function load(site){
      var n= ++count;
      source && source[source.stop?"stop":"noteoff"]();
      xhr.abort();
      xhr.open("GET",site,true);
      xhr.responseType = "arraybuffer";
      xhr.onload = function(){
            if(n != count){
              return
            }
            ac.decodeAudioData(xhr.response,function(buffer){
                if(n != count){
                  return
                }
                var bufferSource = ac.createBufferSource();
                bufferSource.buffer = buffer;
                bufferSource.connect(analyser);
                bufferSource[bufferSource.start?"start":"noteon"](0);
                source = bufferSource;
                  
            },function(err){
                alert("出错了！")
            });
      }
      xhr.send(); 
    }

    function visualizar(){
         var arr = new Uint8Array(analyser.frequencyBinCount);
         
         requestAnimationFrame = window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame;
         function v(){
            analyser.getByteFrequencyData(arr);
            draw(arr);
            requestAnimationFrame(v);
         }
         requestAnimationFrame(v);
    }

    visualizar();

    function changVolume(percent){
      gainNode.gain.value = percent * percent;
    }


  $("#volume").change(function(){
    changVolume(this.value / this.max)
  })
  $("#volume").change();

  $("#type li").on('click',function(){
    $(this).addClass("selected").siblings().removeClass("selected");
    drawtype = $(this).attr("data-type")
  })
  
  //alert($("#list li").text()) 
  $("#list li").each(function(){
    var name = $(this).text();
    $(this).text( name.substr(0,15)+"...");
    return;
  })
  
})