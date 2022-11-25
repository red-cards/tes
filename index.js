var fabT=true;
const user=$.getJSON( "https://jsonplaceholder.typicode.com/users",function( datas ){return datas;});
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
    let startDate = new Date('21/11/2022');
    let timeNow=new Date;
    let finishDate = new Date("1/12/2022");
    let diff=Math.ceil((finishDate.getTime()-timeNow.getTime())/(1000*3600*24));
    $.getJSON("https://jsonplaceholder.typicode.com/todos?userId=1",function(datas){
        datas.map((data,index)=>{
            const template=$(".task-container-new");
            if(data.completed){
                template.find(".form-check-input").prop("checked",true)
                template.addClass("done")
                
            }else{
                template.find(".info-start-countdown").text("21/11/2022")
                template.find(".info-task-countdown").text(diff+" Days left")
                template.find(".collapsed-toogle").attr("aria-controls","collapse-1")
            }
            template.find(".form-check-input").val(finishDate.getDate+"/"+finishDate.getMonth+"/"+finishDate.getFullYear);
            template.find("")
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
    $(".date-task").datepicker({});
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

        breakLine.clone().removeClass("new-break").removeClass("hidden").appendTo("#task-list-main");
        taskPre.clone().removeClass("new-task-container-new").attr("id","task-"+newIdTask).removeClass("hidden").appendTo("#task-list-main");

    });
    $(document).on("click",".option-delete-btn",function(){
        $(this).closest(".comment-me").remove()
    });

});
