import React from "react";
import Select from "react-select";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import CancelIcon from "@material-ui/icons/Cancel";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ClearIcon from "@material-ui/icons/Clear";
import Chip from "@material-ui/core/Chip";
import { Input, MenuItem } from "@material-ui/core";

export const colourOptions = [
  { value: "ocean", label: "Ocean", color: "#00B8D9" },
  { value: "blue", label: "Blue", color: "#0052CC", disabled: true },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630" },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" }
];

class Option extends React.Component {
  handleClick = event => {
    this.props.selectOption(this.props.data, event);
  };

  render() {
    const { children, isFocused, isSelected, onFocus } = this.props;
    console.log(this.props);
    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400
        }}
      >
        {children}
      </MenuItem>
    );
  }
}

function SelectWrapped(props) {
  const { classes, ...other } = props;

  return (
    <Select
      components={{
        Option: Option,
        DropdownIndicator: ArrowDropDownIcon
      }}
      styles={customStyles}
      isClearable={true}
      {...other}
    />
  );
}

const ITEM_HEIGHT = 48;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250
  },
  chip: {
    margin: theme.spacing.unit / 4
  }
});

const customStyles = {
  control: () => ({
    display: "flex",
    alignItems: "center",
    border: 0,
    height: "auto",
    background: "transparent",
    "&:hover": {
      boxShadow: "none"
    }
  }),
  menu: () => ({
    backgroundColor: "white",
    boxShadow: "1px 2px 6px #888888", // should be changed as material-ui
    position: "absolute",
    left: 0,
    top: `calc(100% + 1px)`,
    width: "100%",
    zIndex: 2,
    maxHeight: ITEM_HEIGHT * 4.5
  }),
  menuList: () => ({
    maxHeight: ITEM_HEIGHT * 4.5,
    overflowY: "auto"
  })
};

class Demo extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      value: null
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(data) {
    this.setState({
      value: data
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Input
          fullWidth
          inputComponent={SelectWrapped}
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="Search your color"
          id="react-select-single"
          inputProps={{
            options: colourOptions
          }}
        />
      </div>
    );
  }
}

Demo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Demo);
