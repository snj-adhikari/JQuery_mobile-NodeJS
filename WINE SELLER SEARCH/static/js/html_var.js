function make_view_item_list(item){
    //   var html = '<ul data-role="listview" class="" data-filter="true" data-filter-placeholder="Search fruits..." data-inset="true">';
    var html = '<ul data-role="listview" class="" data-filter="true" data-filter-placeholder="Search fruits..." data-inset="true">'; 
    // console.log("the items is right now" , item);
  item.map(function(single){
    html += '<div data-role="collapsible" data-iconpos="right" data-inset="true" data-shadow="false" data-corners="false"'
    +' data-id="wine_'+ single._id + '">';
    html+='<h2 ><span class="text-danger heading">  '+single.name +' </span></h2>';
    html+='<ul data-role="listview" id="wine_'+ single._id+ '" data-shadow="false"  data-inset="false" data-single="'+encodeURIComponent(JSON.stringify(single)) +'" data-corners="false">';
    html+='<li class="text-success">Sweet - <span>'+ single.sweetness +'</span></li>';
    html+='<li class=>Sweetness (%) - <span class=text-info">'+single.percent_sweet +'</span></li>';
    html+='<li class=>Acid (%) - <span class="text-info">'+ single.percent_acid+'</span></li>';
    html+='<li >Alcohal(%) - <span class="text-info">'+ single.percent_alcohol+'</span></li>';
    html+='<li class="text-dark">Body - <span class="text-primary">'+ single.body+'</span></li>';
    html+='<li >Storage Period - <span class="text-primary">'+ single.storage_period+'</span></li>';
    if(single.availability){
        html+='<li class=>Available - <span class=""text-success">'+ "YES" +'</span></li>';
    }
    else{
        html+='<li class="">Available - <span class="text-danger">'+ "NO" +'</span></li>';
    }
    
    html+='<li class="text-dark"> quantity - <span>'+ single.quantity +'</span></li>';
   
    

    html +='<li style="text-align:center">';
    html +='<button class="ui-btn ui-btn-inline btn-info edit-btn"  data-item="'+encodeURIComponent(JSON.stringify(single))+'" data-id="'+ single._id +' "  >'+ 'Edit' +' </button>';
    html +='<button class="ui-btn ui-btn-inline btn-danger delete-btn" data-id="'+ single._id +' " >'+ 'Delete' +' </button>';
    html +="</li>";
    html +="</ul>";
    html +="</div>";
  });
  
  
  html +="</ul>";
  
  return html;
}


function make_update_item_view(item){
    console.log("what item is passed is" , item);
    var html ='<div class="ui-field-contain " id="update_form" data-id= "'+item._id+'" >' ;
    html +=  '    <label for="name">' + ' Name : </label>' ;
    html +=  '    <input type="text" name="name" value="'+item.name+'" id="name">' ;
    html +=  '    </div>' ;
    html +=  '    <div class="ui-field-contain">' ;
    html +=  '    <label for="sweetness-select" class="select">' + 'Sweetness : </label>' ;
    html +=  '    <select name="sweetness-select" id="sweetness-select">' ;
    if(item.sweetness == 'moscato'){
        html +=  '    <option value="moscato" selected>' + 'Moscato</option>' ;
    }
    else{
        html +=  '    <option value="moscato">' + 'Moscato</option>' ;
    }
    if(item.sweetness =="white_zinfandel"){
        html +=  '    <option value="white_zinfandel" selected>' + 'White Zinfandel</option>' ;
    }
    else{
        html +=  '    <option value="white_zinfandel" selected>' + 'White Zinfandel</option>' ;
    }
    if(item.sweetness =="riesling"){
        html +=  '    <option value="riesling" selected>' + ' Riesling</option>' ;
    }
    else{
        html +=  '    <option value="riesling">' + ' Riesling</option>' ;
    }
    
    if(item.sweetness =="port"){
        html +=  '    <option value="port" selected>' + ' Port</option>' ;
    }
    else{
        html +=  '    <option value="port">' + ' Port</option>' ; 
    }
    if(item.sweetness == "sauternes"){
        html +=  '    <option value="sauternes" selected>' + ' Sauternes</option>' ;
    }
    else{
        html +=  '    <option value="sauternes">' + ' Sauternes</option>' ;
    }
    html +=  '    </select>' ;
    html +=  '    </div>' ;
    html +=  '    <div class="ui-field-contain">' ;
    html +=  '    <label for="percent_sweet">' + 'Sweet Percentage (%) </label>' ;
    html +=  '    <input type="range" name="percent_sweet" id="percent_sweet" value="'+ item.percent_sweet+'" min="0" max="100" data-highlight="true" step="0.01" />' ;
    html +=  '    </div>' ;
    html +=  '    <div class="ui-field-contain">' ;
    html +=  '    <label for="percent_acid">' + 'Acid Percentage (%) </label>' ;
    html +=  '    <input type="range" name="percent_acid" id="percent_acid" value="'+item.percent_acid+'" min="0" max="100" data-highlight="true" step="0.01" />' ;
    html +=  '    </div>' ;
    html +=  '    <div class="ui-field-contain">' ;
    html +=  '    <label for="percent_alcohol">' + 'Alcohal Percentage (%) </label>' ;
    html +=  '    <input type="range" name="percent_alcohol" id="percent_alcohol" value="'+item.percent_alcohol+'" min="0" max="100" data-highlight="true" step="0.01" />' ;
    html +=  '    </div>' ;
    html +=  '    <div class="ui-field-contain">' ;
    html +=  '    <label for="body-select" class="select">' + 'Sweetness : </label>' ;
    html +=  '    <select name="body-select" id="body-select">' ;
    if(item.body == 'light'){
        html +=  '    <option value="light" selected>' + 'Light</option>' ;
    }
    else{
        html +=  '    <option value="light">' + 'Light</option>' ; 
    }
    if(item.body == 'medium'){
        html +=  '    <option value="medium" selected>' + 'Medium</option>' ;
    }
    else{
        html +=  '    <option value="medium">' + 'Medium</option>' ;
    }
    if(item.body == 'full'){
        html +=  '    <option value="full" selected>' + 'full</option>' ;
    }
    else{
        html +=  '    <option value="full" >' + 'full</option>' ;
    }
    
    
    
    html +=  '    </select>' ;
    html +=  '    </div>' ;

    html +=  '    <div class="ui-field-contain">' ;
    html +=  '    <label for="storage_period">' + ' Storage Period </label>' ;
    html +=  '    <input type="number" name="storage_period" value="'+item.storage_period+'" id="storage_period">' ;
    html +=  '    </div>' ;
    html +=  '    <div class="ui-field-contain">' ;
    html +=  '    <label for="available">' + 'Available :</label>' ;
    html +=  '    <select name="available" id="available" data-role="slider">' ;
    if(item.availability){
        html +=  '    <option value="0">' + 'No</option>' ;
        html +=  '    <option value="1" selected>' + 'Yes</option>' ;
    }
    else{
        html +=  '    <option value="0" selected>' + 'No</option>' ;
        html +=  '    <option value="1">' + 'No</option>' ;
    }
    html +=  '    </select>' + '</div>' + '<div class="ui-field-contain">' ;
    html +=  '    <label for="quantity">' + ' Quantity </label>' ;
    html +=  '    <input type="number" name="quantity"  value="'+item.quantity+'" id="quantity">' ;
    html +=  '    </div>' ;
    html +='<div class="ui-field-contain" style="text-align:center">';
    
    html += '<a class="ui-btn btn btn-success ui-btn-inline" id="update_btn">Update</a>';
    html +='<a class=" ui-btn btn btn-danger ui-btn-inline" id="update_cancel"  rel="external" href="index.html" > Cancel </a>';
    html +='</div></div>';
    return html;
}