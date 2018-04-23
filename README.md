# Babel-plugin-transform-relative-path

This babel plugin transforms a prefix in the path of a require/import to a relative path to a given directory.
The plugin can be used as an alternative to using the environment variable to resolve dependencies (e.g. NODE_PATH=src).

## Installation

```
yarn add babel-plugin-transform-relative-path
```

## Usage

Add the plugin to your babel config

```
"plugins": ["transform-relative-path"]
```

The default maps all paths that are prefixed with '@' to the root directory.

You can change the default configuration:

```
"plugins": [
	["transform-relative-path", {
		prefix: '~',
		directory: 'src'
	}]
]
```

or specify an array if you want multiple mappings:

```
"plugins": [
	["transform-relative-path", [
		{
			prefix: '~',
			directory: 'src'
		},
		{
			prefix: 'lib'
			directory: 'lib'
		}
	]
]
```
