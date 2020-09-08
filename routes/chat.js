const express = require('express');
const router = express.Router();
const  cors = require('cors');

const bodyParser = require('body-parser');
const { StreamChat } = require('stream-chat');
router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const serverSideClient = new StreamChat(
  "avtqv84wttfy",
  "pscfsypbnvnsa8gvsb483fhgx2bkbcxmm4haadshkmpak9mks6sg3cyfpykcrdb6"
);

router.post("/join",  async (req, res) => {
  const { username } = req.body;
  const token = serverSideClient.createToken(username);
  try {
    await serverSideClient.updateUser(
      {
        id: username,
        name: username,
      },
      token
    );
  } catch (err) {
    console.log(err);
  }

  const admin = { id: 'admin' };
  const channel = serverSideClient.channel('team', 'talkshop', {
    name: 'Talk Shop',
    created_by: admin,
  });

  try {
    await channel.create();
    await channel.addMembers([username, 'admin']);
  } catch (err) {
    console.log(err);
  }

  return res
    .status(200)
    .json({ user: { username }, token, api_key: "avtqv84wttfy" });
});



module.exports = router;