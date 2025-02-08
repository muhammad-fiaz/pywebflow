#  webflow/modules/arguments.py

import argparse


def parse_arguments():
    parser = argparse.ArgumentParser(description="Start PyWebflow app")
    parser.add_argument("--host", type=str, default="127.0.0.1", help="Host address")
    parser.add_argument("--port", type=int, default=8000, help="Port number")
    parser.add_argument("--reload", action="store_true", help="Enable auto-reloading")
    args, _ = parser.parse_known_args()
    return args
