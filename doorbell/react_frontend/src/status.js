import React, { useState, useEffect } from 'react';

const App = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
       fetch('http://localhost:5000/status')
          .then((response) => response.json())
          .then((data) => {
             console.log(data);
             setPosts(data);
          })
          .catch((err) => {
             console.log(err.message);
          });
    }, []);
 
 return (
    <div>
        Updated
    </div>
 );
 };