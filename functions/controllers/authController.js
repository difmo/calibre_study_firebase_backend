import admin from "firebase-admin";

// Signup
export const signup = async (req, res) => {
  try {
    const { email, password, displayName } = req.body;
    const userRecord = await admin.auth().createUser({ email, password, displayName });
    const token = await admin.auth().createCustomToken(userRecord.uid);
    return res.status(201).json({ success: true, message: "User created", token });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

// Login (verify email/password)
export const login = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await admin.auth().getUserByEmail(email);
    const token = await admin.auth().createCustomToken(user.uid);
    return res.json({ success: true, token, message: "Login successful" });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
