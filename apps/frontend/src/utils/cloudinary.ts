export const CLOUDINARY_CLOUD_NAME = "dakda5ni3";
export const CLOUDINARY_UPLOAD_PRESET = "portfolio-builder";
export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

/**
 * Uploads an image or file to Cloudinary using the configured cloud name and upload preset.
 * @param file - The File or Blob to upload
 * @returns The secure URL or fallback URL of the uploaded asset
 */
export const uploadToCloudinary = async (file: File | Blob): Promise<string> => {
	const imgData = new FormData();
	imgData.append("file", file);
	imgData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
	imgData.append("cloud_name", CLOUDINARY_CLOUD_NAME);

	const res = await fetch(CLOUDINARY_UPLOAD_URL, {
		method: "POST",
		body: imgData,
	});

	const result = await res.json();

	if (!res.ok || result?.error) {
		throw new Error(result?.error?.message || "Cloudinary upload failed");
	}

	return result?.secure_url || result?.url || "";
};
