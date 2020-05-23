package com.freelauncer.ism.server;

import com.freelauncer.ism.common.RequestInfo;
import com.freelauncer.ism.common.ResponseInfo;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface MsGateInterface extends Remote {

    public ResponseInfo sendRequest(RequestInfo request) throws RemoteException;
}
