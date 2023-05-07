# Argus - A Computer-Vision Solution to Home Security
Argus is the capstone project for the Open-Source Senior Design course at Purdue University. 

# Overview
Track our progress on our project board [here](https://github.com/users/adrianchen8662/projects/2/views/1).
For more in-depth information and design choices made, check out [Adrian Chen's blog](https://adrianchen8662.github.io/final-project/).

# Contents
The repositories are split between the code used for the doorbell, and the code used for the server. 

## Building and installing Argus
There's a docker-compose.yml in the main directory and the /doorbell directory. The docker-compose.yml in the main directory is for the server, and the /doorbell directory is for the doorbell. The docker-compose.yml might require modification on the shared volume and the network being used, as each system is different. 

## Using Argus
Doorbell setup: input the ip address and port of the server, and the password that will be used to encrypt files being sent.  
Server setup: input the ip address and port of the doorbell, and the password that will be used to encrypt files being sent. Input the ip address and port of the database, and Compreface API.  

# Credits
## Team Members
[Ainesh Sootha](https://ainesh.co/)  
[Adrian Chen](https://adrianchen8662.github.io/)  
Justin Chan  

## Professor for ECE 49595
Santiago Torres-Arias

## Software Used
[Compreface](https://github.com/exadel-inc/CompreFace) - Used in the server for facial recognition and storage  
[OpenCV](https://github.com/opencv/opencv) - Used in the doorbell for quick detection of faces  
[ReactJS](https://github.com/facebook/react) - Used for the frontend for the doorbell and server  
[Python3](https://github.com/python/cpython) - Used for the backend for the doorbell and server  

# License
This project is released under the [GPL-3.0 license](https://github.com/adrianchen8662/argus/blob/main/LICENSE). For the full software bill of materials, SBOM, please see this document. 
