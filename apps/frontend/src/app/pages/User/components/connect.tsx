// src/components/contacts/connect.tsx
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import ContactItem from "./contact-item";
import ContactDialog from "./contact-dialog";
import { IContact, IUser } from "types/modules";
import { Plus } from "lucide-react";
import { Dialog, DialogTrigger } from "app/components/ui/dialog";
import { Button } from "app/components/ui/button";
import { ConfirmationDialog } from "./confirmation-dialog";
import { useTheme } from "app/components/ui/theme-provider";

type Props = {
	open: { bool: boolean; contactId?: string | undefined };
	setOpen: Dispatch<
		SetStateAction<{ bool: boolean; contactId?: string | undefined }>
	>;
	data: {
		message: string;
		data: IUser;
	};
	createContact: (value: any) => void;
	createLoading: boolean;
	createSuccess: boolean;
	createError: boolean;
	createErrorMessage: string;
	deleteContact: (val: any) => void;
	deleteContactLoading: boolean;
};

export const Connect: React.FC<Props> = (props: Props) => {
	const {
		open,
		setOpen,
		data,
		createContact,
		createLoading,
		createSuccess,
		createError,
		createErrorMessage,
		deleteContact,
		deleteContactLoading,
	} = props;

	const { theme } = useTheme();
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [contactId, setContactId] = useState<string | undefined>();

	useEffect(() => {
		const updateDarkMode = () => {
			if (theme === "dark") {
				setIsDarkMode(true);
			} else if (theme === "light") {
				setIsDarkMode(false);
			} else if (theme === "system") {
				setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
			}
		};
		
		updateDarkMode();
		
		if (theme === "system") {
			const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
			mediaQuery.addEventListener("change", updateDarkMode);
			return () => mediaQuery.removeEventListener("change", updateDarkMode);
		}
	}, [theme]);

	const deleteContactById = () => {
		if (!contactId) {
			setShowConfirm(false);
			return;
		}
		deleteContact({ contactId });
		setShowConfirm(false);
	};

	return (
		<React.Fragment>
			<div id = "connections" className={`min-h-screen relative py-12 px-2 rounded-2xl ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
				<h2 className="text-[2.4rem] md:text-[4.1rem] font-extrabold bg-gradient-to-r from-teal-700 via-orange-300 to-violet-600 text-transparent bg-clip-text mb-6 font-dancing">
					Update Connections
				</h2>

				<div className="flex flex-wrap justify-center items-center space-x-4 space-y-4">
					{((data?.data?.contacts ?? []) as Array<IContact | string>)
						.filter((c): c is IContact => typeof c !== "string")
						.map((contact: IContact, idx: number) => (
							<ContactItem
								key={contact?._id || idx}
								medium={contact?.medium}
								logo={contact?.logo}
								createdAt={contact?.createdAt}
								idx={idx}
								contactItem={contact}
								setContactId={setContactId}
								setOpen={setOpen}
								deleteContactLoading={deleteContactLoading}
								setShowConfirm={setShowConfirm}
							/>
						))}

					{/* + Add Contact button */}
					<div className="col-span-12 md:col-span-6 lg:col-span-4 flex items-center justify-center p-4">
						<Dialog
							open={open.bool}
							onOpenChange={(isOpen) => {
								setOpen({ bool: isOpen, contactId: "" });
							}}>
							<DialogTrigger asChild>
								<Button
									variant="outline"
									className="cursor-pointer w-[10rem] h-[10rem] rounded-full transition-colors border border-gray-200"
									onClick={() => setOpen({ bool: true, contactId: "" })}>
									<Plus className={`text-[10rem] ${isDarkMode ? "text-white" : "text-gray-800"}`} />
								</Button>
							</DialogTrigger>

							{/* Dialog content */}
							<ContactDialog
								open={open}
								setOpen={setOpen}
								create={createContact}
								isSuccess={createSuccess}
								isLoading={createLoading}
								isError={createError}
								error={createErrorMessage}
							/>
						</Dialog>
					</div>
				</div>

				<ConfirmationDialog
					showConfirm={showConfirm}
					setShowConfirm={setShowConfirm}
					confirmUpdate={deleteContactById}
					purpose="delete"
				/>
			</div>
		</React.Fragment>
	);
};
