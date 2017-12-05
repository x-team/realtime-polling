# realtime-polling

Realtime voting app to use for the X-Mas Party

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the
[guide](http://vuejs-templates.github.io/webpack/) and
[docs for vue-loader](http://vuejs.github.io/vue-loader).

## Deployment to S3

Prerequistes:

* https://github.com/klaemo/s3-website
* AWS credentials should either be in ~/.aws/credentials or as ENV variables

### Setup

```bash
npm install s3-website -g
s3-website create <desired.bucket.name>
```

### Deployment

```bash
npm run build && s3-website ./dist
```
