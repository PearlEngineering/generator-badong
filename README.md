![Image of Badong](https://i.pinimg.com/originals/3d/96/31/3d9631a279f53ef1784c8641bb9a2976.jpg)
# Badong - The PearlPay Backend API Code Generator

> Yeoman generator for creating PearlPay backend microservice using python, django and mysql. Lets you quickly set up a project following best practices.

## Usage

Install `yo`, and `generator-badong`:

```ssh
$ npm install -g yo generator-badong
```

### Folder Structure
> We follow onion architecture

    .
    ├── app
    │   ├── application          # Interfaces
    │   │   ├── __init__.py
    │   │   ├── services         # Service interface
    │   │   │   └── ...
    │   │   ├── repositories     # Repository interface
    │   │   │   └── ...
    │   │   └── use_cases        # Interface implementation
    │   │       └── ...
    │   ├── domain               # Domain entities
    │   │   └── ...
    │   ├── infrastructure       # Implementations
    │   │   ├── migrations         
    │   │   │   └── ...
    │   │   ├── models
    │   │   │   └── ...
    │   │   ├── modules
    │   │   │   └── ...
    │   │   ├── repositories
    │   │   │   └── ...
    │   │   ├── serializers
    │   │   │   └── ...
    │   │   ├── services
    │   │   │   └── ...
    │   │   └── views        
    │   │       └── ...
    │   ├── new_app_name        # Django settings
    │   │   └── ...
    │   └── requirements.txt
    ├── buildspec.yml
    ├── docker-compose.yml
    ├── Dockerfile
    ├── features                 # BDD feature files
    │   └── ...
    ├── README.md
    └── tests
        └── ...


## Generators

Available generators:

* [badong](#app) (aka [badong:app](#app))
* [badong:generate](#generate)
* [badong:app-dto](#app-dto)
* [badong:domain](#domain)
* [badong:app-repo](#app-repo)
* [badong:app-service](#app-service)
* [badong:app-use-case](#app-use-case)
* [badong:infra-model](#infra-model)
* [badong:infra-module](#infra-module)
* [badong:infra-repo](#infra-repo)
* [badong:infra-serializer](#infra-serializer)
* [badong:infra-service](#infra-service)
* [badong:infra-view](#infra-view)
* [badong:infra-unit](#infra-unit)
* [badong:repo](#repo)
* [badong:service](#service)
* [badong:view](#view)
* [badong:crud](#crud)
* [badong:test-component](#test-component)

### App
Sets up a new PearlPay backend microservice, generating all the boilerplate you need to get started.

Usage:
```bash
    $ yo badong
    ? What is the base name of your application? new app name
```

### Generate
Generates and wires a model, view, service, repository and test artifacts.

Example:
```bash
    $ yo badong:generate
    ? What is the name? newModel
```

### App-Dto
Generates application dto artifact.

Example:
```bash
    $ yo badong:app-dto
    ? What is the name? newModel
```

### App-Model
Generates application model artifact.

Example:
```bash
    $ yo badong:domain
    ? What is the name? newModel
```

### App-Repo
Generates application repository artifact.

Example:
```bash
    $ yo badong:app-repo
    ? What is the name? newModel
```
### App-Service
Generates application service artifact.

Example:
```bash
    $ yo badong:app-service
    ? What is the name? newModel
```

### App-Use-Case
Generates application use-case artifact.

Example:
```bash
    $ yo badong:app-use-case
    ? What is the name? newModel
```

### Infra-Model
Generates infrastructure model artifact.

Example:
```bash
    $ yo badong:infra-model
    ? What is the name? newModel
```

### Infra-Module
Generates infrastructure module artifact.

Example:
```bash
    $ yo badong:infra-module
    ? What is the name? newModel
```

### Infra-Repo
Generates infrastructure repository artifact.

Example:
```bash
    $ yo badong:infra-repo
    ? What is the name? newModel
```

### Infra-Serializer
Generates infrastructure serializer artifact.

Example:
```bash
    $ yo badong:infra-serializer
    ? What is the name? newModel
```

### Infra-Service
Generates infrastructure service artifact.

Example:
```bash
    $ yo badong:infra-service
    ? What is the name? newModel
```

### Infra-View
Generates infrastructure view artifact.

Example:
```bash
    $ yo badong:infra-view
    ? What is the name? newModel
```


### Repo
Generates repository artifacts (app-dto + domain + app-repo + infra-model + infra-repo).

Example:
```bash
    $ yo badong:repo
    ? What is the name? newModel
```

### Service
Generates service artifacts (app-service + infra-service).

Example:
```bash
    $ yo badong:service
    ? What is the name? newModel
```

### View
Generates view artifacts (app-use-case + infra-serializer + infra-view).

Example:
```bash
    $ yo badong:view
    ? What is the name? newModel
```

### Crud
Generates crud artifacts, it also adds a new view that uses django ViewSets instead of ViewAPI. (app-dto + domain + app-repo + infra-model + infra-repo + infra-serializer)

Example:
```bash
    $ yo badong:crud
    ? What is the name? newModel
```


### Test-Component
Generates component test artifacts.

Example:
```bash
    $ yo badong:test-component
    ? What is the name? newModel
```


## Team

Badong is beautifully crafted by these people and a bunch of awesome [contributors](https://github.com/PearlEngineering/generator-badong/graphs/contributors)


[![Mark Ranosa](https://secure.gravatar.com/avatar/6b4ddfe5b689d678aa772b592c0b5ab0?s=117)](www.kenranosa.com)|
:---:|
[Mark Ranosa](www.kenranosa.com) | 
