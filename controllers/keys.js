import Keys from "../models/keys.js";
import crypto from "crypto";

const create_key = async (req, res) => {
  try {
    const { user } = req;
    const { identifier } = req.body;
    if (!user) {
      return res.status(401).send({ error: "Unauthorized" });
    }
    let key_document = await Keys.findOne({ user: user._id });
    const new_key = "qt_" + crypto.randomBytes(8).toString("hex");
    if (!key_document) {
      key_document = await Keys.create({
        user: user._id,
        keys: [{ identifier: identifier, key: new_key, limit: 10 }],
      });
      return res.status(201).send({ status: "success", key: new_key });
    } else {
      key_document.keys.push({
        identifier: identifier,
        key: new_key,
        limit: 10,
      });
      await key_document.save();
      return res.status(201).send({ status: "success", key: new_key });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ error: "Key creation failed: " + error.message });
  }
};

const get_keys = async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      return res.status(401).send({ error: "Unauthorized" });
    }
    const key_document = await Keys.findOne({ user: user._id });
    if (!key_document) {
      return res.status(404).send({ error: "No keys found" });
    }
    const keys = key_document.keys.map((key) => ({
      id: key.id,
      identifier: key.identifier,
      key: key.key,
      limit: key.limit,
      createdAt: key.createdAt,
      updatedAt: key.updatedAt,
    }));
    return res.status(200).send({ tokens: keys });
  } catch (error) {
    return res
      .status(500)
      .send({ error: "Key retrieval failed: " + error.message });
  }
};

const delete_key = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    if (!user) {
      return res.status(401).send({ error: "Unauthorized" });
    }
    const key_document = await Keys.findOne({ user: user._id });
    if (!key_document) {
      return res.status(404).send({ error: "No keys found" });
    }
    const key_index = key_document.keys.findIndex((key) => key.id == id);
    if (key_index === -1) {
      return res.status(404).send({ error: "Key not found" });
    }
    key_document.keys.splice(key_index, 1);
    await key_document.save();
    return res.status(200).send({ status: "success", message: "Key deleted" });
  } catch (error) {
    return res
      .status(500)
      .send({ error: "Key deletion failed: " + error.message });
  }
};

export { create_key, get_keys, delete_key };
