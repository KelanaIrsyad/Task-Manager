const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function ValidatePassword(password, hash) {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    console.error("Error in ValidatePassword:", error);
    throw error;
  }
}

const GenerateToken = async (payload) => {
  const token = jwt.sign(payload, process.env.TOKEN_KEY, {
    expiresIn: "1h",
  });

  return token;
};

module.exports = {
  ValidatePassword,
  GenerateToken,
};
