import docker
import os

# Set up Docker client
client = docker.from_env()

# Define the source and target directories
source_path = "/path/to/image.jpg"
target_path = "/data/image.jpg"

# Create the volume if it doesn't already exist
volume_name = "my_volume"
if volume_name not in [v.name for v in client.volumes.list()]:
    client.volumes.create(name=volume_name)

# Copy the file from the source directory to the volume
with open(source_path, "rb") as f:
    contents = f.read()
    container = client.containers.run(
        "alpine",
        command=["sh", "-c", f"echo -n {contents.decode()} > {target_path}"],
        remove=True,
        volumes={volume_name: {"bind": "/data", "mode": "rw"}},
    )
