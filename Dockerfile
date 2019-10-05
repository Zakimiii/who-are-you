FROM node:8.9 as builder

MAINTAINER zakimiii

ARG SOURCE_COMMIT
ENV SOURCE_COMMIT ${SOURCE_COMMIT}
ARG DOCKER_TAG
ENV DOCKER_TAG ${DOCKER_TAG}

# yarn > npm
#RUN npm install --global yarn

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

