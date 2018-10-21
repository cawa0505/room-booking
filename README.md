# Room Booking 

> .NET Core WebApi + React + Redux + TypeScript

## Setup from scratch

### Setting up new .NET Core Project with React Template

> Docs: https://docs.microsoft.com/en-us/aspnet/core/client-side/spa/react?view=aspnetcore-2.1&tabs=visual-studio

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

###  Adding redux

```bash
yarn add redux react-redux redux-thunk
```

### Adding semantic ui

```
yarn add semantic-ui-react
```

## Important links


* https://github.com/Microsoft/TypeScript-React-Starter/issues/159#issuecomment-416810455
  - Remove alphabetized imports
* https://github.com/piotrwitek/react-redux-typescript-guide
  - Redux + TypeScript Guide
* https://dev.to/resir014/redux-4--typescript-29-a-type-safe-approach-2lf4