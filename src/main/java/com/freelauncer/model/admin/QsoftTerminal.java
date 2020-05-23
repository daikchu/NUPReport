package com.freelauncer.model.admin;

import javax.persistence.*;
import java.io.Serializable;
@Entity
@Table(name = "QsoftTerminal")
public class QsoftTerminal  implements Serializable {
    private static final long serialVersionUID = -166399391710801760L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TerminalId")
    private Integer TerminalId;
    @Column(name = "TerminalName")
    private String TerminalName;
    private String NetTerminalName;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public String getNetTerminalName() {
        return NetTerminalName;
    }

    public void setNetTerminalName(String netTerminalName) {
        NetTerminalName = netTerminalName;
    }

    public Integer getTerminalId() {
        return TerminalId;
    }

    public void setTerminalId(Integer terminalId) {
        TerminalId = terminalId;
    }

    public String getTerminalName() {
        return TerminalName;
    }

    public void setTerminalName(String terminalName) {
        TerminalName = terminalName;
    }
}
