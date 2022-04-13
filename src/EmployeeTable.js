import React, { useState, useEffect } from "react";
import {  Button, Container, FormControl, InputGroup, Row, Table, Toast } from "react-bootstrap";
import { DataState } from "./context/DataProvider";
import { BsArrowDownUp } from "react-icons/bs";
import PaginatedItems from "./mischellaneous/Pagination";


const EmployeeTable = () => {
    const [search, setSearch] = useState("");
    const [searchList, setSearchList] = useState([]);
    const { totalEmployee, setTotalEmployee } = DataState();
    const [ ascdes, setAscDes] = useState(true);
    const [showA, setShowA] = useState(false);
  
    const toggleShowA = () => setShowA(!showA);
    function sorting (ascdes, val){
        if(ascdes && val=="ID"){
            let temp = [...totalEmployee]
            temp.sort((a, b) => parseFloat(a.employeeID) - parseFloat(b.employeeID));
            setTotalEmployee(temp);
        }
        else if(!ascdes && val=="ID"){
            let temp = [...totalEmployee]
            temp.sort((a, b) => parseFloat(b.employeeID) - parseFloat(a.employeeID));
            setTotalEmployee(temp);
        }
        else if(ascdes && val=="NAME"){
            let temp = [...totalEmployee]
            temp.sort((a, b) => a.employeeName.localeCompare(b.employeeName));
            setTotalEmployee(temp);
        }
        else if(!ascdes && val=="NAME"){
            let temp = [...totalEmployee]
            temp.sort((a, b) =>b.employeeName.localeCompare(a.employeeName));
            setTotalEmployee(temp);
        } else if(ascdes && val=="DEP"){
            let temp = [...totalEmployee]
            temp.sort((a, b) => a.employeeDepartment.localeCompare(b.employeeDepartment));
            setTotalEmployee(temp);
        }
        else if(!ascdes && val=="DEP"){
            let temp = [...totalEmployee]
            temp.sort((a, b) =>b.employeeDepartment.localeCompare(a.employeeDepartment));
            setTotalEmployee(temp);
        }
        else if(ascdes && val=="SALARY"){
            let temp = [...totalEmployee]
            temp.sort((a, b) => parseFloat(a.employeeSalary) - parseFloat(b.employeeSalary));
            setTotalEmployee(temp);
        }
        else if(!ascdes && val=="SALARY"){
            let temp = [...totalEmployee]
            temp.sort((a, b) => parseFloat(b.employeeSalary) - parseFloat(a.employeeSalary));
            setTotalEmployee(temp);
        }
    }

    const dropEmployee = (e)=>{
        console.log(e.target.value)
        setSearch(e.target.value)
        let temp = [...totalEmployee]
        temp = temp.filter((e)=>{
            if(e.employeeName.toLowerCase()
                .includes(search.toLowerCase())){
                    return e;
                }
        })
        console.log(temp)
        if(temp.length<1){
            toggleShowA()
            setSearchList(temp)
        }
        else{
            setShowA(false)
            setSearchList(temp)
        }
    }

    const searchEmployee = (e) =>{
        console.log(search)
        let temp = [...totalEmployee]
        temp = temp.filter((e)=>{
            if(e.employeeName.toLowerCase()
                .includes(search.toLowerCase())){
                    return e;
                }
        })
        console.log(temp)
        if(temp.length<1){
            toggleShowA()
        }
        else{
            setShowA(false)
            setTotalEmployee(temp)
        }
        
    }
  
    return <>
    <Container>
        <Row className="justify-content-md-center p-4">
        <div class="text-container">
            <input type="text" list="programmingLanguages" 
                        placeholder="Enter Here" onChange={(e)=>dropEmployee(e)}/>
            <datalist id="programmingLanguages">
               {searchList ? searchList.map((e)=>{
                   return <option value={e.employeeName} onClick={(e)=>searchEmployee(e)}>{e.employeeName} </option>
               })  : <></>}
            </datalist>
            {"  "}<Button className="h-1" onClick={(e)=>searchEmployee(e)}>Search</Button>
        </div>
  

  <Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">No result found</strong>
          </Toast.Header>
          <Toast.Body>Please enter the existing employee name!</Toast.Body>
        </Toast>
        </Row>
       
    </Container>
    <Table striped bordered hover size="sm" p="3" b="3">
          <thead>
            <tr>
              <th>Employee ID{" "} <BsArrowDownUp onClick={()=>{
                  setAscDes(!ascdes)
                  sorting(ascdes,"ID")
              }}/></th>
              <th>Employee Name{" "}<BsArrowDownUp onClick={()=>{
                  setAscDes(!ascdes)
                  sorting(ascdes,"NAME")
              }}/></th>
              <th>Employee Department{" "}<BsArrowDownUp onClick={()=>{
                  setAscDes(!ascdes)
                  sorting(ascdes,"DEP")
              }}/></th>
              <th>Employee Salary{" "}<BsArrowDownUp onClick={()=>{
                  setAscDes(!ascdes)
                  sorting(ascdes,"SALARY")
              }}/></th>
              <th>Employee Phone no.</th>
            </tr>
          </thead>
          <tbody>
    {totalEmployee ? <>
        
      <PaginatedItems itemsPerPage={3} employees = {totalEmployee}/>
                </> : <p>Empty</p>}
     
     
     </tbody>
        </Table>
    </>
}



export default EmployeeTable;