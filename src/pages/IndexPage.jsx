import styled from "styled-components";
import { Link } from "react-router-dom";

export const IndexPage = () => {
  return (
    <>
      <StyledBody className="text-center text-white bg-dark">
        <StyledContainer className="d-flex h-100 p-3 mx-auto flex-column">
          <header className="mb-auto">
            <h3 className="float-sm-start  mb-sm-5">YelpCamp</h3>

            <StyledNav className=" float-sm-end mt-1">
              <a href="{% url 'account_login' %}">ログイン</a>
              {/* <a href="{% url 'account_logout' %}">ログアウト</a> */}
              <a href="{% url 'account_signup' %}">ユーザー登録</a>
            </StyledNav>
          </header>
          <main className="px-3">
            <h1>YelpCamp</h1>
            <p className="lead">
              YelpCampへようこそ！
              <br />
              全国のキャンプ場が簡単に一望できます。
              <br />
              キャンプ場の登録やレビューをして交流を深めていきましょう！
            </p>
            <StyledLink to="/campgrounds" className="btn btn-lg btn-secondary fw-bold border-white bg-white">
              キャンプ場へ
            </StyledLink>
          </main>
          <footer className="mt-auto text-white-50">
            <p>&copy;YelpCamp 2024</p>
          </footer>
        </StyledContainer>
      </StyledBody>
    </>
  );
};

export const StyledBody = styled.div`
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(src/assets/img/index.jpg);
  background-size: cover;
  background-position: center;
  text-shadow: 0 0.05rem 0.1rem rgba(0, 0, 0, 0.5);
  box-shadow: inset 0 0 5rem rgba(0, 0, 0, 0.5);
`;

export const StyledContainer = styled.div`
  max-width: 80vw;
`;

export const StyledNav = styled.nav`
  a {
    padding: 0.25rem 0;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.5);
    margin: 0 0.5rem;
    border-bottom: 0.25rem solid transparent;
    text-align: center;
  }
  a:hover {
    color: rgba(255, 255, 255, 0.5);
    border-bottom: 0.25rem solid rgba(255, 255, 255, 0.5);
  }
`;

export const StyledLink = styled(Link)`
  color: #333;
  text-shadow: none;
  &:hover {
    color: #333;
    text-shadow: none;
  }
`;
