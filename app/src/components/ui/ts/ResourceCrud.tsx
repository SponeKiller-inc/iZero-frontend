import { useState } from "react";

import CrudLayout from "./CrudLayout";
import AddLayout from "./AddLayout";
import EditLayout from "./EditLayout";
import DeleteLayout from "./DeleteLayout";


interface Resource {
    data: Array<{ [key: string]: string }>;
    onAdd: () => void;
    onEdit: (index: number) => void;
    onDelete: (index: number) => void;
}


const ResourceCrud: React.FC<Resource> = ({ data, onAdd, onEdit, onDelete }) => {
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const isListMode = !showAdd && !showEdit && !showDelete;
    return (
      <>
        {isListMode && (
          <CrudLayout
              data={data}
              setShowAdd={setShowAdd}
              setShowEdit={setShowEdit}
              setShowDelete={setShowDelete}
          />
        )}
        {showAdd && <AddLayout />}
        {showEdit && <EditLayout onEdit={onEdit} setShowEdit={setShowEdit} />}
        {showDelete && <DeleteLayout />}
      </>
    );
};

export default ResourceCrud;
