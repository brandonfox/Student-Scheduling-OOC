package com.pineapple.pp.utils;

public class RegistrationResponse {

    private boolean success;

    //String to store extra information needed at registration
    //Store either authenticationtoken or the invalid field
    private String context;

    public RegistrationResponse(boolean success,String context){
        this.success = success;
        this.context = context;
    }

    public boolean getSuccessStatus(){return success;}
    public String getContext(){return context;}
}
