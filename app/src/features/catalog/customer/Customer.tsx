import Crud from '@/components/ui/ts/Crud';


const CustomerCatalog = () => {
  const header = ['client', 'id', 'address', 'something'];
  const data = [['simposon', '1999', 'zajdassssssssssssssssssssss', 'something'], ['simposonssssssssssssssssssssssssssssss', '1999', 'kralik', 'something']];
  return <Crud header={header} data={data} />;
};

export default CustomerCatalog;