import requests
from bs4 import BeautifulSoup
from time import sleep
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

url = "http://www.planalto.gov.br/ccivil_03/Leis/2002/L10406.htm"


# Configurações do MongoDB
mongo_uri = "mongodb://localhost:27017/"  # Substitua pelo URI correto do seu MongoDB
db_name = "meu_database"  # Substitua pelo nome do seu banco de dados
collection_name = "minha_collection"  # Substitua pelo nome da sua coleção



headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
}

response = requests.get(url, headers=headers)
if response.status_code == 200:
    soup = BeautifulSoup(response.text, "html.parser")
    # Encontra todas as tags <strike> e as remove juntamente com o seu conteúdo
    for strike_tag in soup.find_all("strike"):
        strike_tag.decompose()
    # Encontra todas as tags <p> que contém o style "text-decoration: line-through" e as remove juntamente com o seu conteúdo
    for style_tag_p in soup.find_all("p"):
        if "text-decoration: line-through" in style_tag_p.get_text():
            style_tag_p.extract()
    # Encontra todas as tags <table> e as remove juntamente com o seu conteúdo
    for table in soup.find_all("table"):
        table.decompose()
    # Encontra todas as tags <style> que contém o style "text-decoration: line-through" e as remove juntamente com o seu conteúdo
    for style_tag in soup.find_all("span"):
        if "text-decoration: line-through" in style_tag.get_text():
            style_tag.extract()
    # Obtém o texto limpo, inclunido as outras tags HTML
    clean_text = str(soup)
else:
    print("Falha ao recuperar a página. Código de status:", response.status_code)