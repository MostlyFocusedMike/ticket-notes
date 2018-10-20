# Ticket Notes 
A simple NPM pacakge to help format your notes 

## How to use 
Just use the command "entry" with the GitHub pull request title, followed by any files you used in the ticket.

<code>
$ entry "[ticket-1234] Do some stuff to the things #102" /usr/mike/my-projects/my-repo/file1 /usr/mike/my-projects/my-repo/file2
</code>              


which will output the following for you to copy into whatever document you like: 

  ticket-1234 https://ticketing-site.com/ticket-1234  
  Name: Do some stuff to the things  
  Date: 10/20/18  
  Description:  
  Fix:  
  Files:  
    MY-REPO  
    /file1  
    /file2  
  Commits: https://github.com/mostlyfocusedmike/my-repo/pull/102/commits  

## Install 
You have to globally install using 
<code>npm install -g ticket-notes</code>


## Environment Variables
Ticket-notes expects several environment variables to be set, and will throw an error if any are missing: 
 - #### PARENT_DIR 
 In order to grab your repo names, ticket-notes assumes there's a parent project folder. If your repo is in ~/Desktop/my-projects/my-repo, then PARENT_DIR=my-project (no leading/trailing slashes)
 - #### BOARD
 This is the kanban board site that is used to manage your tickets. If your url is https://coolkanban.company-name.com/tickets/ticket-123, then BOARD=coolkanban.company-name.com/tickets (no leading/trailing slashes)
 - #### GITHUB_PROFILE
 This is just whatever your GitHub profile name is, so mine is GITHUB_PROFILE=mostlyfocusedmike
 
## PR String format
The string must follow this format:    
"[ticket-number] ticket name #pull-request-number"     
Luckily, the PR number is automatically included by github, so if you name your PR after your ticket, this is just a simple cut and copy.

## Files 
As long as your file path contains your PARENT_DIR, it'll work fine:   
good: ~/Desktop/parent-dir/repo-name/file      
good: /parent-dir/repo-name/file        
good: parent-dir/repo-name/file           
bad: repo-name/file     

The reason for this is that it's optimized for the VS Code's "copy path" option, so it's expecting a full file path. For ticket-notes to work, you must include a properly formatted PR string, as well as at least ONE file.
