import { useState } from "react";

import Crud from "./Crud";
import { FormDispatcher } from "@/components/shared/FormDispatcher";
import { CrudMode } from "@/constants/crud";


const ResourceCrud: React.FC<{ data: Array<{ [key: string]: string }> }> = ({ data }) => {
  const [showView, setShowView] = useState(false)
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const isListMode = !showAdd && !showEdit && !showDelete;
  return (
    <>
      {isListMode && (
        <Crud
          data={data}
          setShowView={setShowView}
          setShowAdd={setShowAdd}
          setShowEdit={setShowEdit}
          setShowDelete={setShowDelete}
        />
      )}
      {showView && <FormDispatcher crudMode={CrudMode.VIEW} />}
      {showAdd && <FormDispatcher crudMode={CrudMode.ADD} />}
      {showEdit && <FormDispatcher crudMode={CrudMode.EDIT} />}
      {showDelete && <FormDispatcher crudMode={CrudMode.DELETE} />}
    </>
  );
};

export default ResourceCrud;
