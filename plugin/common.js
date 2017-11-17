//前端数字验证码
// var code; //在全局 定义验证码
// var code2; //在全局 定义验证码
// function createCode() {
//   code = "";
//   var checkCode = document.getElementById("checkCode");
//   function RndNum(n) {
//     var rnd = "";
//     for (var i = 0; i < n; i++)
//       rnd += Math.floor(Math.random() * 10);
//     return rnd;
//   }

//   var num = RndNum(2);
//   var num2 = RndNum(2);

//   code = num + "+" + num2 + "=";
//   code2 = parseInt(num) + parseInt(num2)

//   if (checkCode) {
//     checkCode.className = "code";
//     checkCode.value = code;
//   }

// }


// 二维码显示方法
//option {
    // src:二维码图片地址;
    // left：绝对定位的左边距;
    // top: 绝对定位的顶部距离
// }
function createImg(src,left,top){
    var imgbox = document.getElementById("imgbox");
    if(src == ""){
        if(imgbox){
            document.body.removeChild(imgbox);
        }
    }
    //1.创建img节点
    var div1=document.createElement("div");             //创建一个div
    div1.setAttribute("id","imgbox")
    div1.style.cssText="width:200px;height:200px;position:absolute;left:"+left+"px;top:"+top+"px;z-index:10;"    
    var imgNode=document.createElement('img');
    imgNode.src = src;
    imgNode.width = "200";
    imgNode.height = "200";
    div1.appendChild(imgNode);
    if(src){
        document.body.appendChild(div1);
    }  
}
// 时间戳格式
Date.prototype.format = function(format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}
// joinform ajax提交事件
// option = {
//     name:姓名;
//     sex:性别；
//     tel:电话；
//     address:地址 
// }
function  joinFormajax(name,sex,tel,address){
    var newDate = new Date();
    var ReqTime = newDate.format('yyyyMMddhms');
    $.ajax({
        type: "POST",
        data:{},
        url: "/fu1xia/ajax/register.ajax.php",
        dataType: "json",
        success: function(data){
            if (data.rs){
                alert("提交成功！");
                //提交成功后，跳转到首页
                window.location.href = "?_path=index&_dir=fu1xia";
            }else{
                alert("提交失败！")
            }
        }
    });
}
$(function(){
        
        // 移动端适配iPhone，Android下载
        var browser = {
            versions: function () {
                var u = navigator.userAgent, app = navigator.appVersion;
                return {//移动终端浏览器版本信息
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                };
            } (),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
        }

        if (browser.versions.mobile) {//判断是否是移动设备打开
            // 页面事件，清除二维码图片
            $("body").click(function(e){
                createImg("",0,0);
            })
            // 移动端显示 付一下微信 二维码
            $("#wx-code").click(function(e){
                window.event? window.event.cancelBubble = true : e.stopPropagation();
                createImg("",0,0);
                createImg("http://d.hiphotos.baidu.com/image/pic/item/8718367adab44aedfd91b82eba1c8701a08bfb19.jpg",30,250)
            })
            // 移动端 付一下生活号 二维码
            $("#life-code").click(function(e){
                window.event? window.event.cancelBubble = true : e.stopPropagation();
                createImg("",0,0);
                var l = $(this).innerWidth()+30;
                createImg("http://d.hiphotos.baidu.com/image/pic/item/91529822720e0cf3d4de4f310346f21fbf09aaca.jpg",l,250)
            })
                // 苹果按钮点击跳转下载
            $("#ios-code").click(function () {
                window.location.href = "";
            });
                // 安卓按钮点击跳转下载
            $("#android-code").click(function () {
                window.location.href = "http:xxxx.apk";
            });
        }else{
            // pc端显示 付一下微信 二维码
            $("#wx-code").hover(function(){
                var l = $(this).innerWidth()*2+60;
                createImg("http://d.hiphotos.baidu.com/image/pic/item/8718367adab44aedfd91b82eba1c8701a08bfb19.jpg",l,500)
            },function(){
                createImg("",0,0);
            }) 
            // pc端显示 付一下生活号 二维码
            $("#life-code").hover(function(){
                var l = $(this).innerWidth()*3+60;
                createImg("http://d.hiphotos.baidu.com/image/pic/item/91529822720e0cf3d4de4f310346f21fbf09aaca.jpg",l,500)
            },function(){
                createImg("",0,0);
            })
            // pc端显示 安卓 二维码
            $("#android-code").hover(function(){ 
                var l = $(this).innerWidth()*4+90;
                createImg("http://c.hiphotos.baidu.com/image/pic/item/faf2b2119313b07ee02956c205d7912396dd8c67.jpg",l,500)
            },function(){
                createImg("",0,0);
            })
            // pc端显示 ios 二维码
            $("#ios-code").hover(function(){ 
                var l = $(this).innerWidth()*5+90;
                createImg("http://a.hiphotos.baidu.com/image/pic/item/a8ec8a13632762d007e8a275a9ec08fa503dc622.jpg",l,500)
            },function(){
                createImg("",0,0);
            })
        }
        //加盟信息提交
        $("#joinform-btn").on('click',function(){
            var name = $("#name").val();
            var sex = $("#sex").val();
            var tel = $("#tel").val();
            var address = $("#address").val();
            var inputCode = $("#vfinput").val();//验证码
            if(!name){
                alert("请填写姓名");
                $('#name').focus();
                return false;
            }
            var telReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;
            if(!telReg.test(tel))
            {
                alert('请输入有效的手机号码！');
                $('#tel').focus();
                return false;
            }
            if(!address){
                alert('请填写地址！');
                $('#address').focus();
                return false;
            }
            if(!inputCode){
                alert("请填写验证码")
                return false;
            }
            // 验证完毕，向后台提交数据
            joinFormajax(name,sex,tel,address)
        })
        //绑定验证码事件
        $("#vfinput").blur(function () {
            var inputCode = $("#vfinput").val();
            var codeValue = $("#vfinput").attr("data-canvas")
            console.log(inputCode,codeValue)
            if (inputCode.length <= 0) {
              alert("请输入验证码！");
            }
            else if (inputCode.toLowerCase() != codeValue.toLowerCase()) {
              alert("验证码输入错误！");
              $("#vfinput").val("")
            }
            // else {
            //   alert("成功");
            // }
          });
})
