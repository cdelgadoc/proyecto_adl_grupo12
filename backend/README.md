1. Crear el Entorno Virtual

    python -m venv vicloud


2. Iniciar el entorno virtual

    source vicloud/Scripts/activate


3.	Instalar las dependencias haciendo uso del archivo requeriments.txt que se encuentra en la raíz del proyecto, utilizando el siguiente comando:

    pip install -r requirements.txt


4.	Correr el programa utilizando el siguiente comando:

    uvicorn main:app

    uvicorn app:app --reload


