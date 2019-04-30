## This is sample todo-list project based on React


### Featuring:
- React v16.8 with Router v5
- TypeScript v3.4 with TSLint
- Material-UI components library
- Redux state machine with redux-saga asynchronous middleware
- .Net Core 2.2 based backed with Entity Framework
- Mocked/Fake server api is availabe to the client

### Deploy instructions
This application requires following software to run:
- Latest [NodeJS](https://nodejs.org/en/)
- .Net Core 2.2 [SDK](https://dotnet.microsoft.com/download/dotnet-core/2.2)
- Running instance of [MSSQL Server](https://www.microsoft.com/ru-RU/download/details.aspx?id=55994)
- [Git](https://git-scm.com/downloads) (obvious!)


1. Clone this repository into empty folder: ```git clone https://github.com/Garage71/react-tasks.git```
2. Change the path to ```ClientApp``` directory
3. Type ```npm install```
4. Change path to parent directory
5. Locate ```appsettings.json``` configuratuion file
6. Put your MSSQL server's correct connection string into ```DefaultConnection``` setting field.  
	#### `IMPORTANT!` 
	Healthy connection to MSSQL Server server instance is required in order to launch the backed.
7. Type ```dotnet run```. In case of all previuos requirements are met, the development server should launch. When complitation process is finished, head your favorite browser to http://localhost:5000 or https://localhost:5001
8. However, it's possible to launch client application without running backend. Navigate back to ```ClientApp``` folder and type ```npm start```. Development server should compile the client and launch the client app. However all data that's presented  is fake actually. Nevertherless, you still continue develop the client as usual.

This project is deployed to AzureCloud as well: http://react-tasks.azurewebsites.net