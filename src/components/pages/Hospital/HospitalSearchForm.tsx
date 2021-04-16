import {
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getHospitalList } from "../../../redux/actions/creators/hospital";
import { CITIES, DISTRICTS, WARDS } from "../../../shared/constants/geodata";
import { sortByName } from "../../../shared/helper";

const initialValues = {
  name: "",
  number: "",
  phone: "",
  cityCode: "0",
  districtCode: "0",
  wardCode: "0",
};

const HospitalSearchForm = () => {
  const { pageSize } = useSelector((state: any) => state.hospitals);
  const account = useSelector((state: any) => state.loginAccount?.account);

  const paginationData = { page: 1, size: pageSize };
  const dispatch = useDispatch();
  const dispatchHospitalList = (searchData: any) =>
    dispatch(getHospitalList(searchData, paginationData, account.token));

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      const submitValues = {
        ...values,
        cityCode: values.cityCode === "0" ? null : values.cityCode,
        districtCode: values.districtCode === "0" ? null : values.districtCode,
        wardCode: values.wardCode === "0" ? null : values.wardCode,
      };
      dispatchHospitalList(submitValues);
    },
  });

  const cityChange = (e: React.ChangeEvent<any>) => {
    formik.values.districtCode = "0";
    formik.values.wardCode = "0";
    formik.handleChange(e);
  };

  const districtChange = (e: React.ChangeEvent<any>) => {
    formik.values.wardCode = "0";
    formik.handleChange(e);
  };

  return (
    <>
      <Typography variant="h5" style={{ marginBottom: 12 }}>
        Search for a hospital
      </Typography>
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <Grid container spacing={2}>
          <Grid item container>
            <Grid item xs={12} lg={9}>
              <TextField
                fullWidth
                name="name"
                label="Name"
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} md={4} lg={3}>
              <TextField
                select
                fullWidth
                name="cityCode"
                label="City/Province"
                variant="outlined"
                value={formik.values.cityCode}
                onChange={cityChange}
              >
                <MenuItem value="0">--Select--</MenuItem>
                {CITIES.sort(sortByName).map((city) => (
                  <MenuItem key={city.id} value={city.id}>
                    {city.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <TextField
                select
                fullWidth
                name="districtCode"
                label="District"
                variant="outlined"
                value={formik.values.districtCode}
                onChange={districtChange}
              >
                <MenuItem value="0">--Select--</MenuItem>
                {DISTRICTS.filter(
                  (district) => district.upperId === formik.values.cityCode
                )
                  .sort(sortByName)
                  .map((district) => (
                    <MenuItem key={district.id} value={district.id}>
                      {district.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <TextField
                select
                fullWidth
                name="wardCode"
                label="Ward/Commune"
                variant="outlined"
                value={formik.values.wardCode}
                onChange={formik.handleChange}
              >
                <MenuItem value="0">--Select--</MenuItem>
                {WARDS.filter(
                  (ward) => ward.upperId === formik.values.districtCode
                )
                  .sort(sortByName)
                  .map((ward) => (
                    <MenuItem key={ward.id} value={ward.id}>
                      {ward.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={12} lg={9}>
              <TextField
                fullWidth
                name="number"
                label="Detailed address"
                variant="outlined"
                value={formik.values.number}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={12} lg={9}>
              <TextField
                fullWidth
                name="phone"
                label="Phone number"
                variant="outlined"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Grid item container style={{ marginTop: 12 }}>
            <Grid item>
              <Button type="submit" color="primary" variant="contained">
                Search
              </Button>
              <Button
                type="reset"
                color="primary"
                variant="outlined"
                style={{ marginLeft: 12 }}
              >
                Reset Form
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default HospitalSearchForm;
