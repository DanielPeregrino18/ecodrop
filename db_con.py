import pymongo

url = "mongodb+srv://danyperegrinol:4grEEZdN3fiUtxFr@ecodrop.gkwkj.mongodb.net/?retryWrites=true&w=majority&appName=Ecodrop"
myclient = pymongo.MongoClient(url)
db = myclient['ecodrop']
