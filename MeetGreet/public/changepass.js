var user = document.getElementById('username');
var oldp = document.getElementById('oldpass');
var newp = document.getElementById('newpass');
var subbtn = document.getElementById('btn');

subbtn.addEventListener("click" , function(abc)
{
  var xhttp = new XMLHttpRequest();
  xhttp.addEventListener("load" , function()
  {
    var data = JSON.parse(xhttp.responseText);
    if(data[0].password==oldp.value)
    {
      var xhttp1 = new XMLHttpRequest();
      xhttp1.addEventListener("load" , function()
      {

      });
      xhttp.open("POST", "/updatepass");
      xhttp.setRequestHeader("Content-Type", "application/json");
      xhttp.send(JSON.stringify({'user':user.value , 'oldp' : newp.value}));
      alert("Password Updated !");
  }
    else
    {
      alert("Old Password Not correct!");
      return
    }
  })
  xhttp.open("GET", "/getpassword");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send();
})

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
