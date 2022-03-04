maintainer: "Venkata Krishna Reddy Peram"

STEPS TO FOLLOW

1. Run the Docker file and check in src folder for insurance.db sqlite file
    If docker is not available install all necessary packages and run the project with python run.py
    
2. Next go inside the container and navigate to src folder and run python maintenance.py file it will get the records from csv and will store in database 
    If docker is not available then run maintenance.py script to insert the data from csv file to database
   
We are exporting the port to localhost:9090 so we can check the app running successfully on the port 9090


Frontend
1. go inside the insurance_project folder and run npm start and we can see the data in localhost:3000
2. If not working simply re-initiate both front end and backend

Functionality:

1. On top header we can always see which action is occurring like "Policies", "Reports"
2. If we click on policies or Insurance client header then we can navigate to table of policies.
3. We can change the page size and we can navigate to different pages. The action is server side pagination so every time it will call the api and get the fresh data based on limit and offset.
4. If we want to edit the policy simply we can click on the action cell in each row and we can edit the policy.
5. The update button will be disabled until we do any change in the fields and once we click on update it will send that particular field to the backend and will update the data and it will get redirect to the list page;
6. Later if we want to see reports we can click on the header Reports and we can see the reports in two different visible formats like Bar Chart and Line Chart and we can even download the report and graph in csv or picture format


