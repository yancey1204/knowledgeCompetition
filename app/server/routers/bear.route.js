import express from 'express';
import { Bear } from './../models/index';

const router = express.Router();

router.route('/bears')
  .post((req, res) => {
    const bear = new Bear({
      name: req.body.name,
    });

    bear.save()
      .then((a) => {
        res.send({
          message: `bear created ${a.name}`,
        });
      })
      .catch((err) => {
        console.log('err from server', err);
      });
  });

router.route('/bears/:bear_id')
  .get((req, res) => {
    Bear.findById(req.params.bear_id, (err, bear) => {
      if (err) {
        res.send(err);
      }

      res.json(bear);
    });
  })
  .put((req, res) => {
    Bear.findById(req.params.bear_id, (err, bear) => {
      if (err) {
        res.send(err);
      }

      bear.name = req.body.name;
      bear.save((e) => {
        if (e) {
          res.send(e);
        }
        res.json({ message: 'Bear updated!' });
      });
    });
  })
  .delete((req, res) => {
    Bear.remove({
      _id: req.params.bear_id,
    }, (e) => {
      if (e) {
        res.send(e);
      }

      res.json({ message: 'Successfully deleted' });
    });
  });


module.exports = router;
