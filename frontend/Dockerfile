FROM node:13.10.1
LABEL MAINTAINER="Fabian Pottbäcker"

WORKDIR /srv/code

# Load dependencies
COPY package.json package-lock.json ./
RUN npm install

# Load code
COPY . .

# Configure network attachment
ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3000
ENV URL 'http://hospitally.de'

# Interface documentation
EXPOSE 3000
VOLUME /srv/code

# Setup execution context
COPY docker/development/docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "run", "dev"]
