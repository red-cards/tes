var fabT=true;
const user=$.getJSON( "https://jsonplaceholder.typicode.com/users",function( datas ){return datas;});
let countClass=0;
const newMessage=()=>{
    
};
const loading=()=>{
    $(".loading").animate({
        transform: "rotate(360deg)"
    },2000);
}
const fabOpen=()=>{
    $("#toogles").css({
        'bottom': '31px',
        'right': '102px'
    });
    $("#toogles div").css({
        'margin-right': '26px',
        'margin-left': '0px'
    });
};
const checked=(task)=>{
    task.find()
}
const fabClose=()=>{
    if(fabT){
        $("#toogles div").css({
            'margin-right': '0px',
            'margin-left': '-50px'
        });
        $("#toogles").css({
            'bottom': '27px',
            'right': '34px'
        });
    }
}
const chatOpen=()=>{
    fabT=false;
    $("#chat-list").removeClass("hidden");
    $("task-list").addClass("hidden");
    $("#box").removeClass("hidden");
    $("#loading-chat").removeClass("hidden");
    $("#fab-chat-active").removeClass("hidden");
    $("#fab-chat").addClass("hidden");
    $.getJSON( "https://jsonplaceholder.typicode.com/users", function( datas ) {
        const temp=[];
        const reverseData=datas.reverse();
        //const reverseListChat=reverseData.filter((data,index)=>temp[data.userId]?false:temp[data.userId]=true);
        //const listChat=reverseListChat.reverse();
        reverseData.map((chat,index)=>{
            $.getJSON("https://jsonplaceholder.typicode.com/posts?userId="+chat.id,function(datas){
                const timeNow= new Date;    
                const template=$(".new-chat-list");
                
                template.find(".chat-group-title").text(chat.username);
                template.find(".chat-group-date").text(timeNow.getDay()+"/"+timeNow.getMonth()+"/"+timeNow.getFullYear());
                template.find(".chat-group-last-p").text(chat.name);
                template.find(".chat-group-last-c").text(datas[datas.length-1].body);
                const breakLine=$(".new-break");

                template.clone().removeClass("new-chat-list").removeClass("hidden").attr("id","chat-"+chat.id).attr("id-chat",chat.id).appendTo("#isi-chat");
                breakLine.clone().removeClass("new-break").removeClass("hidden").appendTo("#isi-chat");
            });
            
            
        });
        $("#loading-chat").addClass("hidden");
    });
};
const chatClose=()=>{
    $("#chat-list").addClass("hidden");    
    $("#fab-chat-active").addClass("hidden");
    $("#fab-chat").removeClass("hidden");
}
const taskOpen=()=>{
    fabT=false;
    $("#chat-list").addClass("hidden");
    $("#task-list").removeClass("hidden");
    $("#box").removeClass("hidden");
    $("#fab-task-active").removeClass("hidden");
    $("#fab-task").addClass("hidden");
    let startDate = new Date('2022-11-21');
    let timeNow=new Date;
    let finishDate = new Date("2022-12-01");
    let diff=Math.ceil((finishDate.getTime()-timeNow.getTime())/(1000*3600*24));
    $.getJSON("https://jsonplaceholder.typicode.com/todos?userId=1",function(datas){
        datas.map((data,index)=>{
            const template=$(".task-container-new");
             countClass=$(".task-container").length;
            if(data.completed){
                template.find(".form-check-input").prop("checked",true);
                template.addClass("done");
                template.find(".info-start-countdown").text("");
                template.find(".info-task-countdown").text("");
                template.find(".collapsed").hide();
                template.find(".collapsed-toogle").addClass("hide");
            }else{
                template.find(".info-start-countdown").text("21/11/2022");
                template.find(".info-task-countdown").text(diff+" Days left");
                
            }
            template.find(".collapsed-toogle").attr("aria-controls","collapse-"+countClass);
            template.find(".collapsed").attr("id","collapse-"+countClass);
            template.find(".date-task").val(finishDate.getDate()+"/"+(finishDate.getMonth()+1)+"/"+finishDate.getFullYear());
            template.find(".collapsed-description span").text("No Desciption");
            template.find(".collapsed-icon-comment img").addClass("empty");
            template.find(".collapsed-description desc-task").text("");
            template.find(".info-task-title span").text(data.title);
            template.clone().removeClass("task-container-new").removeClass("hidden").appendTo("#task-list-main").find(".date-task").datepicker({ dateFormat: 'dd/mm/yy' });
            if(index<datas.length-1){$(".new-break").clone().removeClass("new-break").removeClass("hidden").appendTo("#task-list-main")}
            template.find(".collapsed").show();
            template.find(".collapsed-toogle").removeClass("hide");
            template.removeClass("done");
            template.find(".form-check-input").prop("checked",false);
        });
    });
}

//close task tab
const taskClose=()=>{
    $("#task-list").addClass("hidden");    
    $("#fab-task-active").addClass("hidden");
    $("#fab-task").removeClass("hidden");
}
//function to close all the tab
const allClose=()=>{
    fabT=true;
    $("task-list").addClass("hidden");
    $("#chat-list").addClass("hidden");
    $("#box").addClass("hidden");
    $("#fab-task").removeClass("hidden");
    $("#fab-chat").removeClass("hidden");
    $("#fab-task-active").addClass("hidden");
    $("#fab-chat-active").addClass("hidden");
    fabClose();
}
$(document).ready(function(){
    loading()
    $(document).on("click",".collapsed-toogle",function(){
        // alert('asd');
        var elem_id = $(this).attr('aria-controls');
        $(this).toggleClass('hide');
        $('#'+elem_id).slideToggle();
    });
    console.log(user);
    $("#fab-group").hover(function(){
        fabOpen();
    },function(){
        fabClose();        
    });
    $("#fab-chat").on("click",function(){
        chatOpen();
        taskClose();
    });
    $("#fab-task").on("click",function(){        
        taskOpen();
        chatClose();
    });
    $("#fab-chat-active").on("click",function(){
        allClose();
    });
    $("#fab-task-active").on("click",function(){
        allClose();
    });
    $(document).on("click",".chat-group",function(){
        
        const idChat=$(this).attr("id-chat");
        const timeNow= new Date;
        const breakDate=$(".prefix-break-date");
        const breakNew=$(".prefix-break-new");
        
        $("#chat-isi-private").empty();
        
        $.getJSON( "https://jsonplaceholder.typicode.com/posts?userId="+idChat, function( datas ) {
            breakDate.find(".break-date-d").text(timeNow.getDay()+"/"+timeNow.getMonth()+"/"+timeNow.getFullYear());
            breakNew.clone().removeClass("prefix-break-new").removeClass("hidden").appendTo("#chat-isi-private");
            breakDate.clone().removeClass("prefix-break-date").removeClass("hidden").appendTo("#chat-isi-private");   
            datas.map((data,index)=>{
                $.getJSON( "https://jsonplaceholder.typicode.com/users?id="+idChat, function( dataUser ) {
                    $("#private-chat").find(".chat-header-title").text(dataUser[0].name);
                    const chatPre=$(".prefix-comment");
                    chatPre.find(".comment-name").text(dataUser[0].name);
                    chatPre.find(".ballon-comment-text").text(data.body);
                    chatPre.find(".ballon-comment-time").text(timeNow.getHours()+":"+timeNow.getMinutes());
                    chatPre.clone().addClass("c-color-1").addClass("comment-other").removeClass("prefix-comment").removeClass("hidden").appendTo("#chat-isi-private");
                });
            });
        });
        $("#private-chat").removeClass("hidden");
    });
    $(".chat-header-back").on("click",function(){
        $("#isi-group-chat").empty();
        $("#group-chat").addClass("hidden");
        $("#private-chat").addClass("hidden");
    });
    $("#btn-group").on("click",function(){
        const chatPre=$(".prefix-comment-you");
        const valChat=$("#input-group-chat").val();
        const timeNow= new Date;       

        chatPre.find(".comment-name").text("You");
        chatPre.find(".ballon-comment-text").text(valChat);
        chatPre.find(".ballon-comment-time").text(timeNow.getHours()+":"+timeNow.getMinutes());
        chatPre.addClass("comment-me");
        $("#input-group-chat").val("");

        valChat!=="" ? chatPre.clone().removeClass("prefix-comment-you").removeClass("hidden").appendTo("#group-chat .chat-isi") : console.log("kosong");
    });
    $("#btn-private").on("click",function(){
        const chatPre=$(".prefix-comment-you");
        const valChat=$("#input-private-chat").val();
        const timeNow= new Date;       

        chatPre.find(".comment-name").text("You");
        chatPre.find(".ballon-comment-text").text(valChat);
        chatPre.find(".ballon-comment-time").text(timeNow.getHours()+":"+timeNow.getMinutes());
        chatPre.addClass("comment-me");
        $("#input-private-chat").val("");

        valChat!=="" ? chatPre.clone().removeClass("prefix-comment-you").removeClass("hidden").appendTo("#private-chat .chat-isi") : console.log("kosong");
    });

    $(".chat-header-close").on("click",function(){
        $("#group-chat").addClass("hidden");
        allClose();
    });
    $(".chat-private").on("click",function(){
        const idChat=$(this).attr("id");
        $("#private-chat").removeClass("hidden");
    });
    $("#new-task-btn").on("click",function(){
        const taskPre=$(".new-task-container-new");
        const newIdTask=$('.task-container').length;
        const breakLine=$(".new-break");
        countClass+=1;
        taskPre.find(".collapsed-toogle").attr("aria-controls","collapse-"+countClass);
        taskPre.find(".collapsed").attr("id","collapse-"+countClass);
        taskPre.find(".collapsed-icon-comment img").addClass("empty");
        taskPre.find(".collapsed-icon-time img").addClass("empty");
        breakLine.clone().removeClass("new-break").removeClass("hidden").appendTo("#task-list-main");
        taskPre.clone().removeClass("new-task-container-new").attr("id","task-"+newIdTask).removeClass("hidden").find(".date-task").datepicker({onclose:function(){$(this).change()}}).closest(".task-container").appendTo("#task-list-main");
        //$(".date-task, .datepicker").datepicker();

    });
    $(document).on("click",".option-delete-btn",function(){
        $(this).closest(".comment-me").remove()
    });
    $(document).on("click",".collapsed-icon-comment",function(){
        $(this).next(".collapsed-description").find("span").toggleClass("hidden");
        $(this).next(".collapsed-description").find(".desc-task").toggleClass("hidden");
    });
    $(document).on("input",".desc-task",function(){
        if($(this).val()!==""){
            $(this).siblings("span").text($(this).val())
            $(this).closest(".collapsed-description").siblings(".collapsed-icon-comment").find("img").removeClass("empty")
        }else{
            $(this).siblings("span").text("No Description")
            $(this).closest(".collapsed-description").siblings(".collapsed-icon-comment").find("img").addClass("empty")
        }
    });
    $(document).on("change",".date-task",function(){
        $(this).val()!=="" ? $(this).closest(".collapsed-date-time").siblings(".collapsed-icon-time").find("img").removeClass("empty"):$(this).closest(".collapsed-date-time").siblings(".collapsed-icon-time").find("img").addClass("empty")
    });
    $(document).on("input","#search-input",function(){
        
        if($(this).val()===""){
            $(".chat-group").removeClass("hidden");
            $(".new-chat-list").addClass("hidden")
            $(".break").removeClass("hidden")
            $(".new-break").addClass("hidden")
        }else{
            const value=$(this).val();
            $(".chat-group").find(".chat-group-title:not(:contains("+value+"))").closest(".chat-group").addClass("hidden").next(".break").addClass("hidden")
            $(".chat-group").find(".chat-group-title:contains("+value+")").closest(".chat-group").removeClass("hidden").next(".break").removeClass("hidden")
            $(".new-chat-list").addClass("hidden")
        }
    });
    $(document).on("click","#urgent",function(){
        $(".task-container").find(".form-check-input:checked").closest(".task-container").addClass("hidden").next(".break").addClass("hidden");
        $(".task-container").find(".form-check-input:not(:checked)").closest(".task-container").removeClass("hidden").next(".break").removeClass("hidden");
        $(".new-task-container-new").addClass("hidden")
        $(".task-container-new").addClass("hidden")
    })
    $(document).on("click","#errand",function(){
        $(".task-container").removeClass("hidden").next(".break").removeClass("hidden");
        $(".new-task-container-new").addClass("hidden")
        $(".task-container-new").addClass("hidden")
    });
    $(document).on("keypress",".form-title-input",function(e){
        if(e.which==13){
            $(this).siblings("span").text($(this).val())
            $(this).remove()
        }
    });
    $(document).on("click",".form-check-input",function(){
        $(this).is(":checked")?$(this).closest(".task-container").addClass("done"):$(this).closest(".task-container").removeClass("done")
    });
});
