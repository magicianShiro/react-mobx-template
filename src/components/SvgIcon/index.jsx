import React from "react";
import PropTypes from "prop-types";
import styles from "./index.less"; //已启用 CSS Modules

const SvgIcon = props => {
  const { iconClass, fill, className = '' } = props;

  return (
    // <i aria-hidden="true" className="anticon">
      
    // </i>
    <svg aria-hidden="true" className={`${styles['svg-class']} ${className}`}>
      <use xlinkHref={"#icon-" + iconClass} fill={fill} />
    </svg>
  );
};

SvgIcon.propTypes = {
  // svg名字
  iconClass: PropTypes.string.isRequired,
  // 填充颜色
  fill: PropTypes.string
};

SvgIcon.defaultProps = {
  fill: "currentColor"
};

export default SvgIcon;