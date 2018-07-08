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
