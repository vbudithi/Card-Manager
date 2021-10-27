import { connect } from "react-redux";
import Cities from "./Cities";

const getFilterCities = (data, filter) => {
  let cities = [];
  if (filter === "Allcards") {
    cities = data.map((obj) => obj.city);
  } else {
    cities = data
      .filter((obj) => filter === obj.country)
      .map((obj) => obj.city);
  }
  return cities;
};

const mapStateToProps = (state) => ({
  cities: getFilterCities(state.data, state.visibilityFilter)
});

export default connect(mapStateToProps)(Cities);

