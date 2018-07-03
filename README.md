Console Game
============


Cloning
-------

    $ git clone https://github.com/j-/console-game.git && cd console-game


Installing
----------

    $ npm install


Testing
-------

    $ npm test
    $ npm test -- --watch # Run tests in watch mode


Building
--------

    $ npm run build

Build output will go to `dist/`.


Running
-------

    $ API_HOST=http://yourstubserver:8080/ npm start

Set the `API_HOST` environment variable to configure the game server host name.
By default the game will try to connect to `http://localhost:8080`.
