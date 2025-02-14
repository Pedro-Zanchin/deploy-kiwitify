import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKiwiBird, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <FontAwesomeIcon className="logo__icon" icon={faKiwiBird} />
      </Link>
      <div className="header__info">
        <FontAwesomeIcon icon={faCircleInfo} className="info__icon" />
        <div className="info__tooltip">
          <p>Bem-vindo ao Kiwitify!</p>
          <p>As músicas são somente prévias de 30 segundos!</p>
          <p>Explore e divirta-se!</p>
        </div>
      </div>
      <Link to="/" className="header__link">
        <h1>Kiwitify</h1>
      </Link>
    </div>
  );
};

export default Header;
