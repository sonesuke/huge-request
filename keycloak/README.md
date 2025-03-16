# Keycloak Setup

下記のコマンドで、Keycloak のインスタンスを立ち上げる。

docker compose up

`http://localhost:18080`にアクセスし、Keycloak のコンソールにログインする。

下記のインストラクションに従って、realm, user, client を作成する。

https://www.keycloak.org/getting-started/getting-started-docker

realm: `myrealm`

## User の設定

user: `user`
Verified Email: ON
password: `user`
Temporary OFF

## Client の設定

client type: `OpenID Connect`
client id: `myclient`
Valid Redirect URIs: `*`
Web Origins: `*`
