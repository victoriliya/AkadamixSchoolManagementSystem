
new Vue({
	el: "#root",
	data: {
		message: "Hello from vue",
		password: ""
	}

})


if (PsWd.value.length > 0)
{
    //has to be more than 0
    if (PsWd.value.length > 15) 
    {
    //test the condition of more than 15 
    msg="The password needs to be less than 15";
    alert(msg);
    }
    // test for less than 8
    else if(PsWd.value.length < 8)                   
    {
    msg="The password needs to be have at least 8 characters: " 
    + PsWd.value.length +  PsWd.value.length;
    alert(msg);
    }                 
}
else
{
    alert('insert password');
}