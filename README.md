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

By default, the `--environment=production` option will be set for the Ember CLI build step. If
you'd like to specify the development environment, you can do so with the following command:

```bash
ember divshot push --environment=development
```

#### Specifying the Divshot environmnet

The default Divshot environment is `development`, however you can push directly to staging:

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
