const { Usr, Tht } = require('../models');

const userCtrl = {
 
  getUsers(req, res) {
    Usr.find()
      .select('-__v')
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
 
  getSingleUser(req, res) {
    Usr.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user related to id!' });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  createUser(req, res) {
    Usr.create(req.body)
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updateUser(req, res) {
    Usr.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  
  deleteUser(req, res) {
    Usr.findOneAndDelete({ _id: req.params.userId })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user with this id!' });
        }

        return Tht.deleteMany({ _id: { $in: dbUserData.thoughts } });
      })
      .then(() => {
        res.json({ message: 'User and their thoughts were deleted.' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },


  addFriend(req, res) {
    Usr.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  
  removeFriend(req, res) {
    Usr.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = userCtrl;