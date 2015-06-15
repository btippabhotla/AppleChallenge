Benjamin McFerren
5-31-2015
mcferren@seasidesyndication.com
415-238-8167

Backbone app to demonstrate front end mvc skills

npm install
bower install
grunt serve

Challenge 1
The Sign up

Overview
Create a sign up page. This must be accessible and validate user data entered into all fields.

Requirements
1. Fields
Username
Username must be an email address. It cannot be longer than 56 characters. Required.
Password & Confirm Password
Must be at least 6 characters. Passwords must match. Required.
First & Last Name
Letters only. May not be more than 50 characters. Last Name Optional
Birthday
Must be visible to the user in MM/DD/YYYY (03/21/1982) format, but submit as ISO
8601. User must be at least 14 and not older than 150. Required.




Challenge 2
The Buddy List

Overview
Create a list of buddies that can be sorted, filtered, searched and prioritized. Clicking
on a buddy should show their expanded information.

Requirements
1. The List
• Pre-populate the list with mock data.
• Stub out the data as if it were an api response.
2. Buddies
• Each buddy in the list view should display their username, first name, last name and status
• The expanded information should display their email address, birthday and bio
• Buddies should be able to be added, prioritized and deleted.
• Deleting should prompt a confirmation dialog.
3. Buddy Status
• Buddies can be Available, Busy, Idle or Offline.
• If the buddy is offline, the expanded information should also show the last sign in date.
4. Add Buddy
• Clicking this button should open a dialog with a form to add a new buddy.
• Form should contain all required fields.
• On submit, the buddy should be added to the list.




Challenge 3
The Wizard

Overview
Create a step-by-step enrollment wizard. As the user completes steps, they become
active and traversable. Depending on the decisions made in each step, the user will
end up as one of three account types: Premium, Plus, Standard or Light and this
should be reflected in the summary.

Requirements
1. The Data
• Assume the user is already authenticated and you have account data available via an API
or bootstrapped.
• Pre-populate with at least username, first name, last name email and account type.
2. The Steps
Step One: Light
The user must confirm their username, first name last name and email pre-populated
from the bootstrapped data. If they go to the Conclusion from here, they’re a Light
account.
Step Two: Standard
The User must opt into becoming a Plus account type. Once the user opts in, they
become a standard account and step 3 becomes available. If they previously opted
in, then opt out, the user goes back to a Light account.
Step Three: Plus
Provide a list of interests to choose from. If three or fewer items are selected, the
user remains a Standard account type. If four or more are selected, then the user
becomes a Plus account and step four becomes enabled.
Step Four: Premium
This should contain an opt-in for premium features. If they user does not opt in, they
remain a Plus user.
3. The Summary
• The user is shown their account type along with a summary of the entered information
from the previous steps.
• The summary should be either always visible or visibility toggled into view at the
same time as the steps.