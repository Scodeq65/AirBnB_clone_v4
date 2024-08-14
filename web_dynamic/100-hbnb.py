#!/usr/bin/python3
""" Starts a Flash Web Application """
from models import storage
from flask import Flask, render_template
from os import environ

app = Flask(__name__)
app.url_map.strict_slashes = False


@app.teardown_appcontext
def close_db(error):
    """ Close Storage """
    storage.close()


@app.route('/100-hbnb')
def hbnb():
    """ HBNB """
    states = storage.all('State').values()
    amenities = storage.all('Amenity').values()
    return render_template('100-hbnb.html', states=states, amenities=amenities)


if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000)
