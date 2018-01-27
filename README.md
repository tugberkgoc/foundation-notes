# Teaching Plan

The module covers a lot of technical content and this is split over 10 weekly labs. Make sure you complete _all_ lab exercises.

## 1 Setup and The HTTP Protocol

In this first lab you will learn how to set up your development environment and will also learn about the HTTP Protocol that powers the Internet.

1. Setup
    1. Codeanywhere
    2. Cloning lab materials
    3. Organising the IDE
2. The HTTP protocol
    1. Request/response
    2. Using the POST method
    3. Metadata

[Link to worksheet](02 The HTTP Protocol.md)

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

## 3 Learning CSS3

1. Introduction to CSS3
    1. CSS Basics
    2. Classes and identifiers
    3. Fine-tuning your CSS
2. Using CSS for page layout
    1. CSS box model
    2. Positioning elements
    3. Navigation

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

## 6 Version Control

1. **Phase test**
2. Using Git locally
3. Using Git remotes

## 7 The Express Web Server

1. Package manifests
2. Routing
3. Templating
4. Modular code

## 8 Data Persistence

1. The Filesystem
2. Document databases
3. Relational databases

## 9 Automated Testing

1. Unit testing
2. Code coverage
3. Testing async code

## 9 Deployment

1. Building a web server
    1. Raspberry Pi
    2. Cloud using Heroku
2. Transferring files
    1. File transfer protocol
    2. Directory synchronisation
    3. Git

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
