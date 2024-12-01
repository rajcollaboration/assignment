import { Button, Container } from '@mui/material'
import React from 'react'
import Table from '../../components/Table/Table'

function Home() {
  return (
    <div>
        <Container >
            <h1>Welcome to the Employee Management System</h1>
            <p>Here, you can manage your employees' information.</p>
            <Button variant="contained" color="primary">
                Add Employee
            </Button>
            <Button variant="contained" color="secondary">
                View Employees
            </Button>
            <br />
            <br />
            <Table />
        </Container>
    </div>
  )
}

export default Home