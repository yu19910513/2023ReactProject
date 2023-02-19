##CURRENTLY NOT IN USE
from flask import Blueprint

# create a blueprint object for the controllers
controllers = Blueprint('controllers', __name__)

# import the controllers
from .userRoutes import *


# export the blueprint to be used in the app factory function
__all__ = ['controllers']
