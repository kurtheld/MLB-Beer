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

# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/beerdata.sqlite"
# db = SQLAlchemy(app)

# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(db.engine, reflect=True)

# # Save references to each table
# Samples_Metadata = Base.classes.sample_metadata
# Samples = Base.classes.samples



@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route('/get_image')
def get_image():
    # request.args.get('type') == '1':
    filename = 'static/images/0.png'
    # else:
    #    filename = 'let_me_look_for_it'
    return send_file(filename, mimetype='image/gif')


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
