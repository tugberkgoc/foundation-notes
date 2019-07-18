# Web Foundation

This teaching material covers the foundation skills required to understand the world wide web and develop software for it. You should learn this material before attempting other teaching resources such as `dynamic-websites` and `restful-apis`.

The materials are split into several key topics:

1. Understanding the HTTP protocol that underpins the world wide web.
2. Learning about the latest version of the Hypertext Markup Language used to building structured content.
3. Applying Cascading Stylesheets to change the appearance of web pages.
4. Learning the foundations of the NodeJS programming language.
5. Data persistence using a relational database.
6. Understanding a number of tools that can be used to improve the quality of the code you write.
7. Writing automated unit tests using Jest.

Each topic should be worked through carefully and you should always complete the activities listed in the **Test Your Understanding** sections to ensure you fully understand the subject before moving on.

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

Notes:

Express vs Koa vs Hapi: https://www.sitepoint.com/express-koa-hapi/

Good article on Koa covering useful bits such as global error handling: https://scotch.io/tutorials/introduction-to-koa-the-future-of-express
