import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
function CollectionTable(props) {
  return (
    <Table striped hover>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Year</th>
          <th>Theme</th>
          <th>Num Part</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((data) => (
          <tr key={data._id}>
            <td>
              <Image src={data.img_url} roundedCircle width={80} height={80} alt={data.name + " Image"}/>
            </td>
            <td className='align-middle'>{data.name}
            <br />
            <h6>
              <Badge className='rounded-pill secondary-text-bg-info'>{data.theme.name}
              </Badge> </h6>
            </td>
            <td className='align-middle'>{data.year}</td>
            <td className='align-middle'>{data.theme.name}</td>
            <td className='align-middle'>{data.num_parts}</td>
            <td className='align-middle'>
              <Button variant="primary">More Info</Button> <Button variant="primary">Edit</Button> <Button variant="primary">Delete</Button>
            </td>
          </tr>
        )) }
      </tbody>
    </Table>
  );
}

export default CollectionTable;