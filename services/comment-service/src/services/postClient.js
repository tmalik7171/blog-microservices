const axios = require("axios");

const verifyPostExists = async (postId) => {
  try {
    const r = await axios.get(`${process.env.POST_SERVICE_URL}/api/v1/posts/${postId}`, { timeout: 3000 });
    return r.status === 200;
  } catch {
    return false;
  }
};

module.exports = { verifyPostExists };
