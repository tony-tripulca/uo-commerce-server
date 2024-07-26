import Logger from "../util/logger.js";
import Validator from "../util/validator.js";

import mysqlClient from "../config/mysql.js";
import UserController from "./UserController.js";
import moment from "moment";

export default {
  /**
   * Purchase all orders
   * @param {*} req
   * @param {*} res
   * @returns
   */
  purchase: (req, res) => {
    let validation = Validator.check([
      Validator.required(req.body, "user_id"),
      Validator.required(req.body, "amount"),
    ]);

    if (!validation.pass) {
      Logger.error([JSON.stringify(validation)]);
      return res.status(422).json(validation.result);
    }

    mysqlClient.query(
      `insert into Orders (amount, user_id, created_at) VALUES (${
        req.body.amount
      }, ${req.body.user_id}, "${moment().format("YYYY-MM-DD hh:mm:ss")}")`,
      (error, response) => {
        if (error) {
          Logger.error([JSON.stringify(error)]);
          return res.status(500).json(error);
        }

        categorizeOrders(response.insertId, req.body.orders);
        Logger.out([`${req.method} ${req.originalUrl} ${res.statusCode}`]);
        return res.json(response);
      }
    );
  },
};

function categorizeOrders(order_id, orders) {
  let tables = {
    Chairs: "Order_Chairs",
    Tables: "Order_Tables",
    Tops: "Order_Tops",
  };

  let category_ids = {
    Chairs: "chair_id",
    Tables: "table_id",
    Tops: "top_id",
  };

  orders.forEach((item, i) => {
    mysqlClient.query(
      `insert into ${tables[item.category]} (order_id, ${
        category_ids[item.category]
      }) VALUES (${order_id}, ${item.id})`,
      (error, response) => {
        if (error) {
          Logger.error([JSON.stringify(error)]);
          return res.status(500).json(error);
        }
      }
    );
  });
}
