module.exports = {
    "port": 80,
    "appEndpoint": "http://localhost:80",
    "apiEndpoint": "http://localhost:80",
    "jwt_secret": "myS33!!creeeT",
    "jwt_expiration_in_seconds": 36000,
    "environment": "dev",
    "permissionLevels": {
        "NORMAL": 1,
        "OWNER": 4,
        "ADMIN": 2048
    }
};
