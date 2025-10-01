const mongoose = require("mongoose");
const listing = require("../models/listing");
const initData = require("./data");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });

const initDB = async () => {
  await listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "68caf87fc1dfd6ae527f2720",
  }));
  await listing.insertMany(initData.data);
  console.log("data was successfull saved");
};

initDB();
