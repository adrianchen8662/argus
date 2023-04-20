import requests

url = "http://127.0.0.1:5000/postimage"
my_img = {"image": open("1681940533.jpg", "rb")}
r = requests.post(url, files=my_img)

# convert server response into JSON format.
print(r.json())
