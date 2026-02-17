import ResourceCrud from '@/components/ui/ts/ResourceCrud';


const CustomerCatalog = () => {
  const data = [
  {
    "client": "simposon",
    "id": "1999",
    "address": "zajdassssssssssssssssssssss",
    "something": "something"
  },
  {
    "client": "simposonssssssssssssssssssssssssssssss",
    "id": "1999",
    "address": "kralik",
    "something": "something"
  }
];
  return <ResourceCrud data={data} />;
};

export default CustomerCatalog;