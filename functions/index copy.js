const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.deleteAllUsers = functions.https.onRequest(async (req, res) => {
  try {
    // Use POST body instead of query param
    const key = req.body.key;
    if (key !== "supersecret123!") {
      return res.status(403).send("Forbidden: Invalid key");
    }

    let nextPageToken = undefined;
    let deletedCount = 0;

    do {
      const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
      const deletePromises = listUsersResult.users.map((user) =>
        admin.auth().deleteUser(user.uid),
      );

      await Promise.all(deletePromises);
      deletedCount += listUsersResult.users.length;
      nextPageToken = listUsersResult.pageToken;
    } while (nextPageToken);

    return res.send(`✅ Deleted ${deletedCount} users successfully.`);
  } catch (error) {
    console.error("Error deleting users:", error);
    return res.status(500).send("❌ Error deleting users.");
  }
});
