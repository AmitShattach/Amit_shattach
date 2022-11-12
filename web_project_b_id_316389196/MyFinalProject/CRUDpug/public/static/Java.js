var is_visible = false;




  function GetLocation() {  //geo location
    console.log(navigator.geolocation);
    
    if (navigator.geolocation) {
        console.log("im here");
        navigator.geolocation.getCurrentPosition(showPosition);
    
    } else {
        document.getElementById("p").value = "geo location not found";
    }
};

function showPosition(position) { //geo location
        
        document.getElementById('lat').value = position.coords.latitude;
        document.getElementById('long').value = position.coords.longitude;
        const latitude = position.coords.latitude;
        const longtitude = position.coords.longitude;
        
        const geoApiUrl = 'http://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longtitude=${longtitude}&localitylanguage=en'
       
        fetch(geoApiUrl)
        .then(res => res.json())  
        .then(data =>{
            document.getElementById('district').value = data.principalSubdivision;
            console.log(district)
           
        })  
}

function enableCreateUser() { 
    if (document.getElementById("Location").checked) {
      disable(true);
      document.getElementById('lat').value = position.coords.latitude;
      document.getElementById('long').value = position.coords.longitude;
    }
    if (!document.getElementById("Location").checked) {
      disable(false);
      document.getElementById('lat').value = 0;
      document.getElementById('long').value = 0;
      
    }
}



function disable(flag) {
    var elements = document.getElementsById("search-control");
    for (var i = 0, len = elements.length; i < len; ++i) {
      elements[i].readOnly = flag;
      elements[i].disabled = flag;
    }
}

function enableCreateUser() {
    if (document.getElementById("Location").checked) {
      disableForm(true);
   }
    if (!document.getElementById("Location").checked) {
      disableForm(false);
    }
  }
  
  function disableForm(flag) {
   var elements = document.getElementsByClassName("form-control");
    for (var i = 0, len = elements.length; i < len; ++i) {
      elements[i].readOnly = flag;
      elements[i].disabled = flag;
   }
  }





  function validateInput(){  //email validation
    
    if(email.value.trim()===""){
        onError(email,"Email cannot be empty");
        
    }else{
        if(!isValidEmail(email.value.trim())){
            onError(email,"Email is not valid");
            
        }else{
            
            onSuccess(email);
        }
    }

    //password
    if(password.value.trim()===""){
        onEr
        ror(password,"Password cannot be empty");
 
     }else{

         onSuccess(password);
     }
}




function onSuccess(input){
    let parent=input.parentElement;
    let messageEle=parent.querySelector("small");
    messageEle.style.visibility="hidden"; 
    parent.classList.remove("error");
    parent.classList.add("success");
    //if(password.value.trim()!=="" && isValidEmail(email.value.trim()))
    //window.location.href = 'Search.html'; 
}
function onError(input,message){
    let parent=input.parentElement;
    let messageEle=parent.querySelector("small");
    messageEle.style.visibility="visible";
    messageEle.innerText=message;  
    parent.classList.add("error");
    parent.classList.remove("success");

}

 








