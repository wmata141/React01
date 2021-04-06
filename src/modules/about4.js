import React, { useState, useEffect } from 'react';

const style = {
  table: {
    borderCollapse: 'collapse'
  },
  tableCell: {
    border: '1px solid gray',
    margin: 0,
    padding: '5px 10px',
    width: 'max-content',
    minWidth: '150px'
  },
  form: {
    container: {
      padding: '20px',
      border: '1px solid #F0F8FF',
      borderRadius: '15px',
      width: 'max-content',
      marginBottom: '40px'
    },
    inputs: {
      marginBottom: '5px'
    },
    submitBtn: {
      marginTop: '10px',
      padding: '10px 15px',
      border: 'none',
      backgroundColor: 'lightseagreen',
      fontSize: '14px',
      borderRadius: '5px'
    }
  }
}

function PhoneBookForm({ user, setUser, setUserSize }) {
  const [firstName, setfirstName] = useState("Coder");
  const [lastName, setlastName] = useState("Byte");
  const [phone, setPhone] = useState("8885559999");

  const onSubmit = () => {
    const obj = {
      firstName,
      lastName,
      phone
    }  
      
    user.push(obj)    
    setUser(user)
    setUserSize(user.length)
    setfirstName('')
    setlastName('')
    setPhone('')
  }

  return (
    <form style={style.form.container}>
      <label>First name:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userFirstname'
        name='userFirstname'
        type='text'
        value={firstName}
        onChange={(e) => setfirstName(e.target.value)}
      />
      <br />
      <label>Last name:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userLastname'
        name='userLastname'
        type='text'
        value={lastName}
        onChange={(e) => setlastName(e.target.value)}
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userPhone'
        name='userPhone'
        type='text'
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <br />
      <input
        style={style.form.submitBtn}
        className='submitButton'
        onClick={onSubmit}
        value='Add User'
      />
    </form>
  )
}

function InformationTable({ user, userSize }) {
  const [userShow, setUserShow] = useState([]);

  useEffect(() => {
    console.log("user ==>", user)
    user.sort((a, b) => {
      if (a.lastName > b.lastName) {
        return 1;
      }
      if (a.lastName < b.lastName) {
        return -1;
      }
      return 0;
    });

    setUserShow(user)
    console.log("userShow", userShow);
  }, [userSize]);

  return (
    <table style={style.table} className='informationTable'>
      <thead>
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead>
      {
        userShow.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.phone}</td>
            </tr>
          )
        })
      }
    </table>
  );
}

function Application(props) {
  const [user, setUser] = useState([]);
  const [userSize, setUserSize] = useState(0);

  return (
    <section>
      <PhoneBookForm user={user} setUser={setUser} setUserSize={setUserSize}/>
      <InformationTable user={user} userSize={userSize}/>
    </section>
  );
}

export default Application