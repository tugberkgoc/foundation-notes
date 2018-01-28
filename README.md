# Teaching Plan

The module covers a lot of technical content and this is split over 10 weekly labs. Make sure you complete _all_ lab exercises.

## Assessment

The assessment for this module is split into two parts:

1. A phase test that covers the **foundation** materials (the first 5 lectures and labs).
2. A report that covers the building and testing of your website. Both the [assignment brief](https://docs.google.com/document/d/1c36DSfrTDayxBp_diN90FvYFb-MnsrMQjON6RB_R-so/edit?usp=sharing) and [grading rubric](https://docs.google.com/document/d/1GWhy_fuVJMa7UASpU3xXL162iqxTHRx-wybJ5cy7930/edit?usp=sharing) can be found on CUMoodle.

The module is split into 10 lectures and labs.

1. The first 5 should be considered foundation and cover the core skills and knowledge. These will be assessed in the phase test which takes place on week 6.
2. The remainder of the lectures and labs cover the skills needed to build and test a dynamic website and this will be assessed in the practical assessment.

## 2 Module Content

## Setup and The HTTP Protocol

In this first lab you will learn how to set up your development environment and will also learn about the HTTP Protocol that powers the Internet.

1. Setup
    1. Codeanywhere
    2. Cloning lab materials
    3. Organising the IDE
2. The HTTP protocol
    1. Request/response
    2. Using the POST method
    3. Metadata

[Link to worksheet](02%20The%20HTTP%20Protocol.md)

## 2 Learning HTML5

1. Syntax
2. Lists
3. Hypermedia
    1. Routes
    2. Hyperlinks
    3. Images
    4. Media
4. Tables
5. Forms
    1. POST vs GET
    2. Form controls
    3. Labelling forms
    4. Form validation

[Link to worksheet](03%20Learning%20HTML5.md)

## 3 Learning CSS3

1. Introduction to CSS3
    1. CSS Basics
    2. Selector
    3. Fine-tuning your CSS
2. Using CSS for page layout
    1. CSS box model
    2. Positioning elements
    3. Navigation

[Link to worksheet](04%20Learning%20CSS3.md)

## 4 Introduction to JavaScript/NodeJS/ECMA6

1. Working with NodeJS
    1. Executing NodeJS files
    2. Installing packages
    3. Listing and uninstalling packages
    4. Useful modules
2. Variables and Scope
    1. Variables and Scope
    2. Strict mode
    3. Importing a package or module
    4. Conditionals and loops
    5. Strings
    6. Arrays
3. Data types
4. Errors and exceptions

[Link to worksheet](05%20Introduction%20to%20JavaScript.md)

## 5 Functions and Objects

1. Functions
    1. Function syntax
    2. The spread operator
    3. The Arguments object
    4. The rest parameter
    5. Default parameters
    6. Function expressions
    7. Callbacks
2. Objects
    1. Creating object literals
    2. Retrieving object properties
    3. Modifying objects
    4. Undefined values

[Link to worksheet](06%20Functions%20and%20Objects.md)

## 6 Version Control

1. **Phase test**
2. Using Git locally
3. Using Git remotes

[Link to worksheet](07%20Version%20Control.md)

## 7 The Express Web Server

1. Package manifests
2. Routing
3. Templating
4. Modular code

[Link to worksheet](08%20Express%20Web%20Server.md)

## 8 Data Persistence

1. The Filesystem
2. SQLite
3. Document databases
4. Relational databases
5. Graph databases

[Link to worksheet](09%20Data%20Persistence.md)

## 9 Automated Testing

1. Unit testing
2. Code coverage
3. Testing async code

[Link to worksheet](10%20Automated%20Testing.md)

## 9 Deployment

1. Building a web server
    1. Raspberry Pi
    2. Cloud using Heroku
2. Transferring files
    1. File transfer protocol
    2. Directory synchronisation
    3. Git

[Link to worksheet](11%20Deployment.md)

## 10 Responsive Web Design

## About this Github repository

This Github repository is a collaborative work between Coventry University and Helsinki Metropolia University of Applied Sciences. The repository was initially set up by Mark Tyers who contributed initial drafts of most exercises. During the 1st semester of the 15-16 academic year, this set of material was used by Erja, Vesa and colleagues, who made substantial improvements.

Additions were made by Jianhua Yang between 2016-17 after which the module was taken over by Mark Tyers for the 2018 delivery.

Tagged releases have been created at the end of each semester of delivery to act as snapshots of the materials. These can be accessed in GitHub under the **Releases** tab.

```shell
$ git tag -a 1415OCTMAY 582f65c -m '1415OCTMAY'
$ git push origin 1415OCTMAY
```

Deleting tags (local then remote).

```shell
$ git tag --delete 582f65c
$ git push -delete origin 582f65c
```
