from cryptography.fernet import Fernet
from typing import Dict

# Fixed key for encryption and decryption
SECRET_KEY = Fernet.generate_key()
cipher = Fernet(SECRET_KEY)

def encrypt_credentials(credentials: Dict[str, str]) -> Dict[str, str]:
    """
    Encrypts the authentication credentials.
    """
    encrypted_credentials = {}
    for key, value in credentials.items():
        encrypted_value = cipher.encrypt(str(value).encode()).decode()
        encrypted_credentials[key] = encrypted_value
    return encrypted_credentials

def decrypt_credentials(encrypted_credentials: Dict[str, str]) -> Dict[str, str]:
    """
    Decrypts the authentication credentials.
    """
    decrypted_credentials = {}
    for key, value in encrypted_credentials.items():
        decrypted_value = cipher.decrypt(value.encode()).decode()
        decrypted_credentials[key] = decrypted_value
    return decrypted_credentials