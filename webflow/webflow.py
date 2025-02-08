import uvicorn
from webflow.modules import parse_arguments, app


def get_app():
    return app


def launch():
    args = parse_arguments()
    uvicorn.run(
        get_app(),
        host=args.host,
        port=args.port,
        reload=args.reload,
    )
