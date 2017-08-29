$(document).ready(function(){
  $('.movieDetail').click(function(e){
      var target = $(e.target)
      var site = target.attr('data')
      $.ajax({
        type:'get',
        url:'/movie/'+ site,
        success:function(result){   
          if(result.error == 1){
               alert('请登录')
          }else{
            window.location.href='/movie/'+site
          }   
        },
        error:function(){
          alert('error')
        }
      })
    })

    $('.caption h6').each(function(){
      let thisText = $(this).text()
      if(thisText.length > 25){
        $(this).text(thisText.substr(0,25)+'...')
      }  
    })
})