---
templateKey: blog-post
title: Integration Testing with TestCafe & BrowserStack
date: '2018-02-25T10:04:10-05:00'
description: A guide for writing tests with Testcafe & BrowserStack
tags:
  - testcafe
  - browserstack
  - javascript
  - node
  - integration testing
  - test
  - code
---
![testcafe](/img/testcafe.png)

I was recently assigned the task of setting up integration tests for a project at work. We were deciding between two open-source solutions, Nightwatch and TestCafe. Ultimately we went with TestCafe because it is not based on Selenium, which allowed for a much easier setup and a lot less tooling. It also has out of the box support for ES6 syntax and a handy plugin for extending their built in selectors to easily test React components. Here is an article with some more pros/cons of using TestCafe vs Nightwatch.

BrowserStack is a cloud-based testing service that allows you to start up pretty much any relevant browser without the need for a virtual machine. They also offer free plans for open source projects. I've used BrowserStack for a while now to manually check our app for cross-browser compatibility issues, which is obviously not the greatest solution. Lucky for us TestCafe offers integration with the BrowserStack Automation API through a simple plugin, testcafe-browser-provider-browserstack, which allows us to run automated tests across our whole supported browser matrix.



## Using TestCafe's CLI with BrowserStack

Running tests in one or more of the BrowserStack cloud browsers is very simple. First install TestCafe and the BrowserStack plugin:

`npm install --save-dev testcafe testcafe-browser-provider-browserstack`

Next, set environment variables with your `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY` in your shell configuration.

Finally, add a script to your package.json:

```
"scripts": {
  "test:e2e": "testcafe 'browserstack:firefox@58.0:OS X HighSierra,browserstack:ie@11:Windows 10' e2e-tests/*.js --app 'commandToStartApp'"
}
```

Run npm run test:e2e and head over to your BrowserStack Automate dashboard to see your tests. The above command will run all tests in the 'e2e-tests' directory in Firefox 58 and IE 11. For a more in-depth explanation on setting up TestCafe using the CLI, check out Markus Oberleher's article.

## BrowserStack Parallel Worker Limit

The first lesson that I learned the hard way was that BrowserStack only offers a certain number of parallel workers depending on your plan. Our open-source plan happened to give us 5, however I naively ran the command shown above with 10+ browsers. To my horror I realized that if you let TestCafe queue a large number of browsers, it will crash all of your BrowserStack instances and no amount of frantically clicking "Stop Session" from the automate dashboard will save you. TestCafe expects that all specified browsers will be connected and automatically runs your tests in parallel. So how can we take advantage of our 5 allotted workers without blowing everything up?

TestCafe does not support running tests consecutively, so I needed to come up with my own solution. Instead of using the CLI interface, I created a script that uses the TestCafe Node API.

## Using TestCafe's Node API with BrowserStack

In the gist below, I've written an async function that creates a new server instance. This function will take a browser as a string,`'browserstack:firefox@58.0:OS X HighSierra'`, or optionally as an array of strings, e.g. 

```
[
   "browserstack:safari@11.0:OS X High Sierra",
   "browserstack:safari@10.1:OS X Sierra",
   "browserstack:edge@16.0:Windows 10",
   "browserstack:edge@15.0:Windows 10",
   "browserstack:ie@11.0:Windows 10"
]
```

Same goes for the testFiles argument, which can either be a path or an array of paths to your desired test files.

<script src="https://gist.githubusercontent.com/kaitmore/4de40eb44893ef12454d88782b6201cc/raw/82b0102c2e95c21b50d0e9f8ee19ab77111f2ef4/createTestCafeInstance.js"></script>

