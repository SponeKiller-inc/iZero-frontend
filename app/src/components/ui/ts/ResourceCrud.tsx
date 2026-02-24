import { useState } from "react";

import Crud from "./Crud";
import { FormDispatcher } from "@/components/shared/FormDispatcher";
import { CrudMode } from "@/constants/crud";
import { CrudItem } from "@/types/crud";


export const ResourceCrud: React.FC<{ data: Array<CrudItem> }> = ({ data }) => {
  const [items, setItems] = useState<Array<CrudItem>>(data);
  const [selectedItem, setSelectedItem] = useState<CrudItem | null>(null);
  const [showView, setShowView] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleView = (item: CrudItem) => {
    setSelectedItem(item);
    setShowView(true);
  };

  const handleEdit = (item: CrudItem) => {
    setSelectedItem(item);
    setShowEdit(true);
  };

  const handleDelete = (item: CrudItem) => {
    setSelectedItem(item);
    setShowDelete(true);
  };


  const isListMode = !showAdd && !showEdit && !showDelete && !showView;

  return (
    <>
      {isListMode && (
        <Crud
          data={items}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={() => setShowAdd(true)}
        />
      )}

      {showView && (
        <FormDispatcher 
          crudMode={CrudMode.VIEW} 
          setShow={setShowView}
          setItems={setItems} 
          initialData={selectedItem} 
        />
      )}

      {showEdit && (
        <FormDispatcher 
          crudMode={CrudMode.EDIT} 
          setShow={setShowEdit}
          setItems={setItems}
          initialData={selectedItem}
        />
      )}

      {showDelete && (
        <FormDispatcher 
          crudMode={CrudMode.DELETE} 
          setShow={setShowDelete}
          setItems={setItems} 
          initialData={selectedItem} 
        />
      )}
      
      {showAdd && (
        <FormDispatcher 
          crudMode={CrudMode.ADD} 
          setShow={setShowAdd}
          setItems={setItems}
          initialData={null} 
        />
      )}
    </>
  );
};
