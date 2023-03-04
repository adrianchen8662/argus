import requests

if __name__ == "__main__":
    """
    Have a schedule set based on autoudpate.yaml on how often to update
    Close doorbell process
    Get latest release on a schedule
    Install and check dependencies
    Restart doorbell process
    """
    response = requests.get(
        "https://api.github.com/repos/adrianchen8662/argus/releases/latest"
    )
