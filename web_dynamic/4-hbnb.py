#!/usr/bin/python3
""" Starts a Flask web application related to AirBnB clone """
from models import storage
from flask import Flask, render_template
from os import environ

app = Flask(__name__)
app.url_map.strict_slashes = False

@app.teardown_appcontext
def close_db(error):
    """ Close Storage """
    storage.close()

@app.route('/4-hbnb')
def hbnb():
    """ HBNB is alive! """
    states = storage.all("State").values()
    amenities = storage.all("Amenity").values()
    return render_template('4-hbnb.html',
                           states=states, amenities=amenities)

if __name__ == "__main__":
    """ Main Function """
    host = environ.get('HBNB_API_HOST', '0.0.0.0')
    port = int(environ.get('HBNB_API_PORT', '5000'))
    app.run(host=host, port=port, threaded=True)