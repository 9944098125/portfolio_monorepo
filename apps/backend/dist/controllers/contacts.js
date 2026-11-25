"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.updateContact = exports.getContactById = exports.getContactsByUserId = exports.createContact = void 0;
const Contacts_1 = __importDefault(require("../models/Contacts"));
const createContact = async (req, res, next) => {
    try {
        const { medium, logo, userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const newContact = new Contacts_1.default({ medium, logo, userId });
        await newContact.save();
        return res.status(201).json({
            message: "Contact created successfully",
        });
    }
    catch (err) {
        next(err);
    }
};
exports.createContact = createContact;
const getContactsByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const contacts = await Contacts_1.default.find({ userId });
        return res.status(200).json({
            message: "Contacts retrieved successfully",
            data: contacts,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getContactsByUserId = getContactsByUserId;
const getContactById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await Contacts_1.default.findOne({ _id: contactId });
        if (!contact) {
            return res.status(400).json({ message: "Contact not found" });
        }
        return res.status(200).json({
            message: "Contact retrieved successfully",
            data: contact,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getContactById = getContactById;
const updateContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const { medium, logo } = req.body;
        const updatedContact = await Contacts_1.default.findByIdAndUpdate(contactId, { medium, logo }, { new: true });
        if (!updatedContact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        return res.status(200).json({
            message: "Contact updated successfully",
            data: updatedContact,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateContact = updateContact;
const deleteContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        await Contacts_1.default.findByIdAndDelete(contactId);
        return res.status(200).json({
            message: "Contact deleted successfully",
        });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteContact = deleteContact;
