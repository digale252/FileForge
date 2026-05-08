require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const CloudConvert = require('cloudconvert');
const cloudConvert = new CloudConvert(process.env.CLOUDCONVERT_API_KEY.trim());

async function test() {
  try {
    const user = await cloudConvert.users.me();
    console.log("SUCCESS:", user);
  } catch (error) {
    console.error("ERROR:", error.response?.data || error.message);
  }
}
test();
