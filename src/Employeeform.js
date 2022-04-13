import React, { useEffect, useState } from "react";
import { DataState } from "./context/DataProvider";
import { useFormik } from 'formik';
import {Button, Form, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



const EmployeeForm = () => {
    const { totalEmployee, setTotalEmployee } = DataState();
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
    const validate = values => {
      const errors = {};
    
      if (!values.employeeID) {
        errors.employeeID = 'Required';
      } else if (values.employeeID.length > 5) {
        errors.employeeID = 'Must be 5 numbers or less';
      } else if(totalEmployee.filter(e=> e.employeeID==values.employeeID).length>0) {
            errors.employeeID = 'Must be unique value';
      }
    
      if (!values.employeeName) {
        errors.employeeName = 'Required';
      } else if (values.employeeName.length > 20) {
        errors.employeeName = 'Must be 20 characters or less';
      } else if (!/^[a-zA-Z]*$/g.test(values.employeeName)) {
        errors.employeeName = "Must be characters only"
    }
    
      if (!values.employeeDepartment) {
        errors.employeeDepartment = 'Required';
      } else if (values.employeeDepartment.length > 10) {
        errors.employeeDepartment = 'Must be 10 characters or less';
      }else if (!/^[a-zA-Z]*$/g.test(values.employeeDepartment)) {
        errors.employeeDepartment = "Must be characters only"
    }

      if (!values.employeePhone) {
        errors.employeePhone = 'Required';
      } else if (values.employeePhone.toString().length !== 10) {
        errors.employeePhone = 'should be 10 digits';
      }
    
      return errors;
    };
      const formik = useFormik({
        initialValues: {
          employeeID: '',
          employeeName: '',
          employeeDepartment: '',
          employeeSalary : '',
          employeePhone : ''
        },
        validate,
        onSubmit: values => {
            values.employeeName = values.employeeName.replace(/^./, values.employeeName[0].toUpperCase());
          console.log(values)
          let temp = [...totalEmployee, values]
          setTotalEmployee(temp)
        },
      });



      return <>
        <Button variant="primary" onClick={handleShow}>
        Add Employee
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="employeeID">Employee ID</Form.Label>
          <Form.Control
            id="employeeID"
            name="employeeID"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.employeeID}
          />
          {formik.errors.employeeID ? <div className="text-danger">{formik.errors.employeeID}</div> : null}
          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Label htmlFor="employeeSalary">Employee Salary</Form.Label>
          <Form.Control
            id="employeeSalary"
            name="employeeSalary"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.employeeSalary}
          />
          {formik.errors.employeeSalary ? <div className="text-danger">{formik.errors.employeeSalary}</div> : null}
          </Form.Group>
          <Form.Label htmlFor="employeeName">Employee Name</Form.Label>
          <Form.Control
            id="employeeName"
            name="employeeName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.employeeName}
          />
          {formik.errors.employeeName ? <div className="text-danger">{formik.errors.employeeName}</div> : null}
    
          <Form.Label htmlFor="employeeDepartment">Employee Department</Form.Label>
          <Form.Control
            id="employeeDepartment"
            name="employeeDepartment"
            type="employeeDepartment"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.employeeDepartment}
          />
          {formik.errors.employeeDepartment ? <div className="text-danger">{formik.errors.employeeDepartment}</div> : null}
          <Form.Group className="mb-3">
          <Form.Label htmlFor="employeePhone">Employee Phone no.</Form.Label>
          <Form.Control
            id="employeePhone"
            name="employeePhone"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.employeePhone}
          />
          {formik.errors.employeePhone ? <div className="text-danger">{formik.errors.employeePhone}</div> : null}
          </Form.Group>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {Object.keys(formik.errors).length !== 0 ? <Button type="submit" disabled onClick={handleClose}>Submit</Button> : <Button type="submit" onClick={handleClose}>Submit</Button>}
        </Modal.Footer>
        </Form>
        </Modal.Body>
        
      </Modal>
        </>
    };


export default EmployeeForm;