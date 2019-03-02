# Babel-plugin-transform-relative-path

This babel plugin transforms a prefix in the path of a require/import to a relative path to a given directory.
The plugin can be used as an alternative to using the environment variable to resolve dependencies (e.g. NODE_PATH=src),
or as an alternative to bundler aliases (e.g. webpack's alias option).

## Installation

```
yarn add babel-plugin-transform-relative-path
```

## Usage

Add the plugin to your babel config

```
"plugins": ["babel-plugin-transform-relative-path"]
```

The default maps all paths that are prefixed with '/' to the current working directory.

You can change the default configuration:

```
"plugins": [
	["transform-relative-path", {
		'~': './src'
	}]
]
```

or specify multiple mappings:

```
"plugins": [
	["transform-relative-path", {
		'~': './src',
		'lib': './lib'
	}]
]
```

If you want the paths relative to your project directory instead of working directory,
you can do the following in a .babelrc.js file:

```
plugins: [
	["transform-relative-path", {
		'/': __dirname
	}]
]
```
