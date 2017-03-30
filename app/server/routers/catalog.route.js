const express = require('express');
const Bear = require('./../models/index').Bear;

const router = express.Router();

router.route('/catalog')
  .post((req, res) => {
    const bear = new Bear({
      name: req.body.name,
    });

    bear.save()
      .then((a, b, c) => {
        console.log('from catalog', a, b, c);
        res.send({
          message: `bear created ${a.name}`,
        });
      })
      .catch((err) => {
        console.log('err from server', err);
      });
  });

module.exports = router;
