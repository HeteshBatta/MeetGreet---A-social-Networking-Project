var lemail = document.getElementById('email');
var lgender = document.getElementById('gender');
var lname = document.getElementById('name');
var lcity = document.getElementById('city');
var ldob = document.getElementById('dob');
var lphone = document.getElementById('phoneno');
var profilepic = document.getElementById('profilepic');

getdata();

function getdata()
{
  var request = new XMLHttpRequest();
  request.addEventListener('load', function()
{
    var data = JSON.parse(request.responseText);
    console.log(request.responseText);
    lemail.innerHTML = data.email;
    lgender.innerHTML = data.gender;
    lname.innerHTML = data.username;
    lcity.innerHTML = data.city;
    ldob.innerHTML = data.dob;
    lphone.innerHTML = data.phoneno;
    profilepic.src = data.photopath;
});
  request.open('GET', '/getdata');
  request.setRequestHeader("Content-Type" , "application/json");
  request.send();
}

var logout = document.getElementById('logoutspan');
logout.addEventListener("click" , function(abc)
{
  var modal = document.getElementById('myModal');
  var span = document.getElementsByClassName("close")[0];
  modal.style.display = "block";
  span.onclick = function()
{
  modal.style.display = "none";
}
})
