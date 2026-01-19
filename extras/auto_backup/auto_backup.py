import json
import datetime
from pymongo import MongoClient


with open("src/config.json", "r") as f:
    MONGO_URL = json.load(f).get("mongoURL")

client = MongoClient(MONGO_URL)
db = client["experience"]
backup_collection = db["backup"]
members_collection = db["members"]
cursor = members_collection.find({})
members_count = members_collection.count_documents({})
documents = []
i = 1

# This is a sledgehammer that backups the "members" db and also exports it as json
with open(f"./extras/auto_backup/backup_{datetime.datetime.now(datetime.UTC).strftime('%Y_%m_%d')}.json", "w") as f:
    f.write("[")

    for doc in cursor:
        documents.append(doc)
        f.write(
            json.dumps(
                {
                    "_id": {
                        "$oid": str(doc["_id"])
                    },
                    "id": doc["id"],
                    "xp": doc["xp"]
                },
                indent=2
            )
        )
        if i != members_count:
            f.write(",")
        i += 1

    f.write("]")

backup_collection.delete_many({})
backup_collection.insert_many(documents)

client.close()
