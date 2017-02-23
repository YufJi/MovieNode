$(document).ready(function(){
  $('.userdel').click(function(e){
    var r = confirm('确定删除用户？')
    if(r == true){
      var target =  $(e.target)
      var id = target.attr('data-id')
      var tr = $('.item-id-'+ id)
      $.ajax({
        type:'DELETE',
        url:'/admin/userlist/del?id='+ id,
        success:function(result){
                  if(result.success === 1){
                      if(tr.length > 0 ){
                          tr.remove()
                      }
                  }else if(result.error === 3){
                      alert('您不是超级管理员')
                  }
                }
      })
    } 
  })

  $('.userrevise').click(function(e){
      var target = $(e.target)
      var id = target.attr('data-id')
      $.ajax({
        type:'get',
        url:'/user/update/'+ id,
        success:function(result){
                  if(result.error === 3){
                      alert('您不是超级管理员')
                  }else{
                     window.location.href='/user/update/'+ id
                  }
                }
      }) 
  })
})