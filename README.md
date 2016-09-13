## Saifon

### Deployment - Heroku
``
    heroku create
    heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs#v90 -a [your app name]
    heroku config:set NPM_CONFIG_PRODUCTION=false
    git push heroku master
``    