var is_visible = false;

function see()
{
    var input = document.getElementById("password");
    var see = document.getElementById("see");

    if(is_visible)
    {
        input.type = 'password';
        is_visible = false; 
        see.style.color='gray';
    }
    else
    {
        input.type = 'text';
        is_visible = true; 
        see.style.color='#262626';
    }

}

function check()
{
    var input = document.getElementById("password").value;

    input=input.trim();
    document.getElementById("password").value=input;
    document.getElementById("count").innerText="Length : " + input.length;
    if(input.length>=8)
    {
        document.getElementById("check0").style.color="green";
    }
    else
    {
       document.getElementById("check0").style.color="red"; 
    }

    
    if(input.match(/[0-9]/i))
    {
        document.getElementById("check1").style.color="green";
    }
    else
    {
       document.getElementById("check1").style.color="red"; 
    }

    if(input.match(' '))
    {
        document.getElementById("check2").style.color="red";
    }
    else
    {
       document.getElementById("check2").style.color="green"; 
    }

}
 
  function GetLocation() {
    console.log(navigator.geolocation);
    if (navigator.geolocation) {
        console.log("in get location");
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("p").innerHTML = "Geo;ocation is not supported";
    }
};

function showPosition(position) {
    var x = document.getElementById('p');
    var y = document.getElementById("Location");
    x.innerHTML = "Latitude: " + position.coords.latitude 
    + "longtitide: " + position.coords. longitude;
}

function enableCreateUser() {
    if (document.getElementById("Location").checked) {
      disable(true);
    }
    if (!document.getElementById("Location").checked) {
      disable(false);
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





  function validateInput(){
    
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
        onError(password,"Password cannot be empty");
 
     }else{

         onSuccess(password);
     }
}

document.querySelector("button")
.addEventListener("click",(event)=>{
    event.preventDefault();
    validateInput();
});

function onSuccess(input){
    let parent=input.parentElement;
    let messageEle=parent.querySelector("small");
    messageEle.style.visibility="hidden"; 
    parent.classList.remove("error");
    parent.classList.add("success");
    if(password.value.trim()!=="" && isValidEmail(email.value.trim()))
    window.location.href = 'Search.html'; 
}
function onError(input,message){
    let parent=input.parentElement;
    let messageEle=parent.querySelector("small");
    messageEle.style.visibility="visible";
    messageEle.innerText=message;  
    parent.classList.add("error");
    parent.classList.remove("success");

}

 


function isValidEmail(email){
   return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}










