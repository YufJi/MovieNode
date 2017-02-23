$(document).ready(function(){
  $('.del').click(function(e){
        var r = confirm('确定删除该影片？')
        if(r==true){
          var target =  $(e.target)
          var id = target.attr('data-id')
          var tr = $('.item-id-'+ id)
          $.ajax({
                    type:'DELETE',
                    url:'/admin/list?id='+ id,
                    success:function(result){
                              if(result.success === 1){
                                  if(tr.length > 0 ){
                                      tr.remove()
                                      alert('删除电影成功')
                                  }
                              }
                            }
                  })
        } 
    })
})