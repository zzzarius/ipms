package com.github.zzzarius.ipms.cucumber;

import com.github.zzzarius.ipms.IpmsApp;
import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.web.WebAppConfiguration;

@CucumberContextConfiguration
@SpringBootTest(classes = IpmsApp.class)
@WebAppConfiguration
public class CucumberTestContextConfiguration {}
