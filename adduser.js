var btn = document.getElementById('btn');
var name1 = document.getElementById('fullname');
var email = document.getElementById('email');
var passsword = document.getElementById('password');
var phone = document.getElementById('phone');
var city = document.getElementById('city');
var label = document.getElementById('label').label;
var dd = document.getElementById('select');
var v;
var vvalue = "User";
dd.addEventListener("change" , function(abc)
{
  console.log(vvalue);
  var x = dd.selectedIndex;
  v = document.getElementsByTagName("option")[x];
  vvalue = v.value;
    console.log(vvalue);
})


btn.addEventListener("click" , function(abc)
{
  var xhttp = new XMLHttpRequest();
  xhttp.addEventListener("load" , function()
{

});
  xhttp.open("POST", "/addUser");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify({'name':name1.value , 'email' : email.value , 'password' : password.value , 'dob' : dob.value , 'phone' : phone.value , 'city' : city.value , 'Usertype' : vvalue }));
  var modal = document.getElementById('myModal');
  var span = document.getElementsByClassName("close")[0];
  modal.style.display = "block";
  span.onclick = function() {
  modal.style.display = "none";
}
});


var logout = document.getElementById('logoutspan');
logout.addEventListener("click" , function(abc)
{
  var modal = document.getElementById('myModal1');
  var span = document.getElementsByClassName("close")[0];
  modal.style.display = "block";
  span.onclick = function()
{
  modal.style.display = "none";
}
})

var switchuser = document.getElementById('switchspan');
switchuser.addEventListener("click" , function(abc)
{
  var modal = document.getElementById('myModal2');
  var span = document.getElementsByClassName("close")[0];
  modal.style.display = "block";
  span.onclick = function()
{
  modal.style.display = "none";
}
})
