import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import ExporterTabDataviewer from "./ExporterTabDataviewer";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { API_SURVER } from "../../../config";
import ExporterDetailTabList from "../../Sider/ExporterDetailTabList";

const ExporterTab = ({ title, type }) => {
  const { id } = useParams();
  const changeTheme = useSelector((store) => store.darkThemeReducer);
  const [exporterCsv, setExporterCsv] = useState("default");
  const [isEditMode, setIsEditMode] = useState(false);
  const [modify, setModify] = useState(false);
  const [select, setSelect] = useState(0);
  const [moveId, setMoveId] = useState(false);
  const [deleteFile, setDeleteFile] = useState(false);
  const [target, setTarget] = useState("");

  const handleMode = () => {
    if (isEditMode) {
      setModify(false);
    }
    getData();
  };

  useEffect(() => {
    setExporterCsv("default");
    setSelect(0);
    setIsEditMode(false);
    setModify(false);
    getData();
  }, [type]);

  const getData = () => {
    const TOKEN = sessionStorage.getItem("access_token");
    const HEADER = TOKEN && { Authorization: TOKEN };
    const fileType = type.slice(1, type.lastIndexOf("."));

    axios({
      method: "GET",
      url: `${API_SURVER}/exporter/${id}/tab?type=${fileType}`,
      headers: HEADER,
    })
      .then((res) => {
        setExporterCsv(
          res.data.message === "No_Content" ? [] : res.data.message
        );
        res.data.message !== "No_Content"
          ? setSelect(
              res.data.message[0].file_id + "/" + res.data.message[0].version
            )
          : setSelect(0);
        setTarget(
          res.data.message === "No_Content" ? "0" : res.data.message[0].version
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Div>
      <div>
        <TabListbox dark={changeTheme}>
          <ExporterDetailTabList
            type={type}
            id={id}
            modify={modify}
            exporterCsv={exporterCsv}
            setSelect={setSelect}
            select={select}
            isEditMode={isEditMode}
            setModify={setModify}
            handleMode={handleMode}
            setExporterCsv={setExporterCsv}
            moveId={moveId}
            setMoveId={setMoveId}
            deleteFile={deleteFile}
            setDeleteFile={setDeleteFile}
            target={target}
            setTarget={setTarget}
          />
        </TabListbox>
      </div>
      <Container>
        <div>
          <MobileTabListbox dark={changeTheme}>
            <ExporterDetailTabList
              mobile={true}
              type={type}
              id={id}
              modify={modify}
              exporterCsv={exporterCsv}
              setSelect={setSelect}
              select={select}
              isEditMode={isEditMode}
              setModify={setModify}
              handleMode={handleMode}
              setExporterCsv={setExporterCsv}
              moveId={moveId}
              setMoveId={setMoveId}
              deleteFile={deleteFile}
              setDeleteFile={setDeleteFile}
              target={target}
              setTarget={setTarget}
            />
          </MobileTabListbox>
        </div>
        <ExporterTabDataviewer
          setExporterCsv={setExporterCsv}
          setModify={setModify}
          select={select}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          modify={modify}
          handleMode={handleMode}
          title={title}
          type={type}
          exporterCsv={exporterCsv}
        ></ExporterTabDataviewer>
      </Container>
    </Div>
  );
};
export default ExporterTab;

const Div = styled.div`
  ${({ theme }) => theme.container};
  display: flex;
  justify-content: space-between;
  @media ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`;

const TabListbox = styled.ul`
  width: 200px;
  margin-top: 60px;
  line-height: 1.5;
  background-color: ${(props) => (props.dark ? "#242526" : "#ffffff")};
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  @media ${({ theme }) => theme.media.mobile} {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const MobileTabListbox = styled.ul`
  display: none;
  line-height: 1.5;
  @media ${({ theme }) => theme.media.mobile} {
    display: block;
  }
`;

const Container = styled.div`
  ${({ theme }) => theme.container}
  position: relative;
  width: 800px;
`;
