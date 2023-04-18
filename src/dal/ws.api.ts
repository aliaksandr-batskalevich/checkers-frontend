import {IChatObject} from "../models/IChatMessage";
import {ThunkDispatchType} from "../utils/hooks";
import {readAccessTokenInLS} from "../utils/acceesTokenLS";
import {addSnackbarErrorMessage, addSnackbarInfoMessage, addSnackbarWarningMessage} from "../bll/snackbar.reducer";
import {resetChatData} from "../bll/chat.reducer";
import {refreshTC} from "../bll/auth.reducer";

export type WebSocketSubscriberType = (chatObject: IChatObject) => void

enum ChatStatus {
    OPEN = 'open',
    CLOSE = 'close'
}

class WebSocketInstance {

    _status: ChatStatus
    _socket: WebSocket | null;
    _subscribers: Array<WebSocketSubscriberType>
    _pingMessage: string
    _pingIntervalId: NodeJS.Timer | null;
    _reconnectTimeoutId: NodeJS.Timer | null;
    _dispatch: ThunkDispatchType | null;

    constructor() {
        this._status = ChatStatus.CLOSE;
        this._socket = null;
        this._subscribers = [];
        this._pingMessage = this._pingMessageMaker();
        this._pingIntervalId = null;
        this._reconnectTimeoutId = null;
        this._dispatch = null;
    }

    _createConnect() {
        this._dispatch && this._dispatch(refreshTC())
            .then(response => {
                this._socket = new WebSocket('ws://35.239.107.150/api/chat');
                this._createListeners();
            })
            .catch(reason => {
                this._dispatch && this._dispatch(addSnackbarErrorMessage(reason));
            });
    }

    _startReconnect() {
        this._reconnectTimeoutId = setTimeout(this._createConnect.bind(this), 15000);
    }

    _stopReconnect() {
        clearTimeout(this._reconnectTimeoutId!);
    }


    _createListeners() {
        this._socket?.addEventListener('open', this._onOpen.bind(this));
        this._socket?.addEventListener('message', this._onMessage.bind(this));
        this._socket?.addEventListener('close', this._onClose.bind(this));
    }

    _removeListeners() {
        this._socket?.removeEventListener('open', this._onOpen);
        this._socket?.removeEventListener('message', this._onMessage);
        this._socket?.removeEventListener('close', this._onClose);
    }


    _onOpen = () => {
        this._reconnectTimeoutId && this._stopReconnect();
        this._authConnect();

        this._pingIntervalId = setInterval(this._startPingRefresh.bind(this), 55000);

        this._dispatch && this._dispatch(addSnackbarInfoMessage('Connected!'));
    }

    _onMessage = (event: MessageEvent) => {
        const chatObject = JSON.parse(event.data) as IChatObject;
        this._subscribers.forEach(subscriber => {
            subscriber(chatObject);
        });
    }

    _onClose = () => {
        this._pingIntervalId && this._stopPingRefresh();
        this._removeListeners();
        this._socket = null;

        if (this._status === ChatStatus.OPEN) {
            this._dispatch && this._dispatch(resetChatData());
            this._dispatch && this._dispatch(addSnackbarWarningMessage('Disconnected! The system will try to connect again in 15 seconds.'));

            this._startReconnect();
        }
    }


    _authConnect() {
        const authMessage = this._authMessageMaker();
        this._socket?.send(authMessage);
    }


    _startPingRefresh() {
        this._socket?.send(this._pingMessage);
    }

    _stopPingRefresh() {
        clearInterval(this._pingIntervalId!);
    }


    _pingMessageMaker() {
        const newMessage = {type: 'ping', data: {}};
        return JSON.stringify(newMessage);
    }

    _authMessageMaker() {
        const accessToken = readAccessTokenInLS();
        const authMessage = {type: 'auth', data: {accessToken}};
        return JSON.stringify(authMessage);
    }

    _chatMessageMaker(message: string) {
        const newMessage = {type: 'chat', data: {message}};
        return JSON.stringify(newMessage);
    }


    public startMessaging(dispatch: ThunkDispatchType, subscriber: WebSocketSubscriberType) {
        this._status = ChatStatus.OPEN;

        this._subscribers.push(subscriber);
        this._dispatch = dispatch;

        this._createConnect();
    }

    public sendMessage(message: string) {
        const newMessage = this._chatMessageMaker(message);
        this._socket?.send(newMessage);
    }

    public stopMessaging(subscriber: WebSocketSubscriberType) {
        this._status = ChatStatus.CLOSE;

        this._dispatch && this._dispatch(resetChatData());
        this._dispatch && this._dispatch(addSnackbarInfoMessage('You have left the chat!'));
        this._dispatch = null;

        this._subscribers = this._subscribers.filter(s => s !== subscriber);

        this._socket?.close();
        this._reconnectTimeoutId && clearTimeout(this._reconnectTimeoutId);
    }

}

// eslint-disable-next-line import/no-anonymous-default-export
export default new WebSocketInstance();
