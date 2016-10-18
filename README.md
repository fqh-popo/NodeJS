# Project Description:
##Take the following input file called time.csv ...
time_in,time_out,break_minutes,cost_code <br>
01/01/2016 09:00,01/01/2016 17:00,30,A <br>
02/01/2016 09:00,02/01/2016 17:30,15,B <br>
03/01/2016 09:05,03/01/2016 16:30,25,C <br>
04/01/2016 09:15,04/01/2016 17:35,55,B <br>
05/01/2016 08:55,05/01/2016 16:55,15,C <br>

##and create a task to parse and process the file to produce the following output...
node main.js
A=450
B=940
C=885

# Realizing
1. You need to have <b>node.js</b> installed on your machine to run this example
2. The execute method in the GetCostCodeSummary.js file to complete the task of
    a. opening the file passed in on parameters.file
    b. parse and create the summary out. Get more info for using the <b>csv library</b>, detailed here: http://www.adaltas.com/projects/node-csv
3. The code in main.js to create and execute the GetCostCodeSummary task and on the callback write the result to the console