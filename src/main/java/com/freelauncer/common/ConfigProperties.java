package com.freelauncer.common;

import java.util.Properties;

public class ConfigProperties {
	private static final Properties properties = new Properties();
	
	public static String getConfigProperties(String key){
		String value = key;
		try {
			properties.load(Thread.currentThread().getContextClassLoader().getResourceAsStream("config.properties"));
			if(properties.containsKey(key)){
				value = properties.getProperty(key);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return value;
	}
}

