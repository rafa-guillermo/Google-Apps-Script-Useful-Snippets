# How-Tos in the Google Apps Script Environment

Explanations on how to do a multitude of things on the Google Workspace Platform, especially within the Apps Script Environment.

### Contents:
- How to create an Installable Trigger

____

**How to create an Installable Trigger:**

From the Tools > Script editor menu item, you can create a function with whatever code you wish to execute on trigger:

```
function example() {
  // do stuff!
}
```

Save the script with the save icon, press the run button (►), and confirm the authentication of running the script.

From here, following the Edit > Current project's triggers menu item, you will have a new page open in the Google Workspace Developer 
Hub. Click the `+ Add Trigger` button in the bottom right and set up the trigger settings as required for your settings:

 - Choose which function to run: `example`
 - Choose which deployment should run: `Head`
 - Select event source: This is dependent on the type trigger you wish to have. Trigger types are:
   - From spreadsheet
   - From form
   - From document
   - Time-driven
   - Form calendar
   
 **NB:** the selections available from here will be dependent on the context of the script. For example, "From spreadsheet" will not show up on a script bound to a document, whereas "From document" will. Time-driven and triggers from Calendar show up regardless of context.
 - Select event type: This will be dependent on which triggers are available for a given script's context. 
 Available types of triggers can be seen [in the official docs](https://developers.google.com/apps-script/guides/triggers#available_types_of_triggers)
 
 The following show up if and only if `Time-driven` is selected as the event source.
 - Select type of time based trigger: Specific date and time/Minutes timer/Hour timer/Day timer/Week timer/Month timer
 
 - Select interval: dependent on the type of timer.

Click `Save` and you're done!

___

**How to create a button which runs a function in Sheets:**

1. From the Sheets UI, Go to the `Insert > Drawing` menu item and create a shape; any shape will do, this will act as your button. 
2. Press `Save and Close` to add this to your sheet.
3. Move the newly-added drawing to where you would like. In the top-right of the drawing, you will see the vertical ellipsis menu (`⋮`). Click this, and then click `Assign script`.
4. In the new window, type the name of your script without parentheses (for example `myFunction`) and press `OK`.

Now, each time you click the button, the script will run. 
