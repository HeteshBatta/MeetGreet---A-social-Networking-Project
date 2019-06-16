var lemail = document.getElementById('email');
var lname = document.getElementById('name1');
var lcity = document.getElementById('city');
var lphone = document.getElementById('phoneno');
var date = document.getElementById('date');
var dd = document.getElementById('gender');
var x , v;
var datevalue , gendervalue="Male";
var upbtn = document.getElementById('updatebtn');
var pp = document.getElementById('user-profile-image');
date.addEventListener("input" , function(abc)
{
  datevalue = date.value;
})

dd.addEventListener("change" , function(abc)
{
  x = dd.selectedIndex;
  v = document.getElementsByClassName("c1")[x];
  gendervalue = v.value;
})

upbtn.addEventListener("click" , function(abc)
{
  var xhttp1 = new XMLHttpRequest();
  xhttp1.addEventListener("load" , function()
  {
    console.log("i am here");
    alert("Information Updated!");
    window.location.href="http://localhost:8000/userDetails"
  });
  xhttp1.open("POST", "/updateinfo");
  xhttp1.setRequestHeader("Content-Type", "application/json");
  xhttp1.send(JSON.stringify({'dob': datevalue, 'gender' : gendervalue , 'status' : 'Confirmed'}));
})

getdata();

function getdata()
{
  var request = new XMLHttpRequest();
  request.addEventListener('load', function()
{
    var data = JSON.parse(request.responseText);
    console.log(request.responseText);
    console.log(data.email);
    lemail.value = data.email;
    lname.value = data.username;
    lcity.value = data.city;
    lphone.value = data.phoneno;
    pp.src = data.photopath;
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

var ppbtn = document.getElementById('changeProfilePicBtn');
ppbtn.addEventListener("click" , function(abc)
{
  var profileUpload = document.getElementById('profileUpload');
  profileUpload.style.display = "block";
  ppbtn.style.display = "none";
  var confirmbtn = document.getElementById('confirmbtn');
  confirmbtn.style.display = "block";
})
