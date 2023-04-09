import redis
import cv2  # might need apt-get install libgl1
import numpy as np

redis_images = redis.StrictRedis(host="localhost", port=6379, db=0)
redis_metadata = redis.StrictRedis(host="localhost", port=6379, db=1)
img_path = "1680405420.png"

img1 = cv2.imread(img_path, 1)
retval, buffer = cv2.imencode(".png", img1)

image_bytes = np.array(buffer).tobytes()

redis_images.set(img_path[:-4], image_bytes)

redis_metadata.set(
    img_path[:-4],
    "[{Filename: 1680405430, Date: Sat Apr  1 2023, Time: 23:17:10, Status: Received, Identification: Adrian Chen, Confidence: 0.99616}]",
)


img1_bytes_ = redis_images.get(img_path[:-4])

decoded = cv2.imdecode(np.frombuffer(img1_bytes_, np.uint8), 1)
cv2.imwrite("cv2_redis.png", decoded)

"""
redis cli commands that are helpful
redis-cli --scan --pattern "*"
redis-cli get <KEY>
redis-cli FLUSHDB
"""

"""
database 0 will be the images, key the time since epoch, value the encoded image
database 1 will be the metadata, key the time since epoch, value the metadata
"""
