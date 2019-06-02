var username = document.getElementById('username');
var password = document.getElementById('password');
var btn = document.getElementById('button');


btn.addEventListener("click" , function(abc)
{
  if(username.value=="" || password.value=="")
  {
    alert("Fill all fields.");
    return
  }
  searchinDB();
});

function searchinDB()
{
  var request = new XMLHttpRequest();
  request.addEventListener('load', function()
{
  var rest = JSON.parse(request.responseText);
  if(rest.length>0)
  {
        window.location.href="http://localhost:8000/templating";
  }
  else
  {
  alert("Credentials are not correct");
  }
});
  request.open('POST', '/search');
  request.setRequestHeader("Content-Type" , "application/json");
  request.send(JSON.stringify({'username' : username.value , 'password' : password.value}));
}
