$(document).ready(function(){

  $('.com-list').on('click','.comment',function(e){
     var target = $(this)
     var toId = target.attr('data-tid')
     var comId = target.attr('data-cid')

      if($('#toId').length>0){
        $('#toId').val(toId)
      }else{
        $('<input>').attr({
            type:'hidden',
            id:'toId',
            name:'comment[tid]',
            value:toId
        }).appendTo('#commentForm')
      }

      if($('#comId').length>0){
        $('#comId').val(comId)
      }else{
        $('<input>').attr({
            type:'hidden',
            id:'comId',
            name:'comment[cid]',
            value:comId
        }).appendTo('#commentForm')
      }
  })

  $('.commentBtn').click(function(e){
    var index
    $.ajax({
      type:'post',
      url:'/user/comment',
      data:$("#commentForm").serialize(),
      success:function(result){
        var to = $('#toId').val()
        var com =  $('#comId').val()
        if(result.success == 1){
          $('.com-list').append(
                '<li class="com farther">'+
                  '<div class="pull-left"><a href="#comment" data-cid="'+result.cid+'" data-tid="'+result.tid+'" class="comment"><img src="/img/touxiang.jpg" style="width:32px;height:32px;" class="com-object"></a></div>'+
                  '<div class="com-body pull-left">'+
                    '<h4 class="com-heading"> <span class="name">'+ result.name +'</span></h4>'+
                    '<p>'+ result.content +'</p>'+
                  '</div>'+
                '</li>'
            )
        }else if(result.success == 2){
          index = $('.comment[data-cid='+com+']').parent().parent().index()
          $('.farther').eq(index).find('.com-body:first').append(
                                      '<li class="com">'+
                                        '<div class="pull-left"><a data-cid="'+com+'" data-tid="'+to+'" class="comment"><img src="/img/touxiang.jpg" style="width:32px;height:32px;" class="com-object"></a></div>'+
                                        '<div class="com-body pull-left">'+
                                          '<h4 class="com-heading"> <span class="name">'+result.name+'</span></h4>'+
                                          '<p>'+ $('#comment').val() +'</p>'+
                                        '</div>'+
                                      '</li>'
                                    )
        }
        $('#comment').val('')
      }

    })
  })
})
