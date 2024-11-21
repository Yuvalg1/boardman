# 🎲 Boardman 🎲

This is an idea I had for a board game state manager. I want to be able to programatically create a board game using it's rules. Like a person understands a board game from it's set of rules, I want a computer to do the same. 

> [!NOTE]
> This repo is still a work-in-progress

This project is developed in Typescript using [Zustand](https://github.com/pmndrs/zustand) as a state manager. Tests are done using Jest.

Project is maintained using Bun package manager, and there are great automations that handle all the workflow process.

Automations like updating correct labels to issues, closing issues without connecting a branch, and creating a pull request using the branch name.

> [!IMPORTANT]
> For the automations to work, you need to create branches in the following way:
> 
> {github username}/{issue number}-{pull request title seperated by hyphens} 
