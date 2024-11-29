import { toast } from "sonner";
import axiosInstance from "../utils/axiosUtils";
import { setNotes } from "./noteSlice";
import { setAdminNotes, setAdminUsers } from "./adminSlice";

export const getAllNotes = async (dispatch, setLoading, search, token) => {
  try {
    setLoading(true);
    const { data } = await axiosInstance.get(
      `/api/note/get-user-notes?title=${search}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      setLoading(false);
      dispatch(setNotes({ notes: data.notes }));
    }
  } catch (error) {
    setLoading(false);
    console.log(error);
    toast.error(error.response.data.message);
  }
};

export const getAllAdminNotes = async (dispatch, setLoading, search, token) => {
  try {
    setLoading(true);
    const { data } = await axiosInstance.get(
      `/api/note/get-admin-all-notes?title=${search}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      setLoading(false);
      dispatch(setAdminNotes({ notes: data.notes }));
    }
  } catch (error) {
    setLoading(false);
    console.log(error);
    toast.error(error.response.data.message);
  }
};

export const getAllAdminUsers = async (dispatch, setLoading, search, token) => {
  try {
    setLoading(true);
    const { data } = await axiosInstance.get(
      `/api/user/get-all-users?title=${search}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      setLoading(false);
      dispatch(setAdminUsers({ users: data.users }));
    }
  } catch (error) {
    setLoading(false);
    console.log(error);
    toast.error(error.response.data.message);
  }
};
