package com.freelauncer.context;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.io.File;

/**
 * Created by DaiCQ on 14/11/2019.
 */
@Configuration
@EnableWebMvc
/*@EnableTransactionManagement*/
public class ApplicationContextConfig extends WebMvcConfigurerAdapter {

   /* @Bean(value = "notarizedRequestService")
    public NotarizedRequestService notarizedRequestService() {
        return new NotarizedRequestServiceImpl();
    }
*/
    @Value("${folder_upload}")
    private String folderUpload;
    @Value("${file_context_get}")
    private String fileContextGet;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String rootPath = folderUpload;
        File dir = new File(rootPath + File.separator + fileContextGet);
        String dirTrue = dir.getAbsolutePath();
        registry
                .addResourceHandler("/"+fileContextGet+"*//**")
                .addResourceLocations("file:///"+dir.getAbsolutePath());
    }

}

