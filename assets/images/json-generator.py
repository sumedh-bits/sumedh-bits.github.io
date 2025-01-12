from PIL import Image, ExifTags
import glob
import json
images = glob.glob('full/*.jpg')
mainjson = {}
mainjson["images"] = []
somearray = []
for image in images:
    img = Image.open(image)
    img_exif = img._getexif()
    shutterspeed = 1/img_exif.get(33434)
    iso = img_exif.get(34866)
    aperture = img_exif.get(33437)
    json_child = {"name": image, "group": "", "description": "", "dimensions": str(img.width) + "-" + str(img.height), "settings": "1/"+ str(shutterspeed) + "s ISO" + str(iso) + " f/" + str(aperture), "location": ""}
    img.close()
    somearray.append(json_child)
    
mainjson["images"] = somearray

finaljson = json.dumps(mainjson)

with open("info2.json", mode="w", encoding="utf-8") as write_file:
    json.dump(finaljson, write_file)