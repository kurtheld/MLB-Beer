import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template, send_file, request
from flask_sqlalchemy import SQLAlchemy
import json
app = Flask(__name__)


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/index.html")
def index2():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/brewery.html")
def brewery():
    """Return the homepage."""
    return render_template("brewery.html")


with open('static/beer.json') as jsonfile:
    beer_json = json.load(jsonfile)


@app.route('/jsonfile')
def jsonfile():
    return jsonify(beer_json)


with open('static/brewery.json') as brewery_info:
    brewery_json = json.load(brewery_info)


@app.route('/breweryjsonfile')
def breweryjsonfile():
    return jsonify(brewery_json)


if __name__ == "__main__":
    app.run()
