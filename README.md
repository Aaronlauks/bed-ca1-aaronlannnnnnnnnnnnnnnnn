# BED CA1 - Aaron Lau
Survey System with Gamification Elements (Pet Guardians)

## Objective of Assignment
To allow students to practice what they have learnt in the module by creating a survey
backend system with gamification elements. The goal is to encourage users to complete more
surveys and earn points through completing the surveys. These points will be used
subsequently for the gamification experiences.

## Files system
src<br />
└─ configs<br />
&emsp;└─ initTables.js<br />
└─ controllers<br />
&emsp;└─ usersController.js<br />
└─ models<br />
&emsp;└─ usersModels.js<br />
└─ routes<br />
&emsp;├─ mainRoutes.js<br />
&emsp;└─ usersRoutes.js<br />
└─ sercices<br />
&emsp;└─ db.js<br />
└─ app.js<br />
index.js<br />
package-lock.json<br />
package.json<br />
README.md<br />

## Functions of program
## Commit Logs
### Commit 07226b9
Initiated npm and created the files to start the express server
### Commit 6b8b2bd
Created the files mainRoutes.js and usersRoutes.js; these files are the files that will route the connection between app.js and controllers
### Commit 84f780b
I added the controller files usersController.js and usersModel.js<br />
I also added the initTables.js file and ran it to initialise the databases in MySQl
### Commit 15516a6
I fixed the connection between the controller, model and app.js files. This will enable the endpoints to start working
### Commit 
The first endpoint code is done. This endpoint is the POST users endpoint which creates new users and validates whether the username given is already in the database, if it is MySQL returns with status code 409 conflict