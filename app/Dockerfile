FROM python:3.11-slim
RUN apt update && apt install -y iproute2 curl netcat-openbsd iputils-ping



WORKDIR /usr/src/app

ENV PYTHONPATH=/usr/src/app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"] 
