<p align="center"><img width="200" height="200" src="https://i.ibb.co/t4MDdkq/grandjs.png" alt="Grandjs logo"></p>


# Grand Model


## Content
- [Grand Model](#grand-model)
  - [Content](#content)
  - [About](#about)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
  - [Dependencies](#dependencies)
  - [Building Model](#building-model)
  - [Define New Model](#define-new-model)
  - [Define a new property inside your model](#define-a-new-property-inside-your-model)
    - [Settings](#settings)
    - [Property](#property)
    - [Method](#method)
    - [Data Types](#data-types)
      - [String](#string)
      - [Number](#number)
      - [ObjectId](#objectid)
      - [Object](#object)
      - [Array](#array)
    - [Add Model inside another Model](#add-model-inside-another-model)
      - [How can I use Model inside another Model ?](#how-can-i-use-model-inside-another-model-)
    - [Instantiate Model](#instantiate-model)
    - [Validate Model](#validate-model)
    - [Access Schema Object](#access-schema-object)
## About
Grand Schema is a javascript package for building  models for your data using typescript, it's available for either frontend or backend developement, it also can be used to validate your models, it's so good to be used in frontend to describe your data how they will be, also it's good for backend if you want to build a project in repository pattern and cleand archeticture.


## Features
* data modeling
* model schema validation
* flexible schema
* mongoose compatiblity
* typescript compatibility
* uses decorators for injecting property definition

## Prerequisites
- install nodejs on your machine
- install typescript
- initialize a new typescript project

## Installing
```cmd
npm i grand-model
```

## Dependencies
grandjs depends on another package called [grand-validator](https://github.com/tareksalem/grand-validator) which is a grandjs package that can make validation on the schema you define

Grand Model installs `grand-validator` by default

## Building Model

to build a model firstly, you need to import the following into your ts file:
```typescript
import {Entity, property, method, settings} from "grand-model"
```

* Entity: this is an abstracted class that you will extend to build your model
* settings: this is a decorator to inject some settings into your model class
* property: this is a decorator that you will use to inject definition into your model property
* method: This is a decorator to define some methods inside your model you can use later to inject them inside your mongoose schema or use these methods to perofrm something over the data


## Define New Model
To define a new model you need to extend the Entity class as the following:

```typescript

import {Entity, property, method, settings} from "grand-model"

@settings()
class User extends Entity {

}
```

## Define a new property inside your model

```typescript

import {Entity, property, method, settings} from "grand-model"

@settings()
class User extends Entity {
    @property({required: true | false, type: String, value: })
    name:string
}
```

### Settings
settings is a decorator you use to decorate your model to bootstrap it to accept  the decorated properties and methods inside it
### Property

Property is a decorator that you use to define settings to your model property, this decorator takes one parameter as an object, this object can contain the following properties:

|property|type|required|default|description|
|-|-|-|-|-|
|required|boolean|false|true|decide either this property is required when you create new instance from this model or not|
|type|Data Types|true|-|define the data type of this model property|
|message|string|-|set custom message to be returned when your model is validated, and the property doesn't match the schema definition|
|min|number|false|-|set a minimum length for your string or a minimum number for your number|
|max|number|false|-|set a maximum length for your string or a maximum number for your number|
|regex|RegExp|false|-|set a regex for your string|
|length|number|false|-|set the length of the string characters or aray items|

### Method
Method is a decorator you use for your model methods to define that this function is a method related to your schema that can perofrm a specific action or execute something
**Example**
```typescript
import {Entity, method, property, settings} from "grand-model";

@settings()
class User extends Entity{
    @property({required: true, type: String})
    firstName:string
    @property({required: true, type: String})
    lastName:string
    @method
    getFullName() {
        return this.firstName + this.lastName
    }
}
```
### Data Types
The following table shows the data types that you can use to define your model

#### String
You can define your model property as a string using one of the following approaches:
`String, Types.String, "string", "String"`

**Example**

```typescript
    import {Entity, property, settings} from"grand-model"
    import {Types} from "grand-validator"
    @settings()
    class User extends Entity{
        @property({required: true, type: String | Types.String | "string" | "String"})
        name:string
    }
```

#### Number
You can define your model property as a Number using one of the following approaches:
`Number, Types.Number, "number", "Number"`

**Example**

```typescript
    import {Entity, property, settings} from"grand-model"
    import {Types} from "grand-validator"
    @settings()
    class User extends Entity{
        @property({required: true, type: Number | Types.Number | "Number" | "number"})
        age:number
    }
```

#### ObjectId
You can define your model property as a ObjectId using one of the following approaches:
`ObjectId, Types.ObjectId, "ObjectId", "objectId"`

**Example**

```typescript
    import {Entity, property, settings} from"grand-model"
    import {Types} from "grand-validator"
    @settings()
    class User extends Entity{
        @property({required: true, type: Types.ObjectId | "ObjectId" | "objectId"})
        _id_:string
    }
```

#### Object
You can define your model property as a Object using one of the following approaches:
`Object, Types.Object, "Object", "object", {}`

**Example**

```typescript
    import {Entity, property, settings} from"grand-model"
    import {Types} from "grand-validator"
    @settings()
    class User extends Entity{
        @property({required: true, type:
            Object | Types.Object | "Object" | "object"|
            {}
        })
        activities:Object | {}
    }
```

#### Array
You can define your model property as a Array using one of the following approaches:
`Array, Types.Array, "Array", "array", []`

**Example**

```typescript
    import {Entity, property, settings} from"grand-model"
    import {Types} from "grand-validator"
    @settings()
    class User extends Entity{
        @property({required: true, type:
            Array | Types.Array | "Array" | "array"|
            []
        })
        activities:Array | []
    }
```


### Add Model inside another Model
Grand Model gives you the ability to use a model inside another model which helps you to not repeat your schema definition and also grand model have the ability to validate these nested models

#### How can I use Model inside another Model ?

You can use a model inside another model for one of the following uses:

- use a model as a sub model inside an object or as an object
- use a model as an array of this model inside the other model


**Example**

```typescript

import {Entity, property, settings} from"grand-model";

@settings()
class Post extends Entity{
    @property({type: String, required:true})
    title:string
    @property({type:User, required:true})
    author:User
}

@settings()
class User extends Entity{
    @property({required: true, type: String})
    name:string
    @property({required: true, type: [Post]})
    posts: Post[]
}
```


In this above example as you can see, we defined to models, the forst one is the post model and the second one is the User Model, these two models have relation together, the post uses one user and the user uses an array of posts
once you validate the model it will automatically validate the sub models and returns their validations if there is an error


### Instantiate Model

After defining your model, surly you need to instantiate these models and pass data to it, so you can easily instantiate your models as the following:




```typescript

import {Entity, property, settings} from"grand-model";

@settings()
class Post extends Entity{
    @property({type: String, required:true})
    title:string
    @property({type:User, required:false})
    author:User
}

@settings()
class User extends Entity{
    @property({required: true, type: String})
    name:string
    @property({required: true, type: [Post]})
    posts: Post[]
}
const user = new User({name: "tarek", posts: [{
    title: "test post",
}]})
```



### Validate Model

To validate the model you need to access on a builtin object inside the model called `functions`
this object contains some helper methods, one of them is a function called `validate`

```typescript
user.functions.validate();
```
This function perofrm a validation process on your data based on the defined shcema

To access on the validation result, there is a property called `validations`, which is an array contains your validations result

```typescript
user.validations
```

This array contains objects, each object contains the following:

|property|type|description|
|-|-|-|
|keyName|string|the name of property that is failed in the validation|
|message|string|the returned message if the property is failed in validation|
|valueType|string|the data type that this property should be based on the defined schema|
|currentValueType|string|the current value of the property|


### Access Schema Object
to Access the Schema Object of the model you can access on it by accessing a property called `Schema`

**Example**

```typescript
@settings()
class User extends Entity{
    @property({required: true, type: String})
    name:string
}
const user = new User({name: "tarek"})

// access on the schema
console.log(user.Schema);
```

you can also access on it from the class itself as the following:

```typescript
@settings()
class User extends Entity{
    @property({required: true, type: String})
    name:string
}

// access on the schema
console.log(User.prototype.Schema);
```