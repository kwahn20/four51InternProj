import React, { useEffect, useState } from 'react';
import '../../Themes/App.css';
import { AppBar } from '@material-ui/core';
import OrderCloud, { ApiClient, ApiRole } from 'ordercloud-javascript-sdk';
import appConfig from '../../config';


const authentication = async () => {
  var defaultClient = OrderCloud.Sdk.instance;

  var username = appConfig.username; //username of the user logging in
  var password = appConfig.password; //password of the user logging in
  var clientID = appConfig.clientID; //clientID of the application the user is logging in to ([sign up for free](https://account.ordercloud.io/login/)
  var scope = appConfig.scope as ApiRole[]; //string array of roles the application has access to ([more info](https://documentation.ordercloud.io/platform-guides/authentication/security-profiles)) 

  return await OrderCloud.Auth.Login(username, password, clientID, scope)
    .then(response => {
      // store token, now any subsequent calls will automatically set this token in the headers for you
      defaultClient.authentications['oauth2'].accessToken = response.access_token;
    })
    .catch(err => console.log(err));
}

const productListCall = async () => {
  return await OrderCloud.Me.ListProducts();
}

const App: React.FC = () => {
  const [isAuth, setAuth] = useState(false);
  const fetchAuthentication = async () => {
    await authentication();
    setAuth(true)
  }
  useEffect(() => {
    if (!isAuth) {
      fetchAuthentication();
    }
  }
  )

  return (
    <div className="App">
      {isAuth ? <header className="App-header">
        <ProductList></ProductList>
        <h1>Welcome to PowerPaint Presentations</h1>
      </header> : null}


    </div>
  );
}

const ProductList = () => {
  useEffect(() => {
    productListCall();
  }
  )
  return (<div></div>);
}

export default App;
