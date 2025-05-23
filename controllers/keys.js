import Keys from "../models/keys.js";
import Activity from "../models/activity.js";
import crypto from "crypto";

const create_key = async (req, res) => {
  try {
    const { user } = req;
    const { identifier } = req.body;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const new_key = "qt_" + crypto.randomBytes(16).toString("hex");
    let key_document = await Keys.findOne({ user: user._id });
    if (!key_document) {
      return res.status(400).json({ error: "Error creating keys, key document not found." })
    } else {
      key_document.keys.push({
        identifier: identifier,
        key: new_key,
      });
      await key_document.save();
      await Activity.create({
        type: "key_create",
        info: `Key created with identifier ${identifier}`,
        user: user._id,
        status: "success",
      });
      return res.status(201).json({ status: "success", key: new_key });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Key creation failed: " + error.message });
  }
};

const get_keys = async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const key_document = await Keys.findOne({ user: user._id });
    if (!key_document) {
      return res.status(404).json({ error: "No keys found" });
    }
    return res.status(200).json({ tokens: key_document.keys });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Key retrieval failed: " + error.message });
  }
};

const delete_key = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const key_document = await Keys.findOne({ user: user._id });
    if (!key_document) {
      return res.status(404).json({ error: "No keys found" });
    }
    const key_index = key_document.keys.findIndex((key) => key.id == id);
    if (key_index === -1) {
      return res.status(404).json({ error: "Key not found" });
    }
    key_document.keys.splice(key_index, 1);
    await key_document.save();
    await Activity.create({
      type: "key_delete",
      info: `Key with id ${id} deleted`,
      user: user._id,
      status: "success",
    });
    return res.status(200).json({ status: "success", message: "Key deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Key deletion failed: " + error.message });
  }
};

export { create_key, get_keys, delete_key };
