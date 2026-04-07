import { Injectable, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private hubConnection!: signalR.HubConnection;
  public incomingNotification = signal<string>('');

  constructor() { }

  public startConnection(){
    //app.MapHub<NotificationHub>("/NotificationHub");
    const hubUrl = environment.baseUrl.replace('/api','') +  'notificationHub';
    console.log('Hub Url is : ', hubUrl);
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(hubUrl, {
      accessTokenFactory: () => localStorage.getItem('token') || '' 
    })
    .withAutomaticReconnect()
    .build();

    this.hubConnection.start().then(() => {
      console.log('Notification hub connected');
    }).catch((err) => {
      console.error('Error connecting to notification hub:', err);
    });

    this.hubConnection.on('ReceiveNewAppoitment',(notification: NotificationDto)=>{
      console.log('Notification received:', notification);
      this.incomingNotification.set(notification.message);
    })

    // this.hubConnection.stop().then(()=>{
    //   console.log('Notification hub disconnected');
    // }).catch((err)=>{
    //   console.error('Error disconnecting from notification hub:', err);
    // })
  }
}

export interface NotificationDto{
  title: string;
  message: string;
  receiverId: string;
  type: string;
}
/*public string Title { get; set; } = string.Empty;
public string Message { get; set; } = string.Empty;
public string ReceiverId { get; set; } = string.Empty;
public string Type  { get; set; } = "Booking";*/
