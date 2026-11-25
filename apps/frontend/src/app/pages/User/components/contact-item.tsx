// src/components/contacts/contact-item.tsx
import React, { Dispatch, SetStateAction, useState } from "react";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogClose,
} from "app/components/ui/dialog";
import { Button } from "app/components/ui/button";
import { XIcon, Edit3, Trash2 } from "lucide-react";
import { IContact } from "types/modules";

interface ContactItemProps {
	medium?: string;
	logo?: string;
	createdAt?: string;
	// additional props from parent Connect component
	idx?: number;
	contactItem?: IContact;
	setContactId: Dispatch<SetStateAction<string | undefined>>;
	setOpen: Dispatch<
		SetStateAction<{ bool: boolean; contactId?: string | undefined }>
	>;
	deleteContactLoading?: boolean;
	setShowConfirm: Dispatch<SetStateAction<boolean>>;
}

const ContactItem: React.FC<ContactItemProps> = ({
	medium,
	logo,
	createdAt,
	idx,
	contactItem,
	setContactId,
	setOpen: setParentDialogOpen,
	deleteContactLoading,
	setShowConfirm,
}) => {
	const [open, setOpen] = useState(false);

	// Open parent edit dialog for this contact
	const handleEdit = () => {
		if (contactItem && contactItem._id) {
			// open parent ContactDialog in edit mode
			setParentDialogOpen({ bool: true, contactId: contactItem._id });
		}
		// close local details dialog
		setOpen(false);
	};

	// Ask parent to confirm deletion
	const handleDelete = () => {
		if (contactItem && contactItem._id) {
			setContactId(contactItem._id);
			setShowConfirm(true);
		}
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{/* GRID ITEM (click to open details) */}
			<DialogTrigger asChild>
				<div className="w-[10rem] h-[10rem] cursor-pointer border rounded-full shadow-sm bg-white hover:shadow-md transition-all flex items-center justify-center p-4">
					<div className="w-full h-full rounded-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
						{logo ? (
							<img
								src={logo}
								alt="Contact logo"
								className="h-20 w-20 object-contain rounded-full"
							/>
						) : (
							<div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
								<span className="text-2xl font-semibold text-gray-600">
									?
								</span>
							</div>
						)}
					</div>
				</div>
			</DialogTrigger>

			{/* FULL DETAILS DIALOG */}
			<DialogContent className="p-4 max-w-xl">
				<div className="flex items-center justify-between">
					<DialogTitle>CONTACT {idx !== undefined ? idx + 1 : 1}</DialogTitle>
					<DialogClose className="p-2 rounded-lg text-red-600 bg-red-100">
						<XIcon className="w-4 h-4" />
					</DialogClose>
				</div>

				<div className="text-sm space-y-4 mt-3">
					{logo && (
						<div className="flex justify-center">
							<img
								src={logo}
								alt={medium || "Contact logo"}
								className="w-32 h-32 object-contain rounded-lg border"
							/>
						</div>
					)}

					{medium && (
						<p>
							<strong>Medium:</strong> {medium}
						</p>
					)}

					{logo && (
						<p>
							<strong>Logo URL:</strong>{" "}
							<a
								href={logo}
								target="_blank"
								rel="noreferrer"
								className="text-blue-600 underline break-all">
								{logo}
							</a>
						</p>
					)}

					{createdAt && (
						<p className="text-xs text-gray-400">
							Added At: {new Date(createdAt).toLocaleString()}
						</p>
					)}
				</div>

				{/* Actions */}
				<div className="mt-4 flex gap-2 justify-end">
					<Button
						type="button"
						variant="outline"
						onClick={handleEdit}
						className="flex items-center gap-2">
						<Edit3 className="w-4 h-4" />
						Edit
					</Button>

					<Button
						type="button"
						variant="destructive"
						onClick={handleDelete}
						disabled={deleteContactLoading}
						className="flex items-center gap-2 text-white">
						{deleteContactLoading ? (
							<span className="animate-spin inline-block w-4 h-4 rounded-full border-2 border-current border-t-transparent" />
						) : (
							<Trash2 className="w-4 h-4" />
						)}
						Delete
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ContactItem;

