# Feedback data

Import this data with the following command in a cmd shell:

```cmd
C:\MongoDB\Server\4.0\bin>mongoimport --uri mongodb://localhost:27017/feedback --collection feedback --drop --file C:\Users\wasadmin\Documents\testing\grp01\data\managerfeedback.json --jsonArray
```

The data can be viewed by connecting to the mongo shell and entering `use feedback` followed by `db.feedback.find()`

