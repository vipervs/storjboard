StorjBoard Script(beta)
=========

Install
=========
Download the latest release

wget https://github.com/Aksimant/storjboard/archive/0.0.16.tar.gz
tar xvf 0.0.16.tar.gz
cd storjboard-0.0.16

Start & Autostart on reboot
=========

npm install pm2 -g
pm2 start script_storjboard.js --name storjboard
pm2 startup
-> do as requested

Status
=========
pm2 status


Done Thx, credits for this script to Aksimant
