# G5


To run:
```
docker-compose up
```

This will spin up a MongoDB container and the Application container

Navigate to http://localhost:3000 to begin.

After entering an email address and hitting submit on the home screen, you should receive an email at the given address.
This email will take you to the form to submit a repair.


# For running tests
First start up a testing Mongo container
```
npm run db
```
This will allow there to be users created as if someone was really traversing the application.

Next run the mocha test suite. This runs through each page of the application.
```
npm run test
```

# Assignment

You're building a website that has a "Car Repair Appointment" feature:

1. User requests an appointment, and provides their email address.  The website sends an activation email to their email account.
2. User clicks a link in activation email, which takes them to a form where they enter their first name, last name, phone number, year, make, model, repair required and preferred appointment date/time.
3. Once this form is submitted they should be presented with a success screen and a confirmation email should be sent to the user. A "Car Repair Appointment" email should be delivered to repairs@example.com with the users information, their car repair request information, appointment date/time and the IP address used to fill out the form.
4. If the user clicks the activation email link or tries to fill out the form again, the user should be presented with their already submitted data (except the ip address), with an opportunity to rate their experience on a scale of 1-5.

Views don't need to be styled in any way; plain HTML elements with no CSS at all is fine. You can use whatever libraries, gems or packages you want.
