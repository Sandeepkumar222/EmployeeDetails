import logo from './logo.svg';
import './App.css';
import EmployeeForm from './Employeeform';
import EmployeeTable from './EmployeeTable';
import { Col, Container, Row } from 'react-bootstrap';
import PaginatedItems from './mischellaneous/Pagination';

function App() {
  return (
    <div className="App">
      <Container>
        <Row className="justify-content-md-center p-4">
        <Col md="auto"><EmployeeForm /></Col>
      </Row>
      <Row>
      <EmployeeTable/>
      </Row>
      
      </Container>
    </div>
  );
}

export default App;
