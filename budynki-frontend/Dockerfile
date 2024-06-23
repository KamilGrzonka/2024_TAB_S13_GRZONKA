FROM node:22-slim

WORKDIR /app

RUN npm install -g pnpm

RUN pnpm config set global-bin-dir /usr/local/bin

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

RUN pnpm install serve -g

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["serve", "-s", "dist"]
