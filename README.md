# Joplin plugin: Populate agenda

This is a Joplin plugin that populates date headings to set up an agenda for the week. It's pretty specific to my personal workflow.

## Installing

To install the plugin, download the jpl file from _Releases_ and add it to Joplin manually using the instructions [here](https://joplinapp.org/plugins/#installing-a-plugin).


## Code

The main two files to look at are:

- `/src/index.ts`, which contains the entry point for the plugin source code.
- `/src/manifest.json`, which is the plugin manifest. It contains information such as the plugin a name, version, etc.

When developing and ready to release a new version, update the version number in `manifest.json`, add the built `jpl` file from the `publish/` directory as a new release, and associate a new git tag to the relevant commit.

## Building the plugin

The plugin is built using Webpack, which creates the compiled code in `/dist`. A JPL archive will also be created at the root, which can use to distribute the plugin.

To build the plugin, simply run `npm run dist`.

The project is setup to use TypeScript, although you can change the configuration to use plain JavaScript.

## Updating the plugin framework

To update the plugin framework, run `npm run update`.

In general this command tries to do the right thing - in particular it's going to merge the changes in package.json and .gitignore instead of overwriting. It will also leave "/src" as well as README.md untouched.

The file that may cause problem is "webpack.config.js" because it's going to be overwritten. For that reason, if you want to change it, consider creating a separate JavaScript file and include it in webpack.config.js. That way, when you update, you only have to restore the line that include your file.
