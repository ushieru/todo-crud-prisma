FROM node:18-alpine AS builder
ENV DATABASE_URL=file:./database.sqlite
WORKDIR /app
COPY package.json .
COPY prisma/ prisma/
COPY src/ src/
RUN npm install
RUN npm run prisma:setup
RUN npm run build
EXPOSE 3000
CMD [ "node", "dist" ]
