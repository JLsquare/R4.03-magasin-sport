from locust import HttpUser, task, between

class SimpleApiUser(HttpUser):
    wait_time = between(1, 5)

    @task
    def get_articles(self):
        self.client.get("/articles")

    @task
    def create_article(self):
        article = {
            "marque": "Nike",
            "prix": "100.0",
            "nom": "Chaussures de sport",
            "reference": "REF12345",
            "categorie": "senior",
            "tailles": [40, 41, 42],
            "fournisseur": {
                "nom": "SportSupplier",
                "adresse": "123 Rue Sport"
            },
            "rayon_id": "60d21b4667d0d8992e610c85"
        }
        self.client.post("/articles", json=article)

    @task
    def update_article(self):
        article = {
            "marque": "Adidas",
            "prix": "150.0",
            "nom": "Chaussures de sport",
            "reference": "REF67890",
            "categorie": "junior",
            "tailles": [38, 39, 40],
            "fournisseur": {
                "nom": "SportSupplier",
                "adresse": "123 Rue Sport"
            },
            "rayon_id": "66589ac6d4b212f0082202d8"
        }
        self.client.put("/articles/66589fa7d4b212f0082202da", json=article)

    @task
    def delete_article(self):
        self.client.delete("/articles/66589fa7d4b212f0082202da")

    @task
    def get_rayons(self):
        self.client.get("/rayons")

class MongoClientApiUser(SimpleApiUser):
    host = "http://localhost:3000"

class MongooseClientApiUser(SimpleApiUser):
    host = "http://localhost:3001"