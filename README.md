# Room Booking 

> .NET Core WebApi + React + Redux + TypeScript

## Setup from scratch

### Setting up new .NET Core Project with React Template

* [.NET Core WebApi Docs](https://docs.microsoft.com/en-us/aspnet/core/client-side/spa/react?view=aspnetcore-2.1&tabs=visual-studio)

```bash
dotnet new react -o project-name
cd project-name
```

### Switching CRA to TypeScript CRA

> Template drama thread: https://github.com/aspnet/Templating/issues/242

```bash
rm -rf ClientApp
create-react-app client-app --scripts-version=react-scripts-ts
mv client-app ClientApp
```

### Adding redux

```bash
yarn add redux react-redux redux-thunk
```

## Running

```bash
dotnet run
```

### Running and setting env variable manually

```bash
dotnet run --environment="Development"
```

## Adding a Database

### Adding a SQLLite database

* [EF Core - New Database](https://docs.microsoft.com/sv-se/ef/core/get-started/aspnetcore/new-db?tabs=visual-studio)

#### EF CLI commands not found when running `dotnet`

CLI commands where not referenced inside of .csproj-file:

* https://github.com/aspnet/EntityFrameworkCore/issues/8996#issuecomment-400154414

Fix: 
```csproj
<DotNetCliToolReference Include="Microsoft.EntityFrameworkCore.Tools" Version="2.0.0" /> 
<DotNetCliToolReference Include="Microsoft.EntityFrameworkCore.Tools.DotNet" Version="2.0.0" />
```

#### Running the migrations

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```


## Testing

```bash
yarn test
```

## Important links


* https://github.com/Microsoft/TypeScript-React-Starter/issues/159#issuecomment-416810455
  - Remove alphabetized imports
* https://github.com/piotrwitek/react-redux-typescript-guide
  - Redux + TypeScript Guide
* https://dev.to/resir014/redux-4--typescript-29-a-type-safe-approach-2lf4