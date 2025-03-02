import * as Notifications from 'expo-notifications';

export async function sendNotification(title: string, body: string){
    // First, set the handler that will cause the notification
    // to show the alert
    Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
     }),
    });

    Notifications.scheduleNotificationAsync({
    content: {
        title,
        body,
    },
    trigger: null,
    });
}