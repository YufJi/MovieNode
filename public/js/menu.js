$(document).ready(function(){
  $('.menu').click(function(e){
      var target = $(e.target)
      var site = target.attr('data')
      $.ajax({
        type:'get',
        url:'/admin/'+ site,
        success:function(result){   
          if(result.error == 1){
               alert('请登录')
          }else if(result.error == 2){
               alert('你的权限不够!')
          }else{
            window.location.href='/admin/'+site
          }   
        },
        error:function(){
          alert('error')
        }
      })
    })
    
   $(function(){
    var text = $('.title').text()
    if(text == '用户列表' || text == '电影列表' || text == '添加电影'){
      $('#dropdownMenu').html(text+'<span class="caret"></span>')
    }
    $('.menu').each(function(){
      if ($(this).text() == text) {
         $(this).addClass('active')
      }
    })
   })
})