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

```bash
npm install --save-dev testcafe testcafe-browser-provider-browserstack
```

Next, set environment variables with your `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY` in your shell configuration.

Finally, add a script to your package.json:

```json
"scripts": {
  "test:e2e": "testcafe 'browserstack:firefox@58.0:OS X HighSierra,browserstack:ie@11:Windows 10' e2e-tests/*.js --app 'commandToStartApp'"
}
```

Run `npm run test:e2e` and head over to your BrowserStack Automate dashboard to see your tests. The above command will run all tests in the 'e2e-tests' directory in Firefox 58 and IE 11. For a more in-depth explanation on setting up TestCafe using the CLI, check out Markus Oberleher's article.

## BrowserStack Parallel Worker Limit

The first lesson that I learned the hard way was that BrowserStack only offers a certain number of parallel workers depending on your plan. Our open-source plan happened to give us 5, however I naively ran the command shown above with 10+ browsers. To my horror I realized that if you let TestCafe queue a large number of browsers, it will crash all of your BrowserStack instances and no amount of frantically clicking "Stop Session" from the automate dashboard will save you. TestCafe expects that all specified browsers will be connected and automatically runs your tests in parallel. So how can we take advantage of our 5 allotted workers without blowing everything up?

TestCafe does not support running tests consecutively, so I needed to come up with my own solution. Instead of using the CLI interface, I created a script that uses the TestCafe Node API.

## Using TestCafe's Node API with BrowserStack

In the gist below, I've written an async function that creates a new server instance. This function will take a browser as a string, `'browserstack:firefox@58.0:OS X HighSierra'`, or optionally as an array of strings, e.g.

```javascript
[
   "browserstack:safari@11.0:OS X High Sierra",
   "browserstack:safari@10.1:OS X Sierra",
   "browserstack:edge@16.0:Windows 10",
   "browserstack:edge@15.0:Windows 10",
   "browserstack:ie@11.0:Windows 10"
]
```

Same goes for the testFiles argument, which can either be a path or an array of paths to your desired test files.
`gist:kaitmore/4de40eb44893ef12454d88782b6201cc#syntax.text`

Now let's use this function to create a new TestCafe instance for each batch of browsers. In this case I have 10 browsers that I want to test. I have a max of 5 parallel workers available, so that means I'll need to divide the browsers into 2 batches and each batch will be passed to a new TestCafe instance. Below you'll see an array that defines our supported browser matrix, as well as a `startTests` function that loops through those batches. If your BrowserStack plan only supports 1 parallel worker, you can just define all your browsers in that array without breaking them out into sub arrays.

```javascript
const createTestCafe = require("testcafe");

/*/ Each sub array defines a batch of browserstack workers.
 Our current plan allows for a max of 5 workers at a time,
 so to avoid crashing browserstack we group our browsers
 into 2 batches that run will run consecutively. /*/

const SUPPORTED_BROWSERS = [
    [
        "browserstack:safari@11.0:OS X High Sierra",
        "browserstack:safari@10.1:OS X Sierra",
        "browserstack:edge@16.0:Windows 10",
        "browserstack:edge@15.0:Windows 10",
        "browserstack:ie@11.0:Windows 10"
    ],
    [
        "browserstack:chrome@64.0:OS X High Sierra",
        "browserstack:chrome@64.0:Windows 10",
        "browserstack:chrome@63.0:OS X High Sierra",
        "browserstack:firefox@58.0:OS X High Sierra",
        "browserstack:firefox@57.0:OS X High Sierra"
    ]
];

async function createTestCafeInstance(browsers, testFiles) {
    let testcafe;
    await createTestCafe()
        .then(tc => {
            testcafe = tc;
            return tc
                .createRunner()
                .startApp("npm start")
                .src(testFiles)
                .browsers(browsers)
                .run();
        })
        .then(failedCount => {
            console.log("Tests failed: " + failedCount);
            testcafe.close();
        })
        .catch(err => console.error(err));
}

async function startTests(browsers, createTestCafeInstance) {
    // Create a new testcafe instance for each batch of browsers
    for (let i = 0; i < browsers.length; i++) {
        await createTestCafeInstance(browsers[i], 'e2e-tests/mytest.js');
    }
}

startTests(SUPPORTED_BROWSERS, createTestCafeInstance);
```

Now if you run this you'll see that the first batch of browsers will boot up, and only when those are finished will the 2nd batch start.

You might have noticed that we are only defining one test above: `e2e-tests/mytest.js`. You probably want run a whole suite of tests, and it would be nice if we could just use a glob pattern to grab all our test files instead of hard coding an array of paths. Unfortunately the TestCafe Node API does not support glob patterns, so we need to create a simple helper function that does this for us. First:

```bash
npm install --save-dev glob glob-promise
```

Then we write the helper function and update our script like so:

```javascript
const createTestCafe = require("testcafe");
const glob = require("glob-promise");

async function getFiles(globPattern) {
  return await glob(globPattern)
    .then(files => files)
    .catch(e => console.error(e));
}

async function startTests(browsers, createTestCafeInstance) {
  // The testcafe node api does not accept glob patterns, so grab relevant test files using node-glob
  let files = await getFiles("e2e-tests/*.js");
  // Create a new testcafe instance for each batch of browsers
  for (let i = 0; i < browsers.length; i++) {
      await createTestCafeInstance(browsers[i], files);
    }
  }
}
```

Now we have a script that will initialize our BrowserStack workers in batches based on our allotted workers and grab the test files we want to run. Let's update that 'test:e2e' script in our package.json:

```json
"scripts": {
  "test:e2e": "node scripts/startTests.js"
}
```

## Using the BrowserStack Node API

We still have a problem here though. What if two devs are working in this repo, and happen to run integration tests at the same time? Or we might want to work this script into our CI/CD pipeline and would need to be careful not to run the command at the same time locally. In a way we're back to where we started - there is no safeguard against overloading our BrowserStack workers.
To solve this issue I'm going to take advantage of the BrowserStack Node API. We can use it to find out how many running sessions are currently available before running our tests.

```bash
npm install --save-dev browserstack
```

Next we'll need to add one more environment variable in addition to the ones set earlier (`BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY`), the password to access your BrowserStack account:

```bash
export BROWSERSTACK_PASSWORD=abc123
```

Then we'll add the helper function below. We create a new client with our credentials and then use the `getApiStatus` method to get the status of our running sessions.

```javascript
const browserStackCredentials = {
  username: process.env.BROWSERSTACK_USERNAME,
  password: process.env.BROWSERSTACK_PASSWORD
};

async function getRunningBrowserstackSessions() {
  const client = BrowserStack.createClient(browserStackCredentials);
  const workerStatus = await new Promise(function(resolve, reject) {
    client.getApiStatus((error, workers) => {
      if (error) reject(error);
      else resolve(workers);
    });
  });
  return workerStatus;
}
```

`getRunningBrowserstackSessions` will return a response that looks something like this:

```json
{
   used_time: 214457,
   total_available_time: 'Unlimited Testing Time',
   running_sessions: 0,
   sessions_limit: 5
}
```

I'm going to simply update our `startTests` function to warn us that there are not enough workers available and exit the script before executing anything. Check out the final script below:

```javascript
const createTestCafe = require("testcafe");
const glob = require("glob-promise");
const BrowserStack = require("browserstack");
const chalk = require("chalk");

/*/ Each sub array defines a batch of browserstack workers.
 Our current plan allows for a max of 5 workers at a time,
 so to avoid crashing browserstack we group our browsers
 into 2 batches that run will run consecutively. /*/

const SUPPORTED_BROWSERS = [
  [
    "browserstack:safari@11.0:OS X High Sierra",
    "browserstack:safari@10.1:OS X Sierra",
    "browserstack:edge@16.0:Windows 10",
    "browserstack:edge@15.0:Windows 10",
    "browserstack:ie@11.0:Windows 10"
  ],
  [
    "browserstack:chrome@64.0:OS X High Sierra",
    "browserstack:chrome@64.0:Windows 10",
    "browserstack:chrome@63.0:OS X High Sierra",
    "browserstack:firefox@58.0:OS X High Sierra",
    "browserstack:firefox@57.0:OS X High Sierra"
  ]
];

const browserStackCredentials = {
  username: process.env.BROWSERSTACK_USERNAME,
  password: process.env.BROWSERSTACK_PASSWORD
};

async function getFiles(globPattern) {
  return await glob(globPattern)
    .then(files => files)
    .catch(e => console.error(e));
}

async function createTestCafeInstance(browsers, testFiles) {
  let testcafe;
  await createTestCafe()
    .then(tc => {
      testcafe = tc;
      return tc
        .createRunner()
        .startApp("npm start")
        .src(testFiles)
        .browsers(browsers)
        .run();
    })
    .then(failedCount => {
      console.log("Tests failed: " + failedCount);
      testcafe.close();
    })
    .catch(err => console.error(err));
}

async function startTests(browsers, createTestCafeInstance) {
  // The testcafe node api does not accept glob patterns, so grab relevant test files using node-glob
  let files = await getFiles("e2e-tests/tests/*.js");
  // Check that there are no tests already running
  let sessionInfo = await getRunningBrowserstackSessions();
  if (sessionInfo.running_sessions !== 0) {
    console.error(
      chalk.red(
        "There are not enough available Browserstack workers to run these tests. 
        \nPlease cancel any running sessions from the Browserstack Automate 
        dashboard and try again. \n"
      )
    );
  } else {
    // Create a new testcafe instance for each batch of browsers
    for (let i = 0; i < browsers.length; i++) {
      await createTestCafeInstance(browsers[i], files);
    }
  }
}

startTests(SUPPORTED_BROWSERS, createTestCafeInstance);
```

## A couple more 'gotchas' to watch out for

* [BrowserStack Safari has issues with testing localhost URLs](https://www.browserstack.com/question/663), which is why I didn't specify 'localhost' as the hostname in the createTestCafe() factory function [like they do in the docs](http://devexpress.github.io/testcafe/documentation/using-testcafe/programming-interface/createtestcafe.html). Safari just hangs indefinitely otherwise.
* This is related to writing the actual tests, but one mistake I made that caused many hours of frustration was [leaving out a trailing /](https://github.com/DevExpress/testcafe/issues/2005) in my page fixtures after http://localhost:3000. If you're using a hash router this will mess things up and throw some wild, inconsistent errors.

```javascript
fixture`My first test`.page`http://localhost:3000/`
```

Hopefully this article helps you avoid some of the mistakes I made when using these tools. Happy testing!
