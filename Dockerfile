FROM nikolaik/python-nodejs:latest

RUN mkdir /app
WORKDIR /app
COPY package*.json yarn.lock ./

RUN yarn install

ENTRYPOINT [ "yarn" ]
CMD [ "start" ]

ENTRYPOINT [ "gatsby" ]
CMD [ "build" ]

COPY . /app
