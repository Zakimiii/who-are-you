FROM node:8.9 as denpendency

MAINTAINER zakimiii

ARG SOURCE_COMMIT
ENV SOURCE_COMMIT ${SOURCE_COMMIT}
ARG DOCKER_TAG
ENV DOCKER_TAG ${DOCKER_TAG}

# yarn > npm
#RUN npm install --global yarn

RUN apt-get -y -qq update

RUN echo "mysql-server mysql-server/root_password password root" | debconf-set-selections && \
    echo "mysql-server mysql-server/root_password_again password root" | debconf-set-selections && \
    apt-get -y install mysql-server

# RUN apt-get install -y vim \
#   && apt-get install -y mysql-client \
#   # && apt-get install -y mysql-server \
#   && apt-get install -y gcc \
#   && apt-get install -y curl \
#   && apt-get install -y bash \
#   && apt-get install -y file \
#   && apt-get install -y openssh-server \
#   && apt-get install -y ssh \
#   && apt-get install -y build-essential \
#   && apt-get install -y openssl \
#   # && apt-get install -y mecab \
#   # && apt-get install -y libmecab-dev \
#   # && apt-get install -y mecab-ipadic-utf8 \
#   && apt-get install -y git \
#   && apt-get install -y make \
#   && apt-get install -y curl \
#   && apt-get install -y xz-utils \
#   && apt-get install -y file \
#   && apt-get install -y sudo \
#   && apt-get install -y wget \
#   && apt-get install -y bzip2 \
#   && apt-get install -y libtool \
#   && apt-get install -y shtool \
#   && apt-get install -y autogen \
#   && apt-get install -y autoconf \
#   && apt-get install -y automake \
#   && apt-get install -y swig

RUN npm install -g yarn

RUN npm install -g yarn \
  && npm install sequelize-cli -g \
  && yarn global add babel-cli

WORKDIR /var/app
RUN mkdir -p /var/app
ADD package.json yarn.lock Pipfile Pipfile.lock /var/app/
RUN yarn install --non-interactive --frozen-lockfile
# MEMO: this pipenv not for python3 because app throw module not found error
# RUN pipenv install


FROM denpendency as builder

WORKDIR /var/app
COPY . /var/app

WORKDIR /var/app/scripts

RUN cp docker-server-entrypoint.sh /usr/local/bin/ && \
  chmod +x /usr/local/bin/docker-server-entrypoint.sh

WORKDIR /var/app/
ENV PORT 8070
EXPOSE 8070

# ENV NODE_ENV staging
# RUN mkdir tmp \
#   && mkdir dist

ENV NODE_ENV production
RUN mkdir tmp \
  && mkdir dist \
  && yarn dbuild \
  && yarn build

ENTRYPOINT [ "/usr/local/bin/docker-server-entrypoint.sh" ]


# FIXME TODO: fix eslint warnings
# RUN mkdir tmp && \
#   npm test && \
#   ./node_modules/.bin/eslint . && \
#   npm run build

