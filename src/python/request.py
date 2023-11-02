from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://dbNatJuri:dbNatJuriPassword@ddrmy.bg5wlap.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

#informa o nome do banco de dados
db = client["nat-juri"]

#acessa a coleção legis-data
collection = db["legis-data"]

#dados de exemplo para inserir
documento_exemplo = {
    "titulo": "Lei Exemplo",
    "descricao": "Esta é uma lei de exemplo para teste.",
    "ano": 2023
}

#inserir o documento de exemplo na coleção

insercao = collection.insert_one(documento_exemplo)

#verifica se a inserção foi bem sucedida

if insercao.inserted_id:
    print("Documento inserido com sucesso!", insercao.inserted_id)
else:
    print("Erro ao inserir documento!")


# Send a ping to confirm a successful connection
# try:
#     client.admin.command('ping')
#     print("Pinged your deployment. You successfully connected to MongoDB!")
# except Exception as e:
#     print(e)