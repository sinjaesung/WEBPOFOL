(function(){

    shopstore_discount_object={
        'point': 0,
        'coupon': 0
    };
    
    
    now_product_totalprice=shopcart_priceStatus();
    shopcart_totaloriginal.innerText='₩'+now_product_totalprice;
    shopcart_total.innerText='₩'+now_product_totalprice;

    if(document.getElementById('javascript_shopping_pointuse')){

        javascript_shopping_pointuse.onclick=function(event){//shoppingmall site html element id:pointuse signalss
    
            let rel_target=event.target.getAttribute("relTarget");
            let target=document.querySelector(`[targetindex=${rel_target}`);//shoppingmall_point_usage0
            console.log("대상타깃:",event.target,target);
    
            let usage_point=target.value;
            let limit_point=parseInt(target.getAttribute("limitusage"));
    
            console.log("현재 총 금액:",now_product_totalprice);
    
            var validation=isNumber(usage_point);
            if(!validation){
                alert("숫자만 입력가능합니다");
                return false;
            }
            if(limit_point < usage_point){
                alert("보유포인트보다 큽니다");
                shopstore_discount_object['point']=0;
                console.log('shopstore_discount_objecdtf:',shopstore_discount_object);
    
                let coupon_discountamount=shopstore_discount_object['coupon']?parseInt(shopstore_discount_object['coupon']):0;
                let point_discountamount=0;
    
                let total_price=now_product_totalprice - (coupon_discountamount + point_discountamount);
                shopcart_total.innerText='₩'+total_price;
    
                point_discount.innerText='-₩0';//html element 규칙 id: point_discount
    
                return false;
            }
    
            shopstore_discount_object['point']=usage_point;
            console.log('shopstore_discount_objecdtf:',shopstore_discount_object);
    
            coupon_discount.innerText=shopstore_discount_object['coupon']?'-₩'+shopstore_discount_object['coupon']:'-₩0';
            point_discount.innerText=shopstore_discount_object['point']?'-₩'+shopstore_discount_object['point']:'-₩0';
    
            let coupon_discountamount=shopstore_discount_object['coupon']?parseInt(shopstore_discount_object['coupon']):0;
            let point_discountamount=shopstore_discount_object['point']?parseInt(shopstore_discount_object['point']):0;
    
            console.log("whatssss??:",(parseInt(shopstore_discount_object['point']) + parseInt(shopstore_discount_object['coupon'])));
            let total_price=now_product_totalprice - (coupon_discountamount + point_discountamount);
            shopcart_total.innerText='₩'+total_price;
        }
    }
   

    let shopcoupons=document.getElementsByClassName("javascript_shopcoupon_radio");//shopcouponsss radio eleentsss shopcoupon_radio
    for(let j=0; j<shopcoupons.length; j++){
        let item=shopcoupons[j];

        item.onclick=function(event){
            console.log("선택 라디오 couponss:",event.target.value,event.target,event.target.getAttribute("discounttype"));
            let discounttype=event.target.getAttribute("discounttype");
            console.log("현재 총 금액:",now_product_totalprice);
            switch(discounttype){
                case 'won':
                    shopstore_discount_object['coupon']=event.target.value;
                break;

                case 'percent':
                    let percent=event.target.value.split('%')[0];
                    shopstore_discount_object['coupon']=now_product_totalprice*(percent/100);
                break; 
            }

            console.log('shopstore_discount_objecdtf:',shopstore_discount_object);


            coupon_discount.innerText=shopstore_discount_object['coupon']?'-₩'+shopstore_discount_object['coupon']:'-₩0';
            point_discount.innerText=shopstore_discount_object['point']?'-₩'+shopstore_discount_object['point']:'-₩0';

            let coupon_discountamount=shopstore_discount_object['coupon']?parseInt(shopstore_discount_object['coupon']):0;
            let point_discountamount=shopstore_discount_object['point']?parseInt(shopstore_discount_object['point']):0;

            console.log("whatssss??:",(parseInt(shopstore_discount_object['point']) + parseInt(shopstore_discount_object['coupon'])));
            let total_price=now_product_totalprice - (coupon_discountamount + point_discountamount);
            shopcart_total.innerText='₩'+total_price;
        };
    }
    function coupon_and_point_amountGet(totalprice){

        let javascript_shopcoupon_radio=document.getElementsByClassName("javascript_shopcoupon_radio");
        if(javascript_shopcoupon_radio.length==0 || !javascript_shopping_pointuse){
            return false;
        }
        let pointnowinput_target=javascript_shopping_pointuse.getAttribute("relTarget");
        pointnowinput_target=document.querySelector(`[targetindex=${pointnowinput_target}`);//shoppingmall_point_usage0

        let coupon_discount_amount=0;
        let point_discount_amount=pointnowinput_target.value!=""?pointnowinput_target.value:0;
        
        for(let s=0; s<javascript_shopcoupon_radio.length; s++){
            let item=javascript_shopcoupon_radio[s];

            console.log('item valuess:',item.value);
            if(item.checked){
                console.log('check  item:',item.value);
               if(item.getAttribute("discounttype")=='percent'){
                coupon_discount_amount=parseInt(item.value.split('%')[0]);
                console.log('couponaojuntss:',coupon_discount_amount);
                shopstore_discount_object['coupon']=totalprice * (coupon_discount_amount/100);
               } else{
                coupon_discount_amount=parseInt(item.value);

                shopstore_discount_object['coupon']=coupon_discount_amount;
               }
            }
        }
        shopstore_discount_object['point']=point_discount_amount;        

        console.log("now coupon and point amountGetsss:",coupon_discount_amount, point_discount_amount,shopstore_discount_object);
    }

    //카트 삭제 수량 변경 관련
    function shopcart_priceStatus(){
        let shoppingcartProduct=document.getElementsByClassName("javascript_shoppingcartProduct");//signal  className:shoppingcartProduct
        let total_price=0;
        for(let s=0; s<shoppingcartProduct.length; s++){
            let item=shoppingcartProduct[s];
            let price_local=parseInt(item.getAttribute("price")) * parseInt(item.getAttribute("cnt"));
            total_price += price_local;
        }
        console.log("카트 상태 가격:",total_price);

        shopcart_totaloriginal.innerText='₩'+total_price;
        coupon_and_point_amountGet(total_price);
        let discountvalue=coupon_point_discountStatus();

        shopcart_total.innerText='₩'+(total_price - discountvalue);//최종 가격(할인포함)

        
        return total_price;//순수총가격
    }
    function coupon_point_discountStatus(){
        let coupon_discountamount=shopstore_discount_object['coupon']?parseInt(shopstore_discount_object['coupon']):0;
        let point_discountamount=shopstore_discount_object['point']?parseInt(shopstore_discount_object['point']):0;

        coupon_discount.innerText=shopstore_discount_object['coupon']?'-₩'+shopstore_discount_object['coupon']:'-₩0';
        point_discount.innerText=shopstore_discount_object['point']?'-₩'+shopstore_discount_object['point']:'-₩0';
        
        console.log("whatssss??:",(coupon_discountamount + point_discountamount));

        return (coupon_discountamount + point_discountamount);
    }

    //즉시 삭제 모델(parent삭제형)
    let cartdelete=document.getElementsByClassName("javascript_shopcartdelete");//cart x delete signalss className:shopcartdelete

    for(let j=0; j<cartdelete.length; j++){
        let item=cartdelete[j];

        item.onclick=function(event){
            let target=event.target;
            console.log('카트삭제 관련 타깃:',target);
            parentTarget=parentTargetfind(target,"cartitem_");//parentTarget id singalss cartitem_cartNumber..구조 signals
            console.log("삭제할 타깃!:",parentTarget);

            parentTarget.remove();

            now_product_totalprice=shopcart_priceStatus();
        }
    }

    let shopcartproduct_cnt_decrease=document.getElementsByClassName("javascript_shopcartproduct_cnt_decrease");//shop cart product count conrol className: shopcartproduct_cnt_decrease,increase... signals
    let shopcartproduct_cnt_increase=document.getElementsByClassName("javascript_shopcartproduct_cnt_increase");

    for(let s=0;s<shopcartproduct_cnt_decrease.length; s++){
        let item=shopcartproduct_cnt_decrease[s];

        item.onclick=function(event){
            let target=event.target;// decraese button , cnt , increase button 구조의 의존성 구조여야만함(마크업구조)
            let relTarget=target.nextElementSibling;

            parentTarget=parentTargetfind(target,"cartitem_");//parentTarget id singalss cartitem_cartNumber..구조 signals

            console.log('target,relTarget:',target,relTarget);
            let relTarget_nowcount=parseInt(relTarget.innerText);
            console.log('relTarget_nowcount:',relTarget_nowcount,relTarget_nowcount - 1);
            relTarget_nowcount = ((relTarget_nowcount - 1) <= 1 )? 1 : relTarget_nowcount-1;
            console.log('relTarget_nowcount:',relTarget_nowcount);

            relTarget.innerText =relTarget_nowcount;
            parentTarget.setAttribute("cnt",relTarget_nowcount);

            now_product_totalprice=shopcart_priceStatus();
        }
    }
    for(let s=0;s<shopcartproduct_cnt_increase.length; s++){
        let item=shopcartproduct_cnt_increase[s];

        item.onclick=function(event){
            let target=event.target;
            let relTarget=target.previousElementSibling;

            parentTarget=parentTargetfind(target,"cartitem_");

            console.log('target,relTarget:',target,relTarget);
            let relTarget_nowcount=parseInt(relTarget.innerText);
            console.log('relTarget_nowcount:',relTarget_nowcount,relTarget_nowcount + 1);
            relTarget_nowcount = ((relTarget_nowcount + 1) <= 1) ? 1 : relTarget_nowcount+1;
            console.log('relTarget_nowcount:',relTarget_nowcount);

            relTarget.innerText =relTarget_nowcount;
            parentTarget.setAttribute("cnt",relTarget_nowcount);

            now_product_totalprice=shopcart_priceStatus();
        }
    }
}());
