# **who are you?**

##### Twitter連携でカンタンに始められる、一問一答形式の自己紹介・他己紹介サービス ( https://whoareyou-jp.com/ )

## Installation

#### Docker + CircleCI

Dockerを使うと速やかに本番環境モードでwho are you?を立ち上げることができます。ただし、現在サイトに公開してあるwho are you?のDocker Imageは非公開ですので、各々で環境変数を設定してContainerを起動してください。

```
docker run YOUR_DOCKER_USERNAME/who-are-you
```

自分自身でDocker Imageをビルドする時はGithubからwho are you?をPCにCloneし、パラーメーター設定後、ビルドしてください。

````
git clone https://github.com/Zakimiii/who-are-you
cd who-are-you
docker build .
````

## Useage

#### Clone the repository and make a tmp folder

````
git clone https://github.com/Zakimiii/who-are-you
cd who-are-you
mkdir tmp
````

### Install dependencies on Javascript

````
nvm install v8.7
npm install -g yarn
yarn global add babel-cli
yarn install --frozen-lockfile
yarn run build
````

### Install dependencies on Python3(I recommend python versions of 3.6 or 3.7)

```
sudo pip3 install pipenv
sudo pipenv install
```

### Install mysql server(I recommend mysql -v >= 5.7)

````
brew update
brew doctor
brew upgrade
brew install mysql@5.7
brew link mysql@5.7 --force
mysql.server restart
````

### Setting mysql

```
sudo mysql -u root # you success this command, mysql successfully installed
DROP USER 'root'@'localhost';
CREATE USER 'root'@'%' IDENTIFIED BY '';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';
FLUSH PRIVILEGES;
```

### Database migrations

migration時前にDatabaseの設定を行う必要があります。

`src/db/config/config.json`を変更することでどのDatabaseにどのような条件で接続できるかをPCに合わせて変更してください。

````
sudo npm install sequelize-cli -g
cd src/db
sudo sequelize db:drop && sudo sequelize db:create && sudo sequelize db:migrate
````

### Set Seed Data

````
cd src/db
sudo sequelize db:seed:all
````

もしシードデータのカスタマイズを行いたい時は``src/db/seeders ``と``src/db/test_data``配下のファイルを変更してください。

````javascript
const data = require('../test_data');
const results = data({
    users_limit: 100,
    headings_limit: 100,
    answers_limit: 100,
    searchHistories_limit: 100,
    developers_limit: 1,
    notifications_limit: 1,
    categories_limit: 100,
    communities_limit: 100,
    communityTemplates_limit: 100,
    communityHeadings_limit: 100,
    communityAnswers_limit: 100,
    /*
    Edit this args of number. Seed data will be set by this numbers.
    */
});
````

### Set who are you? Gateway API Key and Other Environment Variables

**$NODE_PATH/application/env/\$NODE_ENV/env.json** のファイルに様々な変数を定義することで環境変数を定義していきます。

who are you?はURLへのアクセスの際は、KEYとPASSWORDの整合性次第でレスポンスを返すモジュールを作成しているので、シードデータを見て随時変更してください。

````json
"API": {
    "KEY": "API KEY of develop api_key colomn",
    "PASSWORD": "PASSWORD of decode in a develop password colomn"
}
````

### To run who-are-you in production mode

```
sudo yarn run build
sudo yarn run production
```

### To run who-are-you in development mode

```
sudo yarn run start
```

