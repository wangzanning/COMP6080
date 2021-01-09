from flask_restplus import abort
from flask import request

def get_request_json():
    """Get the request body as a JSON object."""
    j = request.json
    if not j:
        abort(400, "Expected a JSON object. Make sure you've set the 'Content-Type' header to 'application/json'.")
    return j

def get_request_arg(arg, type=str, required=False, default=None):
    """Get the value of arg from request.args, converted it using `type`.
    
    - If arg is provided but could not be parsed by `type`, then a 400 error is thrown.
    - If requires is True and the arg is not provided, then a 400 error is thrown.
    - If required is False and the arg is not provided, then default is returned.
    """
    if arg not in request.args:
        if required:
            abort(400, "Expected '{}' query parameter".format(arg))
        else:
            return default
    else:
        try:
            return type(request.args[arg])
        except:
            abort(400, "Query parameter '{}' malformed".format(arg))
