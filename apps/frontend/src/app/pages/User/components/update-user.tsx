import React, { useEffect, useState } from "react";
import { PersonalDetails } from "./personal-details";
import { Projects } from "./projects";
import { UpdateAbout } from "./about";
import { Connect } from "./connect";
import { useSlice } from "../slice";
import { useSlice as useHomeSlice } from "app/pages/Home/slice";
import { toast } from "app/components/ui/use-toast";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGlobalSlice } from "app/slice";
import { selectRememberMe, selectToken, selectUser } from "app/slice/selectors";
import { Skills } from "./skills";
import { TrashIcon } from "lucide-react";
import { EducationalDetails } from "./educational-details";
import { Themes } from "./themes";
import { ConfirmationDialog } from "./confirmation-dialog";

export const UpdateUser = () => {
	const dispatch = useDispatch();
	const { actions } = useGlobalSlice();
	const user = useParams();
	const wholeStoredUser = useSelector(selectUser);
	const storedToken = useSelector(selectToken);
	const storedRememberMe = useSelector(selectRememberMe);

	const [open, setOpen] = useState<{
		bool: boolean;
		skillId: string | undefined;
	}>({
		bool: false,
		skillId: "",
	});

	const [projectOpen, setProjectOpen] = useState<{
		bool: boolean;
		projectId?: string | undefined;
	}>({
		bool: false,
		projectId: "",
	});

	const [educationalDetailOpen, setEducationalDetailOpen] = useState<{
		bool: boolean;
		educationId?: string | undefined;
	}>({
		bool: false,
		educationId: "",
	});

	const [contactOpen, setContactOpen] = useState<{
		bool: boolean;
		contactId?: string | undefined;
	}>({
		bool: false,
		contactId: "",
	});

	const [themeOpen, setThemeOpen] = useState<{
		bool: boolean;
		themeId?: string | undefined;
	}>({
		bool: false,
		themeId: "",
	});

	const [showConfirm, setShowConfirm] = useState(false);
	const [userIdToDelete, setUserIdToDelete] = useState<string | undefined>();

	const {
		useUpdateUserMutation,
		useCreateSkillMutation,
		useLazyGetUserQuery,
		useUpdateSkillMutation,
		useDeleteSkillMutation,
		useDeleteUserMutation,
		useCreateProjectMutation,
		useUpdateProjectMutation,
		useDeleteProjectMutation,
		useCreateEducationalDetailsMutation,
		useUpdateEducationalDetailsMutation,
		useDeleteEducationalDetailsMutation,
		useCreateContactMutation,
		useUpdateContactMutation,
		useDeleteContactMutation,
		useCreateThemeMutation,
		useUpdateThemeMutation,
		useDeleteThemeMutation,
	} = useSlice();

	const [updateUser, { isLoading, isSuccess, isError, error }] =
		useUpdateUserMutation();

	const [
		createProject,
		{
			isLoading: createProjectLoading,
			isSuccess: createProjectSuccess,
			isError: createProjectError,
			error: createProjectErrorMessage,
		},
	] = useCreateProjectMutation();

	const [
		updateProject,
		{
			isLoading: updateProjectLoading,
			isSuccess: updateProjectSuccess,
			isError: updateProjectError,
			error: updateProjectErrorMessage,
		},
	] = useUpdateProjectMutation();

	const [
		deleteProject,
		{
			isLoading: deleteProjectLoading,
			isSuccess: deleteProjectSuccess,
			isError: deleteProjectError,
			error: deleteProjectErrorMessage,
		},
	] = useDeleteProjectMutation();

	const [
		createEducationalDetail,
		{
			isLoading: createEducationalDetailLoading,
			isSuccess: createEducationalDetailSuccess,
			isError: createEducationalDetailError,
			error: createEducationalDetailErrorMessage,
		},
	] = useCreateEducationalDetailsMutation();

	const [
		updateEducationalDetail,
		{
			isLoading: updateEducationalDetailLoading,
			isSuccess: updateEducationalDetailSuccess,
			isError: updateEducationalDetailError,
			error: updateEducationalDetailErrorMessage,
		},
	] = useUpdateEducationalDetailsMutation();

	const [
		deleteEducationalDetail,
		{
			isLoading: deleteEducationalDetailLoading,
			isSuccess: deleteEducationalDetailSuccess,
			isError: deleteEducationalDetailError,
			error: deleteEducationalDetailErrorMessage,
		},
	] = useDeleteEducationalDetailsMutation();

	const [
		createContact,
		{
			isLoading: createContactLoading,
			isSuccess: createContactSuccess,
			isError: createContactError,
			error: createContactErrorMessage,
		},
	] = useCreateContactMutation();

	const [
		updateContact,
		{
			isLoading: updateContactLoading,
			isSuccess: updateContactSuccess,
			isError: updateContactError,
			error: updateContactErrorMessage,
		},
	] = useUpdateContactMutation();

	const [
		deleteContact,
		{
			isLoading: deleteContactLoading,
			isSuccess: deleteContactSuccess,
			isError: deleteContactError,
			error: deleteContactErrorMessage,
		},
	] = useDeleteContactMutation();

	const [
		createTheme,
		{
			isLoading: createThemeLoading,
			isSuccess: createThemeSuccess,
			isError: createThemeError,
			error: createThemeErrorMessage,
		},
	] = useCreateThemeMutation();

	const [
		updateTheme,
		{
			isLoading: updateThemeLoading,
			isSuccess: updateThemeSuccess,
			isError: updateThemeError,
			error: updateThemeErrorMessage,
		},
	] = useUpdateThemeMutation();

	const [
		deleteTheme,
		{
			isLoading: deleteThemeLoading,
			isSuccess: deleteThemeSuccess,
			isError: deleteThemeError,
			error: deleteThemeErrorMessage,
		},
	] = useDeleteThemeMutation();

	const [
		deleteUser,
		{
			isSuccess: deleteUserSuccess,
			isLoading: deleteUserLoading,
			isError: deleteUserError,
			error: deleteUserErrorMessage,
		},
	] = useDeleteUserMutation();

	const { useLazyGetAllUsersQuery } = useHomeSlice();

	const [
		getAllUsers,
		{
			data: users,
			isLoading: usersLoading,
			isError: usersError,
			error: usersErrorMessage,
		},
	] = useLazyGetAllUsersQuery();

	useEffect(() => {
		getAllUsers({});
	}, [deleteUserSuccess]);

	useEffect(() => {
		if (isError || error) {
			toast({
				title: "Error",
				variant: "destructive",
				description: error as string,
			});
		}
	}, [isError, error]);

	const [
		createSkill,
		{
			isLoading: createSkillLoading,
			isSuccess: createSkillSuccess,
			isError: createSkillError,
			error: createSkillErrorMessage,
		},
	] = useCreateSkillMutation();

	const [
		updateSkill,
		{
			isLoading: updateSkillLoading,
			isSuccess: updateSkillSuccess,
			isError: updateSkillError,
			error: updateSkillErrorMessage,
		},
	] = useUpdateSkillMutation();

	const [
		deleteSkill,
		{
			isLoading: deleteSkillLoading,
			isSuccess: deleteSkillSuccess,
			isError: deleteSkillError,
			error: deleteSkillErrorMessage,
		},
	] = useDeleteSkillMutation();

	const [
		getUser,
		{ data: userData, isError: userError, error: userErrorMessage },
	] = useLazyGetUserQuery();

	useEffect(() => {
		getUser({ userId: user?.userId });
	}, [
		user?.userId,
		isSuccess,
		createSkillSuccess,
		updateSkillSuccess,
		deleteSkillSuccess,
		createProjectSuccess,
		updateProjectSuccess,
		deleteProjectSuccess,
		createEducationalDetailSuccess,
		updateEducationalDetailSuccess,
		deleteEducationalDetailSuccess,
		createContactSuccess,
		updateContactSuccess,
		deleteContactSuccess,
		createThemeSuccess,
		updateThemeSuccess,
		deleteThemeSuccess,
	]);

	useEffect(() => {
		if (isSuccess) {
			toast({
				title: "Success",
				description: "Updated the User Successfully",
				variant: "success",
			});
		}
	}, [isSuccess]);

	useEffect(() => {
		if (isError || error) {
			toast({
				title: "Error",
				description: error as string,
				variant: "destructive",
			});
		}
	}, [isError, error]);

	useEffect(() => {
		if (createSkillSuccess) {
			toast({
				title: "Success",
				description: "Created a Skill Successfully",
				variant: "success",
			});
		}
	}, [createSkillSuccess]);

	useEffect(() => {
		if (createSkillError || createSkillErrorMessage) {
			toast({
				title: "Error",
				description: error as string,
				variant: "destructive",
			});
		}
	}, [createSkillError, createSkillErrorMessage]);

	useEffect(() => {
		if (updateSkillSuccess) {
			toast({
				title: "Success",
				description: "Updated the skill Successfully",
				variant: "success",
			});
		}
	}, [updateSkillSuccess]);

	useEffect(() => {
		if (updateSkillError || updateSkillErrorMessage) {
			toast({
				title: "Error",
				description: error as string,
				variant: "destructive",
			});
		}
	}, [updateSkillError, updateSkillErrorMessage]);

	useEffect(() => {
		if (deleteSkillSuccess) {
			toast({
				title: "Success",
				description: "Delete the skill Successfully",
				variant: "success",
			});
		}
	}, [deleteSkillSuccess]);

	useEffect(() => {
		if (deleteSkillError || deleteSkillErrorMessage) {
			toast({
				title: "Error",
				description: error as string,
				variant: "destructive",
			});
		}
	}, [deleteSkillError, deleteSkillErrorMessage]);

	useEffect(() => {
		if (deleteUserSuccess) {
			toast({
				title: "Success",
				description: "Delete the user Successfully",
				variant: "success",
			});
		}
	}, [deleteUserSuccess]);

	useEffect(() => {
		if (deleteUserError || deleteUserErrorMessage) {
			toast({
				title: "Error",
				description: error as string,
				variant: "destructive",
			});
		}
	}, [deleteUserError, deleteUserErrorMessage]);

	useEffect(() => {
		if (createProjectSuccess) {
			toast({
				title: "Success",
				description: "Created a Project Successfully",
				variant: "success",
			});
		}
	}, [createProjectSuccess]);

	useEffect(() => {
		if (createProjectError || createProjectErrorMessage) {
			toast({
				title: "Error",
				description: "Failed to create a Project",
				variant: "destructive",
			});
		}
	}, [createProjectError, createProjectErrorMessage]);

	useEffect(() => {
		if (createEducationalDetailSuccess) {
			toast({
				title: "Success",
				description: "Created an Educational Detail Successfully",
				variant: "success",
			});
		}
	}, [createEducationalDetailSuccess]);

	useEffect(() => {
		if (createEducationalDetailError || createEducationalDetailErrorMessage) {
			toast({
				title: "Error",
				description: "Failed to create an Educational Detail",
				variant: "destructive",
			});
		}
	}, [createEducationalDetailError, createEducationalDetailErrorMessage]);

	useEffect(() => {
		if (updateEducationalDetailSuccess) {
			toast({
				title: "Success",
				description: "Updated the Educational Detail Successfully",
				variant: "success",
			});
		}
	}, [updateEducationalDetailSuccess]);

	useEffect(() => {
		if (updateEducationalDetailError || updateEducationalDetailErrorMessage) {
			toast({
				title: "Error",
				description: "Failed to update an Educational Detail",
				variant: "destructive",
			});
		}
	}, [updateEducationalDetailError, updateEducationalDetailErrorMessage]);

	useEffect(() => {
		if (deleteEducationalDetailSuccess) {
			toast({
				title: "Success",
				description: "Deleted the Educational Detail Successfully",
				variant: "success",
			});
		}
	}, [deleteEducationalDetailSuccess]);

	useEffect(() => {
		if (deleteEducationalDetailError || deleteEducationalDetailErrorMessage) {
			toast({
				title: "Error",
				description: "Failed to delete an Educational Detail",
				variant: "destructive",
			});
		}
	}, [deleteEducationalDetailError, deleteEducationalDetailErrorMessage]);

	useEffect(() => {
		if (createContactSuccess) {
			toast({
				title: "Success",
				description: "Created a Contact Successfully",
				variant: "success",
			});
		}
	}, [createContactSuccess]);

	useEffect(() => {
		if (createContactError || createContactErrorMessage) {
			toast({
				title: "Error",
				description: "Failed to create a Contact",
				variant: "destructive",
			});
		}
	}, [createContactError, createContactErrorMessage]);

	useEffect(() => {
		if (updateContactSuccess) {
			toast({
				title: "Success",
				description: "Updated the Contact Successfully",
				variant: "success",
			});
		}
	}, [updateContactSuccess]);

	useEffect(() => {
		if (updateContactError || updateContactErrorMessage) {
			toast({
				title: "Error",
				description: "Failed to update a Contact",
				variant: "destructive",
			});
		}
	}, [updateContactError, updateContactErrorMessage]);

	useEffect(() => {
		if (deleteContactSuccess) {
			toast({
				title: "Success",
				description: "Deleted the Contact Successfully",
				variant: "success",
			});
		}
	}, [deleteContactSuccess]);

	useEffect(() => {
		if (deleteContactError || deleteContactErrorMessage) {
			toast({
				title: "Error",
				description: "Failed to delete a Contact",
				variant: "destructive",
			});
		}
	}, [deleteContactError, deleteContactErrorMessage]);

	useEffect(() => {
		if (createThemeSuccess) {
			toast({
				title: "Success",
				description: "Created a Theme Successfully",
				variant: "success",
			});
		}
	}, [createThemeSuccess]);

	useEffect(() => {
		if (createThemeError || createThemeErrorMessage) {
			toast({
				title: "Error",
				description: "Failed to create a Theme",
				variant: "destructive",
			});
		}
	}, [createThemeError, createThemeErrorMessage]);

	useEffect(() => {
		if (updateThemeSuccess) {
			toast({
				title: "Success",
				description: "Updated the Theme Successfully",
				variant: "success",
			});
		}
	}, [updateThemeSuccess]);

	useEffect(() => {
		if (updateThemeError || updateThemeErrorMessage) {
			toast({
				title: "Error",
				description: "Failed to update a Theme",
				variant: "destructive",
			});
		}
	}, [updateThemeError, updateThemeErrorMessage]);

	useEffect(() => {
		if (deleteThemeSuccess) {
			toast({
				title: "Success",
				description: "Deleted the Theme Successfully",
				variant: "success",
			});
		}
	}, [deleteThemeSuccess]);

	useEffect(() => {
		if (deleteThemeError || deleteThemeErrorMessage) {
			toast({
				title: "Error",
				description: "Failed to delete a Theme",
				variant: "destructive",
			});
		}
	}, [deleteThemeError, deleteThemeErrorMessage]);

	useEffect(() => {
		if (userData) {
			dispatch(
				actions.setUserWithStorage({
					user: userData?.data,
					rememberMe: storedRememberMe,
					token: storedToken,
				})
			);
		}
	}, [userData, storedRememberMe, storedToken]);

	const deleteUserById = () => {
		if (!userIdToDelete) {
			setShowConfirm(false);
			return;
		}
		deleteUser({ userId: userIdToDelete });
		setShowConfirm(false);
		setUserIdToDelete(undefined);
	};

	return (
		<React.Fragment>
			<div className="p-4 flex flex-col space-y-5">
				<PersonalDetails
					data={userData}
					update={updateUser}
					isLoading={isLoading}
				/>
				<Skills
					open={open}
					setOpen={setOpen}
					data={userData}
					createSkill={open?.skillId ? updateSkill : createSkill}
					createSuccess={
						open?.skillId ? updateSkillSuccess : createSkillSuccess
					}
					createError={open?.skillId ? updateSkillError : createSkillError}
					createErrorMessage={
						open?.skillId
							? (updateSkillErrorMessage as string)
							: (createSkillErrorMessage as string)
					}
					createLoading={
						open?.skillId ? updateSkillLoading : createSkillLoading
					}
					deleteSkill={deleteSkill}
					deleteSkillLoading={deleteSkillLoading}
				/>
				<Projects
					open={projectOpen}
					setOpen={setProjectOpen}
					data={userData}
					createProject={projectOpen.projectId ? updateProject : createProject}
					createLoading={
						projectOpen.projectId ? updateProjectLoading : createProjectLoading
					}
					createSuccess={
						projectOpen.projectId ? updateProjectSuccess : createProjectSuccess
					}
					createError={
						projectOpen.projectId ? updateProjectError : createProjectError
					}
					createErrorMessage={
						projectOpen.projectId
							? (updateProjectErrorMessage as string)
							: (createProjectErrorMessage as string)
					}
					deleteProject={deleteProject}
					deleteProjectLoading={deleteProjectLoading}
				/>
				<EducationalDetails
					open={educationalDetailOpen}
					setOpen={setEducationalDetailOpen}
					data={userData}
					createEducationalDetail={
						educationalDetailOpen.educationId
							? updateEducationalDetail
							: createEducationalDetail
					}
					createLoading={
						educationalDetailOpen.educationId
							? updateEducationalDetailLoading
							: createEducationalDetailLoading
					}
					createSuccess={
						educationalDetailOpen.educationId
							? updateEducationalDetailSuccess
							: createEducationalDetailSuccess
					}
					createError={
						educationalDetailOpen.educationId
							? updateEducationalDetailError
							: createEducationalDetailError
					}
					createErrorMessage={
						educationalDetailOpen.educationId
							? (updateEducationalDetailErrorMessage as string)
							: (createEducationalDetailErrorMessage as string)
					}
					deleteEducationalDetail={deleteEducationalDetail}
					deleteEducationalDetailLoading={deleteEducationalDetailLoading}
				/>
				<UpdateAbout
					data={userData}
					update={updateUser}
					isLoading={isLoading}
				/>
				<Connect
					open={contactOpen}
					setOpen={setContactOpen}
					data={userData}
					createContact={contactOpen.contactId ? updateContact : createContact}
					createLoading={
						contactOpen.contactId ? updateContactLoading : createContactLoading
					}
					createSuccess={
						contactOpen.contactId ? updateContactSuccess : createContactSuccess
					}
					createError={
						contactOpen.contactId ? updateContactError : createContactError
					}
					createErrorMessage={
						contactOpen.contactId
							? (updateContactErrorMessage as string)
							: (createContactErrorMessage as string)
					}
					deleteContact={deleteContact}
					deleteContactLoading={deleteContactLoading}
				/>
				<Themes
					open={themeOpen}
					setOpen={setThemeOpen}
					data={userData}
					createTheme={createTheme}
					createLoading={createThemeLoading}
					createSuccess={createThemeSuccess}
					createError={createThemeError}
					createErrorMessage={createThemeErrorMessage as string}
					updateTheme={updateTheme}
					updateLoading={updateThemeLoading}
					updateSuccess={updateThemeSuccess}
					updateError={updateThemeError}
					updateErrorMessage={updateThemeErrorMessage as string}
					deleteTheme={deleteTheme}
					deleteThemeLoading={deleteThemeLoading}
				/>
				<div className="flex md:hidden items-center justify-center">
					<div className="mt-auto pt-15">
						<a
							href={`/${wholeStoredUser?._id}/portfolio`}
							target="_blank"
							className="border rounded-2xl py-5"
							style={{ textDecoration: "none" }}>
							<button type="button">
								<span className="text-xl font-semibold bg-gradient-to-r from-teal-900 via-orange-500 to-violet-800 text-transparent bg-clip-text font-dancing relative px-4 py-2.5 transition-all ease-in duration-75 bg-neutral-primary-soft rounded-base group-hover:bg-transparent group-hover:dark:bg-transparent leading-5">
									Portfolio Link
								</span>
							</button>
						</a>
					</div>
				</div>
				{wholeStoredUser?.is_admin && (
					<React.Fragment>
						<div className="my-5 bg-gray-600 h-[1px] w-full mx-4"></div>
						<div className="p-4 grid grid-cols-12 gap-4">
							{users?.data?.map((user) => {
								return (
									<React.Fragment>
										<div className="col-span-12 md:col-span-6 xl:col-span-4 border shadow-lg rounded-2xl px-4 py-2 flex items-center justify-between">
											<div className="flex items-center space-x-4">
												<img
													src={user?.image ? user.image : "/images/user.png"}
													alt=""
													className="h-[5rem] w-[5rem] rounded-full"
												/>
												<div>
													<h4 className="text-2xl md:text-3xl font-poppins font-bold">
														{user?.full_name || "Unassigned"}
													</h4>
													<h4 className="text-lg md:text-xl font-poppins font-medium">
														{user?.email}
													</h4>
												</div>
											</div>
											{/* icon  */}
											<div
												onClick={() => {
													setUserIdToDelete(user?._id || "");
													setShowConfirm(true);
												}}
												className="p-4 bg-red-100 rounded-2xl cursor-pointer border">
												<TrashIcon className="text-red-600 font-extrabold" />
											</div>
										</div>
									</React.Fragment>
								);
							})}
						</div>
					</React.Fragment>
				)}
				<ConfirmationDialog
					showConfirm={showConfirm}
					setShowConfirm={setShowConfirm}
					confirmUpdate={deleteUserById}
					purpose="delete"
				/>
			</div>
		</React.Fragment>
	);
};
