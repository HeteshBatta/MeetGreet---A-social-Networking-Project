var tbody = document.getElementById('tbody');
var dd = document.getElementById('status');
var dd1 = document.getElementById('status1');
var x , v , x1 , v1;
var data = [];

dd.addEventListener("change" , function(abc)
{
  tbody.innerHTML="";
  x1 = dd1.selectedIndex;
  v1 = document.getElementsByClassName("c1")[x1];
  x = dd.selectedIndex;
  v = document.getElementsByTagName("option")[x];
  if(x1!=0)
  {
    var request = new XMLHttpRequest();
    request.addEventListener("load" , function(abc)
    {
      data = JSON.parse(request.responseText);
      console.log(data);
      var i=0;
      while(i<data.length)
      {
        var tr = document.createElement('tr');
        var name = document.createElement('td');
        name.innerHTML = data[i].email;
        var phone = document.createElement('td');
        phone.innerHTML = data[i].phoneno;
        var city = document.createElement('td');
        city.innerHTML = data[i].city;
        var status = document.createElement('td');
        status.innerHTML = data[i].status;
        var role = document.createElement('td');
        role.innerHTML = data[i].usertype;
        var actions = document.createElement('td');
        var mailbtn = document.createElement('button');
        var updatebtn = document.createElement('button');
        var approvebtn = document.createElement('button');
        mailbtn.setAttribute('class' , 'fa fa-envelope');
        updatebtn.setAttribute('class' , 'fa fa-edit');
        if(data[i].isactive=="yes")
        {
          approvebtn.setAttribute('class' , 'fa fa-times-circle');
          approvebtn.addEventListener("click" , function(abc)
        {
            console.log(abc);
            todeactive(abc);
        })
        }
        else
        {
        approvebtn.setAttribute('class' , 'fa fa-check-circle');
        approvebtn.addEventListener("click" , function(abc)
        {
              toactivate(abc);
        })
        }
        i++;
        actions.appendChild(mailbtn);
        actions.appendChild(updatebtn);
        actions.appendChild(approvebtn);
        tr.appendChild(name);
        tr.appendChild(phone);
        tr.appendChild(city);
        tr.appendChild(status);
        tr.appendChild(role);
        tr.appendChild(actions);
        tbody.appendChild(tr);
      }
      createdatatable();
      fillingbelow();
    });
    request.open('POST', '/dtsearch2');
    request.setRequestHeader("Content-Type" , "application/json");
    request.send(JSON.stringify({'usertype' : v1.value , 'status' : v.value}));
  }
  else
{
  if(x==0)
  {
    filltable();
    return
  }
  var request = new XMLHttpRequest();
  request.addEventListener('load' , function(abc)
  {
    data = JSON.parse(request.responseText);
    console.log()
    console.log(data);
    var i=0;
    while(i<data.length)
    {
      var tr = document.createElement('tr');
      var name = document.createElement('td');
      name.innerHTML = data[i].email;
      var phone = document.createElement('td');
      phone.innerHTML = data[i].phoneno;
      var city = document.createElement('td');
      city.innerHTML = data[i].city;
      var status = document.createElement('td');
      status.innerHTML = data[i].status;
      var role = document.createElement('td');
      role.innerHTML = data[i].usertype;
      var actions = document.createElement('td');
      var mailbtn = document.createElement('button');
      var updatebtn = document.createElement('button');
      var approvebtn = document.createElement('button');
      mailbtn.setAttribute('class' , 'fa fa-envelope');
      updatebtn.setAttribute('class' , 'fa fa-edit');
      approvebtn.setAttribute('class' , 'fa fa-check-circle');
      if(data[i].isactive=="yes")
      {
        approvebtn.setAttribute('class' , 'fa fa-times-circle');
        approvebtn.addEventListener("click" , function(abc)
      {
          todeactive(abc);
      })
      }
      else
      {
      approvebtn.setAttribute('class' , 'fa fa-check-circle');
      approvebtn.addEventListener("click" , function(abc)
      {
            toactivate(abc);
      })
      }
      i++;
      actions.appendChild(mailbtn);
      actions.appendChild(updatebtn);
      actions.appendChild(approvebtn);
      tr.appendChild(name);
      tr.appendChild(phone);
      tr.appendChild(city);
      tr.appendChild(status);
      tr.appendChild(role);
      tr.appendChild(actions);
      tbody.appendChild(tr);
    }
    createdatatable();
    fillingbelow();
    });
    request.open('POST', '/dtsearchh1');
    request.setRequestHeader("Content-Type" , "application/json");
    request.send(JSON.stringify({'status' : v.value}));
}
});

dd1.addEventListener("change" , function(abc)
{
  tbody.innerHTML="";
  x1 = dd1.selectedIndex;
  v1 = document.getElementsByClassName("c1")[x1];
  x = dd.selectedIndex;
  v = document.getElementsByTagName("option")[x];
  if(x!=0)
  {
    var request = new XMLHttpRequest();
    request.addEventListener("load" , function(abc)
    {
      data = JSON.parse(request.responseText);
      console.log(data);
      var i=0;
      while(i<data.length)
      {
        var tr = document.createElement('tr');
        var name = document.createElement('td');
        name.innerHTML = data[i].email;
        var phone = document.createElement('td');
        phone.innerHTML = data[i].phoneno;
        var city = document.createElement('td');
        city.innerHTML = data[i].city;
        var status = document.createElement('td');
        status.innerHTML = data[i].status;
        var role = document.createElement('td');
        role.innerHTML = data[i].usertype;
        var actions = document.createElement('td');
        var mailbtn = document.createElement('button');
        var updatebtn = document.createElement('button');
        var approvebtn = document.createElement('button');
        mailbtn.setAttribute('class' , 'fa fa-envelope');
        updatebtn.setAttribute('class' , 'fa fa-edit');
        approvebtn.setAttribute('class' , 'fa fa-check-circle');
        if(data[i].isactive=="yes")
        {
          approvebtn.setAttribute('class' , 'fa fa-times-circle');
          approvebtn.addEventListener("click" , function(abc)
        {
            todeactive(abc);
        })
        }
        else
        {
        approvebtn.setAttribute('class' , 'fa fa-check-circle');
        approvebtn.addEventListener("click" , function(abc)
        {
              toactivate(abc);
        })
        }
        i++;
        actions.appendChild(mailbtn);
        actions.appendChild(updatebtn);
        actions.appendChild(approvebtn);
        tr.appendChild(name);
        tr.appendChild(phone);
        tr.appendChild(city);
        tr.appendChild(status);
        tr.appendChild(role);
        tr.appendChild(actions);
        tbody.appendChild(tr);
      }
      createdatatable();
      fillingbelow();
    });
    request.open('POST', '/dtsearch2');
    request.setRequestHeader("Content-Type" , "application/json");
    request.send(JSON.stringify({'usertype' : v1.value , 'status' : v.value}));
  }
  else
{
  if(v1==0)
  {
    filltable();
    return
  }
  var request = new XMLHttpRequest();
  request.addEventListener('load' , function(abc)
  {
    data = JSON.parse(request.responseText);
    console.log(data);
    var i=0;
    while(i<data.length)
    {
      var tr = document.createElement('tr');
      var name = document.createElement('td');
      name.innerHTML = data[i].email;
      var phone = document.createElement('td');
      phone.innerHTML = data[i].phoneno;
      var city = document.createElement('td');
      city.innerHTML = data[i].city;
      var status = document.createElement('td');
      status.innerHTML = data[i].status;
      var role = document.createElement('td');
      role.innerHTML = data[i].usertype;
      var actions = document.createElement('td');
      var mailbtn = document.createElement('button');
      var updatebtn = document.createElement('button');
      var approvebtn = document.createElement('button');
      mailbtn.setAttribute('class' , 'fa fa-envelope');
      updatebtn.setAttribute('class' , 'fa fa-edit');
      approvebtn.setAttribute('class' , 'fa fa-check-circle');
      if(data[i].isactive=="yes")
      {
        approvebtn.setAttribute('class' , 'fa fa-times-circle');
        approvebtn.addEventListener("click" , function(abc)
      {
          todeactive(abc);
      })
      }
      else
      {
      approvebtn.setAttribute('class' , 'fa fa-check-circle');
      approvebtn.addEventListener("click" , function(abc)
      {
            toactivate(abc);
      })
      }
      i++;
      actions.appendChild(mailbtn);
      actions.appendChild(updatebtn);
      actions.appendChild(approvebtn);
      tr.appendChild(name);
      tr.appendChild(phone);
      tr.appendChild(city);
      tr.appendChild(status);
      tr.appendChild(role);
      tr.appendChild(actions);
      tbody.appendChild(tr);
    }
    createdatatable();
    fillingbelow();
    });
    request.open('POST', '/dtsearch1');
    request.setRequestHeader("Content-Type" , "application/json");
    request.send(JSON.stringify({'usertype' : v1.value}));
}
});

filltable();
function filltable()
{
console.log("&&");
var xhttp = new XMLHttpRequest();
xhttp.addEventListener("load" , function()
{
  data = JSON.parse(xhttp.responseText);
  var i=0;
  while(i<data.length)
  {
    var tr = document.createElement('tr');
    var name = document.createElement('td');
    name.innerHTML = data[i].email;
    var phone = document.createElement('td');
    phone.innerHTML = data[i].phoneno;
    var city = document.createElement('td');
    city.innerHTML = data[i].city;
    var status = document.createElement('td');
    status.innerHTML = data[i].status;
    var role = document.createElement('td');
    role.innerHTML = data[i].usertype;
    var actions = document.createElement('td');
    var mailbtn = document.createElement('button');
    var updatebtn = document.createElement('button');
    var approvebtn = document.createElement('button');
    mailbtn.setAttribute('class' , 'fa fa-envelope');
    mailbtn.setAttribute('id' , i);
    updatebtn.setAttribute('class' , 'fa fa-edit');
    approvebtn.setAttribute('class' , 'fa fa-check-circle');
    if(data[i].isactive=="yes")
    {
      approvebtn.setAttribute('class' , 'fa fa-times-circle');
      approvebtn.onclick = function(abc)
    {
        todeactive(abc);
    }
    }
    else
    {
    approvebtn.setAttribute('class' , 'fa fa-check-circle');
    approvebtn.onclick =  function(abc)
    {
          toactivate(abc);
    }
    }
    mailbtn.onclick = function(abc)
    {
      document.getElementById('mail').style.display = "block";
    }
    updatebtn.onclick = function(abc)
    {
      document.getElementById('update').style.display = "block";
    }
    i++;
    actions.appendChild(mailbtn);
    actions.appendChild(updatebtn);
    actions.appendChild(approvebtn);
    tr.appendChild(name);
    tr.appendChild(phone);
    tr.appendChild(city);
    tr.appendChild(status);
    tr.appendChild(role);
    tr.appendChild(actions);
    tbody.appendChild(tr);
  }
  createdatatable();
})
xhttp.open("GET", "/getinfo");
xhttp.setRequestHeader("Content-Type", "application/json");
xhttp.send();
}

function createdatatable()
{
$(document).ready(function()
{
    $('#example').DataTable();
} )
}

function fillingbelow()
{
  var down1 = document.getElementById('example_info');
  down1.innerHTML = "Showing 1 to "+data.length+" of " + data.length +" entries ";
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

function toactivate(abc1)
{
  console.log(abc1);
  var am = document.getElementById('myModal4');
  am.style.display = "block";
  var byesbtn = document.getElementById('byesbtn2');
  byesbtn.onclick = function(abc)
{
    abc1.target.className = 'fa fa-times-circle';
    am.style.display = "none";
}
 var bnobtn = document.getElementById('bnobtn2');
 bnobtn.onclick , function(abc)
{
  console.log("****");
  am.style.display = "none";
}
}

function todeactive(abc1)
{
  console.log(abc1);
  var am = document.getElementById('myModal3');
  am.style.display = "block";
  var byesbtn = document.getElementById('byesbtn1');
  byesbtn.onclick , function(abc)
{
    abc1.target.className = 'fa fa-check-circle';
    am.style.display = "none";
}
 var bnobtn = document.getElementById('bnobtn1');
 bnobtn.onclick = function(abc)
{
  console.log("**!!");
  am.style.display = "none";
}
} 
