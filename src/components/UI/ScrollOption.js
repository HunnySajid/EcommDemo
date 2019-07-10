import React from "react";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { SortTab } from ".";
import queryString from "query-string";

class ScrollOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paginate: false,
      selected:'none'
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
    const {location} = this.props;
    const search = queryString.parse(location.search)
    if(search["_page"])
    {
      this.setState({paginate:true})
    }
    if(search["_sort"])
    {
      this.setState({selected:search["_sort"]})
    }
  }
  handleChange(e) {
    this.setState({ paginate: e.target.checked }, () => {
      const {history,location} = this.props
      const { search } = location;

      let qa = queryString.parse(search);
      if (this.state.paginate) {
        qa["_page"] = 1;
      } else {
        if (qa["_page"]) delete qa["_page"];
      }
      let searchQuery = "?";
      let keys = Object.keys(qa);
      keys.forEach((qaKey, index) => {
        searchQuery = searchQuery.concat(
          `${qaKey}=${qa[qaKey]}${index === keys.length - 1 ? "" : "&"}`
        );
      });

      history.push(`/${searchQuery}`);
    });
  }
  render() {
    const { label } = this.props;
    const { paginate } = this.state;
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <FormControl component="fieldset">
          <FormGroup aria-label="position" name="position" row>
            <FormControlLabel
              value="start"
              control={
                <Switch
                  color="primary"
                  checked={paginate}
                  onClick={this.handleChange}
                />
              }
              label={label}
              labelPlacement="top"
            />
          </FormGroup>
        </FormControl>
        <SortTab {...this.props} selected={this.state.selected} />
      </div>
    );
  }
}

export default ScrollOption;
