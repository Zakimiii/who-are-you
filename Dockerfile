FROM python:3.7 as setup
MAINTAINER zakimiii

RUN apt-get -y -qq update
RUN apt-get install -y mariadb-client \
  && apt-get install -y vim \
  && apt-get install -y mysql-client \
  && apt-get install -y mysql-server \
  && apt-get install -y gcc \
  && apt-get install -y curl \
  && apt-get install -y bash \
  && apt-get install -y file \
  && apt-get install -y openssh-server \
  && apt-get install -y ssh \
  && apt-get install -y build-essential \
  && apt-get install -y openssl \
  # && apt-get install -y mecab \
  # && apt-get install -y libmecab-dev \
  # && apt-get install -y mecab-ipadic-utf8 \
  && apt-get install -y git \
  && apt-get install -y make \
  && apt-get install -y curl \
  && apt-get install -y xz-utils \
  && apt-get install -y file \
  && apt-get install -y sudo \
  && apt-get install -y wget \
  && apt-get install -y bzip2 \
  && apt-get install -y libtool \
  && apt-get install -y shtool \
  && apt-get install -y autogen \
  && apt-get install -y autoconf \
  && apt-get install -y automake \
  && apt-get install -y swig


FROM setup as python
RUN mkdir local
WORKDIR local

# ENV IPADIC_VERSION 2.7.0-20070801
# ENV ipadic_url https://drive.google.com/uc?export=download&id=0B4y35FiV1wh7MWVlSDBCSXZMTXM

# WORKDIR /local
# RUN mkdir crf
# RUN cd crf
# RUN curl -L -o CRF++-0.58.tar.gz 'https://drive.google.com/uc?export=download&id=0B4y35FiV1wh7QVR6VXJ5dWExSTQ'
# RUN tar -zxf CRF++-0.58.tar.gz
# WORKDIR CRF++-0.58
# RUN ./configure
# RUN make
# RUN make install

# WORKDIR /local
# RUN git clone --depth 1 https://github.com/neologd/mecab-ipadic-neologd.git \
# && mecab-ipadic-neologd/bin/install-mecab-ipadic-neologd -n -y

# WORKDIR /local
# ENV CPPFLAGS -I/usr/local/include
# RUN git clone https://github.com/Zakimiii/cabocha-0.69.git
# WORKDIR cabocha-0.69
# RUN echo "/usr/local/lib" >> /etc/ld.so.conf.d/lib.conf
# RUN ldconfig
# RUN ./configure --prefix=/usr/local --with-charset=utf8
# RUN make
# RUN make install

# WORKDIR python
# RUN python setup.py install

# RUN pip3 install mecab-python3 beautifulsoup4 pandas urllib3
RUN pip3 install pipenv

# WORKDIR /local
# RUN git clone https://github.com/kenkov/cabocha
# RUN pip3 install cabocha/ \
RUN pip3 install uuid \
  && pip3 install pandas \
  && pip3 install  urllib3 \
  && pip3 install  beautifulsoup4 \
  && pip3 install tornado==4.5.3 \
  && pip3 install asyncio \
  && pip3 install sklearn \
  && pip3 install numpy \
  && pip3 install requests \
  && pip3 install nltk \
  && pip3 install datetime \
  && pip3 install html2text \
  && pip3 install gensim \
  && pip3 install google \
  && pip3 install janome \
  && pip3 install paramiko

# RUN git clone https://github.com/Zakimiii/pytermextract.git
# WORKDIR pytermextract
# RUN python setup.py install

FROM python as denpendency

ARG SOURCE_COMMIT
ENV SOURCE_COMMIT ${SOURCE_COMMIT}
ARG DOCKER_TAG
ENV DOCKER_TAG ${DOCKER_TAG}

RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
RUN apt-get install -y nodejs

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

