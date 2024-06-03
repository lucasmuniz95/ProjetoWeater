# Aplicativo de consumo da API weatherapi

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
Maíra Nathalia.
