import pymongo

url = 'mongodb://localhost:27017/'
myclient = pymongo.MongoClient(url)
db = myclient['ecodrop']

