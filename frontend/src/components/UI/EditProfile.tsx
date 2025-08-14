import { updateData } from "@/networks/customernetworks";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function EditProfile({
  user,
  editprofile,
  setEditProfile,
}: {
  user: any;
  editprofile: string;
  setEditProfile: React.Dispatch<React.SetStateAction<"editprofile" | "account" | "orders" | "cart">>;
}) {
  const { register, handleSubmit } = useForm();
  async function handleDetail(formData: any) {
  try {
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      const fieldValue = value as any; 

      if (key === "profile" && fieldValue?.[0]?.size > 0) {
        data.append("profile", fieldValue[0]);
      } 
      else if (key !== "profile" && fieldValue) {
        data.append(key, fieldValue);
      }
    });

    const result = await updateData(data, user._id);

    if (result) {
      toast.success("Detail updated successfully");
      setEditProfile('account');
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Something went wrong");
  }
}


  return (
    <div className="w-full flex flex-col gap-5 items-center bg-white text-black px-4 md:px-8 py-6 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-semibold mb-3 md:mb-0">
        Edit Profile
      </h1>

      <form
        onSubmit={handleSubmit(handleDetail)}
        className="w-full max-w-4xl flex flex-col gap-6 p-4 shadow-gray-500 shadow-sm border-2 rounded-md"
      >
        <div className="flex flex-col gap-2 bg-slate-100 shadow-md py-4 px-4 rounded-sm">
          <label className="text-lg font-bold">Profile Image</label>
          <input {...register("profile")} type="file" className="text-sm py-2 px-1 rounded-sm" />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-2 bg-slate-100 shadow-md py-4 px-4 rounded-sm">
            <label className="text-lg font-bold">Name</label>
            <input
              {...register("name")}
              type="text"
              placeholder={user.name}
              className="text-sm py-2 px-2 border-gray-300 border-2 focus:border-slate-300 rounded-sm"
            />
          </div>
          <div className="flex-1 flex flex-col gap-2 bg-slate-100 shadow-md py-4 px-4 rounded-sm">
            <label className="text-lg font-bold">Email</label>
            <input
              {...register("email")}
              type="text"
              placeholder={user.email}
              className="text-sm py-2 px-2 border-gray-300 border-2 focus:border-slate-300 rounded-sm"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-2 bg-slate-100 shadow-md py-4 px-4 rounded-sm">
            <label className="text-lg font-bold">Phone_no.</label>
            <input
              {...register("phone_no")}
              type="text"
              placeholder={user.phone_no}
              className="text-sm py-2 px-2 border-gray-300 border-2 focus:border-slate-300 rounded-sm"
            />
          </div>
          <div className="flex-1 flex flex-col gap-2 bg-slate-100 shadow-md py-4 px-4 rounded-sm">
            <label className="text-lg font-bold">Gender</label>
            <input
              {...register("gender")}
              type="text"
              placeholder={user.gender}
              className="text-sm py-2 px-2 border-gray-300 border-2 focus:border-slate-300 rounded-sm"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setEditProfile('account')}
            className="bg-gray-400 text-white px-6 py-2 rounded-md shadow hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
