import { useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../components/ContextProvider";
import { userLogout } from "../utils/api";

export const IndexPage = () => {
  const [context, setContext] = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const statusCode = await userLogout();
    if (statusCode === 200) {
      setContext({});
      localStorage.removeItem("userInfo");
      navigate("/");
    } else {
      // TODO: もう少し詳細なエラーハンドリングを行う
      console.log("ログアウトに失敗しました");
    }
  };

  return (
    <>
      <StyledBody className="text-center text-white bg-dark">
        <StyledContainer className="d-flex h-100 p-3 mx-auto flex-column">
          <header className="mb-auto">
            <h3 className="float-sm-start  mb-sm-5">YelpCamp</h3>
            <nav className=" float-sm-end mt-1">
              {context.key ? (
                <NavLink onClick={handleLogout}>ログアウト</NavLink>
              ) : (
                <>
                  <NavLink to="/campgrounds/login">ログイン</NavLink>
                  <NavLink to="/campgrounds/signup">ユーザー登録</NavLink>
                </>
              )}
            </nav>
          </header>
          <main className="px-3">
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

export const NavLink = styled(Link)`
  padding: 0.25rem 0;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.5);
  margin: 0 0.5rem;
  border-bottom: 0.25rem solid transparent;
  text-align: center;
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
