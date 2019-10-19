
var config = {
    url : 'http://localhost:11000/',
    
    delete:'delete/',
    
    port:11000,
}

function phonevalidation(){
    $cf = $('#phonenumber');
    $cf.blur(function(e){
        phone = $(this).val();
        phone = phone.replace(/[^0-9]/g,'');
        if (phone.length != 10)
        {
            swal('Invalid phone no' , ' must be 10 digit , start with area code , EG: 0433859388' , 'warning');
            $('#phonenumber').val('');
            $('#phonenumber').focus();
        }
    });

}

$(document).ready(function(){
    $('body').on('click', '.btn-delete', function(){
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
                url:config.url + config.delete + id,
                method:'get',
                
                success:function(data){
                    console.log('the delete item is' , data);
                    if(data.success){
                        
                        setTimeout(function(){ location.reload(true); }, 3000);
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
              swal("Your contact is safe!");
            }
          });
        
    })
})