import json
from datetime import datetime
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

# Terrible (took me like 10 minutes bc I don't want to do it by hand)
# tool to automatically create backups and export them as json
with open(f"./extras/auto_backup/backup_{datetime.utcnow().strftime('%d_%m_%Y')}.json", "w") as f:
    f.write("[")

    for doc in cursor:
        documents.append(doc)
        # TypeError: Object of type ObjectId is not JSON serializable v 🙄🙄🙄
        f.write(
            json.dumps(
                {"_id": {"$oid": str(doc["_id"])}, "id": doc["id"], "xp": doc["xp"]},
                indent=2,
            )
        )
        if i != members_count:
            f.write(",")
        i += 1

    f.write("]")

# backup_collection.delete_many({})
# backup_collection.insert_many(documents)

client.close()
