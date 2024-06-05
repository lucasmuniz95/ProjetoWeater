# Aplicativo de consumo da API weatherapi

## Índice

1. [Pré-requisitos](#pré-requisitos)
2. [Instalação](#instalação)
3. [Executando a Aplicação](#executando-a-aplicação)
4. [Uso](#uso)
5. [Equipe ](#equipe )

## Pré-requisitos

Antes de começar, certifique-se de que você atendeu aos seguintes requisitos:

- Docker instalado em sua máquina.
- Configuração funcional do Expo CLI para desenvolvimento em React Native.
- Um emulador móvel configurado (por exemplo, Android Studio ou iOS Simulator).

## Instalação

Para instalar e configurar o aplicativo Newsflash, siga estas etapas:

1. **Clone o repositório:**

    ```bash
    git clone <url-do-repositorio>
    ```

2. **Navegue até o diretório do projeto:**

    ```bash
    cd ProjetoWeater
    ```
    
3. **Instalar e atualizar as dependencias do projeto
   ```bash
    yarn install
    ```

4. **Construa e inicie o container Docker:**

    ```bash
    docker-compose up -d
    ```
5. **Execute o expo dentro do docker e escaneie o qrcode
   ```bash
    docker exec -it <nome_do_container_app1> yarn start
    ```
   obs: para pegar o nome do container só rodar o
   ```bash
   docker ps
   ```
   que aparece a lista dos containers

A API traz uma solução de mostrar a temperatura local atual, além da condição e um icone ilustrativo.

## fetch
É feito um fetch na url: http://api.weatherapi.com/v1/current.json para retornar o tempo atual e suas condições, como também na url: http://api.weatherapi.com/v1/forecast.json para retornar as previsões para o local.

## Obtenção do location
Dei prioridade para usar as propriedades navigator e geolocation concatenados ao método getCurrentPosition para obter os pontos de latitude e longitude do usuário ao invés de instalar react-native-location pela facilidade de implementação e por ser nativo do JavaScript. <br/>
O getCurrentPosition em um hook useEffect faz muito sentido e funciona bem.

## Componetização
Toda a aplcação foi desenvolvida no App.jsx, não há components.

### Equipe
Márcio Alex <br/>
Larissa Maria. <br/>
Lucas Muniz. <br/>
Matheus Lemos. <br/>
Maíra Nathalia. <br/>

### Responsabilidades
Larissa Maria e Maíra Nathalia - Reponsáveis pela pesquisa da documentação no site wheatherapi. <br/>
Márcio Alex, Lucas Muniz e Matheus Lemos - Responsáveis pela estruturação da aplicação. <br/>
Todos participaram da regra de negócio.





