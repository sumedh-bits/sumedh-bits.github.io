from PIL import Image
import json
import sys

# filename = "20240915_113942.jpg"
# path = "full/" + filename
# img = Image.open(path)
# img_exif = img._getexif()
# print(img_exif)
# shutterspeed = 1/img_exif.get(33434)
# iso = img_exif.get(34866)
# aperture = img_exif.get(33437)
# json_child = {"name": filename, "group": "", "description": "", "dimensions": str(img.width) + "-" + str(img.height), "settings": "1/"+ str(shutterspeed) + "s ISO" + str(iso) + " f/" + str(aperture), "location": ""}
# #img.save("thumb/" + filename, quality=100)
# print(json.dumps(json_child, indent=4))

filenames = sys.argv[1:]
for filename in filenames:
    img = Image.open("full/" + filename)
    img.thumbnail((3000, 3000))
    img.save("thumb/" + filename)
    img_exif = img._getexif()
    shutterspeed = 1/img_exif.get(33434)
    iso = img_exif.get(34866)
    aperture = img_exif.get(33437)
    json_child = {"name": filename, "group": "", "description": "", "dimensions": str(img.width) + "-" + str(img.height), "settings": "1/"+ str(shutterspeed) + "s ISO" + str(iso) + " f/" + str(aperture), "location": ""}
    print(json.dumps(json_child, indent=4))