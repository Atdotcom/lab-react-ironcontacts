// src/App.js
import { useState } from "react"
import "./App.css";
import allContacts from "./contacts.json";

function App() {
   //First 5 element of an array
  const listedContacts = allContacts.slice(0, 5);

  //State
  const [contacts, setContacts] = useState(listedContacts);


  //Unlisted Contacts
  const unListedContacts = allContacts.slice(5, allContacts.length);

  const addRandomContact = () => {
    //Random contact from unlisted contacts
    let randomContactIndex = Math.floor(
      Math.random() * unListedContacts.length
    );
    // New Contact
    let newContact = unListedContacts.splice(randomContactIndex, 1);
   
    setContacts([...contacts, newContact[0]]);
  };

  //----sort Alphabetically-----
  const sortAlphabetically = () => {
    const sortedContacts = [
      ...contacts.sort((a, b) => {
        const contactA = a.name.toUpperCase();
        const contactB = b.name.toUpperCase();
        if (contactA < contactB) {
          return -1;
        }
        if (contactA > contactB) {
          return 1;
        }
        return 0;
      }),
    ];
    setContacts(sortedContacts);
  };

  //-----sort Popularity-----
  const sortPopularity = () => {
    const sortedContacts = [
      ...contacts.sort((a, b) => {
         return b.popularity - a.popularity;
      }),
    ];
    setContacts(sortedContacts);
  };


  //-----Delete
  const removeContact = (id) => {
      const filteredContacts = contacts.filter((contact) => {
      return contact.id !== id;
      });
     setContacts(filteredContacts);
  };


 //-----Return------
  return (
     <div className="App">
     <button onClick={addRandomContact}>Add Random Contact</button>
     <button onClick={sortAlphabetically }>Sort by Name</button>
     <button onClick={sortPopularity}>Sort by Popularity</button>
       <table>
         <tbody>
         <h1>IronContacts</h1>
           <tr>
             <th>Picture</th>
             <th>Name</th>
             <th>Popularity</th>
             <th>Won an Oscar</th>
             <th>Won an Emmy</th>
           </tr>
           {contacts.map((contact) => {
             return (
               <tr key={contact.id}>
                 <td>
                   <img src={contact.pictureUrl} width={100} alt='images'></img>
                 </td>
                 <td>{contact.name}</td>
                 <td>{(Math.ceil(contact.popularity) / 2).toFixed(2)}</td>
                 <td> {contact.wonOscar ? "🏆" : ""}  </td>
                 <td> {contact.wonEmmy ? "🏆" : ""}  </td>
                 <td>
                   <button
                     onClick={() => {removeContact(contact.id);}}>Delete
                   </button>
                 </td>
               </tr>
             );
           })}
         </tbody>
       </table>
     </div>
   );
 }
 export default App;