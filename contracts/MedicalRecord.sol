

/*pragma solidity ^0.8.0;

contract MedicalRecord {
    struct PatientRecord {
        string name;
        string diagnosis;
        string treatment;
        uint256 date;
    }

    address public owner;
    mapping(address => bool) public authorized;

    mapping(uint256 => PatientRecord) public records;
    uint256 public recordCount;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    modifier onlyAuthorized() {
        require(authorized[msg.sender], "Only authorized users can call this function.");
        _;
    }

    function addAuthorized(address user) public onlyOwner {
        authorized[user] = true;
    }

    function removeAuthorized(address user) public onlyOwner {
        authorized[user] = false;
    }

    function createRecord(string memory name, string memory diagnosis, string memory treatment) public onlyAuthorized {
        uint256 id = ++recordCount;
        records[id] = PatientRecord(name, diagnosis, treatment, block.timestamp);
    }

    function updateRecord(uint256 id, string memory name, string memory diagnosis, string memory treatment) public onlyAuthorized {
        PatientRecord storage record = records[id];
        record.name = name;
        record.diagnosis = diagnosis;
        record.treatment = treatment;
    }

    function getRecord(uint256 id) public view onlyAuthorized returns (string memory, string memory, string memory, uint256) {
        PatientRecord storage record = records[id];
        return (record.name, record.diagnosis, record.treatment, record.date);
    }

    function deleteRecord(uint256 id) public onlyAuthorized {
        delete records[id];
    }
}
*/
/*
pragma solidity ^0.8.0;

contract DoctorAppointment {
    struct Appointment {
        uint256 appointmentTime; // Timestamp of the appointment
        address payable patient; // Address of the patient who booked the appointment
        bool booked; // Indicates whether the appointment is booked or not
        bool paid; // Indicates whether the appointment fee has been paid or not
    }

    address public doctor; // Address of the doctor
    uint256 public appointmentDuration; // Duration of each appointment
    uint256 public appointmentFee; // Fee for each appointment
    uint256 public maxAppointmentsPerDay; // Maximum number of appointments per day
    mapping(uint256 => Appointment[]) public appointments; // Map of appointments for each day

    constructor(address _doctor, uint256 _appointmentDuration, uint256 _appointmentFee, uint256 _maxAppointmentsPerDay) {
        doctor = _doctor;
        appointmentDuration = _appointmentDuration;
        appointmentFee = _appointmentFee;
        maxAppointmentsPerDay = _maxAppointmentsPerDay;
    }

    function bookAppointment(uint256 _day, uint256 _appointmentTime) external payable {
        require(msg.sender != doctor, "Doctor cannot book appointment");
        require(appointments[_day].length < maxAppointmentsPerDay, "No available appointments on this day");
        require(_appointmentTime % appointmentDuration == 0, "Appointment time must be a multiple of appointment duration");
        require(msg.value == appointmentFee, "Incorrect appointment fee");

        uint256 appointmentSlot = _appointmentTime / appointmentDuration;
        require(!appointments[_day][appointmentSlot].booked, "Appointment already booked");

        appointments[_day][appointmentSlot] = Appointment({
            appointmentTime: _appointmentTime,
            patient: payable(msg.sender),
            booked: true,
            paid: true
        });
    }

    function cancelAppointment(uint256 _day, uint256 _appointmentTime) external {
        uint256 appointmentSlot = _appointmentTime / appointmentDuration;
        Appointment storage appointment = appointments[_day][appointmentSlot];
        require(appointment.patient == msg.sender, "Only patient who booked the appointment can cancel it");
        require(!appointment.paid, "Appointment fee already paid");
        appointment.booked = false;
        appointment.patient.transfer(appointmentFee);
    }
}
*/


// SPDX-License-Identifier: MIT

/*
pragma solidity >=0.5.16 <0.9.0;

contract bookAppointment {
    struct Appointment {
        address patient;
        uint appointmentDate;
        uint checkOutDate;
    //    uint roomNumber;
        uint totalPrice;
        bool paid;
    }

    Appointment[] public Appointments;

    uint public constant PRICE_PER_NIGHT = 1 ether;

    event AppointmentCreated(address patient, uint appointmentDate, uint checkOutDate, uint totalPrice);
    event AppointmentPaid(uint AppointmentId);

    function createAppointment(uint appointmentDate, uint checkOutDate) public payable {
        require(msg.value == (checkOutDate - appointmentDate) * PRICE_PER_NIGHT, "Invalid payment amount.");
     //   require(roomNumber >= 1 && roomNumber <= 10, "Invalid room number.");
        require(appointmentDate >= block.timestamp, "Check-in date must be in the future.");
        require(checkOutDate > appointmentDate, "Check-out date must be after check-in date.");

        Appointment memory Appointment = Appointment(msg.sender, appointmentDate, checkOutDate, msg.value, false);
        Appointments.push(Appointment);
        emit AppointmentCreated(msg.sender, appointmentDate, checkOutDate, msg.value);
    }

    function payAppointment(uint AppointmentId) public payable {
        Appointment storage Appointment = Appointments[AppointmentId];
        require(Appointment.patient == msg.sender, "Only the patient who created the Appointment can pay.");
        require(Appointment.paid == false, "Appointment has already been paid.");

        Appointment.paid = true;
        emit AppointmentPaid(AppointmentId);
    }
}

*/

pragma solidity >=0.5.16 <0.9.0;

contract bookAppointment {
    struct Reservation {
        address patient;
        uint checkInDate;
        uint checkOutDate;
        uint roomNumber;
        uint totalPrice;
        bool paid;
    }

    Reservation[] public reservations;

    uint public constant PRICE_PER_NIGHT = 1 ether;

    event ReservationCreated(address patient, uint checkInDate, uint checkOutDate, uint roomNumber, uint totalPrice);
    event ReservationPaid(uint reservationId);

    function createReservation(uint checkInDate, uint checkOutDate, uint roomNumber) public payable {
        require(msg.value == (checkOutDate - checkInDate) * PRICE_PER_NIGHT, "Invalid payment amount.");
        require(roomNumber >= 1 && roomNumber <= 10, "Invalid room number.");
        require(checkInDate >= block.timestamp, "Check-in date must be in the future.");
        require(checkOutDate > checkInDate, "Check-out date must be after check-in date.");

        Reservation memory reservation = Reservation(msg.sender, checkInDate, checkOutDate, roomNumber, msg.value, false);
        reservations.push(reservation);
        emit ReservationCreated(msg.sender, checkInDate, checkOutDate, roomNumber, msg.value);
    }

    function payReservation(uint reservationId) public payable {
        Reservation storage reservation = reservations[reservationId];
        require(reservation.patient == msg.sender, "Only the patient who created the reservation can pay.");
        require(reservation.paid == false, "Reservation has already been paid.");

        reservation.paid = true;
        emit ReservationPaid(reservationId);
    }
}
