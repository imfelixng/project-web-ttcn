# install python3
sudo add-apt-repository ppa:jonathonf/python-3.6
sudo apt-get update
sudo apt-get install python3.6

# install pip3
sudo apt-get -y install python3-pip

# install lib
pip3 install -r requirements.txt

# Run project
make run