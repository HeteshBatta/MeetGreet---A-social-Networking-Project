 var commpic = document.getElementById('commpicture');
 var namecom = document.getElementById('namecom');
var desc = document.getElementById('desc');
var owner = document.getElementById('commuity-owner-detail')
var btnforjoining = document.getElementById('btnforjoining');
var btnforjoining1 = document.getElementById('btnforjoining1');

filldetails();

function filldetails()
{
  var request = new XMLHttpRequest();
  request.addEventListener("load" , function(Abc)
{
  var data = JSON.parse(request.responseText);
  console.log(data);
  commpic.src=data[0].commpic;
  owner.innerHTML = data[0].CommunityOwner;
  namecomm.innerHTML = data[0].name;
  desc.innerHTML = data[0].description;
  if(data[0].MembershipRule=="Direct")
  {
    btnforjoining.innerText = "Join";
    btnforjoining1.innerText = "Join";
  }
  else
  {
      btnforjoining.innerText = "Ask for Join";
      btnforjoining1.innerText = "Ask for Join";
  }
})
request.open('GET', '/getcommunitydetails');
request.setRequestHeader("Content-Type" , "application/json");
request.send();
}

btnforjoining.onclick = function(abc)
{
  if(abc.target.innerText=='Join ')
  {
    abc.target.innerHTML='Joined';
    btnforjoining1.innerText='Joined';
  }
  else
  {
  abc.target.innerHTML = "Requested"
  btnforjoining1.innerText='Requested';
  }
}


btnforjoining1.onclick = function(abc)
{
  // console.log(abc);
  if(abc.target.innerText=='Join ')
  {
    abc.target.innerHTML='JOINED';
    btnforjoining.innerText='Joined';
  }
  else
  {
  abc.target.innerHTML = "Requested";
  btnforjoining.innerText='Requested';
  }
}
