FROM ubuntu:21.10

RUN apt-get update && \
    apt-get install curl -y 

RUN apt-get install --no-install-recommends -y libopenjp2-tools rpm gcc-multilib g++-multilib

RUN curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh

RUN bash nodesource_setup.sh

RUN apt-get install nodejs -y

COPY test.sh /test.sh

WORKDIR /project

