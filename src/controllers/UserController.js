import Logger from "../util/logger.js";
import Validator from "../util/validator.js";

import mysqlClient from "../config/mysql.js";

export default {
  /**
   * Create a user
   * @param {*} req
   * @param {*} res
   * @returns
   */
  create: (req, res) => {
    let validation = Validator.check([
      Validator.required(req.body, "name"),
      Validator.required(req.body, "email"),
    ]);

    if (!validation.pass) {
      Logger.error([JSON.stringify(validation)]);
      return res.status(422).json(validation.result);
    }

    // Find or create new user
    exists(req.body.email, (error, response) => {
      if (error) {
        Logger.error([JSON.stringify(error)]);
        return res.status(500).json(error);
      }

      if (response.length) {
        response[0].newUser = false;

        Logger.out([`${req.method} ${req.originalUrl} ${res.statusCode}`]);
        return res.json(response[0]);
      } else {
        createNewUser(
          { name: req.body.name, email: req.body.email },
          (error, response) => {
            if (error) {
              Logger.error([JSON.stringify(error)]);
              return res.status(500).json(error);
            }

            response.newUser = true;

            Logger.out([`${req.method} ${req.originalUrl} ${res.statusCode}`]);
            return res.json(response);
          }
        );
      }
    });
  },
};

function exists(email, callback) {
  mysqlClient.query(
    `select * from Users where email = "${email}"`,
    (error, response) => {
      callback(error, response);
    }
  );
}

function createNewUser(data, callback) {
  mysqlClient.query(
    `insert into Users (name, email) VALUES ("${data.name}", "${data.email}")`,
    (error, response) => {
      callback(error, response);
    }
  );
}
