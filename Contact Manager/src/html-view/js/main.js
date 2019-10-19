
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
