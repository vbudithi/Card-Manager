import { connect } from "react-redux";
import setVisibilityFilter from "../../actions/filter";
import Filter from "./Filter";

const getFilterCountries = (data) => {
  let arrCountries = ["Allcards"];
  data.forEach((item) => {
    if (arrCountries.indexOf(item.country) === -1) {
      arrCountries.push(item.country);
    }
  });
  return arrCountries;
};

const mapStateToProps = (state) => ({
  countries: getFilterCountries(state.data),
  active: state.visibilityFilter
});

const mapDispatchToProps = (dispatch) => ({
  onClickHandler: (country) => dispatch(setVisibilityFilter(country))
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
