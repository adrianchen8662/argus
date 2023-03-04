# **Doorbell Client**

Doorbell client written in Python3. 
The client is able to detect if a person is detected and sends an image to the server using an HTTP connection. 

## **Settings and Configurations**
### *haarcascade_frontalface_default.xml*
Contains the data that the opencv module uses to detect faces. This dataset was trained for recognizing faces from the front only. <br />
<sub>The reason why this dataset was chosen over other datasets was because a person who is directly looking at the camera would be someone we would want to identify. If the dataset was trained on just any human, passerby who were not looking at the camera would result in extra data being sent.</sub>
### *connectsettings.json*
The connectsettings.json file contains the following fields:
* Address/Domain
    Contains the address where the server can be reached. This can either be an ip address or a domain. However, it cannot contain the port number, as the port field holds that information. 
* Port
    Contains the port number of the server that the ingest webserver is hosted on. The same port should be defined on the server's connectsettings.json. 
* AES Encryption Password
    Contains the password that the doorbell will use to encrypt the files before sending. The same password should be defined on the server's connectsettings.json. <br />
    <sub>This was done in leiu of HTTPS as it would require creating an SSL certificate when connections might not even be possible due to CGNATs. An easier and more configurable option was encrypting the files themselves and setting the passwords manually, all while maintaining the same level of security as HTTPS.</sub>
* Connection Status
    Contains the current connection status from the doorbell to the server. The field will have the value "True" if files are able to be sent to the server, and "False" if the files are not able to be sent to the server. 

## **Variable and function naming convention:**
Variables are all lowercase, with words broken up by underscores<br />
Functions start lowercase, with words broken up by uppercase<br />
Constants are all uppercase, with words broken up by underscores<br />
Code files are all lowercase, with words not broken up<br />

## Feature To-Do List:
- [X] Webserver connection to server
- [X] Secure connection with AES encryption
- [X] Fast detection of humans
- [X] Autocleaned local cache
- [ ] Stretch Goal - audio and video connection