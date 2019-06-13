var tbody = document.getElementById('tbody');
var dd = document.getElementById('status');
var x , v;
dd.addEventListener("change" , function(abc)
{
  tbody.innerHTML="";
  x = dd.selectedIndex;
  v = document.getElementsByTagName("option")[x];
  var xhttp = new XMLHttpRequest();
  xhttp.addEventListener("load" , function()
  {
    var data = JSON.parse(xhttp.responseText);
    var i=0;
    while(i<data.length)
    {
      var tr = document.createElement('tr');
      var name = document.createElement('td');
      name.innerHTML = data[i].name;
      var rule = document.createElement('td');
      rule.innerHTML = data[i].MembershipRule;
      var commloc = document.createElement('td');
      commloc.innerHTML = data[i].CommuntiyLocation;
      var commowner = document.createElement('td');
      commowner.innerHTML = data[i].CommuntiyOwner;
      var date = document.createElement('td');
      date.innerHTML = data[i].CreateDate;
      var actions = document.createElement('td');
      var updatebtn = document.createElement('button');
      updatebtn.setAttribute("id" , 'updatebtn');
      var infobtn = document.createElement('button');
      infobtn.setAttribute('class' , 'fa fa-info');
      updatebtn.setAttribute('class' , 'fa fa-edit');
      i++;
      var pic = document.createElement('td');
      var pics = document.createElement('img');
      pics.setAttribute('src' , data[i].commpic);
      pics.setAttribute('id' , "commpic");
      pic.appendChild(pics);
      actions.appendChild(updatebtn);
      actions.appendChild(infobtn);
      tr.appendChild(name);
      tr.appendChild(rule);
      tr.appendChild(commloc);
      tr.appendChild(commowner);
      tr.appendChild(date);
      tr.appendChild(actions);
      tr.appendChild(pic);
      tbody.appendChild(tr);
    }
    datatable();
  })
  xhttp.open("POST", "/getinfoforddofcommunity");
  xhttp.setRequestHeader("Content-Type" , "application/json");
  xhttp.send(JSON.stringify({'membershiprule' : v.value}));
})
filltable();
function filltable()
{
var xhttp = new XMLHttpRequest();
xhttp.addEventListener("load" , function()
{
  var data = JSON.parse(xhttp.responseText);
  var i=0;
  console.log(data);
  while(i<data.length)
  {
    var tr = document.createElement('tr');
    var name = document.createElement('td');
    name.innerHTML = data[i].name;
    var rule = document.createElement('td');
    rule.innerHTML = data[i].MembershipRule;
    var commloc = document.createElement('td');
    commloc.innerHTML = data[i].CommunityLocation;
    var commowner = document.createElement('td');
    commowner.innerHTML = data[i].CommunityOwner;
    var date = document.createElement('td');
    date.innerHTML = data[i].CreateDate;
    var actions = document.createElement('td');
    var updatebtn = document.createElement('button');
    updatebtn.setAttribute("id" , 'updatebtn');
    var infobtn = document.createElement('button');
    infobtn.setAttribute('class' , 'fa fa-info');
    updatebtn.setAttribute('class' , 'fa fa-edit');
    i++;
    var pic = document.createElement('td');
    var pics = document.createElement('img');
    pics.setAttribute('src' , data[i].commpic);
    pics.setAttribute('id' , "commpic");
    pic.appendChild(pics);
    actions.appendChild(updatebtn);
    actions.appendChild(infobtn);
    tr.appendChild(name);
    tr.appendChild(rule);
    tr.appendChild(commloc);
    tr.appendChild(commowner);
    tr.appendChild(date);
    tr.appendChild(actions);
    tr.appendChild(pic);
    tbody.appendChild(tr);
  }
})
xhttp.open("GET", "/getinfoforcommunity");
xhttp.setRequestHeader("Content-Type", "application/json");
xhttp.send();
}

function datatable()
{
  $(document).ready(function()
  {
      $('#example').DataTable();
  } )
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

function refresh()
{
   window.location.reload(true);
}
