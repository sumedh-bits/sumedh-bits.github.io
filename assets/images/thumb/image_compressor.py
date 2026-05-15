# Simple image compression script to reduce the size for thumbnail images.

import sys
from PIL import Image

filename = sys.argv[1]
img = Image.open(filename)
img.thumbnail((2500, 2500))
img.save(filename)