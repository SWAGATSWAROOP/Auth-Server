const { Auth } = require("../models/auth.js");

const signIn = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email or Password is missing" });
    }
    email = email.toLowerCase();

    const user = await Auth.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exists" });
    }

    const ifPasswordIsCorrect = await user.isPasswordCorrect(password);
    if (!ifPasswordIsCorrect) {
      return res.status(400).json({ message: "Password is not correct" });
    }

    const token = user.generateBearerToken();
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("Token", token, options)
      .json({ message: "User Signed In successfully", token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const signUp = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email or Password is missing" });
    }

    email = email.toLowerCase();

    const ifUserexists = await Auth.findOne({ email: email });

    if (ifUserexists) {
      return res.status(400).json({ message: "User already exists" });
    }

    await Auth.create({
      email,
      password,
    });

    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { signIn, signUp };
