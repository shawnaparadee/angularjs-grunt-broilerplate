# [angularjs-grunt-broilerplate](https://github.com/shawnaparadee/angularjs-grunt-broilerplate) 

An [AngularJS](http://angularjs.org) [Node.js](https://nodejs.org) web application broilerplate with high configurability and
ability to build different themes/applications from single code base.

* [Quick Start](#quick-start)

* [Grunt Build Process](#grunt-build-process)

* [Overall Directory Structure](#overall-directory-structure)

* [Publishing](#publishing)

***

## Quick Start

Install [Node.js](https://nodejs.org) and then:

```

$ git clone git://github.com/shawnaparadee/angularjs-grunt-broilerplate
$ cd angularjs-grunt-broilerplate
$ sudo npm -g install grunt-cli karma bower
$ npm install
$ bower install
$ grunt -theme=default

```

Finally, open `file:///path/to/angularjs-grunt-broilerplate/build/index.html` in your browser.

## Grunt Build Process

The angularjs-grunt-broilerplate comes with an extensive grunt build processes. The following is a quick listing of commands:

    build - builds the applications assests and sources and places the resulting application in the /build folder.
    compile - first builds the application and then compiles it for publishing in the /bin directory.
    -theme - this specifies the target theme, options: default [default when no theme is provided], any number can be added following the default template
    -env - this specifies the target environment, options: local, stage [default when no env is provided], demo, production

Examples:

Build for development purposes the AGRA theme for the staging environment:

    grunt build -theme=default -env=stage

    or

    grunt build -theme=default

Compile for publish purposes the TanAIM theme for the production environment:

    grunt compile -theme=default -env=production    

    or

    grunt -theme=default -env=production

    
## Overall Directory Structure

At a high level, the structure of _"PMT-Viewer/Application"_ looks roughly like this:


* **bin** - the compliled application ready for publish.
* **build** - the complied application with tests.
* **karma** - test configuration.
* **node_modules** - node puts required modules here.
* **src** - the application.
  * **app** - the main application source files.
    * **about** - the about page.
      * **info** - the customizable section.
      * **less** - the less files.
      * **about.js** - the controller.
      * **about.spec.js** - the test.
      * **about.tpl.html** - the template.
    * **login** - the login page.
      * **less** - the less files.
      * **login.js** - the controller.
      * **login.spec.js** - the test.
      * **login.tpl.html** - the template.
    * **app.js** - the application controller.
    * **app.spec.js** - the test.
    * **config.js** - the configuration file generated by the build, based on _theme_.
  * **assets** - static files like fonts and images. [Read more](assets/README.md).
  * **common** - third-party libraries or re-usable components. [Read more](common/README.md).
  * **less** - application less directory. [Read more](less/README.md).
      * **themes** - individual themes.
      * **main.less** - main less.
      * **variables.less** - application variables.
  * **index.html** - application main html, build compiles application in to a SPA (single page app).
* **vendor** - thrid party packages install by Bower and manually installed. All packages must be put into ```build.config.js```.
* **.bowerrc** - the Bower configuration file.
* **.travis.yml** - the Travis CI configuration file.
* **app.config.js** - the application configuration file. Objects in this file are used to create the ```src/app/config.js``` file based on _theme_.
* **bower.json** - the listing of Bower dependencies.
* **build.config.js** - the grunt build configuration file.
* **Gruntfile.js** - the grunt build file.
* **module.prefix** & **module.suffix** - our compiled application script is wrapped in these, which by default are used to place the application inside a self-executing anonymous function to ensure no clashes with other libraries.
* **package.json**- metadata about the app, used by NPM and our build script. The NPM dependencies are listed here.


## Publishing
The angularjs-grunt-broilerplate, after compile or build, is a static website that can be hosted anywhere by copying the contents of the build directory.
