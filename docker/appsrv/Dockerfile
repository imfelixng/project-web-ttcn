FROM alpine:3.7

RUN apk update
RUN apk add python3 make git openssh \
    uwsgi uwsgi-python3 uwsgi-http

ENV PYTHON_PIP_VERSION 10.0.0

RUN set -ex \
    && if [ ! -e /usr/local/bin/pip3 ]; then : \
        && wget -O /tmp/get-pip.py 'https://bootstrap.pypa.io/get-pip.py' \
        && python3 /tmp/get-pip.py "pip==$PYTHON_PIP_VERSION" \
        && rm /tmp/get-pip.py \
    ; fi \
    && pip3 install --no-cache-dir --upgrade --force-reinstall "pip==$PYTHON_PIP_VERSION" \
    && rm -rf /usr/src/python ~/.cache \
    && mkdir /app

RUN pip freeze
RUN ln -sf `which python3` /usr/bin/python && python --version

RUN rm -rf /var/cache/apk/*

ENV CODE_BRANCH "backend"
ENV PRODUCT_NAME "project-web-ttcn"
ENV CODE_REPO "https://github.com/ngquangan/project-web-ttcn.git"
ENV ENV="product"
ENV PYTHONPATH='/app/src'

ADD app /app/

RUN mkdir -p /app/log /app/$PRODUCT_NAME \
    && adduser -s /usr/bin/nologin -D -H www-data \
    && chown -R www-data:www-data /app/log /app/$PRODUCT_NAME \
    && chmod +x /app/x-*

RUN /app/x-clone

WORKDIR /app/$PRODUCT_NAME

EXPOSE 5000

ENTRYPOINT ["/app/x-run"]
