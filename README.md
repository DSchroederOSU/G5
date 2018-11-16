# To run:
```
docker-compose up
```

This will spin up a MongoDB container and the Application container

Navigate to http://localhost:3000 to begin.

After entering an email address and hitting submit on the home screen, you should receive an email at the given address. (Check spam folder).
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


# Notes

1. This application would have been much easier to accomplish in the Ruby on Rails framework. I am going to begin converting over to ruby on rails after this is finished. I wanted to use the frameworks I was most comfortable with first, then begin trying to adopt new ones.

2. The node email package nodemailer was a pain. Mostly because I am using Gmail as the SMTP host and Google does not like direct access from "insecure apps." If there is a problem with the email sending process due to auth reasons, I apologize. Additionally, I know I hard-coded my email and password into this code. It is a mock email account set up solely for the purpose of this project.

3. Next, I used docker and bash scripts to automate a lot of the start-up and rebuild processes.
```
docker-compose up
```
Will work the first time this app is spun up, but afterwards the "rebuild.sh" script should be used to unmount the mongodb volumes and start all containers fresh.

4. The rating feature does nothing. Yes, I could have added the rating to the user object to keep track of what they scored my application... but it would have been pointless to log so many "5's" ;)

5. In a perfect world, the email credentials, mongo credentials, and other sensitive information would be held in a super secret .env file vaulted up off shore somewhere, but this is a temporary solution.

Best,

\- Daniel Schroeder
