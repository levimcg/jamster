# Jamster
A simple command line tool for generating markdown files with front matter for JAMstack sites. Inspired by [Hugo's](https://gohugo.io/commands/hugo_new/) `hugo new`, but for the JavaScript ecosystem.

## About
- ⚡️Generates markdown files with front-matter like the ones typically used to manage content with static site generators like [Eleventy](https://www.11ty.dev/), [Jekyll](https://jekyllrb.com/), etc.
- ✌️Written entirely in Node.js so it's cross-platform
- 🔧Specify front-matter content per file by passing specific config files via the `--config` flag.

## Getting started
The easiest way to use Jamster is to install in globally.

```bash
npm install -g jamster

# Test to make sure it was installed.
jamster --version
# Should see a version number
0.1.0
```

Once once installed you can run it in your terminal from anywhere.

```bash
jamster relative/path/to/new/file.md
```

### Installing locally
If you don't want to or can't install Jamster globally you can also install it locally in your project and then run it using `npx` (Requires npm 5.2.0+).

```bash
npx jamster path/to/my/new/file.md
```

## Default generated front matter
Without passing any arguments Jamster will create a new markdown file at the path you specify with the following default front-matter added.

```markdown
---
title: ''
description: ''
date: (Current date)
---
```

## Customizing generated front-matter
If you want to use different values in your generated front matter there are a couple of ways to do it.

### Using a central `.config` file
If you want to use the same front-matter values for all generated markdown files you can place a file called `jamster.config.js` that exports a JavaScript Object with your desired values at the root of your project.

Here's and example of how a `jamster.config.js` file might look.

```javascript
// ./jamster.config.js

module.exports = {
  title: 'My default title',
  description: 'Default description'
  date: new Date(), // You can use regular old Javascript in here!
  tags: ['post', 'development'],
  layout: 'layouts/post.njk'
}
```

With the this configuration file in place, you can then run

```bash
jamster path/to/your/new/file.md
```

and the resulting front markdown file would contain the following front-matter:

```markdown
---
title: 'My default title'
description: 'Default description'
date: (Today's date)
tags:
  - post
  - development
layout: 'layouts/post.njk'
---
```

### Specify a configuration using the `--config` flag
If you want to use multiple different configuration files for different post type in you site, you can specify a different config file after entering the path to you new markdown file.

#### Example
```bash
jamster path/to/my/new/file.md --config path/to/config/myconfig.js
```
