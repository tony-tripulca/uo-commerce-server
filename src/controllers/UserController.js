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
    return res.send("okay");
  },
};
