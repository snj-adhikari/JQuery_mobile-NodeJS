var config = {
    url : 'http://localhost:3000/',
    save:'save',
    delete:'delete',
    edit:'edit',
    list:'list',
    port:3000,
}

var list;

function getData(){
    $.ajax({
        url:config.url + config.list,
        method:'get' , 
        success:function(data){
            if(data.success)
            {
                list = data.item;
                var html = make_view_item_list(data.item);
                // console.log("the html is" ,html);
                $("#home-page").html(html);
                $(".ui-content").trigger( "create" );
            }
            else{
                alert(data.msg);
            }
            
        },
        error:function(err){
            alert('sorry could not get the data');
        }

    });

}
$(document).ready(function(){

    
    $('#save_btn').click(function(){
        var sweetness = $("#sweetness-select").val();
        var percent_sweet = $("#percent_sweet").val();
        var percent_acid = $("#percent_acid").val();
        var percent_alcohol = $("#percent_alcohol").val();
        var body_select = $("#body-select").val();
        var storage_period = $("#storage_period").val();
        var available = $("#available").val();
        var quantity = $("#quantity").val();
        var name = $("#name").val();
        var data = {
            sweetness: sweetness, 
            percent_sweet : percent_sweet,
            percent_acid: percent_acid,
            percent_alcohol:percent_alcohol,
            body:body_select,
            storage_period:storage_period,
            availability:available,
            quantity:quantity,
            name:name,
        }
        $.ajax({
            url:config.url + config.save,
            data:data,
            method:'post',
            success:function(res){
                if(res.success){
                    swal("Success !! ", res.msg ).then(()=>{
                        // if(yes){
                            window.location ='index.html';
                        
                    }); 
                }
                
                console.log(res);
                // $("#available").val(1);
                
            },
            error:function(){
                alert("Sorry , error occured try again !!");
            }
        })
    });

    $('body').on('click', '.edit-btn', function(){
        // alert('edit btn clicked');
        var id = $(this).data('id');
        var single = decodeURIComponent($("#wine_"+id).data('single'));
        var item = JSON.parse(single);
        console.log("when edit we retrieved item as" , item)
        var html = make_update_item_view(item);
        console.log("the html is" ,html);
        $('.ui-title').text( item.name)
        $("#home-page").html(html);
        $(".ui-content").trigger( "create" );
        // }

    });
    $('body').on('click', '.delete-btn', function(){
        var id = $(this).data('id');
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

            $.ajax({
                url:config.url + config.delete,
                method:'delete',
                headers:{
                    _id:id,
                },
                success:function(data){
                    if(data.success){
                        getData();
                        swal("Poof! The entry has been deleted", {
                            icon: "success",
                            });
                    } 
                    else{
                        swal("Oh no ," + data.msg,{
                            icon:"warning"
                        });
                    }
                },
                error:function(err){
                    swal("Something awfully went wrong!! Server error has occured", {
                        icon:"error",
                    });
                }
            });
              
            } else {
              swal("Your imaginary file is safe!");
            }
          });
        
    })
    $('body').on('click' , '#update_btn' , function(){
        var sweetness = $("#sweetness-select").val();
        var percent_sweet = $("#percent_sweet").val();
        var percent_acid = $("#percent_acid").val();
        var percent_alcohol = $("#percent_alcohol").val();
        var body_select = $("#body-select").val();
        var storage_period = $("#storage_period").val();
        var available = $("#available").val();
        var quantity = $("#quantity").val();
        var name = $("#name").val();
        var id = $('#update_form').data('id');
        console.log('the id is' ,id);
        var data = {
            
            sweetness:sweetness, 
            percent_sweet : percent_sweet,
            percent_acid: percent_acid,
            percent_alcohol:percent_alcohol,
            body:body_select,
            storage_period:storage_period,
            availability:available,
            quantity:quantity,
            name:name,
        }
        $.ajax({
            url:config.url + config.edit,
            data:data,
            method:'post',
            headers:{
                id:id,
            },
            success:function(res){
                alert(res.msg);
                console.log(res);
                // $("#available").val(1);
                if(res.success){
                    window.location ='index.html';
                    
                }
            },
            error:function(){
                alert("Sorry , error occured try again !!");
            }
        })
    });
});