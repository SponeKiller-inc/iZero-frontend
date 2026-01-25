import CrudLayout from '@/components/ui/ts/CrudLayout';


const CustomerCatalog = () => {
    const header = ['client', 'id', 'address', 'something'];
    const data = [['simposon', '1999', 'zajdassssssssssssssssssssss', 'something'], ['simposonssssssssssssssssssssssssssssss', '1999', 'kralik', 'something']];
  return <CrudLayout header={header} data={data} />;
};

export default CustomerCatalog;