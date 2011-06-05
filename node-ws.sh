mkdir lib
cd lib
sudo curl -O https://github.com/miksago/node-websocket-server/raw/master/lib/_events.js
sudo curl -O https://github.com/miksago/node-websocket-server/raw/master/lib/_util.js
mkdir lang
cd lang
sudo curl -O https://github.com/miksago/node-websocket-server/raw/master/lib/lang/mixin.js
cd ..
mkdir ws
cd ws
sudo curl -O https://github.com/miksago/node-websocket-server/raw/master/lib/ws/connection.js
sudo curl -O https://github.com/miksago/node-websocket-server/raw/master/lib/ws/server.js
sudo curl -O https://github.com/miksago/node-websocket-server/raw/master/lib/ws/manager.js
sudo curl -O https://github.com/miksago/node-websocket-server/raw/master/lib/ws/parser.js