var btn = document.getElementById('btn');
var ipt = document.getElementById('tagsipt');
var btn1 = document.getElementById('taglist')
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
btn.addEventListener("click" , function(abc)
{
  var xhttp = new XMLHttpRequest();
  xhttp.addEventListener("load" , function()
  {

  });
  xhttp.open("POST", "/addtag");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify({ 'tag' : ipt.value , 'time' : dateTime}));
  var modal = document.getElementById('myModal');
  var span = document.getElementsByClassName("close")[0];
  modal.style.display = "block";
  span.onclick = function() {
  modal.style.display = "none";
}
});

btn1.addEventListener("click" , function(abc)
{
  console.log("Abc");
  window.location.href="http://localhost:8000/taglistpage";
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
