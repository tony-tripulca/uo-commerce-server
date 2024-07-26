import Logger from "../util/logger.js";
import Validator from "../util/validator.js";

import mysqlClient from "../config/mysql.js";
import UserController from "./UserController.js";

export default {
  /**
   * Purchase all orders
   * @param {*} req
   * @param {*} res
   * @returns
   */
  purchase: (req, res) => {
    console.log(UserController.fnExists(req.body.email));

    return res.send("okay");
  },
};
