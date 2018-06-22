'use strict';

const prompt = require('prompt');
// const postUser = require("/")
module.exports.promptNewUser = () => {

    prompt.get([{
      name: 'firstName',
      description: 'Enter first name',
      type: 'string',
      required: true
    }, {
      name: 'lastName',
      description: 'Enter last name',
      type: 'string',
      required: true
    }], function(err, results) {
          if (err) return reject(err);
          console.log(results);
        })
  };
  // return new Promise( (resolve, reject) => {
  //   prompt.get([{
  //     name: 'firstName',
  //     description: 'Enter first name',
  //     type: 'string',
  //     required: true
  //   }, {
  //     name: 'lastName',
  //     description: 'Enter last name',
  //     type: 'string',
  //     required: true
  //   }], function(err, results) {
  //     if (err) return reject(err);
  //     // postUser(results);
  //     resolve(results);
  //   })
  // });
// };
