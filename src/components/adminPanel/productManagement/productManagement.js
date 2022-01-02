import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";

const ProductManagement = () => {
  const navigate = useNavigate();
  return (
    <div className="adminPanelItem">
      <div>
        <button onClick={() => navigate('/createProduct')} className="btn">+ Add Product</button>
      </div>
    </div>
  );
};

export default ProductManagement;
