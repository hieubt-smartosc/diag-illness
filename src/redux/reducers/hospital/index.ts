import * as HospitalActionTypes from "../../actions/types/hospital";

export const Hospitals = (
  state = {
    isLoading: true,
    errMess: null,
    hospitals: null,
    currentPage: 1,
    pageSize: 5,
    totalPages: 0,
    totalEntries: 0,
    searchData: null,
    successStatus: false,
    deleteSuccessStatus: false,
  },
  action: { type: string; payload: any }
): any => {
  switch (action.type) {
    case HospitalActionTypes.FETCH_HOSPITALS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        hospitals: action.payload?.data?.list,
        totalPages: action.payload?.data?.totalPage,
        totalEntries: action.payload?.data?.totalEntries,
        currentPage: action.payload?.paginationData?.page,
        searchData: action.payload?.searchData
      };

    case HospitalActionTypes.HOSPITALS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};