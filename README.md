# Ember-cli-divshot

Simple wrapper for the `divshot-cli` package.  Allows usage of divshot deployment from an ember-cli app with ease.

## Usage

### Installation

From within your Ember CLI application run:

```bash
npm install --save-dev ember-cli-divshot
```

### Setting up Divshot

From within your Ember CLI application run:

```bash
ember generate divshot
```

### Deploy

```bash
ember divshot push
```

If you'd like to deploy the production build of your app you can specify it with the `environment` option:

```bash
ember divshot push --environment=production
```

You can also push to divshot staging directly:

```bash
ember divshot push staging
```

Or production:

```bash
ember divshot push production
```

## Contributing

### Running Tests

* `npm test`

## License

MIT
