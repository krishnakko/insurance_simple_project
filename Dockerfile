FROM python:3.7

RUN mkdir -p /usr/local/testing/ \
    /usr/local/data \
    /usr/local/config \
    /var/lib/mysql

# Create app directory
WORKDIR /usr/local/testing/

# Install app dependencies
COPY /src/ /usr/local/testing/src/
COPY requirements.txt ./

RUN pip install --upgrade pip

RUN pip install -U Flask && \
    pip install Flask-RESTful && \
    pip install Flask-JWT && \
    pip install flask-bcrypt && \
    pip install Flask-Migrate && \
    pip install flask_login && \
    pip install sqlalchemy && \
    pip install psycopg2-binary && \
    pip install --upgrade werkzeug  && \
    pip install pyyaml  && \
    pip install pymysql && \
    pip install cryptography && \
    pip install simplejson && \
    pip install flask_wtf && \
    pip install wtforms_sqlalchemy && \
    pip install lxml && \
    pip install bs4 && \
    pip install requests && \
    pip install pandas && \
    pip install requests_cache


RUN pip install flask_restplus
RUN pip install flask-restx
RUN pip install flask_cors
RUN pip install pandas
# RUN pip install Werkzeug==0.16.1

ENTRYPOINT ["python"]
CMD ["src/run.py"]

EXPOSE 5000 7070 7080 7090 8080 8090 9000 
