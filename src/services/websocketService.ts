import { Client } from "@stomp/stompjs";
import { Dispatch, SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";
import { CustomModalProps } from "../Models/Models";



export function initWebSocket (setModal2State: Dispatch<SetStateAction<CustomModalProps>>, navigate: NavigateFunction) : Client {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;

  // build ws(s) url from baseUrl
    const wsUrl = baseUrl.replace(/^http/, 'ws') + '/ws';

    const client = new Client({
      brokerURL: wsUrl,
      reconnectDelay: 5000,   
      onConnect: () => {
        console.log('Connected');
        client.subscribe('/topic/orderCreated', (msg) => {
          console.log('order:', msg.body);
          setModal2State({
            isOpen: true,           
            title: msg.body,
            okButtonClick: () => { setModal2State({ isOpen: false }); navigate('/'); },
            okButtonText:"Ok"
          });
        });
      },
    });

    client.activate();

    return client;
}

    export function closeWebSocket(client: Client) {
      client.deactivate();
    }