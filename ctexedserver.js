//Colloborative Text Editor Author#Mallik
var ws=require('/var/www/mytv/ctexed/lib/ws/server');
var server = ws.createServer();
//Number of people  editing/viewing the file
var connectedusers=0;
//The snapshot of the recent doc content
var filecontent="";
server.addListener("connection", function(conn){
		//Send sanpshot to user who just connected
		conn.send(JSON.stringify({'action':'init','data': filecontent}));
		conn.addListener("message", function(message){
			//Message from connected user
			message = JSON.parse(message);
			message['id'] = conn.id;
			if(message['action']=='register')
			{
			//Action whne user just registers, increase the count of connected users, broadcast this to all users 
			connectedusers++;
			conn.send(JSON.stringify({'action':'usercount','users': connectedusers}));
			conn.broadcast(JSON.stringify({'action':'usercount','users': connectedusers}));
			conn.broadcast(JSON.stringify({'action':'realtime','text': message['uname']+' opened the file' }));
			}
			else
			{
			//An key pressed event from user, update it and send broadcast appropriately
			filecontent=updateDoc(filecontent,message['key'],message['pos']);			
			console.log(message['key']);
			//console.log(filecontent);
			//broadcast the request to update the content to other connected clients
			conn.broadcast(JSON.stringify({'action':'docupdate','key': message['key'], 'pos': message['pos']}));
			conn.broadcast(JSON.stringify({'action':'realtime','text': message['uname']+' edited the file' }));
			}

		});
});

server.addListener("close", function(conn){
		connectedusers--;
		conn.broadcast(JSON.stringify({'action':'usercount','users': connectedusers}));
		});

server.listen(8000);
function updateDoc(filecontent,key,pos)
{
	if(key==46)
	{
		filecontent=filecontent.substr(0, pos)+filecontent.substr(pos+1);
                return filecontent;
	}
        if(key>=37 && key <=40)
                return filecontent;
	if(key>=33 && key <= 126)
	{
			var actualChar=String.fromCharCode(key);
			filecontent=filecontent.substr(0, pos)+actualChar+filecontent.substr(pos);
	}
	if(key==13)
	{
		filecontent=filecontent.substr(0, pos)+'\n'+filecontent.substr(pos);
	}
	if(key==32)
	{
		filecontent=filecontent.substr(0, pos)+' '+filecontent.substr(pos);
	}
	if(key==8)
	{
		filecontent=filecontent.substr(0, pos-1)+filecontent.substr(pos);
	}
	return filecontent;
}
