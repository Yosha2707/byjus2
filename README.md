# Angular6-SSO-implementation Job Search Website

This repository demonstrates a job search website with SSO implementation (Google as of now)(with the [@angular/cli])

## Dependencies

* [@angular/cli](https://github.com/angular/angular-cli), >= 8

## Installation

Clone this project. From the root directory, run the following commands to install dependencies for the server and client-side:

```
$ npm install

```
## Serving the project

From the root of this project, run:

```bash
$ ng serve --proxy-config=proxy.conf.json
```

This will start application on 4200 port.

## About Application and Assuptions Made 

1. As project will start you can click login, a login popup will appear . Sign In with Google 

2. Visit search tab , here all authenticate jobs are listed . we can filter date on the basis of experience , company name , location and skils.

3. On top it shows the number of jobs found .

4. I couldnt find expiry date of jobs, therefore could not list expiry jobs however i added a filter on date (assuming this date as one job was posted on)

## Author

Ishika Garg

