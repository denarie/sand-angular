# SandAngular

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.

## Development server

To start a local development server, run:

```bash
ng serve --configuration=development 
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

https://v17.angular.io/guide/deployment#fallback
https://v17.angular.io/cli/build
https://v17.angular.io/api/common/APP_BASE_HREF
https://stackoverflow.com/questions/37631098/how-to-bundle-an-angular-app-for-production

https://symflower.com/en/company/blog/2021/path-independent-angular/

https://www.devgem.io/posts/troubleshooting-image-loading-issues-in-deployed-angular-18-applications

https://iifx.dev/en/articles/221307173

https://iifx.dev/en/articles/243174514



To build the project run:

```bash
ng build
or
ng build --configuration=production --deploy-url /sand-angular/ --base-href /sand-angular/
or
ng build --configuration=production  --base-href ./ --deploy-url ./

```

https://v17.angular.io/guide/deployment#server-configuration

https://enable-cors.org/server.html

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

Deploy
```bash
cd dist
tar cvzf sand-angular.tar sand-angular/
```
on the server do:
```bash
tar -xvzf sand-angular.tar
```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


TODO
Mock Backend Server

https://medium.com/ngconf/fake-it-till-you-make-it-or-how-to-mock-backend-response-in-an-angular-application-95ac3a9caf40

https://medium.com/geekculture/setting-up-a-mock-backend-with-angular-13-applications-26a21788f7da
