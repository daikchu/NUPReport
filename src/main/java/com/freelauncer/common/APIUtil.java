package com.freelauncer.common;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.freelauncer.model.view.UnitRequest;
import org.json.JSONArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.net.ssl.*;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.cert.X509Certificate;
import java.util.ArrayList;

public class APIUtil {
    private static final Logger LOG = LoggerFactory.getLogger(APIUtil.class);

    public static ArrayList<UnitRequest> getUnitRequestByFilter(String actionURL, String data) {
        HttpURLConnection conn =null;
        ArrayList<UnitRequest> list =null;
        try {
            HttpsURLConnection.setDefaultHostnameVerifier(getAllHostsValid());
            URL url = new URL(actionURL);
            conn = (HttpURLConnection) url.openConnection();
            conn.setDoOutput(true);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            String input = data.toString();
            OutputStream os = conn.getOutputStream();
            os.write(input.getBytes("UTF-8"));
            os.flush();
            if (conn.getResponseCode() != 200) {
                throw new RuntimeException("Failed : HTTP error code : "
                        + conn.getResponseCode());
            }
            BufferedReader br = new BufferedReader(new InputStreamReader(
                    (conn.getInputStream()), "UTF-8"));
            String output;
            list = new ArrayList<UnitRequest>();
            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            while ((output = br.readLine()) != null) {
                JSONArray jsonArray = new JSONArray(output);
                if (jsonArray != null) {
                    int len = jsonArray.length();
                    for (int i = 0; i < len; i++) {
                        list.add(mapper.readValue(jsonArray.get(i).toString(), UnitRequest.class));
                    }
                }
            }


        } catch (Exception e) {
            LOG.error("Have an error in method APIUtil.getUnitRequestByFilter:"+e.getMessage());
        }finally {
            conn.disconnect();
        }
        return list;
    }



    public static Long getCount(String actionURL, String data) {
        HttpURLConnection conn =null;
        Long count = Long.valueOf(0);
        try {
            HttpsURLConnection.setDefaultHostnameVerifier(getAllHostsValid());
            URL url = new URL(actionURL);
            conn = (HttpURLConnection) url.openConnection();
            conn.setDoOutput(true);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            String input = data.toString();
            OutputStream os = conn.getOutputStream();
            os.write(input.getBytes("UTF-8"));
            os.flush();
            if (conn.getResponseCode() != 200) {
                throw new RuntimeException("Failed : HTTP error code : "
                        + conn.getResponseCode());
            }
            BufferedReader br = new BufferedReader(new InputStreamReader(
                    (conn.getInputStream()), "UTF-8"));
            String output;

            while ((output = br.readLine()) != null) {
                count = Long.parseLong(output);
            }

        } catch (Exception e) {
            LOG.error("Have an error in method APIUtil.callUpdatePreventAPI:"+e.getMessage());
        }finally {
            conn.disconnect();
        }
        return count;
    }

    public static Boolean callAPIResult(String actionURL, String data) {
        System.out.println();
        HttpURLConnection conn = null;
        boolean result=false;
        try {
            HttpsURLConnection.setDefaultHostnameVerifier(getAllHostsValid());
            URL url = new URL(actionURL);
            conn = (HttpURLConnection) url.openConnection();
            conn.setDoOutput(true);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            String input = data.toString();
            OutputStream os = conn.getOutputStream();
            os.write(input.getBytes("UTF-8"));
            os.flush();
            if (conn.getResponseCode() != 200) {
                throw new RuntimeException("Failed : HTTP error code : "
                        + conn.getResponseCode());
            }
            BufferedReader br = new BufferedReader(new InputStreamReader(
                    (conn.getInputStream()), "UTF-8"));
            String output;
            output = br.readLine();
            if (output.equals("true")) result= true;

        } catch (Exception e) {
            LOG.error("Have an error in method APIUtil.callAPIResult:"+e.getMessage());

        }finally {
            conn.disconnect();
        }
        return result;
    }

    public static Boolean callReturnBooleanUsingGetMethod(String actionURL) {
        HttpURLConnection conn =null;
        Boolean result = null;
        try {
            HttpsURLConnection.setDefaultHostnameVerifier(getAllHostsValid());
            URL url = new URL(actionURL);
            conn = (HttpURLConnection) url.openConnection();
            conn.setDoOutput(true);
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            conn.setRequestProperty("Accept-Charset", "UTF-8");

            /*String input = data.toString();

            OutputStream os = conn.getOutputStream();
            os.write(input.getBytes("UTF-8"));
            os.flush();*/
            if (conn.getResponseCode() != 200) {
                throw new RuntimeException("Failed : HTTP error code : "
                        + conn.getResponseCode());
            }

            BufferedReader br = new BufferedReader(new InputStreamReader(
                    (conn.getInputStream()), "UTF-8"));

            String output;
            while ((output = br.readLine()) != null) {
                result = Boolean.parseBoolean(output);
            }

        } catch (Exception e) {
            LOG.error("Have an error in method APIUtil.removeSynchronizeById:"+e.getMessage());
        }finally {
            conn.disconnect();
        }
        return result;
    }

    public static long countAll(String actionURL) {
        HttpURLConnection conn =null;
        int result = 0;
        try {
            URL url = new URL(actionURL);
            conn = (HttpURLConnection) url.openConnection();
            conn.setDoOutput(true);
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            if (conn.getResponseCode() != 200) {
                throw new RuntimeException("Failed : HTTP error code : "
                        + conn.getResponseCode());
            }
            BufferedReader br = new BufferedReader(new InputStreamReader(
                    (conn.getInputStream()), "UTF-8"));
            String output;

            while ((output = br.readLine()) != null) {
                result = Integer.parseInt(output);
            }
        } catch (Exception e) {
            LOG.error("Have an error in method APIUtil.countWithGetMethod:"+e.getMessage());
        }finally {
            conn.disconnect();
        }
        return result;
    }

    public static long countWithGetMethod(String actionURL, String query) {
        HttpURLConnection conn =null;
        int result = 0;
        try {
            URL url = new URL(actionURL);
            conn = (HttpURLConnection) url.openConnection();
            conn.setDoOutput(true);
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            String input = query.toString();
            OutputStream os = conn.getOutputStream();
            os.write(input.getBytes("UTF-8"));
            os.flush();
            if (conn.getResponseCode() != 200) {
                throw new RuntimeException("Failed : HTTP error code : "
                        + conn.getResponseCode());
            }
            BufferedReader br = new BufferedReader(new InputStreamReader(
                    (conn.getInputStream()), "UTF-8"));
            String output;

            while ((output = br.readLine()) != null) {
                result = Integer.parseInt(output);
            }
        } catch (Exception e) {
            LOG.error("Have an error in method APIUtil.countWithGetMethod:"+e.getMessage());
        }finally {
            conn.disconnect();
        }
        return result;
    }

    public static Long countPostMethod(String actionURL, String query) {

        HttpURLConnection conn =null;
        Long count = Long.valueOf(0);
        try {
            HttpsURLConnection.setDefaultHostnameVerifier(getAllHostsValid());
            URL url = new URL(actionURL);
            conn = (HttpURLConnection) url.openConnection();
            conn.setDoOutput(true);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            String input = query.toString();
            OutputStream os = conn.getOutputStream();
            os.write(input.getBytes("UTF-8"));
            os.flush();
            if (conn.getResponseCode() != 200) {
                throw new RuntimeException("Failed : HTTP error code : "
                        + conn.getResponseCode());
            }
            BufferedReader br = new BufferedReader(new InputStreamReader(
                    (conn.getInputStream()), "UTF-8"));
            String output;
            StringBuffer response = new StringBuffer();
            while ((output = br.readLine()) != null) {
                count = Long.parseLong(output);
            } br.close();

            System.out.println("JSON String Result " + count);

        } catch (Exception e) {
            LOG.error("Have an error in method APIUtil.countPostMethod:"+e.getMessage());
        }finally {
            conn.disconnect();
        }
        return count;


    }

    /*START APIS OF SOCIAL NETWORK*/
    public static String loginToSocialNetworkApi(String actionURL, String data) {
        HttpURLConnection conn =null;
        String result ="";
        try {
            HttpsURLConnection.setDefaultHostnameVerifier(getAllHostsValid());
            URL url = new URL(actionURL);
            conn = (HttpURLConnection) url.openConnection();
            conn.setDoOutput(true);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            //conn.setRequestProperty("Accept-Charset", "UTF-8");

            String input = data.toString();

            OutputStream os = conn.getOutputStream();
            os.write(input.getBytes("UTF-8"));
            os.flush();

            BufferedReader br = new BufferedReader(new InputStreamReader(
                    (conn.getInputStream()), "UTF-8"));

            String output;
            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            while ((output = br.readLine()) != null) {
                result = output;
                /*list = mapper.readValue(output, PreventContractList.class);*/
            }

        } catch (Exception e) {
            LOG.error("Have an error in method APIUtil.loginToSocialNetworkApi():"+e.getMessage());
        }finally {
            conn.disconnect();
        }
        return result;
    }

    public static String apiSocialNetworkApiMethodPost(String actionURL, String data) {
        HttpURLConnection conn =null;
        String result ="";
        try {
            HttpsURLConnection.setDefaultHostnameVerifier(getAllHostsValid());
            URL url = new URL(actionURL);
            conn = (HttpURLConnection) url.openConnection();
            conn.setDoOutput(true);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            //conn.setRequestProperty("Accept-Charset", "UTF-8");

            String input = data.toString();

            OutputStream os = conn.getOutputStream();
            os.write(input.getBytes("UTF-8"));
            os.flush();

            BufferedReader br = new BufferedReader(new InputStreamReader(
                    (conn.getInputStream()), "UTF-8"));

            String output;
            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            while ((output = br.readLine()) != null) {
                result = output;
            }

        } catch (Exception e) {
            LOG.error("Have an error in method APIUtil.apiSocialNetworkApiMethodPost():"+e.getMessage());
        }finally {
            conn.disconnect();
        }
        return result;
    }

    public static String apiSocialNetworkApiMethodGet(String actionURL) {
        HttpURLConnection conn =null;
        String result = "";
        try {
            HttpsURLConnection.setDefaultHostnameVerifier(getAllHostsValid());
            URL url = new URL(actionURL);
            conn = (HttpURLConnection) url.openConnection();
            conn.setDoOutput(true);
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            conn.setRequestProperty("Accept-Charset", "UTF-8");

            /*String input = data.toString();

            OutputStream os = conn.getOutputStream();
            os.write(input.getBytes("UTF-8"));
            os.flush();*/
            if (conn.getResponseCode() != 200) {
                throw new RuntimeException("Failed : HTTP error code : "
                        + conn.getResponseCode());
            }

            BufferedReader br = new BufferedReader(new InputStreamReader(
                    (conn.getInputStream()), "UTF-8"));

            String output;
            while ((output = br.readLine()) != null) {
                result = output;
            }

        } catch (Exception e) {
            LOG.error("Have an error in method APIUtil.apiSocialNetworkApiMethodGet():"+e.getMessage());
        }finally {
            conn.disconnect();
        }
        return result;
    }
    /*END APIS OF SOCIAL NETWORK*/

    //set ssl for https
    public static HostnameVerifier getAllHostsValid(){
        TrustManager[] trustAllCerts = new TrustManager[] {new X509TrustManager() {
            public X509Certificate[] getAcceptedIssuers() {
                return null;
            }
            public void checkClientTrusted(X509Certificate[] certs, String authType) {
            }
            public void checkServerTrusted(X509Certificate[] certs, String authType) {
            }
        }
        };

        // Install the all-trusting trust manager
        try{
            SSLContext sc = SSLContext.getInstance("SSL");
            sc.init(null, trustAllCerts, new java.security.SecureRandom());
            HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());

        } catch (Exception e){
            LOG.error(e.getMessage());
        }

        // Create all-trusting host name verifier
        HostnameVerifier allHostsValid = new HostnameVerifier() {
            public boolean verify(String hostname, SSLSession session) {
                return true;
            }
        };

        return allHostsValid;
    }


    /*public static ApiResponse getPageTasks(String actionURL) {
        HttpURLConnection conn =null;
        ApiResponse result = null;
        try {
            HttpsURLConnection.setDefaultHostnameVerifier(getAllHostsValid());
            URL url = new URL(actionURL);
            conn = (HttpURLConnection) url.openConnection();
            conn.setDoOutput(true);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            OutputStream os = conn.getOutputStream();
            os.flush();
            if (conn.getResponseCode() != 200) {
                throw new RuntimeException("Failed : HTTP error code : "
                        + conn.getResponseCode());
            }
            BufferedReader br = new BufferedReader(new InputStreamReader(
                    (conn.getInputStream()), "UTF-8"));
            String output;
            result = new ApiResponse();
            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            while ((output = br.readLine()) != null) {
                result = mapper.readValue(output, ApiResponse.class);
            }

        } catch (Exception e) {
            LOG.error("Have an error in method APIUtil.getPageTasks:"+e.getMessage());
        }finally {
            conn.disconnect();
        }
        System.out.println("result getPageTasks by query = "+result );
        return result;
    }

    public static ApiResponse callAPI(String actionURL, String data) {
        HttpURLConnection conn =null;
        ApiResponse result = new ApiResponse();
        try {
            HttpsURLConnection.setDefaultHostnameVerifier(getAllHostsValid());
            URL url = new URL(actionURL);
            conn = (HttpURLConnection) url.openConnection();
            conn.setDoOutput(true);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            String input = data.toString();
            OutputStream os = conn.getOutputStream();
            os.write(input.getBytes("UTF-8"));
            os.flush();
            if (conn.getResponseCode() != 200) {
                throw new RuntimeException("Failed : HTTP error code : "
                        + conn.getResponseCode());
            }
            BufferedReader br = new BufferedReader(new InputStreamReader(
                    (conn.getInputStream()), "UTF-8"));
            String output;
            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            while ((output = br.readLine()) != null) {
                result = mapper.readValue(output, ApiResponse.class);
            }

        } catch (Exception e) {
            LOG.error("Have an error in method APIUtil.callAPI:"+e.getMessage());
        }finally {
            conn.disconnect();
        }
        return result;
    }*/
}
