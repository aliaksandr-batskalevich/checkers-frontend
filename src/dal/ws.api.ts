import {authMessageMaker, pingMessageMaker} from "../utils/wsUtils";
import {IChatObject} from "../models/IChatMessage";

type WebSocketSubscriberType = (chatObject: IChatObject) => void

class WebSocketInstance {

    socket: WebSocket | null;
    subscribers: Array<WebSocketSubscriberType>
    pingMessage: string
    pingIntervalId: NodeJS.Timer | null;
    reconnectIntervalId: NodeJS.Timer | null;

    constructor() {
        this.socket = null;
        this.subscribers = [];
        this.pingMessage = pingMessageMaker();
        this.pingIntervalId = null;
        this.reconnectIntervalId = null;
    }

    _createConnect() {
        this.socket = new WebSocket('ws://35.239.107.150/api/chat');
    }

    _startReconnect() {
        this.reconnectIntervalId = setInterval(this._createConnect.bind(this), 15000);
    }

    _stopReconnect() {
        this.reconnectIntervalId && clearInterval(this.reconnectIntervalId);
    }

    _onOpen() {
        this._stopReconnect.call(this);
        this._authConnect.call(this);
        this._createListeners.call(this);
        this.pingIntervalId = setInterval(this._startPingRefresh.bind(this), 55000);
    }

    _onMessage(event: MessageEvent) {
        const chatObject = JSON.parse(event.data) as IChatObject;
        this.subscribers.forEach(subscriber => {
            subscriber(chatObject);
        });
    }

    _onClose() {
        this._removeListeners();
        this.socket = null;
        this._stopPingRefresh.call(this);
        this._startReconnect.call(this);
    }

    _authConnect() {
        const authMessage = authMessageMaker();
        this.socket?.send(authMessage);
    }

    _startPingRefresh() {
        this.socket?.send(this.pingMessage);
    }

    _stopPingRefresh() {
        this.pingIntervalId && clearInterval(this.pingIntervalId);
    }

    _createListeners() {
        this.socket?.addEventListener('open', this._onOpen.bind(this));
        this.socket?.addEventListener('message', this._onMessage.bind(this));
        this.socket?.addEventListener('close', this._onClose.bind(this));
    }

    _removeListeners() {
        this.socket?.removeEventListener('open', this._onOpen.bind(this));
        this.socket?.removeEventListener('message', this._onMessage.bind(this));
        this.socket?.removeEventListener('close', this._onClose.bind(this));
    }

    public startMessaging(subscriber: WebSocketSubscriberType) {
        this.subscribers.push(subscriber);
        this._createConnect.call(this);
    }

    public stopMessaging(subscriber: WebSocketSubscriberType) {
        this.subscribers = this.subscribers.filter(s => s !== subscriber);
        this.pingIntervalId && clearInterval(this.pingIntervalId);
        this.socket?.close();
        this._removeListeners.call(this);
        this.socket = null;
    }

}

// eslint-disable-next-line import/no-anonymous-default-export
export default new WebSocketInstance();
