import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand">
          YelpCamp
        </Link>
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link" href="{% url 'campgrounds:list' %}">
              キャンプ場一覧
            </a>
            <a className="nav-link" href="{% url 'campgrounds:create' %}">
              キャンプ場作成
            </a>
          </div>
          <div className="navbar-nav ms-auto">
            <a className="nav-link" href="{% url 'account_logout' %}">
              ログアウト
            </a>
            <a className="nav-link" href="{% url 'account_login' %}">
              ログイン
            </a>
            <a className="nav-link" href="{% url 'account_signup' %}">
              ユーザー登録
            </a>
          </div>
        </div>
        <span className="badge rounded-pill text-bg-warning ms-2">username</span>
      </div>
    </nav>
  );
};
