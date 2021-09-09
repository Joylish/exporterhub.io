import React from "react";
import { withRouter } from "react-router-dom";
import Status from "./Status";

import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import { targetUnforkRepo } from "../../store/actions/exporterActions";

const CardExporter = ({
  exporter,
  cardClick,
  fork,
  mybucket,
  setIsForkModalActive,
}) => {
  const {
    exporter_id,
    name,
    contents,
    description,
    stars,
    logo_url,
    official,
    category,
    is_new,
  } = exporter;
  const dispatch = useDispatch();
  const changeTheme = useSelector((store) => store.darkThemeReducer);
  const unforkRepo = (e, id) => {
    e.stopPropagation();
    setIsForkModalActive(true);
    dispatch(targetUnforkRepo(id));
  };
  console.log(logo_url);

  return (
    <Div
      dark={changeTheme}
      onClick={() => cardClick(exporter_id)}
      fork={fork}
      mybucket={mybucket}
    >
      <header>
        {is_new && <New dark={changeTheme}>NEW</New>}
        <span>
          <Icon>
            <AiFillStar />
          </Icon>
          {stars}
        </span>
      </header>
      <Article>
        <div>
          <img src={logo_url} alt={name} />
        </div>

        <Section dark={changeTheme}>
          <Title dark={changeTheme}>
            <h4>{name}</h4>
          </Title>
          <SubTitle>
            <Status contents={contents} dark={changeTheme} />
            <Type>
              <span>{official}</span>
              <span>{category}</span>
            </Type>
            <p>{description}</p>
          </SubTitle>
        </Section>
      </Article>
      {!fork && (
        <Unfork onClick={(e) => unforkRepo(e, exporter_id)} className="unfork">
          <div>
            <RiDeleteBinLine />
            <span>Unfork this exporter</span>
          </div>
        </Unfork>
      )}
    </Div>
  );
};
const Div = styled.div`
  position: relative;
  width: ${({ theme }) => theme.width.card}px;
  height: 320px;
  transition: 0.1s ease-in-out;
  background-color: ${(props) => (props.dark ? "#242526" : "#ffffff")};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: ${({ theme }) =>
    (theme.width.content - theme.width.card * 3) / 2}px;
  margin-right: ${(props) => props.mybucket && "20px"};
  &:nth-child(4n) {
    margin-right: ${(props) => props.mybucket && "0"};
  }
  margin-bottom: 12px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  cursor: pointer;
  padding: 0 20px;
  &:hover {
    transform: scale(1.05);
  }
  &:hover .unfork {
    display: block;
  }
  @media ${({ theme }) => theme.media.mobile} {
    height: 130px;
    width: 100%;
    align-items: flex-start;
    padding: 0 30px;
    margin-right: 0%;
  }
  header {
    width: 100%;
    font-size: 12px;
    text-align: end;
    padding: 20px 0;
    span {
      line-height: 1.3em;
      color: ${(props) => (props.dark ? "#f5f6f7" : "#000000")};
    }
    @media ${({ theme }) => theme.media.mobile} {
      padding: 13px 0;
    }
  }
`;
const New = styled.p`
  float: left;
  padding: 2px 5px;
  background-color: #6ac4a5;
  border-radius: 4px;
  color: ${(props) => (props.dark ? "#242526" : "white")};
`;

const Article = styled.article`
  @media ${({ theme }) => theme.media.mobile} {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  div {
    text-align: center;
    img {
      width: 90px;
      height: 90px;
      margin-bottom: 30px;
      @media ${({ theme }) => theme.media.mobile} {
        width: 60px;
        height: 60px;
        margin-left: -5px;
        margin-top: 5px;
      }
    }
  }
`;
const Section = styled.section`
  margin-top: -5px;
  display: block;
  align-items: center;
  @media ${({ theme }) => theme.media.mobile} {
    width: 100%;
    margin-left: 25px;
    align-items: flex-start;
  }
  span {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    color: ${(props) => (props.dark ? "#f5f6f7" : "#000000")};
  }
  div {
    color: gray;
    margin-bottom: 15px;
    span {
      &:first-child {
        margin-right: 20px;
      }
      font-weight: 400;
      font-size: 14px;
    }
  }
  p {
    display: -webkit-box;
    text-align: center;
    font-size: 12px;
    white-space: normal;
    line-height: 1.2;
    height: 2.35em;
    word-wrap: break-word;
    overflow: hidden;
    color: ${(props) => (props.dark ? "#e0e0e0" : "#696969")};
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    @media ${({ theme }) => theme.media.mobile} {
      display: none;
    }
  }
`;

const Title = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  text-align: center;
  width: 100%;
  h4 {
    display: block;
    margin-bottom: 7px;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${(props) => (props.dark ? "#f5f6f7" : "#000000")};
    @media (min-width: 280px) and (max-width: 767px) {
      float: left;
    }
  }
`;
const SubTitle = styled.div`
  display: block;
  @media ${({ theme }) => theme.media.mobile} {
    display: flex;
    flex-direction: column-reverse;
    width: 100%;
  }
`;

const Type = styled.div`
  margin: auto;
  @media ${({ theme }) => theme.media.mobile} {
    margin-top: 3px;
    margin-left: 0;
  }
`;
const Icon = styled.span`
  vertical-align: middle;
`;
const Unfork = styled.div`
  position: absolute;
  bottom: 0;
  background-color: #fafbfc;
  color: #c6474e;
  width: 100%;
  border: 1px solid #d9dbdb;
  text-align: center;
  font-size: 15px;
  height: 70px;
  line-height: 70px;
  display: none;
  font-weight: 500;
  border-radius: 0 0 5px 5px;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    top: -2px;
    span {
      margin-left: 5px;
    }
  }

  @media ${({ theme }) => theme.media.mobile} {
    width: 80px;
    height: 100%;
    right: 0;
    top: 0;
    div {
      top: 50%;
      transform: translateY(-50%);
      span {
        display: none;
      }
    }
  }
`;
export default withRouter(CardExporter);
