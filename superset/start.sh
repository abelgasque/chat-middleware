# Executa o comando para fazer upgrade do banco de dados
docker exec superset superset db upgrade

# Cria o usuário administrador
docker exec superset superset fab create-admin --username admin --firstname Superset --lastname Admin --email admin@superset.com --password admin

# Inicializa o Superset
docker exec superset superset init
