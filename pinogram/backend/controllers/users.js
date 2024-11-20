const userModel = require("../models/users");
const lazzer = require("lazzer");
const bcrypt = require("bcrypt")


async function getAllUser(req, res) {
  const users = await userModel
    .find({})
    .populate("posts")
    .populate("followers");
  res.send(users);
}

async function getUser(req, res) {
  const id = req.params.id;
  // console.log(id);
  try {
    const user = await userModel.findById(id).populate("posts")
    .populate("followers");
    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

async function postUsers(req, res) {
  try {
    const { username, password, email, fullname } = req.body;

    // Check if the username already exists
    const userExist = await userModel.findOne({ username });
    if (userExist) {
      return res.status(400).send("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    const result = new userModel({
      username,
      password: hashedPassword,
      email,
      fullname,
    });

    await result.save();

    res.status(200).send("User created successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    
    const token = JSON.stringify(user) 
    console.log(token);
    
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateUser(req, res) {
  const userId = req.params.id;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { fullName, avatarUrl, backgroundImageUrl } = req.body;

    const updateFields = {};

    if (fullName) {
      updateFields.fullname = fullName;
    }

    if (avatarUrl) {
      updateFields.dp = avatarUrl;
    }

    if (backgroundImageUrl) {
      updateFields.bg = backgroundImageUrl;
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true }
    );
    res.status(200).json("User updated!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getSearch(req, res) {
  const query = req.query.query;
  try {
    const user = await userModel
      .find({ username: { $regex: new RegExp(query, "i") } })
      .populate("posts")
      .populate("followers");
    res.send(user);
  } catch (error) {
    console.error("Error searching for usgers:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function followUser(req, res) {
  const fromUser = req.query.fromUser;
  const toUser = req.query.toUser;

  try {
    if (fromUser === toUser) {
      return res.status(400).send("Can't follow/unfollow the same user");
    }

    const user = await userModel.findById(toUser);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const userFollowed = user.followers.includes(fromUser);

    if (!userFollowed) {
      user.followers.push(fromUser);
      await user.save();
      return res.status(200).send("Followed");
    } else {
      user.followers.pull(fromUser);
      await user.save();
      return res.status(200).send("Unfollowed");
    }
  } catch (error) {
    lazzer.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function resetPassword(req, res) {
  const { userId, newPassword } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await userModel.findByIdAndUpdate(userId, { password: hashedPassword });

    res.status(200).send("Password reset successfully");
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).send("Internal server error");
  }
}


module.exports = {
  getAllUser,
  postUsers,
  updateUser,
  getSearch,
  followUser,
  getUser,
  loginUser,
  resetPassword
};
