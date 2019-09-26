# **Selfinity** 

##### The system that values with wisdom for solving some problems and send all individuals the values.

![img](https://gitlab.com/Zakimiii/selfinity-web/raw/recommend-item/src/app/assets/images/selfinity-logo.png)

## Welcome to Selfinity

![img](https://gitlab.com/Zakimiii/selfinity-web/raw/master/src/assets/images/brands/summary.png)

``Selfinity`` is **an application of brand new bulletin board of BlockChain**.

Also ``Selfinity`` use  **Contributes based Rewarding System(CRS)**

This app's database is cretified by CRS . Futhermore, the information that you can get is improved by selfinity AI such as Recommend engine .

You will notice charm of many field that you overwatched and get much wisdom for your interest and life routine. Selfinity has **wisdom**, not many information.

Furthermore, all individuals get reward if they give some profits to the platform of selfinity. In short, the values of platform can send all user.

Selfinity is a solution for Information flood. Selfinity will give you usefull wisdom and power.

Regard.

## About Selfinity(web) Technology selection

| Items             | Settings                                                     |
| :---------------- | :----------------------------------------------------------- |
| Program Languadge | Javascript \| Python3  \| Solidity                           |
| Framwork          | Webpack Node.js React.js \| Machine Learning \| Blockchain \| SmartContract |
| Architect         | Clean Architect with webpack and Redux-Saga                  |
| Environment       | Docker AWS Yarn NPM Ethereum PIP                             |
| Role              | Frontend BackEnd API AI DAapps Brockchain ICO-contract       |

![image-20190225170308032](https://camo.githubusercontent.com/5470df2e1b0e3e699d6d4710b35b81ec85717400/68747470733a2f2f63616d6f2e716969746175736572636f6e74656e742e636f6d2f643432363337646439303365343531663665656464323637646431396162323165653434323332342f363837343734373037333361326632663731363936393734363132643639366436313637363532643733373436663732363532653733333332653631366436313761366636653631373737333265363336663664326633303266333133333337333133323336326636363632333633313339333233323632326436313333363333393264333033323333333932643634333933333631326433363331333133373331333736313633363136343632363632653661373036353637)

## The algorithm of Contributes based Rewarding System(CRS)

```math
A_i = \frac{\text{Valid RxTokens owned by user}}{\text{All valid RxTokens}} \hspace{3px} (A_i = 0.01 if A_i < 0.01 ) \\
B_i = A_i * \alpha * (- \frac{1}{n} * x_i + 1) \hspace{3px} (B_i = 0.001 \hspace{3px} if B_i < 0.001 ) \\
B^{good} = \sum_{i=1}^{n} (B_i * \theta) * \delta \\
B^{bad} = \sum_{i=1}^{n} (B_i) * \delta \\
Z_i = A_i + B^{good} - B^{bad} \hspace{3px} (Z_i = 0 \hspace{3px} if B^{bad} > 2 * B^{good} ) \\
Z^{request} = \sum_{i=1}^{n} (Z_i * \zeta_i) \hspace{3px} (Z^{request} = 0.01 \hspace{3px} if Z^{request} < 0.01 ) \\
\grave{Z_i} = A_i + B^{good} - B^{bad} + Z^{request} \hspace{3px} (\grave{Z_i} = 0 \hspace{3px} if B^{bad} > 2 * B^{good} )
```

Variable roles are in berow list.

```math
A_i = \text{User score} \\
B_i = \text{Voter score} \\
B^{good} = \text{UpVote score} \\
B^{bad} = \text{DownVote score} \\
Z_i = \text{Content score} \\
Z^{request} = \text{Request score} \\
\grave{Z_i} = \text{Score of Content for requests} \\
\alpha = \text{the parameter of validation voting. if invalid, }\alpha \text{ become 0.} \\
\theta = \text{the parameter of validation voting. if invalid, }\theta \text{ become 0.} \\
\delta = \text{the parameter of checking enough voting of number. if invalid, }\delta \text{ become 0.} \\
\zeta = \text{the parameter of user accepting the answer for his requests, if invalid, }\zeta \text{ become 0.} \\
```

## Installation

#### Docker

We highly recommend using docker to run selfinity-web in production. This is how we run the live selfinity.com site and it is the most supported (and fastest) method of both building and running selfinity-web. We will always have the latest version of selfinity-web (master branch) available on Docker Hub. Configuration settings can be set using environment variables (see configuration section below for more information). If you need to install docker, you can get it at[https://get.docker.com](https://get.docker.com/)

To bring up a running container it's as simple as this:

```
docker run a31244/selfinity_web
```

Environment variables can be added like this:

```
docker run a31244/selfinity_web
```

If you want use selfinity with other infrastructure containers, you clone it (but now the repository  is private) to your local environment and run with docker-compose

````
git clone https://github.com/Selfinity/selfinity-web
cd selfinity-web
docker-compose build
docker-compose up
````

## Useage

#### Clone the repository and make a tmp folder

````
git clone https://github.com/Selfinity/selfinity-web
cd selfinity-web
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

This is a required step in order for the database to be 'ready' for condenser's use.

Edit the file `src/db/config/config.json` using your favorite command line text editor being sure that the username, password, host, and database name are set correctly and match your newly configured mysql setup.

Install Sequelize CLI for exec sequelize command easily and run sequelize command.

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

If you want custumize seed data count and contents, Exec google-emperor(This python module is for creating corpus based on google. **This module can scraiping google module and generate new keywords and continue scraiping eternally with asynchronous communication !!!**) and edit data counts in``src/db/seeders``

```
cd $SELFINITY_WEB_PATH/src/python-scripts
sudo python3 run_google_emperor.py [KEYWORD]

Epoch:1
Epoch of search: init
Keyword: [KEYWORD]
...
# this command could not stop by myself, so you stop manually with "command + c".
KeyboardInterrupt
```

and edit seed data counts in ``src/db/seeders``

````javascript
const data = require('../test_data');
const results = data({
    users_limit: 100,
    contents_limit: 200,
    folows_limit: 3000,
    upvotes_limit: 3000,
    downvotes_limit: 3000,
    requests_limit: 104,
    requestings_limit: 52,
    requestUpvotes_limit: 3000,
    requestDownvotes_limit: 3000,
    reposts_limit: 100,
    labels_limit: 1,
    labelings_limit: 1,
    viewHistories_limit: 1000,
    searchHistories_limit: 1000,
    interests_limit: 100,
    homeLabels_limit: 100,
    children_limit: 600,
    labelStocks_limit: 100,
    developers_limit: 1,
    platforms_limit: 1,
    rewards_limit: 1,
    /*
    Edit this args of number. Seed data will be set by this numbers.
    */
});
````

### Set Selfinity Gateway API Key

Open **$NODE_PATH/application/env/env.json** (you must create this file and set other environment variables, because this file is list of gitignore) and write below in it. 

````json
"API": {
    "KEY": "API KEY of develop api_key colomn",
    "PASSWORD": "PASSWORD of decode in a develop password colomn"
}
````

### To run selfinity in production mode:

```
sudo yarn run build
sudo yarn run production
```

### To run selfinity in development mode:

```
sudo yarn run start
```

