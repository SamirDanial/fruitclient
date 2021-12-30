import React from 'react'
import {useNavigate} from 'react-router-dom';

const AdminPanel = () => {
    const navigate = useNavigate();

    const gotToTargetPage = (e) => {
        let targetDiv = e.target;
        const path = targetDiv.getAttribute('name').toString();
        navigate(path);
    }
    return (
        <div className='adminPanel'>
            <div className='adminComponents'>
                <div name="/customerManagement" onClick={gotToTargetPage}>
                    <h1 name="/customerManagement">Customer Management</h1>
                </div>
                <div name="/categoryManagement" onClick={gotToTargetPage}>
                    <h1 name="/categoryManagement">Category Management</h1>
                </div>
                <div name="/productManagement" onClick={gotToTargetPage}>
                    <h1 name="/productManagement">Product Management</h1>
                </div>
                <div name="/vendorManagement" onClick={gotToTargetPage}>
                    <h1 name="/vendorManagement">Vendor Management</h1>
                </div>
                <div name="/saleManagement" onClick={gotToTargetPage}>
                    <h1 name="/saleManagement">Sale Management</h1>
                </div>
                <div name="/inventoryManagement" onClick={gotToTargetPage}>
                    <h1 name="/inventoryManagement">Inventory Management</h1>
                </div>
                <div name="/employeeManagement" onClick={gotToTargetPage}>
                    <h1 name="/employeeManagement">Employee Management</h1>
                </div>
                <div name="/delieveryManagement" onClick={gotToTargetPage}>
                    <h1 name="/delieveryManagement">Deleivery Management</h1>
                </div>
            </div>
        </div>
    )
}

export default AdminPanel
