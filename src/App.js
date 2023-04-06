/*
import React, { useState } from "react";
import Web3 from "web3";
import MedicalRecordContract from "../src/contractscopy/MedicalRecord.json";

const web3 = new Web3(Web3.givenProvider);
const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";

function App() {
  const [name, setName] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [recordId, setRecordId] = useState(0);
  const [record, setRecord] = useState({});

  async function createRecord() {
    const contract = new web3.eth.Contract(MedicalRecordContract.abi, contractAddress);
    const accounts = await web3.eth.requestAccounts();
    const account = accounts[0];
    await contract.methods.createRecord(name, diagnosis, treatment).send({ from: account });
  }

  async function getRecord() {
    const contract = new web3.eth.Contract(MedicalRecordContract.abi, contractAddress);
    const result = await contract.methods.getRecord(recordId).call();
    setRecord({ name: result[0], diagnosis: result[1], treatment: result[2], date: result[3] });
  }

  return (
    <div>
      <h1>Medical Records Management</h1>
      <div>
        <h2>Create Patient Record</h2>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Diagnosis:
          <input type="text" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} />
        </label>
        <br />
        <label>
          Treatment:
          <input type="text" value={treatment} onChange={(e) => setTreatment(e.target.value)} />
        </label>
        <br />
        <button onClick={createRecord}>Create Record</button>
      </div>
      <div>
        <h2>Get Patient Record</h2>
        <label>
          Record ID:
          <input type="number" value={recordId} onChange={(e) => setRecordId(parseInt(e.target.value))} />
        </label>
        <br />
        <button onClick={getRecord}>Get Record</button>
        <br />
        <label>
          Name: {record.name}
        </label>
        <br />
        <label>
          Diagnosis: {record.diagnosis}
        </label>
        <br />
        <label>
          Treatment: {record.treatment}
        </label>
        <br />
        <label>
          Date: {new Date(record.date * 1000).toLocaleDateString()}
        </label>
      </div>
    </div>
  );
}

export default App;

*/

/*
import React, { useState } from 'react';
import Web3 from 'web3';
import DoctorAppointment from '../src/contractscopy/MedicalRecord.json';

const web3 = new Web3(Web3.givenProvider);

function App() {
  const [doctorAppointment, setDoctorAppointment] = useState(null);
  const [account, setAccount] = useState(null);
  const [day, setDay] = useState(0);
  const [appointmentTime, setAppointmentTime] = useState(0);

  const connectMetaMask = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = DoctorAppointment.networks[networkId];
      const instance = new web3.eth.Contract(
        DoctorAppointment.abi,
        deployedNetwork && deployedNetwork.address,
      );
      setDoctorAppointment(instance);
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const bookAppointment = async () => {
    const appointmentSlot = appointmentTime / doctorAppointment.appointmentDuration;
    const isBooked = await doctorAppointment.methods.appointments(day, appointmentSlot).booked().call();
    if (isBooked) {
      alert('Appointment already booked');
      return;
    }
    await doctorAppointment.methods.bookAppointment(day, appointmentTime).send({ from: account, value: doctorAppointment.appointmentFee });
    alert('Appointment booked successfully');
  };

  const cancelAppointment = async () => {
    const appointmentSlot = appointmentTime / doctorAppointment.appointmentDuration;
    const appointment = await doctorAppointment.methods.appointments(day, appointmentSlot).call();
    if (!appointment.booked) {
      alert('No appointment found');
      return;
    }
    if (appointment.patient.toLowerCase() !== account.toLowerCase()) {
      alert('Only patient who booked the appointment can cancel it');
      return;
    }
    if (appointment.paid) {
      alert('Appointment fee already paid');
      return;
    }
    await doctorAppointment.methods.cancelAppointment(day, appointmentTime).send({ from: account });
    alert('Appointment canceled successfully');
  };

  return (
    <div>
      {account ? (
        <div>
          <p>Account: {account}</p>
          <p>Appointment duration: {doctorAppointment?.appointmentDuration}</p>
          <p>Appointment fee: {web3.utils.fromWei(doctorAppointment?.appointmentFee)} ETH</p>
          <p>Max appointments per day: {doctorAppointment?.maxAppointmentsPerDay}</p>
          <div>
            <label>Day: </label>
            <input type="number" value={day} onChange={(e) => setDay(e.target.value)} />
          </div>
          <div>
            <label>Appointment time: </label>
            <input type="number" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} />
          </div>
          <button onClick={bookAppointment}>Book appointment</button>
          <button onClick={cancelAppointment}>Cancel appointment</button>
        </div>
      ) : (
        <button onClick={connectMetaMask}>Connect MetaMask</button>
      )}
    </div>
  );
}

export default App;

*/
/*
import React, { useState } from 'react';
import Web3 from 'web3';
import DoctorAppointment from '../src/contractscopy/MedicalRecord.json';

const web3 = new Web3(Web3.givenProvider);

function App() {
  const [doctorAppointment, setDoctorAppointment] = useState(null);
  const [account, setAccount] = useState(null);
  const [day, setDay] = useState(0);
  const [appointmentTime, setAppointmentTime] = useState(0);

  const connectMetaMask = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = DoctorAppointment.networks[networkId];
      const instance = new web3.eth.Contract(
        DoctorAppointment.abi,
        deployedNetwork && deployedNetwork.address,
      );
      setDoctorAppointment(instance);
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const bookAppointment = async () => {
    const appointmentSlot = appointmentTime / doctorAppointment.appointmentDuration;
    const isBooked = await doctorAppointment.methods.appointments(day, appointmentSlot).booked().call();
    if (isBooked) {
      alert('Appointment already booked');
      return;
    }
    await doctorAppointment.methods.bookAppointment(day.toString(), appointmentTime.toString()).send({ from: account, value: doctorAppointment && doctorAppointment.appointmentFee && doctorAppointment.appointmentFee.toString() });
    alert('Appointment booked successfully');
  };

  const cancelAppointment = async () => {
    const appointmentSlot = appointmentTime / doctorAppointment.appointmentDuration;
    const appointment = await doctorAppointment.methods.appointments(day, appointmentSlot).call();
    if (!appointment.booked) {
      alert('No appointment found');
      return;
    }
    if (appointment.patient.toLowerCase() !== account.toLowerCase()) {
      alert('Only patient who booked the appointment can cancel it');
      return;
    }
    if (appointment.paid) {
      alert('Appointment fee already paid');
      return;
    }
    await doctorAppointment.methods.cancelAppointment(day.toString(), appointmentTime.toString()).send({ from: account });
    alert('Appointment canceled successfully');
  };

  return (
    <div>
      {account ? (
        <div>
          <p>Account: {account}</p>
          <p>Appointment duration: {doctorAppointment?.appointmentDuration}</p>
          <p>Appointment fee: {web3.utils.fromWei(doctorAppointment && doctorAppointment.appointmentFee && doctorAppointment.appointmentFee.toString())} ETH</p>
          <p>Max appointments per day: {doctorAppointment?.maxAppointmentsPerDay}</p>
          <div>
            <label>Day: </label>
            <input type="number" value={day} onChange={(e) => setDay(e.target.value)} />
          </div>
          <div>
            <label>Appointment time: </label>
            <input type="number" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} />
          </div>
          <button onClick={bookAppointment}>Book appointment</button>
          <button onClick={cancelAppointment}>Cancel appointment</button>
          </div>
      ) : (
        <button onClick={connectMetaMask}>Connect with MetaMask</button>
      )}
    </div>
  );
}
export default App;

*/

/*
import React, { useState } from "react";
import Web3 from "web3";
import BookingAppointement from "./contracts/BookingAppointement.json";

const web3 = new Web3(Web3.givenProvider);

function App() {
  const [bookingAppointement, setBookingAppointement] = useState(null);
  const [account, setAccount] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [appointments, setAppointments] = useState([]);

  const connectMetaMask = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = BookingAppointement.networks[networkId];
      const instance = new web3.eth.Contract(
        BookingAppointement.abi,
        deployedNetwork && deployedNetwork.address
      );
      setBookingAppointement(instance);
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const createAppointments = async () => {
    const totalPrice =
      (checkOutDate - appointmentDate) *
      web3.utils.toWei(
        "1", // 1 ETH per appointment
        "ether"
      );
    await bookingAppointement.methods
      .createAppointments(appointmentDate, checkOutDate)
      .send({ from: account, value: totalPrice });
    alert("Appointments created successfully");
  };

  const payAppointments = async (appointmentsId) => {
    await bookingAppointement.methods.payAppointments(appointmentsId).send({
      from: account,
    });
    alert("Appointments paid successfully");
  };

  const loadAppointments = async () => {
    const appointmentCount = await bookingAppointement.methods
      .appointmentCount()
      .call();
    const loadedAppointments = [];
    for (let i = 0; i < appointmentCount; i++) {
      const appointment = await bookingAppointement.methods
        .appointment(i)
        .call();
      loadedAppointments.push(appointment);
    }
    setAppointments(loadedAppointments);
  };

  return (
    <div>
      {account ? (
        <div>
          <p>Account: {account}</p>
          <input
            type="datetime-local"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.valueAsNumber)}
          />
          <input
            type="datetime-local"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.valueAsNumber)}
          />
          <button onClick={createAppointments}>Create Appointments</button>
          <button onClick={loadAppointments}>Load Appointments</button>
          <ul>
            {appointments.map((appointment, index) => (
              <li key={index}>
                {`Patient: ${appointment.patient}`}
                {`Appointment Date: ${new Date(
                  appointment.appointmentDate * 1000
                ).toLocaleString()}`}
                {`Check-out Date: ${new Date(
                  appointment.checkOutDate * 1000
                ).toLocaleString()}`}
                {`Total Price: ${web3.utils.fromWei(
                  appointment.totalPrice.toString(),
                  "ether"
                )} ETH`}
                {appointment.paid ? (
                  <span>Appointments Paid</span>
                ) : (
                  <button onClick={() => payAppointments(index)}>
                    Pay Appointments
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <button onClick={connectMetaMask}>Connect to MetaMask</button>
      )}
    </div>
  );
}

export default App;
*/
/*
import React, { useState } from "react";
import Web3 from "web3";
import AppointmentBooking from "../src/contractscopy/AppointmentBooking.json";

const web3 = new Web3(Web3.givenProvider);

function App() {
  const [appointments, setAppointments] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState("");

  const bookAppointment = async () => {
    const appointmentTimestamp = Date.parse(appointmentDate) / 1000;
    await appointmentBooking.methods.bookAppointment(appointmentTimestamp).send({
      from: account,
      value: web3.utils.toWei("1", "ether"),
    });
    alert("Appointment booked successfully");
  };

  const loadAppointments = async () => {
    const appointmentCount = await appointmentBooking.methods.appointmentCount().call();
    const loadedAppointments = [];
    for (let i = 0; i < appointmentCount; i++) {
      const appointment = await appointmentBooking.methods.appointments(i).call();
      loadedAppointments.push(appointment);
    }
    setAppointments(loadedAppointments);
  };

  const getAvailableAppointments = () => {
    const availableAppointments = appointments.filter(
      (appointment) => !appointment.booked && appointment.date > Date.now() / 1000
    );
    return availableAppointments;
  };

  return (
    <div>
      <input
        type="datetime-local"
        value={appointmentDate}
        onChange={(e) => setAppointmentDate(e.target.value)}
      />
      <button onClick={bookAppointment}>Book Appointment</button>
      <button onClick={loadAppointments}>Load Appointments</button>
      <ul>
        {getAvailableAppointments().map((appointment, index) => (
          <li key={index}>
            {`Patient: ${appointment.patient}`}
            {`Appointment Date: ${new Date(
              appointment.date * 1000
            ).toLocaleString()}`}
            {appointment.booked ? (
              <span>Appointment Booked</span>
            ) : (
              <span>Available</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;*/


import React, { useState } from "react";
import Web3 from "web3";
import BookingRoomContract from "../src/contractsCopy/BookingRoom.json";
import bg from '../src/wallpaper.jpg';
import '../src/App.css';


function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [roomNumber, setRoomNumber] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = BookingRoomContract.networks[networkId];
      const contract = new web3.eth.Contract(
        BookingRoomContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      setContract(contract);
      const reservationsCount = await contract.methods
        .reservationsCount()
        .call();
      const reservations = [];
      for (let i = 0; i < reservationsCount; i++) {
        const reservation = await contract.methods.reservations(i).call();
        reservations.push(reservation);
      }
      setReservations(reservations);
    } else {
      alert("Please install MetaMask to use this dApp.");
    }
  };

  const createReservation = async () => {
    const checkInDateUnix = new Date(checkInDate).getTime() / 1000;
    const checkOutDateUnix = new Date(checkOutDate).getTime() / 1000;
    const totalPriceWei = web3.utils.toWei(totalPrice.toString(), "ether");
    await contract.methods
      .createReservation(checkInDateUnix, checkOutDateUnix, roomNumber)
      .send({ from: accounts[0], value: totalPriceWei });
    setReservations([
      ...reservations,
      {
        guest: accounts[0],
        checkInDate: checkInDateUnix,
        checkOutDate: checkOutDateUnix,
        roomNumber,
        totalPrice: totalPriceWei,
        paid: true,
      },
    ]);
  };

  const payReservation = async (reservationId) => {
    const reservation = reservations[reservationId];
    await contract.methods
      .payReservation(reservationId)
      .send({ from: accounts[0] });
    reservation.paid = true;
    setReservations([
      ...reservations.slice(0, reservationId),
      reservation,
      ...reservations.slice(reservationId + 1),
    ]);
  };

  if (!web3) {
    return (
      <div>
        <button onClick={loadWeb3}>Connect to MetaMask</button>
      </div>
    );
  }

  return (
    <div class="background">
       <br/>
    <div class="back">
      
      <h1 class="heading"><i>ChainStay- Booking Room dApp</i></h1>
        <h2 class="labh">Create a Reservation</h2>

        <label class="lab">Check-in Date:</label>
        <input class="inputs"
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
        />
        <br />
        <label class="lab">Check-out Date:</label>
        <input class="inputs"
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
        />
      

      
        <br />
        <label class="lab">Total Price:</label>
        <input class="inputs"
          type="number"
          step="0.01"
          value={totalPrice}
          onChange={(e) => setTotalPrice(parseFloat(e.target.value))}
        />
        <br />
        <button class="reserve-button" onClick={createReservation}>Create Reservation</button>
        <br/>
        <br/>
      </div>
      <div>
        <h2 class="res_head"><u>Reservations</u></h2>
        <table border="1" class="edit back">
          <thead>
            <tr class="tr">
              <th class="th">Guest</th>
              <th class="th">Check-in Date</th>
              <th class="th">Check-out Date</th>
           
              <th class="th">Total Price</th>
              <th class="th">Paid</th>
              <th class="th">Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => (
              <tr key={index}>
                <td>{reservation.guest}</td>
                <td>
                  {new Date(
                    reservation.checkInDate * 1000
                  ).toLocaleDateString()}
                </td>
                <td>
                  {new Date(
                    reservation.checkOutDate * 1000
                  ).toLocaleDateString()}
                </td>
                <td>{reservation.roomNumber}</td>
                <td>
                  {web3.utils.fromWei(
                    reservation.totalPrice.toString(),
                    "ether"
                  )}
                </td>
                <td>{reservation.paid ? "Yes" : "No"}</td>
                <td>
                  {!reservation.paid && (
                    <button onClick={() => payReservation(index)}>Pay</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
      </div>
    </div>
  );
}

export default App;