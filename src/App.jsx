import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { addDoc, collection } from "@firebase/firestore";
import { useRef,useEffect } from 'react';
import { firestore } from './firebaseconfig/firebaseconfig'
import {getDocs, query, doc} from "firebase/firestore";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { setDoc } from "@firebase/firestore";

function App() {
   const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [bankDetails, setBankDetails] = useState("");
  const [activeOrder, setActiveOrder] = useState()

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    //get all data from orders collection
    const q = query(collection(firestore, "orders"))
    const orderslist = [];

    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        orderslist.push({...doc.data(), docId: 
          //generate a random id for each order
          Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) 

      
        });
      });
      setOrders(orderslist);
    }
    );
  }, []);
  const addtoInvoice = (order) => {
    //create a new collection called invoices
    const ref = collection(firestore, "invoices"); // Firebase creates this automatically
    //add data to the invoices collection and append the bank details
    let data = order;
    //append the bank details to the data
    data.bankdetails = activeOrder?.bankdetails;

    try {
      setDoc(doc(firestore, "invoices", data.docId), data);
    } catch (err) {
     return console.log(err);
    }
    
  }
const handleChange = (e) => {
    setBankDetails(e.target.value);
    setActiveOrder({...activeOrder, bankdetails: bankDetails})
  };

  

  return (
    <div className="App">
      <div>
        <div className="OrdersContainer">
          <h1>Orders</h1>
          <div className="Orders"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {orders?.map((order) => (
              <div className="Order"
                key={Math.random()}
                style={{
                  border: "1px solid black",
                  width: "300px",
                  padding: "10px",
                  margin: "10px",
                  backgroundColor: "lightblue",
                  color: "black",
                }}
              >
                <h3>{order?.fullName}</h3>
                <p>{order?.email}</p>
                <p>{order?.productID}</p>
                <p>{order?.invoicedetails}</p>
                <button  onClick={
                  () => {
                    setActiveOrder(order);
                    handleShow();
                  }
                }>Add to Invoice</button>
              </div>
            ))}
            </div>
            </div>
      </div>
       <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bank Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Banking Details</Form.Label>
              <Form.Control as="textarea" rows={3} 
              onChange={handleChange}

              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={
            () => {
              addtoInvoice(activeOrder);
              handleClose();
            }
          }>
            Send Invoice
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
