'use strict'

const emailService = require('../lib/emailService')
const expect = require('chai').expect

describe('emailService object', () => {
  describe('"smtpTransport"', () => {
    it('should retrieve smtpTransport object', () => {
      expect(emailService.smtpTransport).to.be.a('object')
    })
  })
})

describe('emailService sendEmail', () => {
  describe('"sendLink"', () => {
    it('should return a Promise', () => {
      const usersUpResult = emailService.sendLink('email@test.com')
      expect(usersUpResult.then).to.be.a('Function')
      expect(usersUpResult.catch).to.be.a('Function')
    })
  })
})
