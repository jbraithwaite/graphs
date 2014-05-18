# Famo.us Graphs

## Running the site

- Use `nginx` / `Apache` / etc and funnel all requests that aren't for static files to `www/index.html` (check out `_dev/nginx.conf` as an example)
- Run `npm install` to install all the dependencies
- Run `grunt compile` to compile all of the source files (needed once initially, then run for deployment)
- Run `grunt` while in development to watch for file changes

## Deployment

- Run `grunt compile`
    + Upload `www/index.html` and `www/assets`
