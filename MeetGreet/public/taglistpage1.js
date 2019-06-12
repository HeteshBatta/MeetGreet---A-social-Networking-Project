var tbody = document.getElementById('tbody');
filltable();
function filltable()
{
var xhttp = new XMLHttpRequest();
xhttp.addEventListener("load" , function()
{
  var data = JSON.parse(xhttp.responseText);
  var i=0;
  while(i<data.length)
  {
    var tr = document.createElement('tr');
    var tagname = document.createElement('td');
    tagname.innerHTML = data[i].name;
    tagname.setAttribute('style' , 'bold');
    tagname.setAttribute('id' , 'tagss');
    var createdby = document.createElement('td');
    createdby.innerHTML = data[i].by;
    var createdate = document.createElement('td');
    createdate.innerHTML = data[i].createdate;
    var actions = document.createElement('td');
    var dbtn = document.createElement('button');
    dbtn.setAttribute('class' , 'fa fa-trash');
    dbtn.setAttribute('id' , i);
    i++;
    actions.appendChild(dbtn);
    tr.appendChild(tagname);
    tr.appendChild(createdby);
    tr.appendChild(createdate);
    tr.appendChild(actions);
    tbody.appendChild(tr);
  dbtn.addEventListener("click" , function(abc)
{
  xhttp.open("POST", "/deletetag");
  xhttp.setRequestHeader("Content-Type" , "application/json");
  var index = abc.target.id;
  console.log(index);
  console.log(data[index]);
  xhttp.send(JSON.stringify({'tagname' : data[index].name}));
  window.location.reload(true);
})
}
})
xhttp.open("GET", "/getinfofortag");
xhttp.setRequestHeader("Content-Type", "application/json");
xhttp.send();
}
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
