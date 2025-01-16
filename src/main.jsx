import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from "react-redux";
import store from "./store";
import App from './App.jsx'
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";

const client_id = `${import.meta.env.CLIENT_ID}`;
const authority = `${import.meta.env.AUTHORITY_URL}`+"/"+`${import.meta.env.TENANT_ID}`;
const redirect_uri = `${import.meta.env.REDIRECT_URI}`;

const msalConfiguration = {
  auth: {
      clientId : client_id,
      authority: authority, // Replace with your Azure AD tenant ID
      // the only mandatory field in this object, uniquely identifies your app
      // here you'll add the other fields that you might need based on the Azure portal settings
      redirectUri: redirect_uri // Register as a SPA. This must match the redirect uri in Azure App Registration
  }
};
const pca = new PublicClientApplication(msalConfiguration);

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <MsalProvider instance={pca}>
        <App />
      </MsalProvider>
    </Provider>
  
)
