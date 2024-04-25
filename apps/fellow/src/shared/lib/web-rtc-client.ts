// export interface WebSocketClientOptions {
//   servers: string[];
//   open?: (event: Event) => unknown;
//   message?: (event: MessageEvent) => unknown;
//   error?: (event: Event) => unknown;
//   close?: (event: Event) => unknown;
// }

// class WebRTCClient {
//   private readonly connection: RTCPeerConnection;
//   private readonly dataChannel: RTCDataChannel;

//   constructor(private readonly options: WebSocketClientOptions) {
//     this.connection = new RTCPeerConnection({
//       iceServers: options.servers.map((url) => ({
//         urls: [url],
//       })),
//     });

//     this.dataChannel = this.connection.createDataChannel('sendChannel');
//   }

//   connect() {
//     this.dataChannel.addEventListener('open', this.onOpen);
//     this.dataChannel.addEventListener('message', this.onMessage);
//     this.dataChannel.addEventListener('error', this.onError);
//     this.dataChannel.addEventListener('close', this.onClose);
//     this.connection.addEventListener('icecandidate', this.onIceCandidate);
//   }

//   destroy(): void {
//     this.dataChannel?.removeEventListener('open', this.onOpen);
//     this.dataChannel?.removeEventListener('message', this.onMessage);
//     this.dataChannel?.removeEventListener('error', this.onError);
//     this.dataChannel?.removeEventListener('close', this.onClose);
//     this.connection.removeEventListener('icecandidate', this.onIceCandidate);

//     this.dataChannel?.close();
//   }

//   send(message: string): void {
//     this.webSocket?.send(message);
//   }

//   private readonly onOpen = (event: Event): unknown =>
//     this.options.open?.(event);

//   private readonly onMessage = (event: MessageEvent): unknown =>
//     this.options.message?.(event);

//   private readonly onError = (event: Event): unknown =>
//     this.options.error?.(event);

//   private readonly onClose = (event: Event): void => {
//     this.options.close?.(event);
//     this.destroy();
//   };

//   private readonly onIceCandidate = (event: RTCPeerConnectionIceEvent) => {};
// }

// const client = new WebRTCClient({ servers: ['stun:stun.l.google.com:19302'] });

// // const peerConnection = new webkitRTCPeerConnection(servers, {
// //   optional: [{ RtpDataChannels: true }],
// // });

// // peerConnection.ondatachannel = function (event) {
// //   receiveChannel = event.channel;
// //   receiveChannel.onmessage = function (event) {
// //     document.querySelector('#receiver').innerHTML = event.data;
// //   };
// // };

// // sendChannel = peerConnection.createDataChannel('sendDataChannel', {
// //   reliable: false,
// // });

// // document.querySelector('button#send').onclick = function () {
// //   const data = document.querySelector('textarea#send').value;
// //   sendChannel.send(data);
// // };
