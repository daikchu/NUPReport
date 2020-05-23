package com.freelauncer.web.controller.admin;

import io.swagger.annotations.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;

/**
 * Created by Admin on 12/14/2017.
 */
@Controller
/*@RequestMapping("/")*/
public class Adm_IndexController {
    private Logger logger = LogManager.getLogger(Adm_IndexController.class);
   /* @Autowired
    LogAccessService logAccessService;*/

/*    @GetMapping("/login")
    public String login(){
        return "adm_login";
    }*/

    @GetMapping("/login")
    public ModelAndView login(@RequestParam(value = "error", required = false) String error, @RequestParam(value = "logout", required = false) String logout) {

        ModelAndView model = new ModelAndView();
        if (error != null) {
            if (error.equals("true")) {
                model.addObject("error", "1");
            } else if (error.equals("disable")) {
                model.addObject("error", "0");
            }

        }
        if (logout != null) {
            model.addObject("msg", "logoutSucess");
        }
        model.setViewName("adm_login");
        return model;
    }

    @GetMapping("/forgot-password")
    public String forgotPassword(@RequestParam(value = "error", required = false) String error, @RequestParam(value = "logout", required = false) String logout) {
        return "forgot_password";
    }



/*    @RequestMapping(value = "/send-pass.html", method = RequestMethod.POST, consumes= MediaType.APPLICATION_JSON_VALUE)*/
    @ApiOperation(
            value = "Gửi yêu cầu lấy lại mật khẩu"
            /*  notes = "Chỉ có thể được gọi bởi người dùng trên Sở tư pháp."*/
    )
    @ApiImplicitParams(//giai thich cac tham so truyen vao api
            value = {
                    @ApiImplicitParam(name = "account", value = "Tên đăng nhập", dataType = "string",
                            examples = @Example(@ExampleProperty("damin")), paramType = "input"),
                    @ApiImplicitParam(name = "email", value = "Email", dataType = "string",
                            examples = @Example(@ExampleProperty("admin@gmail.com")), paramType = "input"),
            }
    )
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Gửi thành công!"),
            @ApiResponse(code = 400, message = "Có lỗi xảy ra.")
    })


    @GetMapping("/")
    public String index(Model model, HttpServletRequest request) {
        Principal principal = request.getUserPrincipal();
        //check block this username
       /* User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (StringUtils.isBlank(user.getLinkFile())) {
            request.getSession().setAttribute("imageUserLogin", "/assets/note/images/user.png");
        } else {
            request.getSession().setAttribute("imageUserLogin", user.getLinkFile());
        }*/
        return "redirect:/report/DailyCollectionByPolyclinic";
        /*return "adm_index";*/
    }


    /*For my history*/
    @GetMapping("/history")
    public String getOfUser() {
        return "adm_my.history";
    }
/*
    @GetMapping("/history/my-log")
    public ResponseEntity<PagingResult> logOfUser(@RequestParam(value = "p", required = false, defaultValue = "1") int pageNumber) {
        PagingResult page = new PagingResult();
        page.setPageNumber(pageNumber);
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        try {
            page = logAccessService.getByUserId(page, user.getId()).orElse(new PagingResult());
        } catch (Exception e) {
        }
        return new ResponseEntity<PagingResult>(page, HttpStatus.OK);
    }*/

    //ham lay du lieu kiem tra leftmenu dang dong hay mo
    @GetMapping("/change-nav")
    public ResponseEntity<Boolean> changeNavXs(HttpServletRequest request) {
        if (request.getSession().getAttribute("nav-xs") != null) {
            Boolean navXs = (Boolean) request.getSession().getAttribute("nav-xs");
            if (navXs != null) {
                request.getSession().setAttribute("nav-xs", !navXs);
            }
        } else {
            request.getSession().setAttribute("nav-xs", true);
        }
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }
//    //ham thay thoi thoi gian mau sac
//    @GetMapping("/sun-moon")
//    public ResponseEntity<Boolean> changeTime(HttpServletRequest request){
//        boolean sun= SunMoonMenu.sun;
//        request.getSession().setAttribute("sun-moon",sun);
//        return new ResponseEntity<Boolean>(sun,HttpStatus.OK);
//    }

    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        return "adm_dashboard";
    }
    /*CAC HAM PHUC VU DASHBOARD BIEU DO*/


}
