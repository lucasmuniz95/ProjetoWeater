# Use a imagem oficial do Node.js como base
FROM node:20

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o arquivo package.json e yarn.lock para o diretório de trabalho
COPY package.json yarn.lock ./

# Instala as dependências do projeto
RUN yarn install

# Copia o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Expo Web server
EXPOSE 19006

# Inicia o servidor de desenvolvimento do Expo
CMD ["yarn", "start"]