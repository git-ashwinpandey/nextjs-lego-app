import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

function CollectionTable(props) {
  const { data: session } = useSession();
  const router = useRouter();

  const onClickEdit = (setData) => {
    // Using dynamic routing, assuming `setData` contains an identifier like `id`
    const encodedName = encodeURIComponent(setData.name);
    console.log(encodedName);
    router.push(`/editSet?name=${encodedName}`);
  };

  const onClickDelete = async (setData) => {
    try {
      const deleteResponse = await fetch(`/api/deleteSet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deleteKey: setData._id }), // Send only the ID
      });
  
      if (deleteResponse.ok) {
        console.log('Set deleted successfully');
        router.push('/collection'); // Consider updating the state instead of redirecting
      } else {
        console.error('Failed to delete set');
      }
    } catch (error) {
      console.error('Error during set deletion:', error);
    }
  }

  return (
    <div className='container position-relative'>
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
                <Image src={data.img_url} roundedCircle width={80} height={80} alt={data.name + " Image"} />
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
              {session ? (
                <td className='align-middle'>
                  <Button variant="primary">More Info</Button> <Button variant="primary" onClick={() => onClickEdit(data)}>Edit</Button> <Button variant="primary" onClick={() => onClickDelete(data)}>Delete</Button>
                </td>
              ) : (
                <td className='align-middle'>
                  <Button variant="primary">More Info</Button>
                </td>
              )}

            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default CollectionTable;