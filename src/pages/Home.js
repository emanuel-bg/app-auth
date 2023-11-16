import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetMeasures } from "../redux/measuresSlice";
import NewMeasureButton from "../components/NewMeasureButton";
import { Modal, Button } from "react-bootstrap";
import { DeleteMeasure } from "../redux/measuresSlice";
import { useNavigate } from "react-router-dom";
export default function Home() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const measures = useSelector((state) => state.measures);
   const [show, setShow] = useState(false);
   const [selected, setSelected] = useState("");
   const handleClose = () => setShow(false);

   const handleShow = (i) => {
      setShow(true);
      setSelected(i);
   };

   useEffect(() => {
      dispatch(GetMeasures());
   }, [dispatch]);

   const handleDelete = async (i, e) => {
      dispatch(DeleteMeasure(selected));
      handleClose();
   };
   const handleEdit = (i) => {
      navigate("/measure/" + i);
   };
   return (
      <div className="bg-dark vh-100">
         <div className="d-flex flex-column m-4">
            <NewMeasureButton />

            <table className="table table-dark">
               <thead>
                  <tr>
                     <th>ID</th>
                     <th>Amount</th>
                     <th>Date</th>
                     <th>Measured by</th>
                     <th>User ID</th>
                     <th>Image name</th>
                     <th>Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {measures.measures.map((d, i) => (
                     <tr key={i}>
                        <td>{d.id}</td>
                        <td>{d.amount}</td>
                        <td>{d.date}</td>
                        <td>{d.measuredby}</td>
                        <td>{d.userId}</td>
                        <td>
                           {" "}
                           {d.imageName == "" ? "NULL" : d.imageName}
                        </td>
                        <td>
                           <button
                              className="btn btn-warning me-2"
                              onClick={() => handleEdit(d.id)}
                           >
                              Edit
                           </button>

                           <button
                              className="btn btn-danger"
                              onClick={() => handleShow(d.id)}
                           >
                              Delete
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Delete Measure</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               Are you sure you want to delete the measure?({selected})
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>
               <Button variant="danger" onClick={handleDelete}>
                  Delete
               </Button>
            </Modal.Footer>
         </Modal>
      </div>
   );
}