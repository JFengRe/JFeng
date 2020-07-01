
    // 头部动画
    $(".f-right img").animate({'opacity':'1'},1000,function(){
        $(".f-hLeft h3").animate({'opacity':'1'},1000,function(){
            $(".f-hLeft p.lead").animate({'opacity':'1'},1000,function(){
                $(".f-hLeft a.btn").animate({'opacity':'1','marginTop':'0px'},1000)
            })
        });
    });
    

    console.log($( window).scrollTop());
    // console.log($('.f-body').offset().top);
    
   
    $(document).scroll(function () { 
        // 身体的动画
        if(($('.f-body').offset().top - $( window).scrollTop()) < 0){
           $('.f-body img').eq(0).animate({opacity:'1'},500,function () { 
            $('.f-body img').eq(1).animate({opacity:'1'},500,function () { 
                $('.f-body img').eq(2).animate({opacity:'1'},500,function(){
                    $('.f-body h4').eq(0).animate({opacity:'1'},500,function(){
                        $('.f-body h4').eq(1).animate({opacity:'1'},500,function(){
                            $('.f-body h4').eq(2).animate({opacity:'1'},500)
                        })
                    })
                })
             })
            })
        }


    // 底部动画
    if(($('.f-foot').offset().top - $( window).scrollTop()) < 0){
            $('.f-foot img').eq(0).animate({left : '0'},2000).end()
            .eq(1).animate({left : '0'},2000)
        }
        console.log(($('.f-tail').offset().top))
        console.log(($('.f-tail').offset().top - ($( window).scrollTop()+380)))
        
    // 尾部动画
    if(($('.f-tail').offset().top - ($(window).scrollTop()+380)) < 0){
        $('.f-epilogue').animate({opacity:'1'},2000,function () { 
            $('.f-GETbtn').animate({opacity:'1', top : '0'},1000)
         })
        
     }

    });




    
    

   
    

