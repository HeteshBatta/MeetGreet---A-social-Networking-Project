var list = document.getElementById('list');
function search(){
        var x=document.getElementById('search').value;
        document.getElementById('list').innerHTML="";
        fillpage(x);

    }
fillpage("");
function fillpage(search)
{
  var request = new XMLHttpRequest();
  request.addEventListener('load', function()
{
  var data = JSON.parse(request.responseText);
  console.log(data);
  var i=0;
  while(i<data.length)
  {
    var li = document.createElement('li');
    var div = document.createElement('div');
    div.setAttribute('class' , 'listkidiv');
    var divforpic = document.createElement('div');
    divforpic.setAttribute('class' , 'divforpic');
    var p1 = document.createElement('a');
    p1.innerHTML = data[i].name;
    p1.setAttribute('class' , 'commname');
    p1.setAttribute('href' , 'http://localhost:8000/communitydetails')
    p1.onclick = function(abc)
    {
      var req = new XMLHttpRequest();
      req.addEventListener('load' , function(abc)
    {

    })
    req.open("POST", "/valueofa");
    req.setRequestHeader("Content-Type" , "application/json");
    req.send(JSON.stringify({'avalue' : abc.target.innerHTML}));
    }
    var commpicc = document.createElement('img');
    commpicc.setAttribute('class' , 'compicc');
    commpicc.setAttribute('src' , data[i].commpic);
    var p = document.createElement('p');
    p.setAttribute('class' , 'commdescription');
    p.innerHTML = data[i].description;
    var joinbtn = document.createElement('button');
    joinbtn.setAttribute('class' , 'commbtn');
    var br = document.createElement('br');
    if(data[i].MembershipRule=='Direct')
    {
      joinbtn.innerHTML = 'JOIN';
    }
    else
    {
    joinbtn.innerHTML = 'Ask To JOIN';
    }
    joinbtn.onclick = function(abc)
    {
      if(event.target.innerHTML=='JOIN')
     {
      var req = new XMLHttpRequest();
      req.addEventListener('load' , function(abc)
      {
      fillpage("");
      })
    req.open("POST", "/join1");
    req.setRequestHeader("Content-Type" , "application/json");
    req.send(JSON.stringify({'type':event.target.innerHTML,'info':event.target.parentNode.children[1].innerHTML}));
 }
 else{
  var req = new XMLHttpRequest();
      req.addEventListener('load' , function(abc)
    {
      filldata("");
    })
    req.open("POST", "/join2");
    req.setRequestHeader("Content-Type" , "application/json");
    req.send(JSON.stringify({'type':event.target.innerHTML,'info':event.target.parentNode.children[1].innerHTML}));
 }
      console.log(abc.target.parentNode.children[1].innerText);
      if(abc.target.innerHTML=="JOIN")
      {
        abc.target.innerHTML="JOINED";
      }
      else
      {
        abc.target.innerHTML="Requested";
      }
    }
    divforpic.appendChild(commpicc);
    div.appendChild(divforpic);
    div.appendChild(p1);
    div.appendChild(p);
    div.appendChild(joinbtn);
    li.appendChild(div);
    li.appendChild(br);
    li.appendChild(br);
    list.appendChild(li);
    i++;
  }
});
  request.open('POST', '/getcommunitydata');
  request.setRequestHeader("Content-Type" , "application/json");
  request.send(JSON.stringify({'search':search}));
}
