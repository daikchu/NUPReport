package com.freelauncer.common;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.util.Properties;

public class MessagesProperty {
    private static final Properties SYSTEM_PROPERTIES = new Properties();

    static {

        ClassLoader loader = SystemProperties.class.getClassLoader();
        try {
            SYSTEM_PROPERTIES.load(loader.getResourceAsStream("messages.properties"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    /**
     * getProperty
     *
     * @param key
     * @return value
     */
    public static String getProperty(String key) {

        String ret = key;
        if (SYSTEM_PROPERTIES.containsKey(key)) {
            ret = SYSTEM_PROPERTIES.getProperty(key);
        }
        return ret;
    }

    /**
     * setProperty
     *
     * @param key
     * @return value
     */
    public static void setProperty(String key, String value) {
        if (SYSTEM_PROPERTIES.containsKey(key)) {
            try {
                ClassLoader classLoader = SystemProperties.class.getClassLoader();
                URL url = classLoader.getResource("messages.properties");
                SYSTEM_PROPERTIES.setProperty(key , value);
                OutputStream outPut = new FileOutputStream(url.toURI().getPath());
                SYSTEM_PROPERTIES.store(outPut , "## " + key + " update ##");
                outPut.close();
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
    }

    public static String readProperties()
    {
        Properties prop = new Properties();
        String file = "messages.properties";
        InputStream fins = SystemProperties.class.getClassLoader().getResourceAsStream("messages.properties");
        try
        {
            //prop.load(new FileInputStream(file));
            if(fins!=null)
                prop.load(fins);
        }
        catch (IOException e) {
            e.printStackTrace();
        }catch (Exception e) {
            e.printStackTrace();
        }

        String nation = prop.getProperty("note_check");
        return nation;
    }
}
