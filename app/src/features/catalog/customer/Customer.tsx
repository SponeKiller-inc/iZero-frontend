import { ResourceCrud } from '@/components/ui/ts/crud/ResourceCrud';


const CustomerCatalog = () => {
  const data = [
  {
    "name": "simposon",
    "surname": "1999",
    "birthday": "zajdassssssssssssssssssssss",
    "phone": "something",
    "email": "something"
  },
  {
    "name": "simposonssssssssssssssssssssssssssssss",
    "surname": "1999",
    "birthday": "kralik",
    "phone": "something",
    "email": "something"
  }
];
  return <ResourceCrud data={data} />;
};

export default CustomerCatalog;