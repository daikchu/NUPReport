package com.freelauncer.model.view;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class UnitRequest {
    private Long id;
    private String name;
    private String description;
    private Long active_flg;
    private Long entry_user_id;
    private String entry_user_name;
    private String entry_date_time;
    private Long update_user_id;
    private String update_user_name;
    private String update_date_time;
    @JsonIgnore
    private String name_;
    @JsonIgnore
    private String description_;
    @JsonIgnore
    private boolean success= true;

    @JsonCreator
    public UnitRequest(
            @JsonProperty(value = "id", required = false) final Long id,
            @JsonProperty(value = "name", required = false) final String name,
            @JsonProperty(value = "description", required = false) final String description,
            @JsonProperty(value = "active_flg", required = false) final Long active_flg,
            @JsonProperty(value = "entry_user_id", required = false) final Long entry_user_id,
            @JsonProperty(value = "entry_user_name", required = false) final String entry_user_name,
            @JsonProperty(value = "entry_date_time", required = false) final String entry_date_time,
            @JsonProperty(value = "update_user_id", required = false) final Long update_user_id,
            @JsonProperty(value = "update_user_name", required = false) final String update_user_name,
            @JsonProperty(value = "update_date_time", required = false) final String update_date_time

    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.active_flg = active_flg;
        this.entry_user_id = entry_user_id;
        this.entry_user_name = entry_user_name;
        this.entry_date_time = entry_date_time;
        this.update_user_id = update_user_id;
        this.update_user_name = update_user_name;
        this.update_date_time = update_date_time;

    }

    public UnitRequest() {
    }

    public Long getUid() {
        return id;
    }

    public void setUid(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public Long getActive_flg() {
        return active_flg;
    }

    public void setActive_flg(Long active_flg) {
        this.active_flg = active_flg;
    }

    public Long getEntry_user_id() {
        return entry_user_id;
    }

    public void setEntry_user_id(Long entry_user_id) {
        this.entry_user_id = entry_user_id;
    }

    public String getEntry_user_name() {
        return entry_user_name;
    }

    public void setEntry_user_name(String entry_user_name) {
        this.entry_user_name = entry_user_name;
    }


    public Long getUpdate_user_id() {
        return update_user_id;
    }

    public void setUpdate_user_id(Long update_user_id) {
        this.update_user_id = update_user_id;
    }

    public String getUpdate_user_name() {
        return update_user_name;
    }

    public void setUpdate_user_name(String update_user_name) {
        this.update_user_name = update_user_name;
    }

    public String getEntry_date_time() {
        return entry_date_time;
    }

    public void setEntry_date_time(String entry_date_time) {
        this.entry_date_time = entry_date_time;
    }

    public String getUpdate_date_time() {
        return update_date_time;
    }

    public void setUpdate_date_time(String update_date_time) {
        this.update_date_time = update_date_time;
    }

    public String getName_() {
        return name_;
    }

    public void setName_(String name_) {
        this.name_ = name_;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getDescription_() {
        return description_;
    }

    public void setDescription_(String description_) {
        this.description_ = description_;
    }

    /*public void validateupdate(){
        success = true;
        String truong = SystemMessageProperties.getSystemProperty("v3_truong") +" ";
        String notEmpty = SystemMessageProperties.getSystemProperty("v3_not_empty");
        String max_length = SystemMessageProperties.getSystemProperty("v3_max_length");
        String min_length = SystemMessageProperties.getSystemProperty("v3_min_length");
        String ky_tu = SystemMessageProperties.getSystemProperty("v3_ky_tu");


        if (name == null || name.equals("")) {
            name_ = (truong + SystemMessageProperties.getSystemProperty("v3_grouprole_name") + notEmpty);
            success = false;
        } else if (name.length() > 200) {
            name_ = (truong + SystemMessageProperties.getSystemProperty("v3_grouprole_name") + max_length + EditString.SPACE + 200 + ky_tu);
            success = false;
        }
        if (description == null || description.equals("")) {
            description_ = (truong + SystemMessageProperties.getSystemProperty("v3_description") + notEmpty);
            success = false;
        } else if (description.length() > 1000) {
            description_ = (truong + SystemMessageProperties.getSystemProperty("v3_description") + max_length + EditString.SPACE + 1000 + ky_tu);
            success = false;
        }
    }*/
}
